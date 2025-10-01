import { createContext } from 'react';
import { Cart as CartType } from '@/utils/types/generated';

export type CartContextType = {
  cart?: CartType;
  isLoading?: boolean;
};

export type DefaultValuesContextType = {
  state: CartContextType;
  dispatch: (event: CartContextType) => void;
};

const defaultValues = {
  state: {
    cart: undefined,
    isLoading: false,
  },
  dispatch: () => {},
};

export const Context = createContext<DefaultValuesContextType>(defaultValues);

export const { Consumer } = Context;
export const { Provider } = Context;
