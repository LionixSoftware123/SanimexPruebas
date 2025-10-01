import React, { useEffect, useState } from 'react';
import { VariableProduct, PaUso } from '@/utils/types/generated';
import { getProductVariableFilter } from '@/modules/product/product-utils';
import { ProductVariantFilter } from '@/modules/product/product-types';

type ProductMeasureListProps = {
  product?: VariableProduct;
  onSelectedUse?: (use?: PaUso) => void;
  productVariantFilter: ProductVariantFilter[];
};

const ProductUseList: React.FC<ProductMeasureListProps> = ({
  product,
  onSelectedUse,
  productVariantFilter,
}) => {
  const [selectedUse, setSelectedUse] = useState<PaUso | null>(null);

  const uses = (
    (product?.allPaUso?.edges.map((edge) => edge.node) as PaUso[]) || []
  ).filter((u) =>
    getProductVariableFilter(
      product as VariableProduct,
      u,
      productVariantFilter,
    ),
  );

  useEffect(() => {
    const savedUse = localStorage.getItem('selectedUse');
    if (savedUse && uses) {
      const use = uses.find((use) => use.name === JSON.parse(savedUse).name);
      if (use) {
        setSelectedUse(use);
        onSelectedUse && onSelectedUse(use);
      }
    }
  }, []);

  if (!(uses && uses.length)) return null;

  return (
    <div className="flex flex-col items-start mb-4">
      <span className="text-[#000] lg:text-[16px] font-Century-Gothic-Bold mb-2">
        Uso:
      </span>
      <select
        id="countries"
        className="border rounded border-[#DFDFDF] w-[150px] h-[40px] focus:border-[#DFDFDF] pl-[10px]  text-[14px]"
        onChange={(e) => {
          const use = uses.find((use) => use?.slug === e.target.value);
          setSelectedUse(use as any);
          onSelectedUse && onSelectedUse(use);
        }}
        value={selectedUse?.slug || ''}
      >
        <option selected value="">
          Elige una opción
        </option>
        {uses.map((use, index) => (
          <option key={index} value={use?.slug as string}>
            {use.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductUseList;
