import React, { useState } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Product as ProductType, SimpleProduct } from '@/utils/types/generated';

type ProductInputQuantitySmallProps = {
  onChange?: (quantity: number) => void;
  product?: ProductType;
  initialValue?: number;
};
const ProductInputQuantitySmall: React.FC<ProductInputQuantitySmallProps> = ({
  onChange,
  product,
  initialValue = 0,
}) => {
  const [quantity, setQuantity] = useState<number>(initialValue);

  return (
    <div className="w-[69px] flex border border-1 border-[#E3E3E3] min-w-[50px] rounded-[5px] justify-center items-center p-1">
      <button
        className="bg-[#E9E9E9] h-[18px] w-[18px] flex items-center justify-center"
        onClick={() => {
          if (quantity > 0) {
            setQuantity(quantity - 1);
            onChange && onChange(quantity - 1);
          }
        }}
      >
        <MinusIcon className="h-[10px] w-[8px] relative z-1 cursor-pointer" />
      </button>
      <div className="text-[10px] w-[25px] border-none text-center">
        {quantity}
      </div>
      <button
        className="bg-[#E9E9E9] h-[18px] w-[18px] flex items-center justify-center"
        onClick={() => {
          const stockQuantity = (product as SimpleProduct)
            .stockQuantity as number;
          if (quantity < stockQuantity) {
            setQuantity(quantity + 1);
            onChange && onChange(quantity + 1);
          }
        }}
      >
        <PlusIcon className="h-[10px] w-[8px] relative z-1 cursor-pointer" />
      </button>
    </div>
  );
};

export default ProductInputQuantitySmall;
