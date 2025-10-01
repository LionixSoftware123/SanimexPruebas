import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useProductCompareHook } from '@/lib/easysearch/product-compare-hooks';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { ProductIdTypeEnum } from '@/utils/types/generated';
import { ProductCustom } from '@/modules/product/product-types';
import ArrowLeft from '@/images/arrow-left.svg';
import ArrowRight from '@/images/arrow-right.svg';
import { fetchProduct } from '@/modules/product/product-actions';
import { useMediaQuery } from 'react-responsive';

import ProductSliderItem from '@/components/utils/ProductSliderItem';
import CompareProductSkeleton from '@/components/skeleton/CompareProductSkeleton';

type ExtendedProductCustom = ProductCustom & {
  title: string;
  databaseId: number;
  external_id: number;
  objectID: string;
  galleryImages: {
    edges: [
      {
        node: {
          sourceUrl: string;
        };
      },
    ];
  };
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  product_image: string;
  attributes: {
    nodes: [
      {
        terms: any;
        name: string;
      },
    ];
  };
};

type ComparePageProps = {
  product?: ExtendedProductCustom;
  onSuccessFavorite?: any;
};

const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));

const ComparePage: React.FC<ComparePageProps> = ({ onSuccessFavorite }) => {
  const router = useRouter();
  const { dispatch } = useProductCompareHook();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const scrollableDiv = document.getElementById('scrollableDiv');
    const scrollLeftButton = document.getElementById('scrollLeft');
    const scrollRightButton = document.getElementById('scrollRight');

    if (scrollableDiv && scrollLeftButton && scrollRightButton) {
      scrollLeftButton.addEventListener('click', () => {
        scrollableDiv.scrollLeft -= scrollableDiv.offsetWidth;
      });

      scrollRightButton.addEventListener('click', () => {
        scrollableDiv.scrollLeft += scrollableDiv.offsetWidth;
      });
    }
  }, []);

  const SlideNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div className="h-12 w-12 bg-[#1c355e] flex justify-center items-center lg:fixed absolute z-10 right-2 lg:top-[50%] top-[-50px] cursor-pointer ">
        <ArrowRight
          onClick={onClick}
          style={{
            width: '15px',
            height: '10px',
          }}
        />
      </div>
    );
  };

  const SlidePrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div className="h-12 w-12 bg-[#1c355e] flex justify-center items-center lg:fixed absolute z-10 left-2 lg:top-[50%] top-[-50px] cursor-pointer ">
        <ArrowLeft
          onClick={onClick}
          style={{
            width: '10px',
            height: '10px',
          }}
        />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SlideNextArrow />,
    prevArrow: <SlidePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
        },
      },
    ],
  };

  const handleRemove = (product: any) => {
    if (product) {
      dispatch({
        type: 'REMOVE_PRODUCT',
        productId: Number(
          product.databaseId || product.external_id || product.objectID,
        ),
      });
      setProducts((prevProducts) =>
        prevProducts.filter(
          (p: any) =>
            p.databaseId !== product.databaseId &&
            p.external_id !== product.external_id &&
            p.objectID !== product.objectID,
        ),
      );
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const storedData = JSON.parse(
          localStorage.getItem('compareProducts') || '{}',
        );
        const productIds = storedData.products || [];

        const fetchedProducts = await Promise.all(
          productIds.map((product: ExtendedProductCustom) =>
            fetchProduct({
              id: Number(
                product?.databaseId ||
                  product?.external_id ||
                  product?.objectID ||
                  product?.id,
              ) as any,
              idType: ProductIdTypeEnum.DatabaseId,
            }),
          ),
        );
        setProducts(fetchedProducts as any);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const productswithoutNull = products.filter(
    (product: ExtendedProductCustom) =>
      (product !== null && product?.external_id) ||
      product?.databaseId ||
      product?.objectID ||
      product?.id,
  );

  return (
    <RootLayout>
      <StaticMeta
        title={'Comparar Productos'}
        description={'Comparar Productos'}
        asPath={router.asPath}
        image="/src/images/logo-gam.svg"
      />
      <div>
        <div className="grid grid-cols-12 md:grid-cols-3 mb-[20px]">
          <div className="col-span-full mt-12">
            <div className="flex justify-center my-8 text-[25px] text-[#333E48] font-Century-Gothic-Bold">
              <div className="flex flex-col justify-center">
                <h2>Comparación de Productos</h2>
                {products.length > 1 ? (
                  <Link prefetch={false} href="/">
                    <span className="mx-auto flex justify-center text-sm mt-4 text-[#1c355e]">
                      Volver a Inicio
                    </span>
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="mt-5 mx-0 px-0">
              {isLoading ? (
                <div className="flex  justify-center">
                  <div className="grid grid-cols-12 mx-auto justify-center">
                    {[...Array(isMobile ? 1 : 3)].map((_, i) => (
                      <div
                        key={i}
                        className="lg:col-span-4 md:col-span-6 col-span-12  border border-[#f7f7f7] mx-2"
                      >
                        <CompareProductSkeleton />
                      </div>
                    ))}
                  </div>
                </div>
              ) : productswithoutNull && productswithoutNull.length > 1 ? (
                <>
                  <div className=" mb-6 mx-auto rounded lg:ml-4  lg:mr-4 px-0 h-full lg:pl-12 lg:pr-12 ">
                    <div className="block mx-auto justify-center max-w-[1200px]">
                      <Slider {...settings}>
                        {productswithoutNull.map(
                          (product: ExtendedProductCustom, index: number) => (
                            <ProductSliderItem
                              key={
                                product?.databaseId ||
                                product?.external_id ||
                                index.toString()
                              }
                              product={product as any}
                              index={index}
                              handleRemove={handleRemove}
                              onSuccessFavorite={onSuccessFavorite}
                            />
                          ),
                        )}
                      </Slider>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {!isLoading && products.length < 2 ? (
                <div className="mx-auto flex flex-col justify-center items-center  text-[#000] my-40">
                  <span className="mx-auto flex justify-center items-center text-center text-sm mt-4 text-[#000] text-[1rem] font-bold">
                    Agrega 2 o más productos para poder comparar
                  </span>
                  <div className="flex justify-center mx-auto mt-4">
                    <button className="rounded-[5px] bg-[#0033A1]  justify-center  w-[200px] lg:min-w-[200px] h-[45px] lg:h-[45px] flex items-center text-white text-[11px] px-4">
                      <Link prefetch={false} href="/productos">
                        <span className="mx-auto flex justify-center text-sm  text-[#fff] font-bold">
                          Ver Productos
                        </span>
                      </Link>
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default ComparePage;
