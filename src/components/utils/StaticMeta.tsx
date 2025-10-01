import Head from 'next/head';
import React from 'react';
import { FRONTEND_ENDPOINT } from '@/utils/constants';
import { Product } from '@/utils/types/generated';
import dynamic from 'next/dynamic';
const Schema = dynamic(() => import('./Schema'));
type StaticMetaProps = {
  title?: string;
  description?: string;
  image?: string;
  asPath?: string;
  product?: Product;
};

const StaticMeta: React.FC<StaticMetaProps> = ({
  description = '',
  title = '',
  image = '',
  asPath = '',
  product,
}) => {
  let content = '';
  if (typeof document !== 'undefined') {
    const html = document.createElement('div');
    html.innerHTML = description;
    content = html.textContent || html.innerText;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        {/* General tags */}
        <title>{title}</title>
        <meta name="description" content={content} />
        <link rel="canonical" href={`${FRONTEND_ENDPOINT}${asPath}`} />
        {image !== '' && <meta name="image" content={image} />}
        <link rel="icon" href="/favicon.ico" />
        {/* OpenGraph tags */}
        <meta property="og:locale" content="es_ES" />
        <meta property="og:url" content={`${FRONTEND_ENDPOINT}${asPath}`} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content} />
        <meta property="og:site_name" content="Sanimex" />
        {image !== '' && <meta property="og:image" content={image} />}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="Sanimex" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={content} />
        <meta name="twitter:image" content={image} />
      </Head>
      {product ? (
        <Schema product={product} url={`${FRONTEND_ENDPOINT}${asPath}`} />
      ) : null}
    </>
  );
};

export default StaticMeta;
