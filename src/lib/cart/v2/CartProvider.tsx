import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Provider } from '@/lib/cart/v2/CartContext';
// import { useToasts } from 'react-toast-notifications';
import { fetchCart } from '@/lib/cart/v2/cart-actions';
import { UniversalCookies } from '@/lib/cart/v2/utils/cookies';
import { CART_COOKIES_OPTIONS, CART_VALUES } from '@/lib/cart/v2/cart-contants';
import { Cart } from '@/lib/cart/v2/cart-types';

type CartProviderProps = {
  children?: ReactNode;
};

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<Cart | null | undefined>(CART_VALUES);

  const callbackCart = useCallback(async () => {
    const token = UniversalCookies.get('cart-token');
    const data = await fetchCart();

    if (!token) {
      UniversalCookies.set('cart-token', data.token, CART_COOKIES_OPTIONS);
    }
    setCart(data.cart);
    setLoading(false);
  }, []);

  useEffect(() => {
    callbackCart();
  }, [callbackCart]);

  const updateCart = (cart?: Cart | null) => {
    setCart(cart);
  };

  const refetchCart = () => {
    callbackCart();
  };

  const values = {
    cart,
    loading,
    updateCart,
    refetchCart,
  };

  return <Provider value={values}>{children}</Provider>;
};

export default CartProvider;
