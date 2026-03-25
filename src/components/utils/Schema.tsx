import React, { useEffect } from 'react';
import { checkProductInStock, getMarca } from '@/modules/product/product-utils';
import {
  Product,
  SimpleProduct,
  //ProductTypesEnum,
} from '@/utils/types/generated';
import useScript, { HTMLPositionEnum } from '@/utils/useScript';
import { removeScript } from '@/utils/ads-utils';
import { useRouter } from 'next/router';
type SchemaProps = {
  product: Product;
  url?: string;
};

const Schema: React.FC<SchemaProps> = ({ product, url }) => {
  const router = useRouter();
  const cleanForSchema = (price: any): string => {
    if (!price || typeof price !== 'string') return "0.00";
    // Tomamos el primer precio si es un rango, y quitamos todo lo que no sea número o punto
    return price.split(' - ')[0].replace(/[^0-9.]/g, '');
  };  
  let schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    sku: (product.sku as string) ? (product.sku as string) : '',
    image: product?.galleryImages?.edges.length
      ? product?.galleryImages.edges[0].node.sourceUrl
      : product?.featuredImage?.node.sourceUrl,
    name: product?.name as String,
    description: product?.name as String,
    brand: {
      '@type': 'Brand',
      name: getMarca(product),
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    offers: {
      '@type': 'Offer',
      url: url,
      itemCondition: 'https://schema.org/NewCondition',
      availability: checkProductInStock(product)
        ? 'https://schema.org/InStock'
        : '',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: cleanForSchema((product as SimpleProduct)?.price),
        priceCurrency: 'MXN',
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'MX',
        returnPolicyCategory:
          'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 60,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          minValue: 250,
          maxValue: 500,
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

  useScript({
    delay: 100,
    scriptContent: `${JSON.stringify(schema)}`,
    position: HTMLPositionEnum.Head,
    scriptId: `schema-${url}`,
    type: 'application/ld+json',
  });
  useEffect(() => {
    const handleRouteChange = () => {
      removeScript(`schema-${url}`);
    };

    router.events.on('routeChangeStart', () => {
      handleRouteChange();
    });

    return () => {
      router.events.off('routeChangeStart', () => {
        handleRouteChange();
      });
    };
  }, [router.events, url]);
  return <></>;
};

export default Schema;
