// utils/productHelpers.ts
import {
  ProductCustom,
  ProductOrderEnum,
} from '@/modules/product/product-types';
import { SimpleProduct } from '../types/generated';
import { fetchWpProducts } from '@/modules/product/product-actions';

export const getComplementProductIds = (product: SimpleProduct): number[] => {
  return (
    product?.crossSell?.nodes.map(
      (node) => (node as SimpleProduct).databaseId,
    ) || []
  );
};

export const getSimilarProductIds = (product: SimpleProduct): number[] => {
  return (
    product?.related?.nodes.map((node) => (node as SimpleProduct).databaseId) ||
    []
  );
};

export const getRandomCategory = (product: SimpleProduct): string | null => {
  const categoryProduct = product?.productCategories?.nodes.map(
    (node) => (node as SimpleProduct).name,
  );
  return categoryProduct && categoryProduct.length > 0
    ? categoryProduct[Math.floor(Math.random() * categoryProduct.length)] ??
        null
    : null;
};

export const fetchComplementProducts = async (
  complementProductIds: number[],
): Promise<ProductCustom[]> => {
  if (!complementProductIds.length) return [];
  let products: ProductCustom[]=[];
  try{
    const { products: getProducts } = await fetchWpProducts({
      order: ProductOrderEnum.Desc,
      per_page: 10,
      page: 1,
      include: complementProductIds,
    });
    return getProducts;
  }catch{
    return products;
  }
};

export const fetchSimilarProducts = async (
  product: SimpleProduct,
): Promise<ProductCustom[]> => {
  const randomCategory = getRandomCategory(product);
  if (!randomCategory) return [];
  const { products: fetchedProducts } = await fetchWpProducts({
    order: ProductOrderEnum.Desc,
    per_page: 10,
    page: 1,
    category_name: randomCategory.toString(),
  });
  const currentProductId = product.databaseId ?? product.id;
  return fetchedProducts
    .filter(
      (p: ProductCustom) => p.id !== undefined && p.id !== currentProductId,
    )
    .sort(() => Math.random() - 0.5);
};
