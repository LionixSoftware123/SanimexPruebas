import React from 'react';
import Head from 'next/head';
import { checkProductInStock, getMarca } from '@/modules/product/product-utils';
import { Product, SimpleProduct } from '@/utils/types/generated';

type SchemaProps = {
  product: Product;
  url?: string;
};

const Schema: React.FC<SchemaProps> = ({ product, url }) => {
  // Al venir ya limpio desde getStaticProps, solo aseguramos que sea String
  const priceToUse = String((product as SimpleProduct)?.price || "0.00");

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    sku: product?.sku ? String(product.sku) : String(product?.databaseId || ''),
    image: product?.galleryImages?.edges?.length
      ? product?.galleryImages.edges[0].node.sourceUrl
      : product?.featuredImage?.node?.sourceUrl,
    name: product?.name || '',
    description: product?.description 
      ? product.description.replace(/<[^>]*>?/gm, '') // Limpia HTML para el SEO
      : product?.name || '',
    brand: {
      '@type': 'Brand',
      name: getMarca(product) || 'Sanimex',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    offers: {
      '@type': 'Offer',
      url: url,
      priceCurrency: 'MXN',
      price: priceToUse, // <--- "28502.19"
      itemCondition: 'https://schema.org/NewCondition',
      availability: checkProductInStock(product)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: priceToUse,
        priceCurrency: 'MXN',
        valueAddedTaxIncluded: true,
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'MX',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 60,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: 0,
          currency: 'MXN',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'MX',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 5,
            unitCode: 'DAY',
          },
        },
      },
    },
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        id={`schema-${url}`}
        key={`jsonld-${url}`}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </Head>
  );
};

export default Schema;
