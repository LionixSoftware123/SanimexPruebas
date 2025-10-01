import { createEvent, createStore } from '@cobuildlab/react-simple-state';
import { Cart, CartItem } from '@/utils/types/generated';

export const addCartProductNecessaryEvent = createEvent<{
  cart: Cart | undefined;
}>({
  initialValue: {
    cart: undefined,
  },
});

export const addCartProductNecessaryErrorEvent = createEvent<Error>();

export const addCartEvent = createEvent<{ cart: Cart | undefined | null }>({
  initialValue: {
    cart: undefined,
  },
});

export const addCartErrorEvent = createEvent<Error>();

export const addNecessaryProductCartEvent = createEvent<{
  cart: Cart | undefined;
}>({
  initialValue: {
    cart: undefined,
  },
});

export const addNecessaryProductCartErrorEvent = createEvent<Error>();

export const removeCartEvent = createEvent<{ cart: Cart | undefined }>({
  initialValue: {
    cart: undefined,
  },
});

export const removeCartErrorEvent = createEvent<Error>();

export const removeCartFromPaymentCompleteEvent = createEvent<{
  cart: Cart | undefined;
}>({
  initialValue: {
    cart: undefined,
  },
});
export const removeCartFromPaymentCompleteErrorEvent = createEvent<Error>();

export const removeCartInSectionEvent = createEvent<{ cart: Cart | undefined }>(
  {
    initialValue: {
      cart: undefined,
    },
  },
);

export const removeCartInSectionErrorEvent = createEvent<Error>();

export const updateCartItemsStore = createStore<{ items: CartItem[] }>({
  initialValue: {
    items: [],
  },
});

export const updateCartItemsEvent = createEvent<{ cart: Cart | undefined }>({
  initialValue: {
    cart: undefined,
  },
});

export const updateCartItemsErrorEvent = createEvent<Error>();

export const fetchCartEvent = createEvent<{ cart: Cart | undefined }>({
  initialValue: {
    cart: undefined,
  },
});
