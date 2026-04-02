import '@/styles/globals.css';
import 'react-phone-number-input/style.css';
import React, { useEffect, useMemo, useState } from 'react';
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

// Mantenemos la carga dinámica pero con un control de renderizado
const ActiveCampaignProvider = dynamic(
  () => import('@/components/active-campaign/ActiveCampaignProvider'),
  { ssr: false },
);
const CartProvider = dynamic(() => import('@/lib/cart/v2/CartProvider'), {
  ssr: false,
});

// Sacamos la creación del cliente para que sea estática y no se recree
const client = createApolloClient();

export default function App({ Component, pageProps }: AppProps) {
  const [cookies] = useCookies(['jwtAuthToken']);
  const router = useRouter();
  
  // --- MEJORA: Control de hidratación para Tracking ---
  const [canLoadTracking, setCanLoadTracking] = useState(false);

  useEffect(() => {
    // Si el usuario mueve el mouse, hace scroll o toca la pantalla, activamos el tracking
    // O si pasan 4 segundos (para no perder datos si el usuario es muy lento)
    const timer = setTimeout(() => setCanLoadTracking(true), 4000);
    
    const onInteraction = () => {
      setCanLoadTracking(true);
      clearTimeout(timer);
      window.removeEventListener('mousemove', onInteraction);
      window.removeEventListener('scroll', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
    };

    window.addEventListener('mousemove', onInteraction);
    window.addEventListener('scroll', onInteraction);
    window.addEventListener('touchstart', onInteraction);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', onInteraction);
      window.removeEventListener('scroll', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
    };
  }, []);

  useEffect(() => {
    if (router.asPath === '/mi-cuenta/lost-password') {
      router.push('/auth');
    }
  }, [router.asPath]); // Solo dependemos del asPath para evitar ejecuciones extra

  useEffect(() => {
    if (cookies.jwtAuthToken) {
      OnTokenEvent.dispatch({ token: cookies.jwtAuthToken });
    }
  }, [cookies.jwtAuthToken]); // Solo si el token real cambia

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow" />
        <meta charSet="utf-8" />
        {/* Preconnect ayuda a ganar milisegundos en peticiones externas */}
        <link rel="preconnect" href="https://js.openpay.mx" />
      </Head>

      <GoogleOAuthProvider clientId={GOOGLE_API_KEY as string}>
        <ToastProvider
          placement="top-right"
          autoDismiss
          autoDismissTimeout={5000}
        >
          <ApolloProvider client={client}>
            <ProductCompareProvider>
              <NextNProgress color="#29D" options={{ showSpinner: false }} />
              <UserProvider>
                <CartProvider>
                  {/* MEJORA: Solo montamos ActiveCampaign cuando hay interacción */}
                  {canLoadTracking ? (
                    <ActiveCampaignProvider>
                      <Component {...pageProps} />
                    </ActiveCampaignProvider>
                  ) : (
                    <Component {...pageProps} />
                  )}
                </CartProvider>
              </UserProvider>
            </ProductCompareProvider>
          </ApolloProvider>
        </ToastProvider>
      </GoogleOAuthProvider>
    </>
  );
}
