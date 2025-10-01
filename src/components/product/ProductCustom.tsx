import React from 'react';
import Link from 'next/link';

import {
  calculateProductCustomDiscount,
  getPercentDiscount,
} from '@/modules/product/product-utils';
import dynamic from 'next/dynamic';
import { useEvent } from '@cobuildlab/react-simple-state';
import { renderTopBannerEvent } from '@/modules/banner/banner-events';
import { ProductCustom } from '@/modules/product/product-types';
import currencyFormatter from 'currency-formatter';
import EcologicalProductIcon from '../utils/EcologicalProductIcon';

const FavoriteComponent = dynamic(
  () => import('@/components/utils/ProductFavoriteCustom'),
);
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));

type ExtendedProductCustom = ProductCustom & {
  databaseId: number;
};

type ProductCustomProps = {
  product?: ExtendedProductCustom;
  onSuccessFavorite?: (favorites: number[]) => void;
  isPromo?: boolean;
};

const ProductCompare = dynamic(
  () => import('@/components/utils/ProductCompare'),
);

const ProductCustomComponent: React.FC<ProductCustomProps> = ({
  product,
  isPromo = false,
  onSuccessFavorite,
}) => {
  const discount = calculateProductCustomDiscount(product);
  const priceDiscount = getPercentDiscount(
    currencyFormatter.unformat(
      ((product as ProductCustom)?.regularPrice || product?.price) as string,
      {
        code: 'USD',
      },
    ),
    discount,
  );

  function formatPriceMts(price: string, product: any): string | null {
    const priceNumber = price
      ? Number(price.replace(/,/g, '').replace(/\$/g, ''))
      : 0;
    const paCajaAttribute = product?.attributes['pa_caja'];
    const divisorString = paCajaAttribute?.options[0]?.name;
    const divisor = Number(divisorString);

    if (!priceNumber || isNaN(divisor) || divisor === 0) {
      return null;
    }

    const priceFinal = priceNumber / divisor;
    return !isNaN(priceFinal) && priceFinal !== Infinity
      ? `$${priceFinal.toFixed(2)}`
      : null;
  }

  const { topBanner } = useEvent(renderTopBannerEvent);
  const isEcological = (product: ProductCustom): boolean => {
    return (
      product?.categories?.some(
        (category: string) => category === 'ecologico',
      ) || false
    );
  };

  const productIsEcological = isEcological(product as ProductCustom);
  const isFloorAndWalls = (product: ProductCustom): boolean => {
    const floorAndWallsCategories = [
      'pisos-y-azulejos',
      'nacionales',
      'muro',
      'piedra',
      'mallas',
    ];
    return (
      product?.categories?.some((category) =>
        floorAndWallsCategories.includes(category),
      ) || false
    );
  };

  const productIsFloorAndWalls = isFloorAndWalls(product as ProductCustom);

  const resultadoPrecioBase = product?.price
    ? formatPriceMts(product.price as string, product)
    : 'Precio no disponible';

  const resultadoPrecio =
    productIsFloorAndWalls && resultadoPrecioBase
      ? `${resultadoPrecioBase} m²`
      : product?.price;

  return (
    <div className="border border-[#F3F3F3] h-[410px] max-h-[430px] relative">
      <div className="p-4 ">
        <div className="relative w-full h-[222px] mb-3 z-0">
          <Link href={`/productos/${product?.slug}`}>
            <ImageWithFallback
              fill
              style={{
                objectFit: 'contain',
              }}
              src={(product as any)?.featuredImage}
              alt={(product as any)?.name as string}
            />
          </Link>

          <div className=" absolute left-0 ml-[5px] mt-[5px]">
            {priceDiscount && topBanner ? (
              <div className="flex space-x-2">
                <div
                  className="text-white text-[12px] rounded min-w-[50px] text-center h-[20px] px-[5px]"
                  style={{ backgroundColor: topBanner.color as string }}
                >
                  - {priceDiscount}%
                </div>
                <div
                  className="text-white text-[12px] rounded min-w-[30px] text-center h-[20px] px-[5px]"
                  style={{ backgroundColor: topBanner.color as string }}
                >
                  MSI
                </div>
              </div>
            ) : null}
          </div>
          <div className="absolute right-0 mr-[0px] mt-[5px]  h-full">
            <FavoriteComponent
              product={product as ExtendedProductCustom}
              onSuccess={onSuccessFavorite}
            />
            <div className="mt-1">
              <ProductCompare product={product as any} />
            </div>
            <div className="absolute bottom-0">
              {productIsEcological && (
                <div>
                  <EcologicalProductIcon isCategory={true} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className="font-bold text-[#0071CE] text-[12px] mb-3 h-[20px] flex items-center"
            dangerouslySetInnerHTML={{
              __html: product?.marca as string,
            }}
          ></div>
          <div className="h-[80px] font-Century-Gothic text-[#999999] text-[18px] mb-1 ">
            {product?.slug && (
              <Link href={`/productos/${product?.slug}`}>
                <div className="line-clamp-2">{product?.name}</div>
              </Link>
            )}
          </div>
          <div className="flex h-full  items-end">
            {product?.price !== product?.regularPrice ? (
              <>
                <span className="font-bold line-through mr-2">
                  {product?.regularPrice}{' '}
                </span>
                <span
                  className="font-bold"
                  style={{ color: topBanner?.color as string }}
                >
                  {resultadoPrecio}
                </span>
              </>
            ) : isPromo ? (
              <span
                className="font-bold "
                style={{ color: topBanner?.color as string }}
              >
                {product?.price}{' '}
              </span>
            ) : (
              <span className="font-bold">{product?.price} </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomComponent;
