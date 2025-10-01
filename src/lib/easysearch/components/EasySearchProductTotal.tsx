import React from 'react';

export interface EasySearchProductTotalProps {
  total: number;
  loading: boolean;
}

const EasySearchProductTotal: React.FC<EasySearchProductTotalProps> = ({
  total,
  loading,
}) => {
  return (
    <div className="mb-4 lg:mb-0  text-[#333E48]  max-h-8">
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 w-96"></div>
        </div>
      ) : (
        <span className="text-[16px] lg:text-[24px] font-Century-Gothic-Bold">{total} Productos encontrados</span>
      )}
    </div>
  );
};

export default EasySearchProductTotal;
