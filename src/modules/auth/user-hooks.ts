import { Context, DefaultValuesContextType } from '@/modules/user/UserContext';

import { useContext } from 'react';

export const useUserHook = (): DefaultValuesContextType => {
  const { state, dispatch, favoriteProducts, dispatchFavoriteProducts } =
    useContext(Context);
  return {
    state,
    dispatch,
    favoriteProducts,
    dispatchFavoriteProducts,
  };
};
