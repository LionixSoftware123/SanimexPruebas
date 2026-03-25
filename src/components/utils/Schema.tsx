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

  // 1. Función de limpieza ultra-robusta para Merchant Center
  const cleanForSchema = (price: any): string => {
    if (!price) return "0.00";
    // Convertimos a string, tomamos el primer valor si es rango, 
    // y removemos todo lo que no sea número o punto decimal.
    return String(price)
      .split(' - ')[0]
      .replace(/[^0-9.]/g, '') || "0.00";
  };

  // 2. Pre-calculamos el precio limpio para evitar errores en el objeto
  const validatedPrice = cleanForSchema((product as SimpleProduct)?.price);

  // 3. Construcción del objeto Schema
  let schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    sku: product?.sku ? String(product.sku) : String(product?.databaseId || ''),
    image: product?.galleryImages?.edges?.length
      ? product?.galleryImages.edges[0].node.sourceUrl
      : product?.featuredImage?.node?.sourceUrl,
    name: product?.name || '',
    description: product?.description 
      ? product.description.replace(/<[^>]*>?/gm, '') // Limpia etiquetas HTML de la descripción
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
      price: validatedPrice, // <--- Valor limpio: "28502.19"
      itemCondition: 'https://schema.org/NewCondition',
      availability: checkProductInStock(product)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: validatedPrice,
        priceCurrency: 'MXN',
        valueAddedTaxIncluded: true
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
          value: 0, // Ajustar si hay costo de envío base
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

  // 4. Inyección del Script en el Head
  useScript({
    delay: 100,
    scriptContent: JSON.stringify(schema),
    position: HTMLPositionEnum.Head,
    scriptId: `schema-${url}`,
    type: 'application/ld+json',
  });

  // 5. Limpieza de scripts al cambiar de ruta (SPA behavior)
  useEffect(() => {
    const handleRouteChange = () => {
      removeScript(`schema-${url}`);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, url]);

  return null; // El componente no renderiza nada visual
};

export default Schema;
