import { ProductCustom } from '@/modules/product/product-types';

const useAttributes = (
  filteredProducts: ProductCustom[],
  attributeKey: string,
) => {
  if (!filteredProducts) return [];

  const attributes = Array.from(
    new Map(
      filteredProducts
        .flatMap(
          (product: any) => product.attributes?.[attributeKey]?.options || [],
        )
        .map((option) => [option.name, { id: option.id, name: option.name }]),
    ).values(),
  );

  return attributes;
};

export default useAttributes;
