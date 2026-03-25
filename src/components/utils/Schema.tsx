import React from 'react';
import { checkProductInStock, getMarca } from '@/modules/product/product-utils';
import {
  Product,
  SimpleProduct,
} from '@/utils/types/generated';

type SchemaProps = {
  product: Product;
  url?: string;
};

const Schema: React.FC<SchemaProps> = ({ product, url }) => {
  // 1. Función de limpieza para Google Merchant Center
  const cleanForSchema = (price: any): string => {
    if (!price) return "0.00";
    const priceStr = String(price);
    return priceStr.split(' - ')[0].replace(/[^0-9.]/g, '') || "0.00";
  };

  const validatedPrice = cleanForSchema((product as SimpleProduct)?.price);

  // 2. Construcción del objeto JSON-LD
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    sku: product?.sku ? String(product.sku) : String(product?.databaseId || ''),
    image: product?.galleryImages?.edges?.length
      ? product?.galleryImages.edges[0].node.sourceUrl
      : product?.featuredImage?.node?.sourceUrl,
    name: product?.name || '',
    description: product?.description 
      ? product.description.replace(/<[^>]*>?/gm, '') 
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
      price: validatedPrice,
      itemCondition: 'https://schema.org/NewCondition',
      availability: checkProductInStock(product)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: validatedPrice,
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
    <script
      type="application/ld+json"
      id={`schema-${url}`}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default Schema;
