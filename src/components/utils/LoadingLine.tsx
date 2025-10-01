import React from 'react';
type loadingLineProps = {
  wClass?: string;
  hClass?: string;
};

const LoadingLine: React.FC<loadingLineProps> = ({
  wClass = 'w-full',
  hClass = 'h-[16px]',
}) => {
  return <div className={`${wClass} ${hClass} bg-gray-200 dark:bg-gray-700`} />;
};
export default LoadingLine;
