import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { GetStaticPropsContext } from 'next';
import {
  ProductIdTypeEnum,
  Product as ProductType,
  SimpleProduct,
} from '@/utils/types/generated';
import {
  checkProductInfo,
  fetchProduct,
  fetchWpProducts,
} from '@/modules/product/product-actions';
import {
  ProductCustom,
  ProductOrderEnum,
} from '@/modules/product/product-types';
import currencyFormatter from 'currency-formatter';
import moment from 'moment';
import ProductPageLayout from '@/components/product/ProductPageLayout';
import LazyLoad from 'react-lazyload';
import { DOMAIN_SITE } from '@/utils/constants';
import {
  getComplementProductIds,
  getSimilarProductIds,
  fetchComplementProducts,
  fetchSimilarProducts,
} from '@/utils/helpers/product-helpers';
import Container from '@/components/utils/Container';
import ContainerThree from '@/components/utils/ContainerThree';
import ErrorPage from '@/components/error/Error';
import { getMarca } from '@/modules/product/product-utils';
import ProductLayout from '@/components/layouts/ProductLayout';
import StaticMeta from '@/components/utils/StaticMeta';

// Componentes dinámicos - Mantenemos los que no son críticos para el primer pintado
const ProductDetails = dynamic(() => import('@/components/product/ProductDetails'));
const ProductDescription = dynamic(() => import('@/components/product/components/ProductDescription'));
const ProductSectionOne = dynamic(() => import('@/components/product/ProductSectionOne'));
const ProductSectionTwo = dynamic(() => import('@/components/product/ProductSectionTwo'));
const SkeletonProductPage = dynamic(() => import('@/components/skeleton/SkeletonProductPage'));

type ProductPageProps = {
  product?: ProductType;
  complementProducts?: ProductCustom[];
  similarProducts?: ProductCustom[];
};

const ProductPage: React.FC<ProductPageProps> = ({
  product,
  complementProducts = [],
  similarProducts = [],
}) => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies();
  const [loading, setLoading] = useState(!product);

  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  const storageSellerUTMCampaignURL = useCallback(
    (productId: number) => {
      try {
        const { asPath } = router;
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        const sellerCampaignURL = new URL(`${origin}${asPath}`);

        if (!sellerCampaignURL.search.slice(1).length) return;
        let utmProducts = cookie.utm_products || [];

        if (utmProducts[productId]) {
          utmProducts[productId] = [
            ...utmProducts[productId],
            sellerCampaignURL.toString(),
          ];
        } else {
          utmProducts = {
            ...utmProducts,
            [productId]: [sellerCampaignURL.toString()],
          };
        }

        setCookie('utm_products', utmProducts, {
          expires: moment().add(15, 'days').toDate(),
          path: '/',
          domain: DOMAIN_SITE,
        });
      } catch (error) {
        console.error('Error Save query params', error);
      }
    },
    [cookie, router, setCookie],
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && product) {
      const price = currencyFormatter.unformat(
        (product as any)?.price as string,
        { code: 'USD' },
      );

      const categories: any = {};
      product?.productCategories?.nodes.forEach((category, i) => {
        if (i) categories[`item_category${i}` as keyof any] = (category as any).name;
        else categories['item_category'] = (category as any).name;
      });

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null }); 
      window.dataLayer.push({
        event: 'view_item',
        ecommerce: {
          currency: 'MXN',
          value: price,    
          items: [
            {
              item_name: product?.name,
              item_id: product?.databaseId,
              price: price,
              item_brand: (product as any)?.brand,
              item_variant: '', 
              quantity: 1,      
              ...categories,
            },
          ],
        },
      });

      storageSellerUTMCampaignURL(product?.databaseId);
    }
  }, [product, storageSellerUTMCampaignURL]);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (getMarca(product)?.toString().toLocaleLowerCase() === 'porcelanite') {
      const script = document.createElement('script');
      script.id = 'roomvoAssistant';
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-locale', 'es-mx');
      script.setAttribute('data-position', 'bottom-left');
      script.src = 'https://www.roomvo.com/static/scripts/b2b/common/assistant.js';

      if (footer) footer.appendChild(script);

      return () => {
        if (footer) footer.removeChild(script);
      };
    }
  }, [product]);

  // Si Next.js está en modo fallback (generando la página por primera vez)
  if (router.isFallback) {
    return (
      <ProductPageLayout product={null as any} asPath={router.asPath}>
        <Container classes="mb-6">
          <SkeletonProductPage />
        </Container>
      </ProductPageLayout>
    );
  }

  // Si no se encontró el producto tras la carga
  if (!product) {
    return (
      <ProductPageLayout product={null as any} asPath={router.asPath}>
        <Container classes="mb-6">
          <ErrorPage />
        </Container>
      </ProductPageLayout>
    );
  }

  return (
    <ProductLayout>      
      <StaticMeta
        title={`${product?.seoTitle || product?.name}`}
        description={`${product?.seoMeta || product?.description}`}
        asPath={router.asPath}
        image="/favicon.ico"
      />
      <div className={'mt-16'}>
        {/* --- CONTENIDO CRÍTICO PARA GOOGLE (FUERA DE LAZYLOAD) --- */}
        <Container classes="mb-6">
          <ProductDetails product={product} />
        </Container>
          
        <ContainerThree classes="mb-6">
          <ProductDescription product={product} />
        </ContainerThree>
        
        {/* --- CONTENIDO SECUNDARIO (DENTRO DE LAZYLOAD) --- */}
        <LazyLoad offset={300} once>
          {product?.cierreComercial && (
            <Container classes="mb-6">
              {product?.cierreComercial}
