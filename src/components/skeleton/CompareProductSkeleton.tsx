import React from 'react';

const CompareProductSkeleton: React.FC = () => {
  return (
    <div className="py-6 px-4 items-container  animate-pulse">
      <div className="text-[14px] grid grid-cols-7 gap-5 h-full ">
        <div className="flex self-center col-span-7 w-full">
          <div className="relative flex self-center col-span-7 h-[200px] w-[250px] bg-gray-200"></div>
        </div>
        <div className="col-span-7">
          <div className="flex gap-4 justify-center">
            <div className="h-[30px] w-[30px] bg-gray-200 mb-4  rounded-full"></div>
            <div className="h-[30px] w-[30px] bg-gray-200 mb-4  rounded-full"></div>
          </div>

          <div className="flex gap-4">
            <div className="h-[18px] w-[30%] bg-gray-200 mb-4"></div>
            <div className="h-[18px] w-[70%] bg-gray-200 mb-4"></div>
          </div>

          <div className="flex gap-4">
            <div className="h-[18px] w-[30%] bg-gray-200 mb-4"></div>
            <div className="h-[18px] w-[70%] bg-gray-200 mb-4"></div>
          </div>

          <div className="h-[36px] w-[100%] bg-gray-200  my-4"></div>

          <div className="h-[18px] w-[100%] bg-gray-200  mt-4"></div>

          <div className="flex gap-4">
            <div className="h-[18px] w-[30%] bg-gray-200  mt-4"></div>
            <div className="h-[18px] w-[70%] bg-gray-200  mt-4"></div>
          </div>

          <div className="flex gap-4">
            <div className="h-[18px] w-[30%] bg-gray-200  mt-4"></div>
            <div className="h-[18px] w-[70%] bg-gray-200  mt-4"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-[18px] w-[30%] bg-gray-200  mt-4"></div>
            <div className="h-[18px] w-[70%] bg-gray-200  mt-4"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-[18px] w-[30%] bg-gray-200  mt-4"></div>
            <div className="h-[18px] w-[70%] bg-gray-200  mt-4"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-[18px] w-[30%] bg-gray-200  mt-4"></div>
            <div className="h-[18px] w-[70%] bg-gray-200  mt-4"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-[18px] w-[30%] bg-gray-200  mt-4"></div>
            <div className="h-[18px] w-[70%] bg-gray-200  mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareProductSkeleton;
