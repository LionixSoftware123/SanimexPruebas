import { Context } from '@/lib/cart/v2/CartContext';
import { useContext } from 'react';
import { CartContext } from '@/lib/cart/v2/cart-types';

export const useCartHook = (): CartContext => {
  const { cart, loading, updateCart, refetchCart } = useContext(Context);

  return {
    cart,
    loading,
    updateCart,
    refetchCart,
  };
};
