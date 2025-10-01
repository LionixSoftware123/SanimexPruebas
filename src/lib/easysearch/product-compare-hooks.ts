import {
  DefaultValuesContextType,
  ProductContext,
} from '@/components/product/ProductCompareContext';
import { useContext } from 'react';

export const useProductCompareHook = (): DefaultValuesContextType => {
  const { state, dispatch } = useContext(ProductContext);
  return {
    state,
    dispatch,
  };
};
