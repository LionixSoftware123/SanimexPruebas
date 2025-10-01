import React from 'react';
import dynamic from 'next/dynamic';

const Product = dynamic(() => import('@/components/product/Product'));

const BestSellersTwo: React.FC = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[1200px]">
        <div className="flex justify-between items-center mb-4">
          <div className="text-[30px] font-Century-Gothic-Bold">
            Más vendidos
          </div>
          <div className="text-[#006FDC] text-[15px] font-Century-Gothic-Bold">
            Ver todos
          </div>
        </div>
        <div className="grid grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Product key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellersTwo;
