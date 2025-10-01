import { createEvent, createStore } from '@cobuildlab/react-simple-state';
import { ProductCustom } from '@/modules/product/product-types';
import {
  Product as ProductType,
  VariableProduct,
} from '@/utils/types/generated';

export const fetchSimilarProductsEvent = createEvent<{
  products: ProductCustom[];
  total: number;
}>({
  initialValue: {
    products: [],
    total: 0,
  },
});

export const fetchSimilarProductsErrorEvent = createEvent<Error>();

export const openNecessaryProductDialogStore = createStore<{
  product?: ProductType;
  quantity?: number;
  variationProduct?: VariableProduct;
  isOpen: boolean;
}>({
  initialValue: {
    product: undefined,
    quantity: 0,
    variationProduct: undefined,
    isOpen: false,
  },
});
