import { createContext } from 'react';
import { Product } from '@/utils/types/generated';

export type ProductContextType = {
  productAdded: boolean;
  products: Product[];
};

type Action =
  | { type: 'ADD_PRODUCT'; product: Product }
  | { type: 'REMOVE_PRODUCT'; productId: number };

export type DefaultValuesContextType = {
  state: ProductContextType;
  dispatch: React.Dispatch<Action>;
};

const defaultValues = {
  state: {
    productAdded: false,
    products: [],
  },
  dispatch: () => {},
};

export const ProductContext =
  createContext<DefaultValuesContextType>(defaultValues);

export const { Consumer } = ProductContext;
export const { Provider } = ProductContext;
