import React from 'react';
import { ProductFilterCustom } from '@/modules/product/product-types';

type BrandsFilterProps = {
  filter: ProductFilterCustom;
  setFilter: (filter: ProductFilterCustom) => void;
  setPage: (page: number) => void;
  FetchWpProducts: (params: ProductFilterCustom) => void;
  CATEGORIES: string[];
};

const BrandsFilter: React.FC<BrandsFilterProps> = () => {
  return null;
};

export default BrandsFilter;
