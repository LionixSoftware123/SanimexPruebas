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
/* import {
  checkProductInfo,
  fetchAxiosProduct,
  fetchWpProducts,
} from '@/modules/product/product-actions';
import {
  ProductCustom,
  ProductOrderEnum,
} from '@/modules/product/product-types'; */
import { ProductCustom } from '@/modules/product/product-types';
import { checkProductInfo, fetchAxiosProduct,} from '@/modules/product/product-actions';
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
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));

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

      window.gtag('event', 'view_item', {
        items: [
          {
            item_name: product?.name,
            item_id: product?.databaseId,
            price,
            item_brand: (product as any)?.brand,
            quantity: '1',
            ...categories,
          },
        ],
      });

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
      <StaticMeta
        title={`Sanimex - ${product?.name}`}
        description={`${product?.description || 'Sanimex'}`}
        asPath={router.asPath}
        image="/favicon.ico"
      />
      <div className={'mt-16'}>
        <LazyLoad offset={100}>
          <Container classes="mb-6">
            <ProductDetails product={product} />
          </Container>
          <Container classes="mb-6">
            <ProductDescription product={product} />
          </Container>
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

/* export const getStaticPaths = async () => {
  const { products } = await fetchWpProducts({
    order: ProductOrderEnum.Desc,
    per_page: 40,
  });
  return {
    paths: products.map((product) => ({ params: { product: product.slug } })),
    fallback: true,
  };
};
*/
export const getServerSideProps = async ({
  params,
}: GetStaticPropsContext<{ product: string }>) => {
  let complementProducts: ProductCustom[] = [];
  let similarProducts: ProductCustom[] = [];

  const product = await fetchAxiosProduct({
    id: params?.product as string,
    idType: ProductIdTypeEnum.DatabaseId,
  });

  if (!product) {
    console.log('no se encontro el producto, reintente en 60');
    return {
      notFound: true,
      //revalidate: 60,
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

  return {
    props: {
      product,
      complementProducts,
      similarProducts,
    },
    //revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 60,
  };
};
export default ProductPage;
