import React from 'react';

const CartItemLoading: React.FC = () => {
  return (
    <div
      role="status"
      className="mx-2  grid grid-cols-12 pt-8 pb-4 border-[#C1C1C1] border-b items-center gap-4 mb-6"
    >
      <div className="col-span-5">
        <div className="grid grid-cols-3 items-center gap-4">
          <div>
            <div className="flex justify-center items-center relative w-[86px] h-[86px] m-auto bg-gray-200  dark:bg-gray-700"></div>
          </div>
          <div className="col-span-2 ">
            <div className="h-4 w-full bg-gray-200  dark:bg-gray-700 mb-2"></div>
            <div className="h-4 w-full bg-gray-200  dark:bg-gray-700 mb-2"></div>
            <div className="h-4 w-full bg-gray-200  dark:bg-gray-700 mb-2"></div>
          </div>
        </div>
      </div>
      <div className=" col-span-3">
        <div className="h-4 w-full bg-gray-200  dark:bg-gray-700 mb-2"></div>
        <div className="h-4 w-full bg-gray-200  dark:bg-gray-700 mb-2"></div>
        <div className="h-4 w-full bg-gray-200  dark:bg-gray-700 mb-2"></div>
      </div>
      <div className=" col-span-2">
        <div className="h-4 w-full bg-gray-200  dark:bg-gray-700 mb-2"></div>
        <div className="h-4 w-full bg-gray-200  dark:bg-gray-700 mb-2"></div>
        <div className="h-4 w-full bg-gray-200  dark:bg-gray-700 mb-2"></div>
      </div>
      <div className=" col-span-2">
        <div className="h-4 w-full bg-gray-200  dark:bg-gray-700 mb-2"></div>
        <div className="h-4 w-full bg-gray-200  dark:bg-gray-700 mb-2"></div>
        <div className="h-4 w-full bg-gray-200  dark:bg-gray-700 mb-2"></div>
      </div>
    </div>
  );
};

export default CartItemLoading;
