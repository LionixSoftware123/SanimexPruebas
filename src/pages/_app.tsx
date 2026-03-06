import '@/styles/globals.css';
import 'react-phone-number-input/style.css';
import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from '@/apollo/client';
import { useCookies } from 'react-cookie';
import { ToastProvider } from 'react-toast-notifications';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';
import { GOOGLE_API_KEY } from '@/utils/constants';
import { useRouter } from 'next/router';
import UserProvider from '@/modules/user/UserProvider';
import { ProductCompareProvider } from '@/components/product/ProductCompareProvider';
import { OnTokenEvent } from '@/modules/auth/auth-events';

const ActiveCampaignProvider = dynamic(
  () => import('@/components/active-campaign/ActiveCampaignProvider'),
  { ssr: false },
);
const CartProvider = dynamic(() => import('@/lib/cart/v2/CartProvider'), {
  ssr: false,
});

const client = createApolloClient();

export default function App({ Component, pageProps }: AppProps) {
  const [cookies] = useCookies(['jwtAuthToken']);
  const router = useRouter();

  useEffect(() => {
    if (router.asPath === '/mi-cuenta/lost-password') {
      router.push('/auth');
    }
  }, [router]);

  useEffect(() => {
    if (cookies.jwtAuthToken) {
      OnTokenEvent.dispatch({ token: cookies.jwtAuthToken });
    }
  }, [cookies]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta charSet="utf-8" />
      </Head>
      <GoogleOAuthProvider clientId={GOOGLE_API_KEY as string}>
        <ToastProvider
          placement="top-right"
          autoDismiss
          autoDismissTimeout={5000}
        >
          <ApolloProvider client={client}>
            <ProductCompareProvider>
              <NextNProgress options={{ showSpinner: false }} />
              <UserProvider>
                <CartProvider>
                  <ActiveCampaignProvider>
                    <Component {...pageProps} />
                  </ActiveCampaignProvider>
                </CartProvider>
              </UserProvider>
            </ProductCompareProvider>
          </ApolloProvider>
        </ToastProvider>
      </GoogleOAuthProvider>
    </>
  );
}
