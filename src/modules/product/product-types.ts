import {
  PaColor,
  PaMedidasCm,
  PaCaja,
  PaUso,
  PaAcabado,
} from '@/utils/types/generated';

export type ProductCustom = {
  id?: number;
  name?: string;
  featuredImage?: string;
  price?: string;
  regularPrice?: string;
  salePrice?: string;
  slug?: string;
  marca?: string;
  categories?: string[];
  attributes?: ProductVariantFilter[];
};

export enum ProductOrderEnum {
  Desc = 'DESC',
  Asc = 'ASC',
}

export type ProductFilterCustom = {
  category_name?: string;
  order_field?: string;
  marca?: string;
  espacio?: string;
  order?: ProductOrderEnum;
  per_page?: number;
  page?: number;
  include?: number[];
  on_sale?: boolean;
  on_total_sales?: boolean;
  min_price?: number;
  max_price?: number;
  search?: string;
};

export type TaxonomyFilter = {
  name?: string;
  slug?: string;
  color?: string;
  total?: number;
};

export type ProductVariantFilter =
  | PaAcabado
  | PaMedidasCm
  | PaCaja
  | PaUso
  | PaColor;
