import React from 'react';

import {
  calculateProductCustomDiscount,
  getPercentDiscount,
} from '@/modules/product/product-utils';
import currencyFormatter from 'currency-formatter';
import Link from 'next/link';
import { useEvent } from '@cobuildlab/react-simple-state';
import { renderTopBannerEvent } from '@/modules/banner/banner-events';
import { ProductCustom } from '@/modules/product/product-types';
import dynamic from 'next/dynamic';
import FavoriteComponent from '../utils/Favorite';
import ProductCompare from '../utils/ProductCompare';
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));

type ProductFiveProps = {
  showColors?: boolean;
  product?: ProductCustom;
  onSuccessFavorite?: (favorites: number[]) => void;
};

const ProductCustomFive: React.FC<ProductFiveProps> = ({
  showColors = true,
  product,
  onSuccessFavorite,
}) => {
  const { topBanner } = useEvent(renderTopBannerEvent);

  const discount = calculateProductCustomDiscount(product);
  const priceDiscount = getPercentDiscount(
    currencyFormatter.unformat(
      (product?.regularPrice || product?.price) as string,
      {
        code: 'USD',
      },
    ),
    discount,
  );
  return (
    <div className="flex flex-col border border-[#F3F3F3] h-[400px] relative mb-4">
      <div className="p-4">
        <div className="relative w-full h-[222px] mb-3 z-0">
          <Link   href={`/productos/${product?.slug}`}>
            <ImageWithFallback
              fill
              style={{
                objectFit: 'contain',
              }}
              src={product?.featuredImage as string}
              alt={product?.name as string}
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

          <div className="absolute right-0 mr-[0px] mt-[5px]">
            <FavoriteComponent
              product={product as any}
              onSuccess={onSuccessFavorite}
            />
            <div className="mt-1">
              <ProductCompare product={product as any} />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 flex justify-between pb-2 flex-col h-full">
        <div className="font-Century-Gothic text-[16px] h-[54px]">
          <div className="line-clamp-2">{product?.name}</div>
        </div>
        <div className="mb-2 flex  ">
          {product?.price !== product?.regularPrice ? (
            <div>
              <span className="font-Century-Gothic line-through">
                {product?.regularPrice}
              </span>{' '}
              <span
                className=" font-Century-Gothic-Bold"
                style={{ color: topBanner?.color as string }}
              >
                {product?.price}
              </span>
            </div>
          ) : (
            <span className="font-Century-Gothic-Bold">{product?.price}</span>
          )}
        </div>
        {showColors && (
          <div className="flex">
            <div className="border-[#707070] border h-[16px] w-[16px] bg-black mr-2 rounded-full"></div>
            <div className="border-[#707070] border h-[16px] w-[16px] bg-[#C9C9C9] rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCustomFive;
