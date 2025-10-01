import React from 'react';
import dynamic from 'next/dynamic';

const ProductLoading = dynamic(
  () => import('@/components/product/components/productLoading'),
);

const ProductsLoading: React.FC = () => {
  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-3 mb-[20px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((key) => (
          <ProductLoading key={key} />
        ))}
      </div>
    </div>
  );
};
export default ProductsLoading;
