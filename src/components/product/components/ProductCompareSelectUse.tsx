import React, { useEffect, useState } from 'react';
import { VariableProduct, PaUso } from '@/utils/types/generated';
import { getProductVariableFilter } from '@/modules/product/product-utils';
import { ProductVariantFilter } from '@/modules/product/product-types';

type ProductUseListProps = {
  product?: VariableProduct;
  onSelectedUse?: (use?: PaUso) => void;
  productVariantFilter: ProductVariantFilter[];
  reset: boolean;
};

const ProductCompareSelectUse: React.FC<ProductUseListProps> = ({
  product,
  onSelectedUse,
  productVariantFilter,
  reset,
}) => {
  const [selectedUse, setSelectedUse] = useState<PaUso | null>(() => {
    const savedUse = localStorage.getItem('selectedUse');
    return savedUse ? JSON.parse(savedUse) : null;
  });

  const uses = (
    (product?.allPaUso?.edges.map((edge) => edge.node) as PaUso[]) || []
  ).filter((u) =>
    getProductVariableFilter(
      product as VariableProduct,
      u,
      productVariantFilter,
    ),
  );

  const handleUseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (uses) {
      const selectedUse = uses.find((use) => use?.slug === e.target.value);
      if (selectedUse) {
        onSelectedUse && onSelectedUse(selectedUse);
        setSelectedUse(selectedUse);
        localStorage.setItem('selectedUse', JSON.stringify(selectedUse));
      }
    }
  };

  useEffect(() => {
    setSelectedUse(null);
    localStorage.removeItem('selectedUse');
  }, [reset]);

  if (!(uses && uses.length)) return null;

  return (
    <div>
      <div className="text-[#000] lg:text-[14px] font-bold">Uso:</div>
      <select
        value={selectedUse?.slug as any}
        className="bg-gray-50 my-2 border font-Century-Gothic border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
        onChange={handleUseChange}
      >
        <option value="">Seleccionar una opción</option>

        {uses.map((use, key) => (
          <option key={key} value={use?.slug as string}>
            {use.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductCompareSelectUse;
