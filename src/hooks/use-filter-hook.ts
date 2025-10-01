// src/hooks/useFilter.ts
import { useCallback } from 'react';
import {
  ProductCustom,
  ProductFilterCustom,
} from '@/modules/product/product-types';
import { useWpProducts } from '@/modules/product/product-hook';

const useFilter = (
  filter: ProductFilterCustom,
  setFilter: (filter: ProductFilterCustom) => void,
  setPage: (page: number) => void,
  AllProducts: ProductCustom[],
  setFilteredProducts: (products: ProductCustom[]) => void,
  _setTotal: (total: number) => void,
) => {
  const [FetchWpProducts] = useWpProducts({
    onCompleted: (data) => {
      setFilteredProducts(data.products);
      _setTotal(data.total);
    },
  });

  const handleFilter = useCallback(
    (selectedValues: string[], attribute: string) => {
      const params = {
        ...filter,
        [attribute]: selectedValues.join(','),
        page: 1,
      };
      setFilter(params);
      setPage(1);
      FetchWpProducts(params);

      const filtered = AllProducts?.filter(
        (product: any) =>
          product.attributes &&
          product.attributes[attribute] &&
          product.attributes[attribute].options &&
          product.attributes[attribute].options.some((option: any) =>
            selectedValues.includes(option.id),
          ),
      );

      setFilteredProducts(filtered);
      _setTotal(filtered.length);
    },
    [
      filter,
      AllProducts,
      FetchWpProducts,
      setFilter,
      setPage,
      setFilteredProducts,
      _setTotal,
    ],
  );

  return handleFilter;
};

export default useFilter;
