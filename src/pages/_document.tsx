import { Html, Head, Main, NextScript } from 'next/document';
//import Script from 'next/script';
//import React from 'react';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Este es el tipo de script a reubicar/reemplazar */}
        {/* <script src="https://example.com/external-script.js"></script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
