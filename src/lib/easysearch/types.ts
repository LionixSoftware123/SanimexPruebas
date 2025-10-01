import { Product } from '@/utils/types/generated';

export interface EasySearchProductTotalProps {
  total: number;
}

export type SortByOption = {
  label: string;
  value: string;
};

export type EasySearchProductSortByProps = {
  options: SortByOption[];
  currentRefinement: string;
  onSortChange: (value: string) => void;
};

export interface ProductCompareProps {
  product: Product;
}

export type QueryObject = { [key: string]: string | number };
export type RouterQuery = { [key: string]: string | string[] | undefined };
