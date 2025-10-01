import React from 'react';
import { Product as ProductType, SimpleProduct } from '@/utils/types/generated';

import Link from 'next/link';
import {
  calculateDiscount,
  getPercentDiscount,
} from '@/modules/product/product-utils';
import currencyFormatter from 'currency-formatter';
import dynamic from 'next/dynamic';
import { useEvent } from '@cobuildlab/react-simple-state';
import { renderTopBannerEvent } from '@/modules/banner/banner-events';

const ProductColorDetails = dynamic(
  () => import('@/components/product/components/ProductColorDetails'),
);
const FavoriteComponent = dynamic(() => import('@/components/utils/Favorite'));
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
type ProductThreeProps = {
  showColors?: boolean;
  product?: ProductType;
};
const ProductThree: React.FC<ProductThreeProps> = ({
  showColors = true,
  product,
}) => {
  const { topBanner } = useEvent(renderTopBannerEvent);

  const discount = calculateDiscount(product);
  const priceDiscount = getPercentDiscount(
    currencyFormatter.unformat(
      (product as SimpleProduct).regularPrice as string,
      {
        code: 'USD',
      },
    ),
    discount,
  );

  return (
    <div className="border border-[#F3F3F3] h-[400px] relative mb-4">
      <div className="p-4">
        <div className="relative w-full h-[230px] z-0">
          <Link   href={`/productos/${product?.slug}`}>
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

          <div className="absolute right-0 mr-[5px] mt-[5px]">
            <FavoriteComponent product={product} />
          </div>
        </div>
      </div>
      <div className="px-4">
        <Link   href={`/productos/${product?.slug}`}>
          <div className="font-Century-Gothic text-[16px] h-[48px]">
            <div className="line-clamp-2">{product?.name}</div>
          </div>
        </Link>
        <div className="mb-2">
          {(product as SimpleProduct)?.price !==
          (product as SimpleProduct)?.regularPrice ? (
            <>
              <span className="font-Century-Gothic-Bold line-through">
                {(product as SimpleProduct)?.regularPrice}
              </span>{' '}
              <span
                className="font-Century-Gothic-Bold"
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
        {showColors && <ProductColorDetails product={product} />}
      </div>
    </div>
  );
};

export default ProductThree;
