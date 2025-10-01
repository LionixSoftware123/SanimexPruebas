// src/hooks/useFilterMedidas.ts
import { useCallback } from 'react';
import {
  ProductCustom,
  ProductFilterCustom,
} from '@/modules/product/product-types';

const useFilterMedidas = (
  filter: ProductFilterCustom,
  setFilter: (filter: ProductFilterCustom) => void,
  setPage: (page: number) => void,
  AllProducts: ProductCustom[],
  setFilteredProducts: (products: ProductCustom[]) => void,
  _setTotal: (total: number) => void,
  INITIAL_PAGE: number,
) => {
  const handleFilterMedidas = useCallback(
    (selectedMedidas: string[]) => {
      const params = {
        ...filter,
        medidas: selectedMedidas.join(','),
        page: 1,
      };
      setFilter(params);
      setPage(INITIAL_PAGE);

      const filtered = AllProducts?.filter(
        (product: any) =>
          product.attributes &&
          product.attributes['pa_medidas-cm'] &&
          product.attributes['pa_medidas-cm'].options &&
          product.attributes['pa_medidas-cm'].options.some((option: any) =>
            selectedMedidas.includes(option.id),
          ),
      );

      setFilteredProducts(filtered);
      _setTotal(filtered.length);
    },
    [
      filter,
      AllProducts,
      setFilter,
      setPage,
      setFilteredProducts,
      _setTotal,
      INITIAL_PAGE,
    ],
  );

  return handleFilterMedidas;
};

export default useFilterMedidas;
