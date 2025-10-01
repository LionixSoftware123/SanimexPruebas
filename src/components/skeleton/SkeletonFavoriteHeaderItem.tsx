import React from 'react';

const SkeletonFavoriteHeaderItem: React.FC = () => {
  return (
    <div className="py-6 px-4 items-container border-b border-b-[#C1C1C1] animate-pulse">
      <div className="text-[14px] grid grid-cols-7 gap-5 h-full ">
        <div className="flex self-center col-span-2 w-full">
          <div className="relative flex self-center col-span-2 h-[60px] w-[70px] bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="col-span-5">
          <div className="h-[12px] w-[150px] bg-gray-200 dark:bg-gray-700 mb-2"></div>

          <div className="h-[12px] w-[150px] bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonFavoriteHeaderItem;
