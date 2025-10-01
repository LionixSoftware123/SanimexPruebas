import React from 'react';
import Link from 'next/link';
import { getPercentDiscount } from '@/modules/product/product-utils';
import dynamic from 'next/dynamic';
import { useEvent } from '@cobuildlab/react-simple-state';
import { renderTopBannerEvent } from '@/modules/banner/banner-events';
import currencyFormatter from 'currency-formatter';
import ProductCompare from '@/components/utils/ProductCompare';
import EcologicalProductIcon from '@/components/utils/EcologicalProductIcon';
import { IProduct } from '@/lib/easysearch/types/generated';

const FavoriteComponent = dynamic(() => import('@/components/utils/Favorite'));
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));

const calculateDiscount = (product: IProduct | undefined | null): number => {
  if (!(product && product.price && product.regular_price)) return 0;

  const price = product.price;
  const regularPrice = product.regular_price;

  const currencyPrice = currencyFormatter.unformat(price as unknown as string, {
    code: 'MXN',
  });

  const currencyRegularPrice = currencyFormatter.unformat(
    regularPrice as unknown as string,
    { code: 'MXN' },
  );

  return currencyRegularPrice - currencyPrice;
};

export type Props = {
  product?: IProduct;
  onSuccessFavorite?: (favorites: number[]) => void;
};

const EasySearchProducts: React.FC<Props> = ({
  product,
  onSuccessFavorite,
}) => {
  const discount = calculateDiscount(product);

  const { topBanner } = useEvent(renderTopBannerEvent);

  const priceDiscount = getPercentDiscount(
    currencyFormatter.unformat(
      (product?.regular_price ?? (product as any)?.price) as string,
      {
        code: 'MXN',
      },
    ),
    discount,
  );

  const _discount = priceDiscount < 0 ? priceDiscount + 100 : priceDiscount;

  const isEcological = () => {
    return product?.categories?.includes('ecologico');
  };

  const [brandName] = product?.brands || [];

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    const formattedPrice = currencyFormatter.format(numericPrice, {
      code: 'MXN',
    });
    return formattedPrice;
  };

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
            {discount && topBanner ? (
              <div className="flex space-x-2">
                {_discount > 0 && (
                  <div
                    className="text-white text-[12px] rounded min-w-[50px] text-center h-[20px] px-[5px]"
                    style={{ backgroundColor: topBanner.color as string }}
                  >
                    - {_discount}%
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
          <div
            className="font-Century-Gothic-Bold text-[#0071CE] text-[12px] mb-3 h-[20px] flex items-center"
            dangerouslySetInnerHTML={{
              __html: `${brandName}`,
            }}
          ></div>
          <div className="h-[50px] font-Century-Gothic text-[#999999] text-[18px] mb-3 ">
            <Link href={`/productos/${product?.slug}`}>
              <div className="line-clamp-2">{product?.name}</div>
            </Link>
          </div>
          <div className="flex h-full items-end  gap-2">
            {product?.price !== product?.regular_price ? (
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
                {formatPrice(product?.price?.toString() as string)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasySearchProducts;
