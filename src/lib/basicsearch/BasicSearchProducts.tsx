import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEvent } from '@cobuildlab/react-simple-state';
import { renderTopBannerEvent } from '@/modules/banner/banner-events';
import currencyFormatter from 'currency-formatter';
import ProductCompare from '@/components/utils/ProductCompare';
import EcologicalProductIcon from '@/components/utils/EcologicalProductIcon';
import { getPercentDiscount } from '@/modules/product/product-utils';
import { BasicProduct } from './types';

const FavoriteComponent = dynamic(() => import('@/components/utils/Favorite'));
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));

export type Props = {
  product?: BasicProduct;
  onSuccessFavorite?: (favorites: number[]) => void;
};

const BasicSearchProducts: React.FC<Props> = ({
  product,
  onSuccessFavorite,
}) => {
  const { topBanner } = useEvent(renderTopBannerEvent);

  const isEcological = () => {
    return product?.categories?.includes('ecologico');
  };

  const brandNames =
    product?.brands?.map((brand: any) => brand).join(', ') || '';

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    const formattedPrice = currencyFormatter.format(numericPrice, {
      code: 'MXN',
    });
    return formattedPrice;
  };

  const discount = (price: string, regular_price: string, sale_price: string) => {
    const numericPrice = parseFloat(price);
    const numericRegular_price = parseFloat(regular_price);
    const numericSale_price = parseFloat(sale_price);

    if ((numericPrice !== numericRegular_price) && (numericSale_price > 0)) {
        return (numericRegular_price - numericPrice);
    } else {
       return 0;
    }
  };
  
  const priceDiscount = getPercentDiscount(
    product?.regular_price ?? product?.price ?? 0,
    discount(product?.price?.toString() as string, product?.regular_price?.toString() as string, product?.sale_price?.toString() as string),
  );  

  console.log('product', product);
  
  return (
    <div className="border border-[#F3F3F3] h-[390px] max-w-auto relative">
      <div className="p-4 ">
        <div className="relative w-full h-[222px] mb-3 z-0">
          <Link href={`/productos/${product?.slug}`}>
            <ImageWithFallback
              fill
              style={{
                objectFit: 'contain',
              }}
              src={product?.image_url as string}
              alt={product?.name as string}
            />
          </Link>
          <div className=" absolute left-0 ml-[5px] mt-[5px]">
            {priceDiscount && topBanner ? (
              <div className="flex space-x-2">
                {priceDiscount && (
                  <div
                    className="text-white text-[12px] rounded min-w-[50px] text-center h-[20px] px-[5px]"
                    style={{ backgroundColor: topBanner.color as string }}
                  >
                    - {priceDiscount}%
                  </div>
                )}

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
            <FavoriteComponent
              product={product}
              onSuccess={onSuccessFavorite}
            />
            <div className="mt-1">
              <ProductCompare product={product as any} />
            </div>
            <div className="absolute bottom-0">
              {isEcological() && (
                <div>
                  <EcologicalProductIcon isCategory={true} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="font-Century-Gothic-Bold text-[#0071CE] text-[12px] mb-3 h-[20px] flex items-center">
            {brandNames}
          </div>
          <div className="h-[50px] font-Century-Gothic text-[#999999] text-[18px] mb-3 ">
            <Link href={`/productos/${product?.slug}`}>
              <div
                className="line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: product?.name as string,
                }}
              ></div>
            </Link>
          </div>
          <div className="flex h-full items-end  gap-2">
            {product?.price !== product?.regular_price &&
            (product?.sale_price ?? 0) > 0 ? (
              <>
                <span className="font-Century-Gothic-Bold line-through mr-2">
                  {formatPrice(product?.regular_price?.toString() as string)}
                </span>
              </>
            ) : (
              <span className="font-Century-Gothic-Bold">
                {formatPrice(product?.price?.toString() as string)}
              </span>
            )}

            {product?.preciomts2 &&
            product?.parent_categories?.includes('pisos-y-azulejos') &&
            !product?.categories?.includes('mallas') ? (
              <span
                className="font-Century-Gothic-Bold"
                style={{ color: topBanner?.color as string }}
              >
                {formatPrice(product?.preciomts2?.toString() as string)} m
                <sup>2</sup>
              </span>
            ) : (
              <span
                className="font-Century-Gothic-Bold"
                style={{ color: topBanner?.color as string }}
              >
                {product?.price !== product?.regular_price &&
                (product?.sale_price ?? 0) > 0
                  ? formatPrice((product?.price ?? 0).toString())
                  : ''}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicSearchProducts;
