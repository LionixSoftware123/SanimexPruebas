import React, { useEffect, useState } from 'react';
import IconGoogle from '@/images/icon-google.svg';
import { useCallAction } from '@cobuildlab/react-simple-state';
import { fetchUserGoogle } from '@/modules/auth/auth-actions';
import { GoogleUserType } from '@/modules/auth/auth-types';
import { useGoogleLogin } from '@react-oauth/google';
import {
  User,
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

  // --- FUNCIÓN PARA GUARDAR COOKIES (Consistente con el otro form) ---
  const saveCookies = (user: any) => {
    if (user?.jwtAuthToken) {
      setCookie('jwtAuthToken', user?.jwtAuthToken, {
        expires: new Date(parseInt(user?.jwtAuthExpiration as string) * 1000),
        path: '/',
        secure: true,
        sameSite: 'lax',
      });
    }
    if (user?.jwtRefreshToken) {
      setCookie('jwtRefreshToken', user?.jwtRefreshToken, {
        path: '/',
        secure: true,
        sameSite: 'lax',
      });
    }
    if (user?.wooSessionToken) {
      try {
        const decodeToken = jwtDecode<{ data: { user: { id: string } }; exp?: number; }>(user?.wooSessionToken as string);
        setCookie('wooSessionToken', user?.wooSessionToken, {
          expires: new Date((decodeToken.exp as number) * 1000),
          path: '/',
          secure: true,
          sameSite: 'lax',
        });
        setCookie('refreshWooSessionToken', user?.wooSessionToken, {
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

  // --- MUTACIÓN DE LOGIN ---
  const [loginUser, { loading: loginLoading }] = useLoginMutation({
    onCompleted: (data) => {
      if (data?.login?.user) {
        saveCookies(data.login.user);
        onSuccess && onSuccess();
      }
    },
    onError: (error) => {
      console.error('Error login Google:', error.message);
      addToast('Error al autenticar con Google. Intente manualmente.', { appearance: 'error' });
    },
  });

  // --- MUTACIÓN DE REGISTRO ---
  const [registerUser, { loading: registerLoading }] = useRegisterMutation({
    onCompleted: () => {
      // Si el registro es exitoso, logueamos de inmediato
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
      // IGUAL QUE EN EL OTRO FORM: Si ya existe o da error 400, intentamos login de rescate
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
            username: user.email as string, // Mandamos email como username
            password: `3@2013_${user.id}`,
            email: user.email as string,
          },
        },
      });
    }
  }, [user]); // Quitamos registerUser de la dependencia para evitar loops

  return (
    <button
      onClick={() => googleLogin()}
      disabled={loginLoading || registerLoading}
      className="w-full h-[45px] border border-[#CCCCCC] rounded flex items-center justify-center bg-white hover:bg-gray-50 transition-colors"
    >
      {loginLoading || registerLoading ? (
        <svg aria-hidden="true" className="inline w-6 h-6 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      ) : (
        <div className="flex space-x-[10px] items-center">
          <IconGoogle className="w-[17px] h-[17px]" />
          <span className="font-bold uppercase text-[0.7rem] lg:text-[1rem]">
            Continuar con Google
          </span>
        </div>
      )}
    </button>
  );
};

export default GoogleButton;
