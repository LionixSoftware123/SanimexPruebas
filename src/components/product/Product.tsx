import React from 'react';
import Link from 'next/link';
import {
  Product as ProductType,
  SimpleProduct,
  ProductTypesEnum,
} from '@/utils/types/generated';

import {
  calculateDiscount,
  getPercentDiscount,
  getProductBrand,
} from '@/modules/product/product-utils';
import dynamic from 'next/dynamic';
import { useEvent } from '@cobuildlab/react-simple-state';
import { renderTopBannerEvent } from '@/modules/banner/banner-events';
import currencyFormatter from 'currency-formatter';
import ProductCompare from '../utils/ProductCompare';
import EcologicalProductIcon from '../utils/EcologicalProductIcon';

const FavoriteComponent = dynamic(() => import('@/components/utils/Favorite'));
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
type ProductProps = {
  product?: ProductType;
  onSuccessFavorite?: (favorites: number[]) => void;
};

type ExtendedProductCustom = ProductType & {
  databaseId: number;
  categories: string[];
  productCategories: string[];
  regularPrice: string;
};

const Product: React.FC<ProductProps> = ({ product, onSuccessFavorite }) => {
  const discount = calculateDiscount(product);
  const { topBanner } = useEvent(renderTopBannerEvent);
  const regularPrice =
    (product as SimpleProduct)?.type === ProductTypesEnum.Variable
      ? (product as SimpleProduct).regularPrice?.split(' - ')[1]
      : (product as SimpleProduct)?.regularPrice;

  const price =
    (product as SimpleProduct)?.type === ProductTypesEnum.Variable
      ? (product as SimpleProduct).price?.split(' - ')[0]
      : (product as SimpleProduct)?.price;

  const priceDiscount = getPercentDiscount(
    currencyFormatter.unformat(
      (regularPrice ?? (product as any)?.regularPrice) as string,
      {
        code: 'USD',
      },
    ),
    discount,
  );

  const Discountprice = priceDiscount < 0 ? priceDiscount + 100 : priceDiscount;

  const isEcological = (product: ExtendedProductCustom): boolean => {
    return (
      product?.categories?.some(
        (category: string) => category === 'ecologico',
      ) || false
    );
  };

  const productIsEcological = isEcological(product as ExtendedProductCustom);

  function formatPriceMts(price: string, product: any): string | null {
    const priceNumber = price
      ? Number(price.replace(/,/g, '').replace(/\$/g, ''))
      : 0;
    const cajaMetrosNode = product?.attributes?.nodes?.find(
      (node: any) => (node as any)?.name === 'Caja (metros)',
    )?.options[0];
    const divisorString = parseFloat(cajaMetrosNode?.replace(/-/g, '.'));
    const divisor = Number(divisorString);

    if (!priceNumber || isNaN(divisor) || divisor === 0) {
      return null;
    }

    const priceFinal = priceNumber / divisor;
    return !isNaN(priceFinal) && priceFinal !== Infinity
      ? `$${priceFinal.toFixed(2)}`
      : null;
  }

  const isFloorAndWalls = (product: ExtendedProductCustom): boolean => {
    const floorAndWallsCategories = [
      'pisos-y-azulejos',
      'nacionales',
      'muro',
      'piedra',
      'mallas',
    ];
    return (
      product?.productCategories.edges
        ?.map((edge: any) => edge.node.slug)
        ?.some((category: string) =>
          floorAndWallsCategories.includes(category),
        ) || false
    );
  };

  const productIsFloorAndWalls = isFloorAndWalls(product as any);

  const resultadoPrecioBase = formatPriceMts(price as string, product);
  const resultadoPrecio =
    productIsFloorAndWalls && resultadoPrecioBase
      ? `${resultadoPrecioBase} m²`
      : resultadoPrecioBase;

  return (
    <div className="border border-[#F3F3F3] h-[390px] relative">
      <div className="p-4 ">
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
            {discount && topBanner ? (
              <div className="flex space-x-2">
                {Discountprice > 0 && (
                  <div
                    className="text-white text-[12px] rounded min-w-[50px] text-center h-[20px] px-[5px]"
                    style={{ backgroundColor: topBanner.color as string }}
                  >
                    - {Discountprice}%
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
              {productIsEcological && (
                <div>
                  <EcologicalProductIcon isCategory={true} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="font-Century-Gothic-Bold text-[#0071CE] text-[12px] mb-3 h-[20px] flex items-center">
            {getProductBrand(product)}
          </div>
          <div className="h-[50px] font-Century-Gothic text-[#999999] text-[18px] mb-3 ">
            <Link href={`/productos/${product?.slug}`}>
              <div className="line-clamp-2">{product?.name}</div>
            </Link>
          </div>
          <div className="flex h-full  items-end">
            {price !== regularPrice ? (
              <>
                <span className="font-Century-Gothic-Bold line-through mr-2">
                  {regularPrice ??
                    (product as ExtendedProductCustom)?.regularPrice}
                </span>
                <span
                  className="font-Century-Gothic-Bold"
                  style={{ color: topBanner?.color as string }}
                >
                  {resultadoPrecio ?? price}
                </span>
              </>
            ) : (
              <span className="font-Century-Gothic-Bold">{price}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
