import React from 'react';
import { ProductFilterCustom } from '@/modules/product/product-types';

type ColorFilterProps = {
  filter: ProductFilterCustom;
  setFilter: (filter: ProductFilterCustom) => void;
  setPage: (page: number) => void;
  FetchWpProducts: (params: ProductFilterCustom) => void;
  CATEGORIES: string[];
};

const ColorFilter: React.FC<ColorFilterProps> = () => {
  return null;
};

export default ColorFilter;
