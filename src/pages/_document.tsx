import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import React from 'react';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          id="securepubads"
          strategy="beforeInteractive"
          async
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NTLX9QV');`,
          }}
        ></Script>
      </Head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
      <iframe src='https://www.googletagmanager.com/ns.html?id=GTM-NTLX9QV'
      height='0' width='0' style='display:none;visibility:hidden'></iframe>`,
          }}
        ></noscript>
        <Main />
        <NextScript />
        <Script
          async
          strategy="beforeInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-BZSVMDZGGK"
        ></Script>
        <Script
          id="googleGoogleTagId"
          async
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date()); gtag('config', 'G-BZSVMDZGGK');`,
          }}
        ></Script>
        <Script
          id="googleGoogleTagId"
          async
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `    (function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement("script");r.src=o;r.async=true;i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)})(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");
    vgo('setAccount', '69083262');
    vgo('setTrackByDefault', true);

    vgo('process');`,
          }}
        ></Script>
      </body>
    </Html>
  );
}
