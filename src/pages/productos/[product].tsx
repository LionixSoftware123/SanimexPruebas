import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  fetchProduct,
  fetchWpProducts,
} from '@/modules/product/product-actions';
import { GetStaticPropsContext } from 'next';
import {
  ProductIdTypeEnum,
  Product as ProductType,
  SimpleProduct,
  ProductCategory,
} from '@/utils/types/generated';
import {
  ProductCustom,
  ProductOrderEnum,
} from '@/modules/product/product-types';
import { useRouter } from 'next/router';
import currencyFormatter from 'currency-formatter';
import { getMarca, getProductBrand } from '@/modules/product/product-utils';
import LazyLoad from 'react-lazyload';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import { DOMAIN_SITE } from '@/utils/constants';
import {
  fetchComplementProducts,
  fetchSimilarProducts,
  getComplementProductIds,
  getSimilarProductIds,
} from '@/utils/helpers/product-helpers';
import ProductPageLayout from '@/components/product/ProductPageLayout';
import ErrorPage from '@/components/error/Error';

const ProductSectionOne = dynamic(
  () => import('@/components/product/ProductSectionOne'),
);
const ProductSectionTwo = dynamic(
  () => import('@/components/product/ProductSectionTwo'),
);
const ProductDetails = dynamic(
  () => import('@/components/product/ProductDetails'),
);
const Container = dynamic(() => import('@/components/utils/Container'));
const ProductDescription = dynamic(
  () => import('@/components/product/components/ProductDescription'),
);

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
  const [loading, setLoading] = useState(!product);

  useEffect(() => {
    if (product) setLoading(false);
  }, [product]);

  const storageSellerUTMCampaignURL = useCallback(
    (productId: number) => {
      try {
        const { asPath } = router;
        if (!asPath.includes('?')) return; 

        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        const sellerCampaignURL = new URL(`${origin}${asPath}`).toString();
        
        const utmProducts = cookies.utm_products || {};
        const currentUrls = utmProducts[productId] || [];

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

  useEffect(() => {
    if (typeof window !== 'undefined' && product?.databaseId) {
      const price = currencyFormatter.unformat(
        (product as SimpleProduct)?.price as string,
        { code: 'USD' },
      );

      const categories: any = {};
      product?.productCategories?.nodes.forEach((category, i) => {
        const catName = (category as ProductCategory).name;
        if (i) categories[`item_category${i}`] = catName;
        else categories['item_category'] = catName;
      });

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'view_item', {
          items: [{
            item_name: product?.name,
            item_id: product?.databaseId,
            price,
            item_brand: getProductBrand(product),
            quantity: '1',
            ...categories,
          }],
        });
      }

      storageSellerUTMCampaignURL(product.databaseId);
    }
  }, [product?.databaseId, storageSellerUTMCampaignURL]);

  useEffect(() => {
    if (typeof window !== 'undefined' && product) {
      const footer = document.querySelector('footer');
      if (getMarca(product)?.toString().toLocaleLowerCase() === 'porcelanite' && footer) {
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
    }
  }, [product]);

  if (router.isFallback) {
    return (
      <ProductPageLayout product={null as any} asPath={router.asPath}>
        <Container>Cargando producto...</Container>
      </ProductPageLayout>
    );
  }

  if (!loading && !product) {
    return (
      <ProductPageLayout product={product as any} asPath={router.asPath}>
        <Container classes="mb-6"><ErrorPage /></Container>
      </ProductPageLayout>
    );
  }

  return (
    <ProductPageLayout product={product as any} asPath={router.asPath}>
      <div className="my-4 lg:my-[50px]">
        {/* FUERA DE LAZYLOAD PARA GMC */}
        <Container classes="mb-6">
          <ProductDetails product={product} />
        </Container>

        <Container classes="mb-6">
          <ProductDescription product={product} />
        </Container>

        <LazyLoad offset={800}>
          {complementProducts && complementProducts.length > 0 && (
            <Container classes="mb-6">
              <ProductSectionTwo
                products={complementProducts}
                title="Productos complementarios"
                showColors={false}
              />
            </Container>
          )}

          {similarProducts && similarProducts.length > 0 && (
            <Container classes="mb-6">
              <ProductSectionOne
                title="Productos similares"
                products={similarProducts}
              />
            </Container>
          )}
        </LazyLoad>
      </div>
    </ProductPageLayout>
  );
};

export const getStaticPaths = async () => {
  const { products } = await fetchWpProducts({
    order: ProductOrderEnum.Desc,
    per_page: 20, 
  });

  return {
    paths: products?.map((product) => ({ params: { product: product.slug } })) || [],
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
