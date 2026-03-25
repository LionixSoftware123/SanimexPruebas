import Head from 'next/head';
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

// Componente dinámico
const ProductDetails = dynamic(
  () => import('@/components/product/ProductDetails'),
);
const ProductDescription = dynamic(
  () => import('@/components/product/components/ProductDescription'),
);
const ProductSectionOne = dynamic(
  () => import('@/components/product/ProductSectionOne'),
);
const ProductSectionTwo = dynamic(
  () => import('@/components/product/ProductSectionTwo'),
);
const SkeletonProductPage = dynamic(
  () => import('@/components/skeleton/SkeletonProductPage'),
);

type ProductPageProps = {
  product?: ProductType;
  complementProducts?: ProductCustom[];
  similarProducts?: ProductCustom[];
};
//const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
import StaticMeta from '@/components/utils/StaticMeta';

const ProductPage: React.FC<ProductPageProps> = ({
  product,
  complementProducts = [],
  similarProducts = [],
}) => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies();
  const [loading, setLoading] = useState(true);
  const [, setShouldExist] = useState(true);
  const [, setShowClientSide] = useState(false);

  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  useEffect(() => {
    const waitRevalidate = async () => {
      const actualUrl = router.asPath;
      const needUpdate = await checkProductInfo(
        product,
        (product as any)?.slug,
        actualUrl,
      );

      if (!needUpdate) {
        console.log('El producto no ha cambiado o no es necesario revalidar');
        setShouldExist(false);
      } else {
        setShowClientSide(true);
      }
    };

    if (router.asPath) {
      waitRevalidate();
    }
    console.log('Revisando si el producto ha cambiado');
  }, [product, router.asPath]);

  const storageSellerUTMCampaignURL = useCallback(
    (productId: number) => {
      try {
        const { asPath } = router;
        const origin =
          typeof window !== 'undefined' ? window.location.origin : '';
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

  // Código para manejo de cookies y eventos
  useEffect(() => {
    if (typeof window !== 'undefined' && product) {
      const price = currencyFormatter.unformat(
        (product as any)?.price as string,
        { code: 'USD' },
      );

      const categories: any = {};
      product?.productCategories?.nodes.forEach((category, i) => {
        if (i)
          categories[`item_category${i}` as keyof any] = (category as any).name;
        else categories['item_category'] = (category as any).name;
      });

      //if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      //  window.gtag('event', 'view_item', {
      //    items: [
      //      {
      //        item_name: product?.name,
      //        item_id: product?.databaseId,
      //        price,
      //        item_brand: (product as any)?.brand,
      //        quantity: '1',
      //        ...categories,
      //      },
      //    ],
      //  });
      //}
      if (typeof window !== 'undefined') {
        // 1. Inicializamos el dataLayer si no existe
        window.dataLayer = window.dataLayer || [];
      
        // 2. Recomendado: Limpiar el objeto ecommerce previo (evita duplicidad de datos en SPAs)
        window.dataLayer.push({ ecommerce: null }); 
      
        // 3. Empujamos el evento con la estructura estándar de GA4
        window.dataLayer.push({
          event: 'view_item', // El nombre que GTM usará como activador
          ecommerce: {
            currency: 'MXN', // Ajusta a tu moneda local
            value: price,    // Valor total de la vista (opcional)
            items: [
              {
                item_name: product?.name,
                item_id: product?.databaseId,
                price: price,
                item_brand: (product as any)?.brand,
                item_variant: '', // Puedes dejarlo vacío o mapear una variante
                quantity: 1,      // Se recomienda usar número, no string '1'
                ...categories,
              },
            ],
          },
        });
      }    

      storageSellerUTMCampaignURL(product?.databaseId);
    }
  }, [product, storageSellerUTMCampaignURL]);
  const footer = document.querySelector('footer');

  useEffect(() => {
    console.log(
      'Cargando script de Roomvo',
      getMarca(product)?.toString().toLocaleLowerCase() === 'porcelanite',
    );
    if (getMarca(product)?.toString().toLocaleLowerCase() === 'porcelanite') {
      const script = document.createElement('script');
      script.id = 'roomvoAssistant';
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-locale', 'es-mx');
      script.setAttribute('data-position', 'bottom-left');
      script.src =
        'https://www.roomvo.com/static/scripts/b2b/common/assistant.js';

      if (footer) {
        console.log('Footer encontrado, insertando script Roomvo');
        footer.appendChild(script);
      } else {
        console.log('Footer no encontrado Roomvo');
      }

      return () => {
        if (footer) {
          console.log('Eliminando script de Roomvo');
          footer.removeChild(script);
        }
      };
    }
  }, [product, footer]);

  if (!loading && !product) {
    return (
      <>
        <ProductPageLayout product={product as any} asPath={router.asPath}>
          <Container classes="mb-6">
            <SkeletonProductPage />
            <ErrorPage />
          </Container>
        </ProductPageLayout>
      </>
    );
  }

  if (!product) {
    return (
      <ProductPageLayout product={product as any} asPath={router.asPath}>
        <Container classes="mb-6 ">
          <SkeletonProductPage />
        </Container>
      </ProductPageLayout>
    );
  }

  return (
    <ProductLayout>
      {/* --- INYECCIÓN DIRECTA PARA GOOGLE MERCHANT --- */}
      <Head>
        {product && (
          <script
            type="application/ld+json"
            id="json-ld-merchants-directo"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: product.name,
                image: product.featuredImage?.node?.sourceUrl,
                description: product.description?.replace(/<[^>]*>?/gm, ''),
                sku: product.sku || (product as any).databaseId,
                offers: {
                  '@type': 'Offer',
                  price: (product as any).price, // El valor ya viene limpio del getStaticProps
                  priceCurrency: 'MXN',
                  availability: 'https://schema.org/InStock',
                  url: `${DOMAIN_SITE}${router?.asPath || ''}`,
                },
              }),
            }}
          />
        )}
      </Head>
      
      <StaticMeta
        title={`${product?.seoTitle || product?.name}`}
        description={`${product?.seoMeta || product?.description}`}
        asPath={router.asPath}
        image="/favicon.ico"
      />
      <div className={'mt-16'}>
        <LazyLoad offset={100}>
          <Container classes="mb-6">
            <ProductDetails product={product} />
          </Container>
          
          <ContainerThree classes="mb-6">
            <ProductDescription product={product} />
          </ContainerThree>
          
          {product?.cierreComercial ? (
            <Container classes="mb-6">
              {product?.cierreComercial}
            </Container>
          ) : (
           ''
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
    per_page: 40,
  });
  return {
    paths: products.map((product) => ({ params: { product: product.slug } })),
    // CAMBIA 'true' POR 'blocking'
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
    console.log('no se encontro el producto, reintente en 60');
    return {
      notFound: true,
    };
  }

  const complementProductIds = getComplementProductIds(
    product as SimpleProduct,
  );
  const similarProductIds = getSimilarProductIds(product as SimpleProduct);

  if (similarProductIds.length) {
    similarProducts = await fetchSimilarProducts(product as SimpleProduct);
  }

  if (complementProductIds.length) {
    complementProducts = await fetchComplementProducts(complementProductIds);
  }

  // --- INICIO DE LIMPIEZA PARA MERCHANT CENTER ---
  const cleanPrice = (p: string | undefined | null) => {
    if (!p) return "";
    // Elimina $, comas y espacios para dejar solo el número puro
    return p.replace(/[$,\s]/g, "");
  };

  if (product) {
    // Limpieza del producto principal
    (product as any).price = cleanPrice((product as any).price);
    (product as any).regularPrice = cleanPrice((product as any).regularPrice);
    (product as any).salePrice = cleanPrice((product as any).salePrice);

    // Limpieza de las variaciones (Si existen)
    if ((product as any).variations?.nodes) {
      (product as any).variations.nodes.forEach((variation: any) => {
        variation.price = cleanPrice(variation.price);
        variation.regularPrice = cleanPrice(variation.regularPrice);
        variation.salePrice = cleanPrice(variation.salePrice);
      });
    }
  }
  // --- FIN DE LIMPIEZA ---

  return {
    props: {
      product,
      complementProducts,
      similarProducts,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 60,
  };
};

export default ProductPage;
