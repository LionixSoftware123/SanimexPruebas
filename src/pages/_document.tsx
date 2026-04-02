import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import Script from 'next/script';
import React from 'react';

export default function Document(props: DocumentProps) {
  const product = props?.__NEXT_DATA__?.props?.pageProps?.product;

  return (
    <Html lang="es">
      <Head>
        {/* --- OPTIMIZACIÓN GTM --- */}
        {/* Cambiamos strategy a afterInteractive para que no bloquee el renderizado inicial */}
        <Script
          id="gtm-script"
          strategy="afterInteractive" 
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NTLX9QV');`,
          }}
        />

        {/* --- MERCHANT CENTER SCHEMA (No se toca para mantener la palomita verde) --- */}
        {product && (
          <script
            type="application/ld+json"
            id="merchant-schema-final"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Product',
                "name": product.name,
                "sku": product.sku || product.databaseId?.toString(),
                "image": product.featuredImage?.node?.sourceUrl || '',
                "description": product.description?.replace(/<[^>]*>?/gm, '').slice(0, 160),
                "offers": {
                  "@type": "Offer",
                  "price": product.price,
                  "priceCurrency": "MXN",
                  "availability": "https://schema.org/InStock",
                  "url": `https://coral-app-dm8qn.ondigitalocean.app/productos/${product.slug}`
                }
              })
            }}
          />
        )}
      </Head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src='https://www.googletagmanager.com/ns.html?id=GTM-NTLX9QV'
            height='0' width='0' style='display:none;visibility:hidden'></iframe>`,
          }}
        />
        <Main />
        <NextScript />

        {/* --- SCRIPTS DE BAJA PRIORIDAD --- */}
        {/* Usamos lazyOnload para todo lo que no sea esencial para pintar la página */}
        <Script
          id="vgo-script"
          strategy="lazyOnload" 
          dangerouslySetInnerHTML={{
            __html: `(function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement("script");r.src=o;r.async=true;i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)})(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");
            vgo('setAccount', '69083262');
            vgo('setTrackByDefault', true);
            vgo('process');`,
          }}
        />

        {/* ZOHO SALESIQ: El chat es lo más pesado, lo mandamos al final de la cola */}
        <Script id="zoho-init" strategy="lazyOnload">
          {`window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
        </Script>
        
        <Script 
          id="zsiqscript"
          src="https://salesiq.zohopublic.com/widget?wc=siqfd59dc62af67d357b89864de44b8db390b38171b2c43ea7b766d46c8be731eec"
          strategy="lazyOnload" 
        />
      </body>
    </Html>
  );
}
