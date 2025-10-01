import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { Box, Divider, Grid } from '@mui/material';
import { AuthSwitch } from '@/components/auth/components/AuthSwitch';
import { authStepStore } from '@/modules/auth/auth-events';
import { useStore } from '@cobuildlab/react-simple-state';
import { AuthStep } from '@/modules/auth/auth-types';
import { useUserHook } from '@/modules/auth/user-hooks';

const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));
const AuthRegisterForm = dynamic(
  () => import('@/components/auth/AuthRegisterForm'),
);
const AuthLoginForm = dynamic(() => import('@/components/auth/AuthLoginForm'));

const Auth: React.FC = () => {
  const router = useRouter();
  let content = <></>;
  const {
    state: { user },
  } = useUserHook();
  const { step } = useStore(authStepStore);
  const GoogleButton = dynamic(
    () => import('@/components/auth/components/GoogleButton'),
  );

  let preLoginUrl = '';
  if (typeof window !== 'undefined') {
    preLoginUrl = localStorage.getItem('preLoginUrl') || '/';
  }

  useEffect(() => {
    if (user) {
      router.push(preLoginUrl);
    }
  }, [user, preLoginUrl, router]);

  switch (step) {
    case AuthStep.authRegister:
      content = <AuthRegisterForm />;
      break;

    default:
      content = <AuthLoginForm />;
      break;
  }

  return (
    <RootLayout>
      <StaticMeta
        title={'Sanimex-Autenticacion'}
        description={'Sanimex-Autenticacion'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <Box className="flex items-center justify-center my-[180px]">
        <Box px={4} alignItems="center" display="flex" width="100%">
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center">
                <Grid xs={12} md={6} lg={3} item>
                  <Box
                    border={'1px solid #D6D6D6'}
                    borderRadius={'10px'}
                    padding={'20px'}
                    style={{ background: 'white' }}
                    mt={2}
                    mb={2}
                  >
                    {[AuthStep.authRegister, AuthStep.authLogin].includes(
                      step,
                    ) && (
                      <Box mb={2}>
                        <AuthSwitch />
                      </Box>
                    )}
                    <Box>{content}</Box>
                    {[AuthStep.authRegister, AuthStep.authLogin].includes(
                      step,
                    ) && (
                      <>
                        <Box mb={1}>
                          <Divider>O</Divider>
                        </Box>

                        <Box
                          mb={2}
                          className="font-sans text-center text-[#999999]"
                        >
                          Puedes hacerlo vinculando tu cuenta de Google
                        </Box>

                        <Box className="text-[16px] place-items-center flex flex-col text-[#999999] px-5  space-y-[15px]">
                          <GoogleButton onSuccess={() => router.push('/')} />
                        </Box>
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </RootLayout>
  );
};
export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  if (req.cookies && req.cookies.jwtAuthToken) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
export default Auth;
