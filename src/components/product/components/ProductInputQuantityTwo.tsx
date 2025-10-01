import React from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Product as ProductType, SimpleProduct } from '@/utils/types/generated';

type ProductInputQuantityProps = {
  onChange?: (quantity: number) => void;
  product?: ProductType;
  quantity?: number;
};
const ProductInputQuantityTwo: React.FC<ProductInputQuantityProps> = ({
  onChange,
  product,
  quantity = 1,
}) => {
  return (
    <div className="self-center px-2 w-[80px] flex border border-[#838383] py-[5px] min-w-[80px] rounded-[5px] justify-center items-center">
      <button
        className="bg-[#E9E9E9] h-[15px] w-[15px] flex items-center justify-center"
        onClick={() => {
          if (quantity > 0) {
            onChange && onChange(quantity - 1);
          }
        }}
      >
        <MinusIcon className="h-[8px] w-[8px] relative z-1 cursor-pointer" />
      </button>
      <div className="w-[50px] flex justify-center items-center h-[22px] text-[#F17523]">
        {quantity}
      </div>
      <button
        className="bg-[#E9E9E9] h-[15px] w-[15px] flex items-center justify-center"
        onClick={() => {
          const stockQuantity = (product as SimpleProduct)
            .stockQuantity as number;
          if (quantity < stockQuantity) {
            onChange && onChange(quantity + 1);
          }
        }}
      >
        <PlusIcon className="h-[8px] w-[8px] relative z-1 cursor-pointer" />
      </button>
    </div>
  );
};

export default ProductInputQuantityTwo;
