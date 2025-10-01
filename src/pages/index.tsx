import dynamic from 'next/dynamic';

import {
  fetchProducts,
  fetchProductsInPromo,
} from '@/modules/product/product-actions';
import {
  ProductsOrderByEnum,
  OrderEnum,
  Product as ProductType,
  Banner,
  BannerHome,
  BannerHomeType,
  Post,
} from '@/utils/types/generated';
import React from 'react';
import {
  fetchBannersHome,
  fetchSliderHome,
  getBannerByType,
} from '@/modules/banner/banner-actions';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import { fetchPosts } from '@/modules/blog/blog-actions';
import {
  ProductCustom,
  ProductOrderEnum,
} from '../modules/product/product-types';
import { useRouter } from 'next/router';

const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));
const Container = dynamic(() => import('@/components/utils/Container'));
const BannerTwo = dynamic(() => import('@/components/home/BannerTwo'));
const Banners = dynamic(() => import('@/components/home/Banners'));
const BestSellers = dynamic(() => import('@/components/home/BestSellers'));
const ProductListOne = dynamic(
  () => import('@/components/home/ProductListOne'),
);
const NewerProducts = dynamic(() => import('@/components/home/NewerProducts'));
const BlogList = dynamic(() => import('@/components/home/BlogList'));
const OurCompany = dynamic(() => import('@/components/home/OurCompany'));
//**const BannerList = dynamic(() => import('@/components/home/BannerList')); */

