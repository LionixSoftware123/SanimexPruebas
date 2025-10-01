import React from 'react';

const OrderSkeleton: React.FC = () => {
  return (
    <div className="w-full animate-pulse">
      {[1, 2, 3].map((item) => (
        <div key={item} className="py-4 border-b border-b-black">
          <div className="h-[12px] bg-gray-200  dark:bg-gray-700 w-[200px] mb-2"></div>
          <div className="h-[12px] bg-gray-200  dark:bg-gray-700 w-[200px] mb-2"></div>
          <div className="h-[12px] bg-gray-200  dark:bg-gray-700 w-[200px] mb-2"></div>
          <div className="mb-2 flex justify-between">
            <div className="h-[12px] bg-gray-200  dark:bg-gray-700 w-[200px] "></div>
            <div className="h-[12px] bg-gray-200  dark:bg-gray-700 w-[150px] "></div>
          </div>
          <div className="flex justify-between">
            <div className="h-[12px] bg-gray-200  dark:bg-gray-700 w-[200px] "></div>
            <div className="h-[12px] bg-gray-200  dark:bg-gray-700 w-[200px] "></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSkeleton;
