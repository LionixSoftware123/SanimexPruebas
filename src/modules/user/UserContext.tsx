import { createContext } from 'react';
import { User } from '@/utils/types/generated';

export type UserContextType = {
  user?: User;
  isLoading?: boolean;
};

export type DefaultValuesContextType = {
  state: UserContextType;
  favoriteProducts: number[];
  dispatch: (event: UserContextType) => void;
  dispatchFavoriteProducts: (favoriteProducts: number[]) => void;
};

const defaultValues = {
  state: {
    user: undefined,
    isLoading: false,
  },
  favoriteProducts: [],
  dispatch: () => {},
  dispatchFavoriteProducts: () => {},
};

export const Context = createContext<DefaultValuesContextType>(defaultValues);

export const { Consumer } = Context;
export const { Provider } = Context;
