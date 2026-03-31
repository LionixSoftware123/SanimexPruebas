import React, { useEffect, useState } from 'react';
import IconGoogle from '@/images/icon-google.svg';
import { useCallAction } from '@cobuildlab/react-simple-state';
import { fetchUserGoogle } from '@/modules/auth/auth-actions';
import { GoogleUserType } from '@/modules/auth/auth-types';
import { useGoogleLogin } from '@react-oauth/google';
import {
  useRegisterMutation,
  useLoginMutation,
} from '@/utils/types/generated';
import jwtDecode from 'jwt-decode';
import moment from 'moment/moment';
import { useCookies } from 'react-cookie';
import { useToasts } from 'react-toast-notifications';

type GoogleButtonProps = {
  onSuccess?: () => void;
};

const GoogleButton: React.FC<GoogleButtonProps> = ({ onSuccess }) => {
  const [user, setUser] = useState<GoogleUserType | undefined | null>(undefined);
  const [, setCookie] = useCookies([
    'jwtAuthToken',
    'jwtRefreshToken',
    'wooSessionToken',
    'refreshWooSessionToken',
  ]);
  const { addToast } = useToasts();

  const saveCookies = (userData: any) => {
    if (userData?.jwtAuthToken) {
      setCookie('jwtAuthToken', userData?.jwtAuthToken, {
        expires: new Date(parseInt(userData?.jwtAuthExpiration as string) * 1000),
        path: '/',
        secure: true,
        sameSite: 'lax',
      });
    }
    if (userData?.jwtRefreshToken) {
      setCookie('jwtRefreshToken', userData?.jwtRefreshToken, {
        path: '/',
        secure: true,
        sameSite: 'lax',
      });
    }
    if (userData?.wooSessionToken) {
      try {
        const decodeToken = jwtDecode<{ data: { user: { id: string } }; exp?: number; }>(userData?.wooSessionToken as string);
        setCookie('wooSessionToken', userData?.wooSessionToken, {
          expires: new Date((decodeToken.exp as number) * 1000),
          path: '/',
          secure: true,
          sameSite: 'lax',
        });
        setCookie('refreshWooSessionToken', userData?.wooSessionToken, {
          expires: moment().add(1, 'year').toDate(),
          path: '/',
          secure: true,
          sameSite: 'lax',
        });
      } catch (e) {
        console.error("Error decoding wooSessionToken", e);
      }
    }
  };

  const [loginUser, { loading: loginLoading }] = useLoginMutation({
    onCompleted: (data) => {
      if (data?.login?.user) {
        saveCookies(data.login.user);
        onSuccess && onSuccess();
      }
    },
    onError: (error) => {
      console.error('Error login Google:', error.message);
      addToast('Error al autenticar con Google.', { appearance: 'error' });
    },
  });

  const [registerUser, { loading: registerLoading }] = useRegisterMutation({
    onCompleted: () => {
      loginUser({
        variables: {
          input: {
            username: user?.email as string,
            password: `3@2013_${user?.id}`,
          },
        },
      });
    },
    onError: (error) => {
      const isRecoverable = error.message.includes('already') || error.message.includes('registered') || error.message.includes('400');
      
      if (isRecoverable && user?.email) {
        loginUser({
          variables: {
            input: {
              username: user.email,
              password: `3@2013_${user.id}`,
            },
          },
        });
      } else {
        addToast('Error en el registro con Google.', { appearance: 'error' });
      }
    },
  });

  const [googleUserCallback] = useCallAction(fetchUserGoogle, {
    onCompleted: (data: GoogleUserType) => {
      setUser(data);
    },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      googleUserCallback(tokenResponse);
    },
    onError: (error) => {
      addToast(`Error de Google: ${error}`, { appearance: 'error' });
    },
  });

  useEffect(() => {
    if (user?.email && user?.id) {
      registerUser({
        variables: {
          input: {
            displayName: user.name as string,
            username: user.email as string,
            password: `3@2013_${user.id}`,
            email: user.email as string,
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); 

  return (
    <button
      onClick={() => googleLogin()}
      type="button"
      disabled={loginLoading || registerLoading}
      className="w-full h-[45px] border border-[#CCCCCC] rounded flex items-center justify-center bg-white"
    >
      {loginLoading || registerLoading ? (
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      ) : (
        <div className="flex space-x-[10px] items-center">
          <div className="w-[17px] h-[17px]">
            <IconGoogle />
          </div>
          <span className="font-bold uppercase text-[0.7rem] lg:text-[1rem]">
            Continuar con Google
          </span>
        </div>
      )}
    </button>
  );
};

export default GoogleButton;
