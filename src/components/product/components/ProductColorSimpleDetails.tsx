import React, { useEffect, useState } from 'react';
import {
  Product as ProductType,
  PaColor,
  VariableProduct,
} from '@/utils/types/generated';
import { getProductVariableFilter } from '@/modules/product/product-utils';
import { ProductVariantFilter } from '@/modules/product/product-types';

type ProductColorSimpleDetailsProps = {
  product?: ProductType;
  onSelectedColor?: (color?: PaColor) => void;
  productVariantFilter?: ProductVariantFilter[];
};

const ProductColorSimpleDetails: React.FC<ProductColorSimpleDetailsProps> = ({
  product,
  onSelectedColor,
  productVariantFilter = [],
}) => {
  const [selectedColor, setSelectedColor] = useState<PaColor | null>(null);

  const handleColorClick = (color: any) => {
    setSelectedColor(color);
    onSelectedColor && onSelectedColor(color);
  };

  const handleColorClickTwo = () => {
    setSelectedColor(colors[0]);
    onSelectedColor && onSelectedColor(colors[0]);
  };

  console.log(selectedColor);

  const colors = (
    product?.allPaColor?.edges.map((edge) => edge.node) as PaColor[]
  ).filter((u) =>
    getProductVariableFilter(
      product as VariableProduct,
      u,
      productVariantFilter,
    ),
  );

  useEffect(() => {
    const savedColor = localStorage.getItem('selectedColor');
    if (savedColor && colors) {
      const color = colors.find(
        (color) => color.slug === JSON.parse(savedColor).slug,
      );
      console.log('color', color);
      if (color) {
        onSelectedColor && onSelectedColor(color);
        setSelectedColor(color);
      }
    }
  }, []);

  if (!(colors && colors.length && (product as VariableProduct).variations))
    return null;

  return (
    <div>
      <div className="italic text-[#93278F] lg:text-[18px]">
        Elige el color:
      </div>
      {colors && colors.length > 1 ? (
        <div className="inline-flex flex-wrap font-Century-Gothic">
          {colors.map((color, key) => (
            <div
              key={key}
              className="flex h-[30px]   items-center mr-2 mb-2"
              onClick={() => handleColorClick(color)}
            >
              <div
                className={`border flex self-center border-[#707070] h-[20px] w-[20px] rounded-full cursor-pointer mr-2`}
                style={{ background: color.hex as string }}
              />
              <div className={`cursor-pointer flex self-center  text-[14px]`}>
                {color.name}
              </div>
            </div>
          ))}
        </div>
      ) : (
        colors &&
        colors.length === 1 && (
          <div
            className="flex h-[30px] items-center mr-2 mb-2"
            onClick={() => handleColorClickTwo()}
          >
            <div
              className={`border flex self-center border-[#707070] h-[20px] w-[20px] rounded-full cursor-pointer mr-2`}
              style={{ background: colors[0].hex as string }}
            />
            <div className={`cursor-pointer flex self-center  text-[14px]`}>
              {colors[0].name}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductColorSimpleDetails;
