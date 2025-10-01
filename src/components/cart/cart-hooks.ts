import {
  DefaultValuesContextType,
  Context,
} from '@/components/cart/CartContext';
import { useContext } from 'react';

export const useCartHook = (): DefaultValuesContextType => {
  const { state, dispatch } = useContext(Context);
  return {
    state,
    dispatch,
  };
};
