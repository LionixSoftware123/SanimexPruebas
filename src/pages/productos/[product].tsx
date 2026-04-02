import React, { useCallback, useEffect } from 'react';
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

// Componentes dinámicos
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
  const [cookies, setCookie] = useCookies(['utm_products']);

  // 1. FUNCIÓN PARA COOKIES (Memorizada para evitar re-renders)
  const storageSellerUTMCampaignURL = useCallback(
    (productId: number) => {
      try {
        const { asPath } = router;
        if (!asPath.includes('?')) return; // No hay parámetros, no guardamos nada

        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        const sellerCampaignURL = new URL(`${origin}${asPath}`).toString();
        
        const utmProducts = cookies.utm_products || {};
        const currentUrls = utmProducts[productId] || [];

        // CRÍTICO: Si la URL ya está en la cookie, salimos para romper el bucle infinito
        if (currentUrls.includes(sellerCampaignURL)) return;

        const updatedUtm = {
          ...utmProducts,
          [productId]: [...currentUrls, sellerCampaignURL],
        };

        setCookie('utm_products', updatedUtm, {
          expires: moment().add(15, 'days').toDate(),
          path: '/',
          domain: DOMAIN_SITE,
        });
      } catch (error) {
        console.error('Error Save query params', error);
      }
    },
    [router.asPath, cookies.utm_products, setCookie],
  );

  // 2. EFECTO PRINCIPAL (Analytics y Cookies)
  useEffect(() => {
    if (typeof window !== 'undefined' && product?.databaseId) {
      console.log('Ejecutando tracking para el producto:', product.databaseId);
      
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

      storageSellerUTMCampaignURL(product.databaseId);
    }
  }, [product?.databaseId, storageSellerUTMCampaignURL]); // Solo reacciona si el ID del producto cambia

  // 3. EFECTO ROOMVO
  useEffect(() => {
    const footer = document.querySelector('footer');
    const marca = getMarca(product)?.toString().toLocaleLowerCase();

    if (marca === 'porcelanite' && footer) {
      const script = document.createElement('script');
      script.id = 'roomvoAssistant';
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-locale', 'es-mx');
      script.setAttribute('data-position', 'bottom-left');
      script.src = 'https://www.roomvo.com/static/scripts/b2b/common/assistant.js';

      footer.appendChild(script);

      return () => {
        const existing = document.getElementById('roomvoAssistant');
        if (existing && footer.contains(existing)) footer.removeChild(existing);
      };
    }
  }, [product?.databaseId]);

  if (router.isFallback) {
    return (
      <ProductPageLayout product={null as any} asPath={router.asPath}>
        <Container classes="mb-6">
          <SkeletonProductPage />
        </Container>
      </ProductPageLayout>
    );
  }

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
        <Container classes="mb-6">
          <ProductDetails product={product} />
        </Container>
          
        <ContainerThree classes="mb-6">
          <ProductDescription product={product} />
        </ContainerThree>
        
        {/* Usamos un offset mayor para que las imágenes carguen antes de llegar a ellas */}
        <LazyLoad offset={800}>
          {product?.cierreComercial && (
            <Container classes="mb-6">
              {product?.cierreComercial}
            </Container>
          )}

          {complementProducts.length > 0 && (
            <Container classes="mb-6">
              <ProductSectionTwo
                products={complementProducts}
                title="Productos complementarios"
                showColors={false}
              />
            </Container>
          )}

          {similarProducts.length > 0 && (
            <Container classes="mb-6">
              <ProductSectionOne
                title="Productos similares"
                products={similarProducts}
              />
            </Container>
          )}
        </LazyLoad>
      </div>
    </ProductLayout>
  );
};

export const getStaticPaths = async () => {
  const { products } = await fetchWpProducts({
    order: ProductOrderEnum.Desc,
    per_page: 20, 
  });
  
  return {
    paths: products.map((product) => ({ params: { product: product.slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ product: string }>) => {
  let complementProducts: ProductCustom[] = [];
  let similarProducts: ProductCustom[] = [];
  
  const product = await fetchProduct({
    id: params?.product as string,
    idType: ProductIdTypeEnum.Slug,
  });

  if (!product) {
    return { notFound: true };
  }

  const complementProductIds = getComplementProductIds(product as SimpleProduct);
  const similarProductIds = getSimilarProductIds(product as SimpleProduct);

  if (similarProductIds.length) {
    similarProducts = await fetchSimilarProducts(product as SimpleProduct);
  }

  if (complementProductIds.length) {
    complementProducts = await fetchComplementProducts(complementProductIds);
  }

  const cleanPrice = (p: string | undefined | null) => {
    if (!p) return "";
    return p.replace(/[$,\s]/g, "");
  };

  if (product) {
    (product as any).price = cleanPrice((product as any).price);
    (product as any).regularPrice = cleanPrice((product as any).regularPrice);
    (product as any).salePrice = cleanPrice((product as any).salePrice);

    if ((product as any).variations?.nodes) {
      (product as any).variations.nodes.forEach((variation: any) => {
        variation.price = cleanPrice(variation.price);
        variation.regularPrice = cleanPrice(variation.regularPrice);
        variation.salePrice = cleanPrice(variation.salePrice);
      });
    }
  }

  return {
    props: {
      product,
      complementProducts,
      similarProducts,
    },
    revalidate: 3600,
  };
};

export default ProductPage;
