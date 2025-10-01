import React, { useEffect, useState } from 'react';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FacebookUserType } from '@/modules/auth/auth-types';
import { DOMAIN_SITE, FACEBOOK_APP_ID } from '@/utils/constants';
import { useCookies } from 'react-cookie';
import { useToasts } from 'react-toast-notifications';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import {
  User,
  useRegisterMutation,
  useLoginMutation,
} from '@/utils/types/generated';
import IconFacebookLogin from '@/images/icon-facebook-login.svg';

type FacebookButtonProps = {
  onSuccess?: () => void;
};

const FacebookButton: React.FC<FacebookButtonProps> = ({ onSuccess }) => {
  const [user, setUser] = useState<FacebookUserType | undefined | null>(
    undefined,
  );

  const [, setCookie] = useCookies([
    'jwtAuthToken',
    'jwtRefreshToken',
    'wooSessionToken',
    'refreshWooSessionToken',
  ]);
  const { addToast } = useToasts();

  const onSuccessFacebookAuth = (user: User) => {
    setCookie('jwtAuthToken', user?.jwtAuthToken, {
      expires: new Date(parseInt(user?.jwtAuthExpiration as string) * 1000),
      path: '/',
      domain: DOMAIN_SITE,
    });
    setCookie('jwtRefreshToken', user?.jwtRefreshToken, {
      path: '/',
      domain: DOMAIN_SITE,
    });

    const decodeToken = jwtDecode<{
      data: { user: { id: string } };
      exp?: number;
    }>(user?.wooSessionToken as string);

    setCookie('wooSessionToken', user?.wooSessionToken, {
      expires: new Date((decodeToken.exp as number) * 1000),
      path: '/',
      domain: DOMAIN_SITE,
    });
    setCookie('refreshWooSessionToken', user?.wooSessionToken, {
      expires: moment().add(1, 'year').toDate(),
      path: '/',
      domain: DOMAIN_SITE,
    });

    onSuccess && onSuccess();
  };

  const [loginUser, { loading: loginLoading }] = useLoginMutation({
    onCompleted: (data) => {
      onSuccessFacebookAuth(data?.login?.user as User);
    },
    onError: (data) => {
      console.log('data', data);
      addToast(
        <div>
          <div dangerouslySetInnerHTML={{ __html: data.message }}></div>
        </div>,
        {
          appearance: 'error',
        },
      );
    },
  });

  const [registerUser, { loading: registerLoading }] = useRegisterMutation({
    onCompleted: (data) => {
      onSuccessFacebookAuth(data?.registerUser?.user as User);
    },
    onError: () => {
      loginUser({
        variables: {
          input: {
            username: user?.email as string,
            password: `3@2013_${user?.id}`,
          },
        },
      });
    },
  });

  const responseFacebook = (userInfo: ReactFacebookLoginInfo): void => {
    setUser({
      email: userInfo.email,
      name: userInfo.name,
      picture: {
        data: {
          url: userInfo.picture?.data.url,
        },
      },
    });
  };

  useEffect(() => {
    if (user) {
      registerUser({
        variables: {
          input: {
            displayName: user?.name as string,
            username: user?.email as string,
            password: `3@2013_${user.id}`,
            email: user?.email as string,
          },
        },
      });
    }
  }, [registerUser, user]);

  return (
    <FacebookLogin
      appId={FACEBOOK_APP_ID as string}
      callback={responseFacebook}
      fields="name,email,picture"
      isMobile={false}
      autoLoad={false}
      render={(renderProps) => {
        return (
          <button
            disabled={loginLoading || registerLoading}
            onClick={renderProps.onClick}
            className="w-[287px] h-[45px] border border-[#CCCCCC]"
          >
            {loginLoading || registerLoading ? (
              <div className="flex justify-center w-full">
                <svg
                  aria-hidden="true"
                  className="inline w- h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              <div className=" flex space-x-[10px] text-start  w-[230px] mx-auto">
                <div className="flex self-center w-[17px] h-[17px]">
                  <IconFacebookLogin />
                </div>
                <div>Continua con Facebook</div>
              </div>
            )}
          </button>
        );
      }}
    />
  );
};

export default FacebookButton;
