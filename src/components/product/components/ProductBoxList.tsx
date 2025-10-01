import React, { useEffect, useState } from 'react';
import { VariableProduct, PaCaja } from '@/utils/types/generated';
import { getProductVariableFilter } from '@/modules/product/product-utils';
import { ProductVariantFilter } from '@/modules/product/product-types';

type ProductBoxListProps = {
  product?: VariableProduct;
  onSelectedBox?: (box?: PaCaja) => void;
  productVariantFilter: ProductVariantFilter[];
};

const ProductBoxList: React.FC<ProductBoxListProps> = ({
  product,
  onSelectedBox,
  productVariantFilter,
}) => {
  const [selectedBox, setSelectedBox] = useState<PaCaja | null>(null);

  const boxes = (
    (product?.allPaCaja?.edges.map((edge) => edge.node) as PaCaja[]) || []
  ).filter((b) =>
    getProductVariableFilter(
      product as VariableProduct,
      b,
      productVariantFilter,
    ),
  );

  useEffect(() => {
    const savedBox = localStorage.getItem('selectedBox');
    if (savedBox) {
      const box = boxes.find((box) => box.name === JSON.parse(savedBox).name);
      if (box) {
        setSelectedBox(box);
        onSelectedBox && onSelectedBox(box);
      }
    }
  }, [selectedBox]);

  if (!(boxes && boxes.length)) return null;

  return (
    <div className="flex flex-col items-start mb-2">
      <span className="text-[#000] lg:text-[16px] font-Century-Gothic-Bold mb-2">
        Caja:
      </span>
      <select
        id="countries"
        className="border rounded border-[#DFDFDF] w-[150px] h-[40px] focus:border-[#DFDFDF] pl-[10px]  text-[14px]"
        onChange={(e) => {
          const box = boxes.find((box) => box?.slug === e.target.value);
          setSelectedBox(box as any);
          onSelectedBox && onSelectedBox(box);
        }}
        value={selectedBox?.slug || ''}
      >
        <option selected value="">
          Elige una opción
        </option>
        {boxes.map((box, index) => (
          <option key={index} value={box?.slug as string}>
            {box.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductBoxList;
