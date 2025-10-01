import React from 'react';
import dynamic from 'next/dynamic';
const CartDetailsLoading = dynamic(
  () => import('@/components/cart/components/CardDetailsLoading'),
);
const CartItemLoading = dynamic(
  () => import('@/components/cart/components/CardItemLoading'),
);
const LoadingLine = dynamic(() => import('@/components/utils/LoadingLine'));
const CartLoading: React.FC = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-full md:col-span-9 overflow-x-auto ">
          <div className="grid  grid-cols-12 w-[850px] lg:w-full pb-4">
            <div className="col-span-full grid grid-cols-12 py-6 border-[#C1C1C1] border-b">
              <div className="col-span-5">
                <div className="flex justify-center">
                  <LoadingLine wClass="w-[100px]" hClass="h-4" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex justify-center">
                  <LoadingLine wClass="w-[100px]" hClass="h-4" />
                </div>
              </div>
              <div className="col-span-2 text-center">
                <div className="flex justify-center">
                  <LoadingLine wClass="w-[100px]" hClass="h-4" />
                </div>
              </div>
              <div className="col-span-2 text-center">
                <div className="flex justify-center">
                  <LoadingLine wClass="w-[100px]" hClass="h-4" />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <CartItemLoading />
            </div>
          </div>
        </div>
        <div className="col-span-full md:col-span-3">
          <CartDetailsLoading />
        </div>
      </div>
    </div>
  );
};

export default CartLoading;
