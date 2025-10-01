import { createEvent } from '@cobuildlab/react-simple-state';

import { CartResponse, CouponResponse } from '@/lib/cart/v2/cart-types';

export const addCartEvent = createEvent<CartResponse>({
  initialValue: {
    cart: undefined,
    token: '',
  },
});

export const addCartErrorEvent = createEvent<Error>();

export const removeCartEvent = createEvent<CartResponse>({
  initialValue: {
    cart: undefined,
    token: '',
  },
});

export const removeCartErrorEvent = createEvent<Error>();

export const applyCouponEvent = createEvent<CouponResponse>();

export const applyCouponErrorEvent = createEvent<Error>();

export const removeCouponEvent = createEvent<CouponResponse>();

export const removeCouponErrorEvent = createEvent<Error>();