type HomeProps = {
  productsInPromoPisos?: ProductCustom[];
  productsInPromoSanitarios?: ProductCustom[];
  productsInPromoGriferia?: ProductCustom[];
  productsInPromoAdhesivos?: ProductCustom[];
  productsInPromoCalentadores?: ProductCustom[];
  newProducts?: ProductType[];
  mostSellers?: ProductType[];
  banners?: Banner[];
  bannersInHome?: BannerHome[];
  posts?: Post[];
};
const Home: React.FC<HomeProps> = ({
  productsInPromoPisos = [],
  productsInPromoSanitarios = [],
  productsInPromoGriferia = [],
  productsInPromoAdhesivos = [],
  productsInPromoCalentadores = [],
  newProducts = [],
  mostSellers = [],
  banners = [],
  bannersInHome = [],
  posts = [],
}) => {
  const horizontal1 = getBannerByType(
    bannersInHome,
    BannerHomeType.Horizontal_1,
  );

  const horizontal2 = getBannerByType(
    bannersInHome,
    BannerHomeType.Horizontal_2,
  );

  const horizontal3 = getBannerByType(
    bannersInHome,
    BannerHomeType.Horizontal_3,
  );

  const vertical1 = getBannerByType(bannersInHome, BannerHomeType.Vertical_1);

  const mobileHorizontal1 = getBannerByType(
    bannersInHome,
    BannerHomeType.MobileHorizontal_1,
  );
  const mobileHorizontal2 = getBannerByType(
    bannersInHome,
    BannerHomeType.Horizontal_2,
  );

  const mobileHorizontal3 = getBannerByType(
    bannersInHome,
    BannerHomeType.Horizontal_3,
  );

  const mobileHorizontal4 = getBannerByType(
    bannersInHome,
    BannerHomeType.MobileHorizontal_4,
  );

  const router = useRouter();

  console.log('bannersInHome', mobileHorizontal1);

  return (
    <RootLayout>
      <StaticMeta
        title={'Sanimex'}
        description={'Sanimex'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <div className="max-w-[1920px] mx-auto">
        <Banners banners={banners} />
      </div>
      {mobileHorizontal1 && mobileHorizontal1?.url ? (
        <Container classes={'my-2 flex lg:hidden '}>
          <Link href={(mobileHorizontal1?.redirect as string) || '#'}>
            <div className="w-full h-[120px] relative bg-white">
              <ImageWithFallback
                src={mobileHorizontal1?.url as string}
                alt="horizontal 1 banner"
                layout="responsive"
                fill
                style={{ objectFit: 'contain', background: 'white' }}
              />
            </div>
          </Link>
        </Container>
      ) : null}
      <Container>
        <BestSellers
          productsInPromoPisos={productsInPromoPisos}
          productsInPromoSanitarios={productsInPromoSanitarios}
          productsInPromoGriferia={productsInPromoGriferia}
          productsInPromoAdhesivos={productsInPromoAdhesivos}
          productsInPromoCalentadores={productsInPromoCalentadores}
        />
      </Container>
      {horizontal1 && horizontal1?.redirect && horizontal1?.url ? (
        <Container classes={'my-10 hidden md:flex'}>
          <Link href={(horizontal1?.redirect as string) ?? '#'}>
            <div className="w-full h-[100px] md:h-[185px] relative ">
              <ImageWithFallback
                src={horizontal1?.url as string}
                alt="horizontal 1 banner"
                layout="responsive"
                width={1200}
                height={184}
                fill
                style={{ objectFit: 'contain', background: 'white' }}
              />
            </div>
          </Link>
        </Container>
      ) : (
        <div className="my-10"></div>
      )}

      <LazyLoad offset={100}>
        <Container classes={'my-4 md:my-10 flex '}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="hidden md:block ">
              {vertical1 && vertical1?.redirect && vertical1?.url ? (
                <Link href={(vertical1?.redirect as string) ?? '#'}>
                  <div className="relative w-full h-[800px] md:h-full">
                    <ImageWithFallback
                      src={vertical1?.url as string}
                      alt="vertical 1 banner"
                      layout="responsive"
                      width={276}
                      height={945}
                      fill
                      style={{ objectFit: 'contain', background: 'white' }}
                    />
                  </div>
                </Link>
              ) : null}
            </div>

            <div className="block md:hidden ">
              {mobileHorizontal2 &&
              mobileHorizontal2?.redirect &&
              mobileHorizontal2?.url ? (
                <Container classes={'mb-2 flex md:hidden '}>
                  <Link href={(mobileHorizontal2?.redirect as string) ?? '#'}>
                    <div className="relative w-full h-[120px]">
                      <ImageWithFallback
                        src={mobileHorizontal2?.url as string}
                        alt="horizontal 2 banner"
                        layout="responsive"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </Link>
                </Container>
              ) : null}
            </div>

            <div className="md:col-span-3 hidden md:block">
              <ProductListOne products={mostSellers} />
            </div>
          </div>
        </Container>
      </LazyLoad>
      {horizontal2 && horizontal2?.redirect && horizontal2?.url ? (
        <Container classes={'my-10 hidden md:flex'}>
          <Link href={(horizontal2?.redirect as string) ?? '#'}>
            <div className="relative w-full h-[185px] ">
              <ImageWithFallback
                src={horizontal2?.url as string}
                alt="horizontal 3 banner"
                layout="responsive"
                width={1200}
                height={184}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>
        </Container>
      ) : null}

      <LazyLoad offset={200}>
        <Container>
          <NewerProducts products={newProducts} />
        </Container>
      </LazyLoad>
      {mobileHorizontal3 &&
      mobileHorizontal3?.redirect &&
      mobileHorizontal3?.url ? (
        <Container classes={'mb-2 flex md:hidden '}>
          <Link href={(mobileHorizontal3?.redirect as string) ?? '#'}>
            <div className="relative w-full h-[120px]">
              <ImageWithFallback
                src={mobileHorizontal3?.url as string}
                alt="horizontal 3 banner"
                layout="responsive"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>
        </Container>
      ) : null}
      <Container>
        <OurCompany />
      </Container>
      <div className="hidden">
        <BannerTwo />
      </div>
      {/**<div className="hidden">
        <BestSellersTwo />
      </div> */}

      {mobileHorizontal4 &&
      mobileHorizontal4?.redirect &&
      mobileHorizontal4?.url ? (
        <Container classes={'my-10 flex  lg:hidden'}>
          <Link href={(mobileHorizontal4?.redirect as string) ?? '#'}>
            <div className="w-full h-[120px] relative bg-white">
              <ImageWithFallback
                src={mobileHorizontal4?.url as string}
                alt="horizontal 4 banner"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>
        </Container>
      ) : null}

      {horizontal3 && horizontal3?.redirect && horizontal3?.url ? (
        <Container classes={'my-10 lg:flex hidden'}>
          <Link href={(horizontal3?.redirect as string) ?? '#'}>
            <div className="relative w-full h-[120px]">
              <ImageWithFallback
                src={horizontal3?.url as string}
                alt="horizontal 3 banner"
                layout="responsive"
                width={1200}
                height={184}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>
        </Container>
      ) : null}

      {/**<Container classes="hidden">
        <BannerList />
      </Container> */}
      {/**<Container classes={'hidden my-10'}>
        <NewProducts />
      </Container> */}
      <LazyLoad offset={200}>
        <Container classes="mb-10">
          <BlogList posts={posts} />
        </Container>
      </LazyLoad>
    </RootLayout>
  );
};

export async function getStaticProps() {
  const productsInPromo = await fetchProductsInPromo({
    order: ProductOrderEnum.Desc,
    per_page: 8,
  });

  const productsInPromoPisos = await fetchProductsInPromo({
    order: ProductOrderEnum.Desc,
    per_page: 8,
    category_name: 'pisos-y-azulejos',
  });

  const productsInPromoSanitarios = await fetchProductsInPromo({
    order: ProductOrderEnum.Desc,
    per_page: 8,
    category_name: 'sanitarios-sanitarios',
  });

  const productsInPromoGriferia = await fetchProductsInPromo({
    order: ProductOrderEnum.Desc,
    per_page: 8,
    category_name: 'griferia',
  });

  const productsInPromoAdhesivos = await fetchProductsInPromo({
    order: ProductOrderEnum.Desc,
    per_page: 8,
    category_name: 'adhesivos',
  });

  const productsInPromoCalentadores = await fetchProductsInPromo({
    order: ProductOrderEnum.Desc,
    per_page: 8,
    category_name: 'calentadores',
  });

  const { products: newProducts } = await fetchProducts({
    where: {
      offsetPagination: {
        size: 6,
        offset: 0,
      },
      orderby: [
        {
          field: ProductsOrderByEnum.Date,
          order: OrderEnum.Desc,
        },
      ],
      isExclude: false,
    },
  });

  const { products: mostSellers } = await fetchProducts({
    where: {
      offsetPagination: {
        size: 6,
        offset: 0,
      },
      orderby: [
        {
          field: ProductsOrderByEnum.TotalSales,
          order: OrderEnum.Desc,
        },
      ],
    },
  });

  const { posts } = await fetchPosts({
    where: {
      offsetPagination: {
        size: 3,
        offset: 0,
      },
    },
  });

  const banners = await fetchSliderHome();
  const bannersInHome = await fetchBannersHome();

  return {
    props: {
      productsInPromo,
      productsInPromoPisos,
      productsInPromoSanitarios,
      productsInPromoGriferia,
      productsInPromoAdhesivos,
      productsInPromoCalentadores,
      mostSellers,
      banners,
      bannersInHome,
      posts,
      newProducts,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 60,
  };
}

export default Home;
