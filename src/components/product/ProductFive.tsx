import React from 'react';
import { Product as ProductType, SimpleProduct } from '@/utils/types/generated';

import {
  calculateDiscount,
  getPercentDiscount,
} from '@/modules/product/product-utils';
import currencyFormatter from 'currency-formatter';
import Link from 'next/link';
import { useEvent } from '@cobuildlab/react-simple-state';
import { renderTopBannerEvent } from '@/modules/banner/banner-events';
import dynamic from 'next/dynamic';
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
type ProductFiveProps = {
  showColors?: boolean;
  product?: ProductType;
};
const ProductFive: React.FC<ProductFiveProps> = ({
  showColors = true,
  product,
}) => {
  const { topBanner } = useEvent(renderTopBannerEvent);

  const discount = calculateDiscount(product);
  const priceDiscount = getPercentDiscount(
    currencyFormatter.unformat((product as SimpleProduct).price as string, {
      code: 'USD',
    }),
    discount,
  );
  return (
    <div className="border border-[#F3F3F3] h-[400px] relative mb-4">
      <div className="p-4">
        <div className="flex justify-between w-full relative">
          {discount && topBanner ? (
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
          ) : (
            <div></div>
          )}
        </div>
        <div className="relative w-full h-[230px] mb-2 z-0">
          <Link href={'/productos/' + product?.slug}>
            <ImageWithFallback
              fill
              style={{
                objectFit: 'contain',
              }}
              src={product?.featuredImage?.node.sourceUrl as string}
              alt={product?.name as string}
            />
          </Link>
        </div>
      </div>
      <div className="px-4">
        <div className="font-Century-Gothic text-[16px] h-[54px]">
          {' '}
          <div className="line-clamp-2">{product?.name}</div>
        </div>
        <div className="mb-2">
          {(product as SimpleProduct)?.price !==
          (product as SimpleProduct)?.regularPrice ? (
            <>
              <span className="font-Century-Gothic line-through">
                {(product as SimpleProduct)?.regularPrice}
              </span>{' '}
              <span
                className=" font-Century-Gothic-Bold"
                style={{ color: topBanner?.color as string }}
              >
                {(product as SimpleProduct)?.price}
              </span>
            </>
          ) : (
            <span className="font-Century-Gothic-Bold">
              {(product as SimpleProduct)?.price}
            </span>
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

export default ProductFive;
