import React, { useEffect, useState } from 'react';
import {
  Product as ProductType,
  VariableProduct,
} from '@/utils/types/generated';
import { getProductVariableFilter } from '@/modules/product/product-utils';
import { ProductVariantFilter } from '@/modules/product/product-types';

type ProductMeasureDetailsProps = {
  product?: ProductType;
  onSelectedMeasure: (measure: string, index: number) => void;
  productVariantFilter?: ProductVariantFilter[];
  reset: boolean;
};

const ProductCompareSelectMeasures: React.FC<ProductMeasureDetailsProps> = ({
  product,
  onSelectedMeasure,
  productVariantFilter = [],
  reset,
}) => {
  const [selectedMeasureValue, setSelectedMeasureValue] = useState(() => {
    const savedMeasure = localStorage.getItem('selectedMeasure');
    return savedMeasure ? JSON.parse(savedMeasure) : '';
  });
  console.log(selectedMeasureValue, 'selectedMeasureValue');
  const measures = product?.allPaMedidasCm?.edges
    .map((edge) => edge.node)
    .filter((u) => {
      if ('databaseId' in u) {
        return getProductVariableFilter(
          product as VariableProduct,
          u as any,
          productVariantFilter,
        );
      }
      return false;
    });

  const handleMeasureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (measures) {
      const selectedMeasureIndex = measures.findIndex(
        (measure: any) => measure?.name === e.target.value,
      );

      const selectedMeasure = measures[selectedMeasureIndex];

      if (selectedMeasure) {
        onSelectedMeasure(selectedMeasure as any, selectedMeasureIndex);
        localStorage.setItem(
          'selectedMeasure',
          JSON.stringify(selectedMeasure),
        );
      }
    }
  };

  useEffect(() => {
    if (reset) {
      setSelectedMeasureValue('');
      localStorage.removeItem('selectedMeasure');
    }
  }, [reset]);

  if (!measures?.length || !(product as VariableProduct).variations)
    return null;

  return (
    <div>
      {measures && (
        <>
          <div className="text-[#000] lg:text-[14px] font-bold">
            Elige la medida:
          </div>
          <select
            className="bg-gray-50 my-2 border font-Century-Gothic border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
            onChange={handleMeasureChange}
          >
            <option value="">Seleccionar una opción</option>
            {measures.map((measure: any, key) => (
              <option key={key} value={measure.name}>
                {measure.name}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default ProductCompareSelectMeasures;
