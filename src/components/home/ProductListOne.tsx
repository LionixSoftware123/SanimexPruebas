import React from 'react';
import dynamic from 'next/dynamic';
import { Product as ProductType } from '@/utils/types/generated';

const ViewMoreButton = dynamic(
  () => import('@/components/utils/ViewMoreButton'),
);
const Product = dynamic(() => import('@/components/product/Product'));

type ProductListOneProps = {
  products?: ProductType[];
};

const ProductListOne: React.FC<ProductListOneProps> = ({ products = [] }) => {
  return (
    <div className="grid ">
      <div className="mb-4 text-[30px] text-[#333E48] font-Century-Gothic-Bold">
        Más vendidos
      </div>
      <div className="grid">
        <div className="grid grid-cols-6 w-[1900px] gap-2 md:w-full md:grid-cols-3">
          {products.map((product, i) => (
            <Product key={i} product={product} />
          ))}
        </div>
      </div>
      <div className=" flex justify-center">
        <div className="inline-flex my-4">
          <ViewMoreButton />
        </div>
      </div>
    </div>
  );
};

export default ProductListOne;
