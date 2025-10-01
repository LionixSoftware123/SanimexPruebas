import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="mb-5">
      <div className="w-full">
        <div className="h-6 bg-gray-200 dark:bg-gray-100 mb-2.5 max-w-[90px]"></div>
        <div className="h-2 bg-gray-200 dark:bg-gray-100 max-w-[140px] mb-6"></div>
        <div className="h-2 bg-gray-200 dark:bg-gray-100 max-w-[260px] mb-2.5"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
