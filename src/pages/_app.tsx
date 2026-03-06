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
import Script from 'next/script'; // <--- IMPORTANTE: Importar desde next/script
import { GOOGLE_API_KEY } from '@/utils/constants';
import { useRouter } from 'next/router';
import UserProvider from '@/modules/user/UserProvider';
import { ProductCompareProvider } from '@/components/product/ProductCompareProvider';
import { OnTokenEvent } from '@/modules/auth/auth-events';

// ... (tus imports dinámicos se mantienen igual)
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

  // ... (tus useEffect se mantienen igual)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta charSet="utf-8" />
      </Head>

      {/* --- GOOGLE TAG MANAGER CONFIGURACIÓN CORRECTA --- */}
      <Script
        id="gtm-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NTLX9QV');
          `,
        }}
      />

      <GoogleOAuthProvider clientId={GOOGLE_API_KEY as string}>
        <ToastProvider placement="top-right" autoDismiss autoDismissTimeout={5000}>
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