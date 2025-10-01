import React from 'react';
import Link from 'next/link';
import { Product, SimpleProduct } from '@/utils/types/generated';

import {
  calculateDiscount,
  getPercentDiscount,
  getProductBrand,
} from '@/modules/product/product-utils';
import currencyFormatter from 'currency-formatter';
import dynamic from 'next/dynamic';
import { useEvent } from '@cobuildlab/react-simple-state';
import { renderTopBannerEvent } from '@/modules/banner/banner-events';
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
const FavoriteComponent = dynamic(() => import('@/components/utils/Favorite'));

type ProductOneProps = {
  product?: Product;
};
const ProductOne: React.FC<ProductOneProps> = ({ product }) => {
  const { topBanner } = useEvent(renderTopBannerEvent);
  const discount = calculateDiscount(product);
  const priceDiscount = getPercentDiscount(
    currencyFormatter.unformat(
      ((product as SimpleProduct).regularPrice ||
        (product as SimpleProduct).price) as string,
      {
        code: 'USD',
      },
    ),
    discount,
  );

  return (
    <div className="border border-[#F3F3F3] h-[400px] relative">
      <div className="p-4">
        <div className="relative w-full h-[222px] mb-3 z-0">
          <Link href={`/productos/${product?.slug}`}>
            <ImageWithFallback
              fill
              style={{
                objectFit: 'contain',
              }}
              src={product?.featuredImage?.node.sourceUrl as string}
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
                  - {priceDiscount} %
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

          <div className="absolute right-0 mr-[5px] mt-[5px]">
            <FavoriteComponent product={product} />
          </div>
        </div>
        <div className="px-[22px]">
          <div className="font-Century-Gothic-Bold text-[#0071CE] text-[12px] mb-3">
            {getProductBrand(product)}
          </div>
          <div className="font-Century-Gothic text-[#999999] text-[18px] mb-3 h-[54px]">
            <div className="line-clamp-2">{product?.name}</div>
          </div>
          <div>
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
        </div>
      </div>
    </div>
  );
};

export default ProductOne;
