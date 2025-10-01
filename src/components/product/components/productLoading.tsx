import React from 'react';
import dynamic from 'next/dynamic';
const LoadingLine = dynamic(() => import('@/components/utils/LoadingLine'));
const ProductLoading: React.FC = () => {
  return (
    <div className=" animate-pulse border border-[#F3F3F3] h-[470px] relative">
      <div className="p-4">
        <div className="w-full  mb-3 z-0">
          <LoadingLine wClass="w-full" hClass="h-[222px]" />
        </div>
        <div className="">
          <div className=" mb-3 h-[20px] flex items-center">
            <LoadingLine wClass="w-full" />
          </div>
          <div className=" mb-3 h-[70px]">
            <LoadingLine wClass="w-full" />
          </div>
          <div>
            <LoadingLine wClass="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLoading;
