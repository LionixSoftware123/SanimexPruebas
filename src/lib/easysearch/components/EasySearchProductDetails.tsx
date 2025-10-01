import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ImageWithFallback from '@/utils/ImageWithFallback';
import { getPercentDiscount } from '@/modules/product/product-utils';
import { useEvent } from '@cobuildlab/react-simple-state';
import { renderTopBannerEvent } from '@/modules/banner/banner-events';
import currencyFormatter from 'currency-formatter';
import { IProduct } from '@/lib/easysearch/types/generated';
import { calculateEasySearchProductCustomDiscount } from '../easysearch-utils';
import EasySearchFavorite from './EasySearchFavorite';
import EasySearchProductCompare from './EasySearchProductCompare';
import { Product } from '@/utils/types/generated';

type ProductCustomProps = {
  product: IProduct;
};

const EasySearchProductDetails: React.FC<ProductCustomProps> = ({
  product,
}) => {
  const discount = calculateEasySearchProductCustomDiscount(product);
  const priceDiscount = getPercentDiscount(
    product?.regular_price ?? product?.price ?? 0,
    discount,
  );
  const { topBanner } = useEvent(renderTopBannerEvent);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const [brandName] = product.brands || [];

  return (
    <>
      <div
        className="border w-[310px]  mx-4 lg:mx-0 lg:w-[290px] border-[#F3F3F3] h-[487px] relative "
        style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
      >
        <div>
          <div className="relative w-full h-[309px] mb-2 z-0">
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
            <div className="absolute left-0 ml-[5px] mt-[5px]">
              {priceDiscount && topBanner ? (
                <div className="flex space-x-2">
                  <div
                    className="text-white text-[12px] min-w-[50px] text-center h-[20px] px-[5px]"
                    style={{
                      backgroundColor: 'black',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    - {priceDiscount}%
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col px-4">
            <div
              className="line-clamp-3 text-[24px] text-black border-b pb-2 border-1 border-[#666]"
              style={{ fontFamily: 'Montserrat', fontWeight: '600' }}
            >
              {brandName}
            </div>
            <Link href={`/productos/${product?.slug}`}>
              <div
                className="line-clamp-2 text-[16px]  pt-2 h-[60px] font-Century-Gothic text-[#999999] mb-3"
                style={{ fontFamily: 'Montserrat', fontWeight: '400' }}
              >
                {product?.name}
              </div>
            </Link>
            <div className="flex h-full justify-between items-end ml-[-7px] mr-[-7px]">
              <div className="flex justify-start">
                {product?.price !== product?.regular_price ? (
                  <>
                    <span
                      className="line-through text-[20px] mt-1 pt-[1px] text-[#999] w-auto h-[29px] mx-[5px]"
                      style={{
                        fontFamily: 'Montserrat',
                        fontWeight: '500',
                        letterSpacing: '-0.04em',
                      }}
                    >
                      {product.regular_price
                        ? currencyFormatter.format(product.regular_price, {
                            code: 'USD',
                          })
                        : ''}
                    </span>
                    <span
                      className="text-[20px] mt-1 text-black pt-[1px]  w-auto h-[29px] "
                      style={{
                        fontFamily: 'Montserrat',
                        fontWeight: '500',
                        letterSpacing: '-0.04em',
                      }}
                    >
                      {product.price
                        ? currencyFormatter.format(product.price, {
                            code: 'USD',
                          })
                        : ''}
                    </span>
                  </>
                ) : (
                  <span
                    className="text-[20px] text-[#999]  w-[132px] h-[29px]  mr-1"
                    style={{ fontFamily: 'Montserrat', fontWeight: '500' }}
                  >
                    {product.price
                      ? currencyFormatter.format(product.price, {
                          code: 'USD',
                        })
                      : ''}
                  </span>
                )}
              </div>
              <div
                className="flex flex-col justify-between  h-5 w-8   items-center cursor-pointer"
                onClick={handleToggleModal}
              >
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
              </div>
              {isOpen && (
                <div
                  ref={menuRef as LegacyRef<HTMLDivElement>}
                  className="absolute bottom-16 right-8 w-[146px] h-[152px]  flex items-center justify-center 
                z-10"
                >
                  <div className="bg-black text-white p-4 montserrat-regular">
                    <div className="block gap-2">
                      <div className="flex flex-row gap-2  justify-start cursor-pointer">
                        <EasySearchFavorite product={product} />
                      </div>
                      <div className="flex flex-row py-2 gap-2  justify-start cursor-pointer">
                        <EasySearchProductCompare
                          product={product as Product}
                        />{' '}
                        a
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EasySearchProductDetails;
