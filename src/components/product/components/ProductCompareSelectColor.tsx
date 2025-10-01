import React, { useEffect, useState } from 'react';
import {
  Product as ProductType,
  PaColor,
  VariableProduct,
} from '@/utils/types/generated';
import { getProductVariableFilter } from '@/modules/product/product-utils';
import { ProductVariantFilter } from '@/modules/product/product-types';

type ProductColorDetailsProps = {
  product?: ProductType;
  onSelectedColor: (color: string, index: number) => void;
  productVariantFilter?: ProductVariantFilter[];
  reset: boolean;
};

const ProductCompareSelectColor: React.FC<ProductColorDetailsProps> = ({
  product,
  onSelectedColor,
  productVariantFilter = [],
  reset,
}) => {
  const [colorSelected, setColorSelected] = useState(false);
  const [selectedColorValue, setSelectedColorValue] = useState(() => {
    const savedColor = localStorage.getItem('selectedColor');
    return savedColor ? JSON.parse(savedColor) : '';
  });
  const colors = product?.allPaColor?.edges
    .map((edge) => edge.node)
    .filter((u) =>
      getProductVariableFilter(
        product as VariableProduct,
        u as PaColor,
        productVariantFilter,
      ),
    ) as PaColor[];

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (colors) {
      const selectedColorIndex = colors.findIndex(
        (color) => color.slug === e.target.value,
      );
      const selectedColor = colors[selectedColorIndex];
      if (selectedColor) {
        onSelectedColor(selectedColor as any, selectedColorIndex);
        setColorSelected(true);
        setSelectedColorValue(e.target.value);
        localStorage.setItem('selectedColor', JSON.stringify(selectedColor));
      }
    }
  };

  useEffect(() => {
    if (reset) {
      setSelectedColorValue('');
      setColorSelected(false);
      localStorage.removeItem('selectedColor');
    }
  }, [reset, productVariantFilter, colorSelected]);

  if (!colors?.length || !(product as VariableProduct).variations) return null;

  return (
    <div>
      {colors && (
        <>
          <div className="text-[#000] lg:text-[14px] font-bold">
            Elige el color:
          </div>
          <select
            className="bg-gray-50 my-2 border font-Century-Gothic border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
            onChange={handleColorChange}
            value={selectedColorValue}
          >
            <option value="">Seleccionar una opción</option>

            {colors.map((color, key) => (
              <option key={key} value={color.slug ?? ''}>
                {color.name}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default ProductCompareSelectColor;
