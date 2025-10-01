import React from 'react';
import { VariableProduct, PaAcabado } from '@/utils/types/generated';
import { getProductVariableFilter } from '@/modules/product/product-utils';
import { ProductVariantFilter } from '@/modules/product/product-types';

type ProductAcabadoListProps = {
  product?: VariableProduct;
  onSelectedAcabado?: (acabado?: PaAcabado) => void;
  productVariantFilter: ProductVariantFilter[];
};

const ProductAcabadoList: React.FC<ProductAcabadoListProps> = ({
  product,
  onSelectedAcabado,
  productVariantFilter,
}) => {
  const acabados = (
    (product?.allPaAcabado?.edges.map((edge) => edge.node) as PaAcabado[]) || []
  ).filter((a) =>
    getProductVariableFilter(
      product as VariableProduct,
      a,
      productVariantFilter,
    ),
  );
  if (!(acabados && acabados.length)) return null;

  const acabado = acabados.find((_acabado) =>
    productVariantFilter.find(
      (node) => node.databaseId === _acabado.databaseId,
    ),
  );

  return (
    <div className="flex flex-col items-start mb-4">
      <span className="text-[#000] lg:text-[16px] font-Century-Gothic-Bold mb-2">
        Acabado:
      </span>
      <select
        id="countries"
        className="border rounded border-[#DFDFDF] w-[150px] h-[40px] focus:border-[#DFDFDF] pl-[10px]  text-[14px]"
        onChange={(e) => {
          onSelectedAcabado &&
            onSelectedAcabado(
              acabados.find((acabado) => acabado?.slug === e.target.value),
            );
        }}
        value={acabado?.slug || ''}
      >
        <option selected value="">
          Elige una opción
        </option>
        {acabados.map((acabado, key) => (
          <option key={key} value={acabado?.slug as string}>
            {acabado.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductAcabadoList;
