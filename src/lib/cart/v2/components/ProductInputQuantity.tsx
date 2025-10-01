import React from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useToasts } from 'react-toast-notifications';
import { CartItem, UpsaleItem } from '../cart-types';

type ProductInputQuantityProps = {
  onChange?: (quantity: number) => void;
  product?: CartItem | UpsaleItem | undefined;
  quantity?: number;
  maxQuantity?: number;
};
const ProductInputQuantity: React.FC<ProductInputQuantityProps> = ({
  onChange,
  product,
  quantity = 1,
  maxQuantity,
}) => {
  const { addToast } = useToasts();
  return (
    <div className="self-center  w-[111px] flex border border-[#838383] py-[5px] min-w-[120px] rounded-[5px] justify-center items-center">
      <button
        className="bg-[#E9E9E9] h-[22px] w-[22px] flex items-center justify-center"
        onClick={() => {
          if (quantity > 0) {
            onChange && onChange(quantity - 1);
          }
        }}
      >
        <MinusIcon className="h-[10px] w-[10px] relative z-1 cursor-pointer" />
      </button>
      <div className="w-[50px] flex justify-center items-center h-[22px] text-[#F17523]">
        {quantity}
      </div>
      <button
        className="bg-[#E9E9E9] h-[22px] w-[22px] flex items-center justify-center"
        onClick={() => {
          const stockQuantity = product?.quantity_limits?.maximum as number;
          const maxquantity = maxQuantity as number;

          const limit = maxQuantity ? maxquantity : stockQuantity;
          if (quantity < limit) {
            onChange && onChange(quantity + 1);
          } else {
            addToast(
              <div>
                <div>
                  Solo se permite {limit} piezas por venta de este producto
                </div>
              </div>,
              {
                appearance: 'error',
              },
            );
          }
        }}
      >
        <PlusIcon className="h-[10px] w-[10px] relative z-1 cursor-pointer" />
      </button>
    </div>
  );
};

export default ProductInputQuantity;
