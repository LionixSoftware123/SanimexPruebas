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
import React, { useMemo } from 'react';
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

// OPTIMIZACIÓN: Solo dejamos fuera del dynamic lo que se ve arriba (Above the fold)
import StaticMeta from '@/components/utils/StaticMeta';
import RootLayout from '@/components/layouts/RootLayout';
import Container from '@/components/utils/Container';
import Banners from '@/components/home/Banners'; 

const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
const BestSellers = dynamic(() => import('@/components/home/BestSellers'), { ssr: true });
const ProductListOne = dynamic(() => import('@/components/home/ProductListOne'));
const NewerProducts = dynamic(() => import('@/components/home/NewerProducts'));
const BlogList = dynamic(() => import('@/components/home/BlogList'));
const OurCompany = dynamic(() => import('@/components/home/OurCompany'));

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
  const router = useRouter();

  // OPTIMIZACIÓN: Memorizamos los banners para evitar cálculos en cada render
  const b = useMemo(() => ({
    h1: getBannerByType(bannersInHome, BannerHomeType.Horizontal_1),
    h2: getBannerByType(bannersInHome, BannerHomeType.Horizontal_2),
    h3: getBannerByType(bannersInHome, BannerHomeType.Horizontal_3),
    v1: getBannerByType(bannersInHome, BannerHomeType.Vertical_1),
    mh1: getBannerByType(bannersInHome, BannerHomeType.MobileHorizontal_1),
  }), [bannersInHome]);

  return (
    <RootLayout>
      <StaticMeta
        title={'Sanimex | Pisos, Sanitarios y Grifería'}
        description={'Expertos en acabados para tu hogar.'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />

      {/* EL SLIDER PRINCIPAL: No lleva LazyLoad para no afectar el LCP */}
      <div className="max-w-[1920px] mx-auto">
        <Banners banners={banners} />
      </div>

      {/* BANNER MÓVIL PRINCIPAL: Prioridad alta para mejorar el speed móvil */}
      {b.mh1?.url && (
        <Container classes={'my-2 flex lg:hidden '}>
          <Link href={(b.mh1?.redirect as string) || '#'}>
            <div className="w-full h-[120px] relative bg-white">
              <ImageWithFallback
                src={b.mh1.url}
                alt="Promoción Sanimex"
                layout="responsive"
                width={400}
                height={120}
                priority={true} // <--- Esto le dice a Google que la cargue primero
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>
        </Container>
      )}

      <Container>
        <BestSellers
          productsInPromoPisos={productsInPromoPisos}
          productsInPromoSanitarios={productsInPromoSanitarios}
          productsInPromoGriferia={productsInPromoGriferia}
          productsInPromoAdhesivos={productsInPromoAdhesivos}
          productsInPromoCalentadores={productsInPromoCalentadores}
        />
      </Container>

      {/* A PARTIR DE AQUÍ: Todo en LazyLoad para que el móvil no sufra */}
      <LazyLoad offset={600} once>
        {b.h1?.url && (
          <Container classes={'my-10 hidden md:flex'}>
            <Link href={(b.h1.redirect as string) ?? '#'}>
              <div className="w-full h-[185px] relative">
                <ImageWithFallback
                  src={b.h1.url}
                  alt="Banner Informativo"
                  layout="responsive"
                  width={1200}
                  height={185}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </Link>
          </Container>
        )}

        <Container classes={'my-4 md:my-10 flex'}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="hidden md:block">
              {b.v1?.url && (
                <Link href={(b.v1.redirect as string) ?? '#'}>
                  <div className="relative w-full h-full min-h-[600px]">
                    <ImageWithFallback
                      src={b.v1.url}
                      alt="Promoción Vertical"
                      layout="fill"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </Link>
              )}
            </div>
            <div className="md:col-span-3">
              <ProductListOne products={mostSellers} />
            </div>
          </div>
        </Container>

        <Container>
          <NewerProducts products={newProducts} />
        </Container>

        <Container>
          <OurCompany />
        </Container>

        <Container classes="mb-10">
          <BlogList posts={posts} />
        </Container>
      </LazyLoad>
    </RootLayout>
  );
};

export async function getStaticProps() {
  // OPTIMIZACIÓN: Ejecutamos las peticiones en paralelo para reducir el tiempo de respuesta
  const [
    pisos, 
    sanitarios, 
    griferia, 
    adhesivos, 
    calentadores, 
    { products: newProducts }, 
    { products: mostSellers },
    { posts },
    banners,
    bannersInHome
  ] = await Promise.all([
    fetchProductsInPromo({ order: ProductOrderEnum.Desc, per_page: 8, category_name: 'pisos-y-azulejos' }),
    fetchProductsInPromo({ order: ProductOrderEnum.Desc, per_page: 8, category_name: 'sanitarios-sanitarios' }),
    fetchProductsInPromo({ order: ProductOrderEnum.Desc, per_page: 8, category_name: 'griferia' }),
    fetchProductsInPromo({ order: ProductOrderEnum.Desc, per_page: 8, category_name: 'adhesivos' }),
    fetchProductsInPromo({ order: ProductOrderEnum.Desc, per_page: 8, category_name: 'calentadores' }),
    fetchProducts({ where: { offsetPagination: { size: 6, offset: 0 }, orderby: [{ field: ProductsOrderByEnum.Date, order: OrderEnum.Desc }], isExclude: false } }),
    fetchProducts({ where: { offsetPagination: { size: 6, offset: 0 }, orderby: [{ field: ProductsOrderByEnum.TotalSales, order: OrderEnum.Desc }] } }),
    fetchPosts({ where: { offsetPagination: { size: 3, offset: 0 } } }),
    fetchSliderHome(),
    fetchBannersHome()
  ]);

  return {
    props: {
      productsInPromoPisos: pisos,
      productsInPromoSanitarios: sanitarios,
      productsInPromoGriferia: griferia,
      productsInPromoAdhesivos: adhesivos,
      productsInPromoCalentadores: calentadores,
      newProducts,
      mostSellers,
      banners,
      bannersInHome,
      posts,
    },
    revalidate: 3600, // Aumentamos a 1 hora para estabilidad
  };
}

export default Home;
