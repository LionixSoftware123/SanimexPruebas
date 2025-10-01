import React, { useEffect, useState } from 'react';
import { VariableProduct, PaCaja } from '@/utils/types/generated';
import { getProductVariableFilter } from '@/modules/product/product-utils';
import { ProductVariantFilter } from '@/modules/product/product-types';

type ProductBoxListProps = {
  product?: VariableProduct;
  onSelectedBox?: (box?: PaCaja) => void;
  productVariantFilter: ProductVariantFilter[];
  reset: boolean;
  selectedMeasure?: string;
};

const ProductCompareSelectBoxs: React.FC<ProductBoxListProps> = ({
  product,
  onSelectedBox,
  productVariantFilter,
  reset,
  selectedMeasure,
}) => {
  const [selectedBox, setSelectedBox] = useState<PaCaja | null>(() => {
    const savedBox = localStorage.getItem('selectedBox');
    return savedBox ? JSON.parse(savedBox) : null;
  });
  const productVariations = product?.variations?.nodes || [];

  const filteredVariations = productVariations.filter((variation: any) =>
    variation.attributes?.nodes.some(
      (attribute: { name: string; value: string }) =>
        attribute.name === 'pa_medidas-cm' &&
        attribute.value === selectedMeasure,
    ),
  );

  const boxes = (
    (product?.allPaCaja?.edges.map((edge) => edge.node) as PaCaja[]) || []
  ).filter((b) =>
    getProductVariableFilter(
      product as VariableProduct,
      b,
      productVariantFilter,
    ),
  );

  const boxValues = Array.from(
    new Set(
      filteredVariations.map(
        (variation: any) =>
          variation.attributes.nodes.find(
            (attribute: { name: string; value: string }) =>
              attribute.name === 'pa_caja',
          )?.value,
      ),
    ),
  );

  const boxesMatchingMeasure = boxes.filter((box) =>
    boxValues.includes(box.name),
  );
  console.log(boxesMatchingMeasure, 'boxesMatchingMeasure');

  const handleBoxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (boxesMatchingMeasure) {
      const selectedBox = boxesMatchingMeasure.find(
        (box) => box?.slug === e.target.value,
      );

      if (selectedBox) {
        onSelectedBox && onSelectedBox(selectedBox);
        setSelectedBox(selectedBox);
        localStorage.setItem('selectedBox', JSON.stringify(selectedBox));
      }
    }
  };

  useEffect(() => {
    console.log('selected box seleccionada', selectedBox);
    if (reset) {
      setSelectedBox(null);
      localStorage.removeItem('selectedBox');
    }
  }, [reset, productVariantFilter]);

  if (!(boxesMatchingMeasure && boxesMatchingMeasure.length)) return null;
  return (
    <div>
      <div className="text-[#000] lg:text-[14px] font-bold">Caja:</div>
      <select
        value={selectedBox?.slug as any}
        className="bg-gray-50 my-2 border font-Century-Gothic border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
        onChange={handleBoxChange}
      >
        <option value="">Seleccionar una opción</option>

        {boxesMatchingMeasure.map((box, key) => (
          <option key={key} value={box?.slug as string}>
            {box.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductCompareSelectBoxs;
