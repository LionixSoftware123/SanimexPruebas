import React from 'react';
import dynamic from 'next/dynamic';

const ProductTwo = dynamic(() => import('@/components/product/ProductTwo'));

const NewProducts: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3 flex justify-between items-center">
        <div className="text-[30px] font-Century-Gothic-Bold">Lo más nuevo</div>
        <div className="text-[#006FDC] text-[15px] font-Century-Gothic-Bold">
          Ver todos
        </div>
      </div>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <ProductTwo key={i} />
      ))}
    </div>
  );
};

export default NewProducts;
