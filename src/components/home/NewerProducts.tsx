import React from 'react';
import dynamic from 'next/dynamic';

import Slider from '@/components/slider/Slider';
import { Product as ProductType } from '@/utils/types/generated';

const Product = dynamic(() => import('@/components/product/Product'));

type NewerProductsProps = {
  products?: ProductType[];
};

const NewerProducts: React.FC<NewerProductsProps> = ({ products = [] }) => {
  const items: React.ReactNode[] =
    products && products.length > 0
      ? products
          .filter((product) => !product?.isExclude)
          .map((product, i) => <Product key={i} product={product} />)
      : [];

  return (
    <div className="w-full mb-2 md:mb-10 ">
      <div className="">
        <div className=" mb-2">
          <div className="grid grid-cols-4">
            <div className="col-span-full text-[30px] text-[#333E48] font-Century-Gothic-Bold mb-[20px]">
              Lo más nuevo
            </div>

            <div className="min-h-[380px] col-span-full">
              {items.length ? (
                <div>
                  <Slider items={items} controls onlyOne={false} />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  No hay promociones disponibles para esta categoría
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewerProducts;
