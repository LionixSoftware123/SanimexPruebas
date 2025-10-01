import React from 'react';
import dynamic from 'next/dynamic';

const Product = dynamic(() => import('@/components/product/Product'));

const Promotions: React.FC = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[1200px]">
        <div className="flex justify-between mb-4">
          <div className="text-[30px] font-Century-Gothic-Bold">
            Las mejores promociones
          </div>
          <div className="flex justify-between items-center">
            <div className="bg-[#F7F7F7] font-Century-Gothic-Bold p-2 uppercase rounded-full text-center w-[52px] mr-2">
              <div>21</div>
              <div className="text-[8px]">Horas</div>
            </div>
            <div className="bg-[#F7F7F7] font-Century-Gothic-Bold p-2 uppercase rounded-full text-center w-[52px] mr-2">
              <div>50</div>
              <div className="text-[8px]">Mins</div>
            </div>
            <div className="bg-[#F7F7F7] font-Century-Gothic-Bold p-2 uppercase rounded-full text-center w-[52px] mr-2">
              <div>39</div>
              <div className="text-[8px]">Segs</div>
            </div>
            <div className="text-[#006FDC] text-[15px] font-Century-Gothic-Bold">
              Ver todos
            </div>
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

export default Promotions;
