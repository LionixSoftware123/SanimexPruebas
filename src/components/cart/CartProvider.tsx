import React, { ReactNode, useEffect, useState } from 'react';
import { CartContextType, Provider } from '@/components/cart/CartContext';
import { useEvent, useSubscription } from '@cobuildlab/react-simple-state';
import { OnWooSessionTokenEvent } from '@/modules/auth/auth-events';
import { useGetCartLazyQuery, Cart } from '@/utils/types/generated';
import {
  addCartProductNecessaryErrorEvent,
  addCartProductNecessaryEvent,
  addNecessaryProductCartErrorEvent,
  addNecessaryProductCartEvent,
  removeCartErrorEvent,
  removeCartEvent,
  removeCartInSectionErrorEvent,
  removeCartInSectionEvent,
} from '@/modules/cart/cart-events';
import { useToasts } from 'react-toast-notifications';

type CartProviderProps = {
  children?: ReactNode;
};

const INITIAL_VALUES = {
  isLoading: false,
  cart: undefined,
};

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, setState] = useState<CartContextType>(INITIAL_VALUES);
  const { token } = useEvent(OnWooSessionTokenEvent);
  const { addToast } = useToasts();
  const [fetchCart] = useGetCartLazyQuery({
    onCompleted: (data) => {
      console.log({ data });
      setState({ cart: data.cart as Cart, isLoading: false });
    },
    onError: (error) => {
      console.log(error);
      setState({ cart: undefined, isLoading: false });
    },
  });

  useEffect(() => {
    if (token) {
      setState({ cart: undefined, isLoading: true });
      fetchCart();
    }
  }, [fetchCart, token]);

  const dispatch = (event: CartContextType): void => {
    setState(event);
  };

  useSubscription(removeCartEvent, (data) => {
    setState({
      cart: data?.cart,
      isLoading: false,
    });
    // addToast('El producto se ha eliminado del carrito correctamente!', {
    //   appearance: 'success',
    // });
  });

  useSubscription(removeCartErrorEvent, (data) => {
    addToast(
      <div dangerouslySetInnerHTML={{ __html: data?.message as string }}></div>,
      {
        appearance: 'error',
      },
    );
  });

  useSubscription(removeCartInSectionEvent, (data) => {
    setState({
      cart: data?.cart,
      isLoading: false,
    });
    // addToast('El producto se ha eliminado del carrito correctamente!', {
    //   appearance: 'success',
    // });
  });

  useSubscription(removeCartInSectionErrorEvent, (data) => {
    addToast(
      <div dangerouslySetInnerHTML={{ __html: data?.message as string }}></div>,
      {
        appearance: 'error',
      },
    );
  });

  useSubscription(addCartProductNecessaryEvent, (data) => {
    setState({
      cart: data?.cart,
      isLoading: false,
    });
    window.scrollTo({ top: 180 });
    addToast('El producto se ha agregado al carrito correctamente!', {
      appearance: 'success',
    });
  });

  useSubscription(addCartProductNecessaryErrorEvent, (data) => {
    addToast(
      <div dangerouslySetInnerHTML={{ __html: data?.message as string }}></div>,
      {
        appearance: 'error',
      },
    );
  });

  useSubscription(addNecessaryProductCartEvent, (data) => {
    setState({
      cart: data?.cart,
      isLoading: false,
    });
    window.scrollTo({ top: 180 });
    addToast('El producto se ha agregado al carrito correctamente!', {
      appearance: 'success',
    });
  });

  useSubscription(addNecessaryProductCartErrorEvent, (data) => {
    addToast(
      <div dangerouslySetInnerHTML={{ __html: data?.message as string }}></div>,
      {
        appearance: 'error',
      },
    );
  });

  const values = {
    state,
    dispatch,
  };

  return <Provider value={values}>{children}</Provider>;
};

export default CartProvider;
