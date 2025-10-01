import React, { useEffect } from 'react';
import {
  Product as ProductType,
  PaColor,
  VariableProduct,
  MediaItem,
} from '@/utils/types/generated';
import { getProductVariableFilter } from '@/modules/product/product-utils';
import { ProductVariantFilter } from '@/modules/product/product-types';

type ProductColorDetailsProps = {
  product?: ProductType;
  onSelectedColor?: (color?: PaColor) => void;
  productVariantFilter?: ProductVariantFilter[];
  selectedImage?: MediaItem | undefined;
  isClear?: boolean;
};

const ProductColorDetails: React.FC<ProductColorDetailsProps> = ({
  product,
  productVariantFilter = [],
  isClear,
  selectedImage,
  onSelectedColor,
}) => {
  const handleColorClick = (color: any) => {
    if (!color) {
      return;
    }

    onSelectedColor && onSelectedColor(color);
  };

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
    const filteredColor = colors.find((color) => {
      const colorVariations = getProductVariableFilter(
        product as VariableProduct,
        color,
        productVariantFilter,
      );

      return (
        colorVariations.featuredImage?.node.sourceUrl ===
        selectedImage?.sourceUrl
      );
    });

    if (filteredColor) {
      handleColorClick(filteredColor);
    } else {
      console.log(
        'No se encontró un color que coincida con la imagen seleccionada',
      );
    }
  }, [selectedImage, isClear]);

  if (!(colors && colors.length && (product as VariableProduct).variations)) {
    return null;
  }

  return (
    <div>
      <div className="text-[#000] lg:text-[16px] font-Century-Gothic-Bold">
        Color:
      </div>

      <div className="inline-flex flex-wrap font-Century-Gothic mb-2">
        {colors.map((color, key) => (
          <div
            key={key}
            className="flex h-[30px]   items-center mr-4 mb-4"
            onClick={() => handleColorClick(color)}
          >
            <div
              className={`border border-[#dfdfdf] shadow flex justify-center items-center h-[25px] w-[25px] rounded-full cursor-pointer mr-2`}
            >
              <span
                className="h-[20px] w-[20px] rounded-full"
                style={{ background: color.hex as string }}
              />
            </div>
            <div
              className={`cursor-pointer flex self-center  text-[14px] text-[#464646]`}
            >
              {color.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductColorDetails;
