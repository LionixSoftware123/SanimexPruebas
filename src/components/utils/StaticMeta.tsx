import Head from 'next/head';
import React from 'react';
import { FRONTEND_ENDPOINT } from '@/utils/constants';
import { Product } from '@/utils/types/generated';
import Schema from './Schema';

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
  // Limpiamos el HTML de la descripción de forma segura para el servidor
  // Esto elimina etiquetas como <p>, <strong>, etc., sin usar 'document'
  const cleanDescription = description
    ? description.replace(/<[^>]*>?/gm, '').replace(/\n/g, ' ').trim()
    : '';
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={cleanDescription} />
        <link rel="canonical" href={`${FRONTEND_ENDPOINT}${asPath}`} />
        {image !== '' && <meta name="image" content={image} />}
        <link rel="icon" href="/favicon.ico" />
        
        {/* OpenGraph tags */}
        <meta property="og:locale" content="es_ES" />
        <meta property="og:url" content={`${FRONTEND_ENDPOINT}${asPath}`} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={cleanDescription} />
        <meta property="og:site_name" content="Sanimex" />
        {image !== '' && <meta property="og:image" content={image} />}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={cleanDescription} />
        <meta name="twitter:image" content={image} />
      </Head>

      {/* Ahora el Schema se ejecutará sin bloqueos de lado del servidor */}
      {product && (
        <Schema product={product} url={`${FRONTEND_ENDPOINT}${asPath}`} />
      )}
    </>
  );
};

export default StaticMeta;
