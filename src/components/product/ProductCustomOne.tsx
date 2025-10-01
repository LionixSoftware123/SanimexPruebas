import React, { useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  calculateProductCustomDiscount,
  getPercentDiscount,
} from '@/modules/product/product-utils';
import currencyFormatter from 'currency-formatter';
import dynamic from 'next/dynamic';
import { useEvent } from '@cobuildlab/react-simple-state';
import { renderTopBannerEvent } from '@/modules/banner/banner-events';
import { ProductCustom } from '@/modules/product/product-types';
import ProductCompare from '../utils/ProductCompare';
import EcologicalProductIcon from '../utils/EcologicalProductIcon';

const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
const FavoriteComponent = dynamic(
  () => import('@/components/utils/ProductFavoriteCustom'),
);

type ProductCustomOneProps = {
  product?: ProductCustom;
  isPromo?: boolean;
};

type ExtendedProductCustom = ProductCustom & {
  databaseId: number;
  categories: string[];
};

const ProductCustomOne: React.FC<ProductCustomOneProps> = ({
  product,
  isPromo = false,
}) => {
  const { topBanner } = useEvent(renderTopBannerEvent);

  const discount = useMemo(
    () => calculateProductCustomDiscount(product),
    [product],
  );

  const priceDiscount = useMemo(() => {
    return getPercentDiscount(
      currencyFormatter.unformat(
        (product?.regularPrice || product?.price) as string,
        { code: 'USD' },
      ),
      discount,
    );
  }, [product, discount]);

  const isEcological = useCallback(
    (product: ExtendedProductCustom): boolean => {
      return (
        product?.categories?.some(
          (category: string) => category === 'ecologico',
        ) || false
      );
    },
    [],
  );

  const productIsEcological = useMemo(
    () => isEcological(product as ExtendedProductCustom),
    [product, isEcological],
  );

  console.log('product pricing', product);

  return (
    <div className="border border-[#F3F3F3] h-[400px] relative">
      <div className="p-4">
        <div className="relative w-full h-[222px] mb-3 z-0">
          <Link href={`/productos/${product?.slug}`}>
            <ImageWithFallback
              fill
              style={{ objectFit: 'contain' }}
              src={product?.featuredImage as string}
              alt={product?.name as string}
            />
          </Link>
          <div className="absolute left-0 ml-[5px] mt-[5px]">
            {priceDiscount && topBanner && (
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
            )}
          </div>

          <div className="absolute right-0 mr-[5px] mt-[5px]">
            <FavoriteComponent product={product as any} />
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
        <div className="px-[22px]">
          <div className="font-Century-Gothic-Bold text-[#0071CE] text-[12px] mb-3">
            {product?.marca}
          </div>
          <div className="font-Century-Gothic text-[#999999] text-[18px] mb-3 h-[54px]">
            <Link href={`/productos/${product?.slug}`}>
              <div className="line-clamp-2">{product?.name}</div>
            </Link>
          </div>
          <div>
            {product?.price !== product?.regularPrice ? (
              <>
                <span className="font-Century-Gothic line-through">
                  ${product?.regularPrice}
                </span>{' '}
                <span
                  className="font-Century-Gothic-Bold"
                  style={{ color: topBanner?.color as string }}
                >
                  ${product?.price}
                </span>
              </>
            ) : isPromo ? (
              <span
                className="font-Century-Gothic-Bold"
                style={{ color: topBanner?.color as string }}
              >
                {product?.price}
              </span>
            ) : (
              <span className="font-Century-Gothic-Bold">{product?.price}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomOne;
