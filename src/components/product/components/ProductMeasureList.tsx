import React, { useEffect, useState } from 'react';
import { VariableProduct, PaMedidasCm } from '@/utils/types/generated';
import { getProductVariableFilter } from '@/modules/product/product-utils';
import { ProductVariantFilter } from '@/modules/product/product-types';

type ProductMeasureListProps = {
  product?: VariableProduct;
  onSelectedMeasure?: (measure?: PaMedidasCm) => void;
  productVariantFilter: ProductVariantFilter[];
};

const ProductMeasureList: React.FC<ProductMeasureListProps> = ({
  product,
  onSelectedMeasure,
  productVariantFilter,
}) => {
  const [selectedMeasure, setSelectedMeasure] = useState<PaMedidasCm | null>(
    null,
  );
  const [measures, setMeasures] = useState<PaMedidasCm[]>([]);

  useEffect(() => {
    const newMeasures = (
      (product?.allPaMedidasCm?.edges.map(
        (edge) => edge.node,
      ) as PaMedidasCm[]) || []
    ).filter((m) =>
      getProductVariableFilter(
        product as VariableProduct,
        m,
        productVariantFilter,
      ),
    );
    setMeasures(newMeasures);

    const savedMeasure = localStorage.getItem('selectedMeasure');
    if (savedMeasure) {
      const measure = newMeasures.find(
        (measure) => measure.name === JSON.parse(savedMeasure).name,
      );
      if (measure) {
        onSelectedMeasure && onSelectedMeasure(measure);
        setSelectedMeasure(measure);
      }
    }
  }, []);

  if (!(measures && measures.length)) return null;

  return (
    <div className="flex flex-col items-start mb-4">
      <span className="text-[#000] lg:text-[16px] font-Century-Gothic-Bold mb-2">
        Medidas (cm):
      </span>
      <select
        id="countries"
        className="border rounded border-[#DFDFDF] w-[150px] h-[40px] focus:border-[#DFDFDF] pl-[10px]  text-[14px]"
        onChange={(e) => {
          const measure = measures.find(
            (measure) => measure?.slug === e.target.value,
          );
          setSelectedMeasure(measure as any);
          onSelectedMeasure && onSelectedMeasure(measure);
        }}
        value={selectedMeasure?.slug as any}
      >
        <option selected value="">
          Elige una opción
        </option>
        {measures.map((measure, index) => (
          <option key={index} value={measure?.slug as string}>
            {measure.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductMeasureList;
