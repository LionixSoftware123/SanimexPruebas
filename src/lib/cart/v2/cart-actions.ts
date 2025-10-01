import { createAction } from '@cobuildlab/react-simple-state';
import {
  addCartErrorEvent,
  addCartEvent,
  applyCouponErrorEvent,
  applyCouponEvent,
  removeCartErrorEvent,
  removeCartEvent,
  removeCouponErrorEvent,
  removeCouponEvent,
} from '@/lib/cart/v2/cart-events';
import axios, { AxiosError } from 'axios';
import {
  ApplyCouponData,
  CartAddItemData,
  CartRemoveItemData,
  CartResponse,
  UpsaleAttribute,
  UpsaleItem,
} from '@/lib/cart/v2/cart-types';
import { ATTRIBUTES_ALLOWED, ATTRIBUTES_BAG_ALLOWED } from '@/utils/constants';

export const addCartAction = createAction(
  addCartEvent,
  addCartErrorEvent,
  async (data: CartAddItemData) => {
    let response;

    try {
      response = await axios.post('/api/cart/v2/add-cart', data);
    } catch (error) {
      throw Error((error as AxiosError).response?.data as string);
    }

    return response.data;
  },
);

export const removeCartAction = createAction(
  removeCartEvent,
  removeCartErrorEvent,
  async (data: CartRemoveItemData) => {
    let response;

    try {
      response = await axios.post('/api/cart/v2/remove-cart', data);
    } catch (error) {
      throw Error((error as AxiosError).response?.data as string);
    }
    return response.data;
  },
);

export const applyCouponAction = createAction(
  applyCouponEvent,
  applyCouponErrorEvent,
  async (data: ApplyCouponData) => {
    let response;

    try {
      response = await axios.post('/api/cart/v2/apply-coupon', data);
    } catch (error) {
      throw Error((error as AxiosError).response?.data as string);
    }
    return response.data;
  },
);

export const removeCouponAction = createAction(
  removeCouponEvent,
  removeCouponErrorEvent,
  async (data: ApplyCouponData) => {
    let response;

    try {
      response = await axios.post('/api/cart/v2/remove-coupon', data);
    } catch (error) {
      throw Error((error as AxiosError).response?.data as string);
    }
    return response.data;
  },
);

export const fetchCart = async (): Promise<CartResponse> => {
  let cart = undefined;
  try {
    const response = await axios.get('/api/cart/v2/cart');

    cart = response.data;
  } catch (error) {
    throw Error((error as AxiosError).response?.data as string);
  }

  return cart;
};

export const getProductAttributeBoxUpsale = (
  product: UpsaleItem,
): string[] | undefined => {
  const attribute = product?.attributes?.find((item: UpsaleAttribute) => {
    return item && item.name && ATTRIBUTES_ALLOWED.includes(item.name);
  });
  return attribute?.value;
};

export const getProductAttributeBagUpsale = (
  product: UpsaleItem,
): string[] | undefined => {
  const attribute = product?.attributes?.find((item: UpsaleAttribute) => {
    return item && item.name && ATTRIBUTES_BAG_ALLOWED.includes(item.name);
  });
  return attribute?.value;
};

export const cleanProductAttributeBoxOptionUpsale = (
  productAttribute: string | string[] | undefined,
): number => {
  const value = Array.isArray(productAttribute)
    ? productAttribute[0]
    : productAttribute;

  if (!value) {
    return 1;
  }

  const productBoxMtr = value.replace('MTS', '').replace('-', '.').trim();

  return productBoxMtr ? parseFloat(productBoxMtr) : 1;
};

export const cleanProductAttributeBagOptionUpsale = (
  productAttribute: string | string[] | undefined,
): number => {
  if (!productAttribute) return 1;

  const value = Array.isArray(productAttribute)
    ? productAttribute[0]
    : productAttribute;

  const productBagKg = value?.replace(/\s|-|kgs|KGS|kg/g, '?').trim();
  return productBagKg ? parseFloat(productBagKg) : 1;
};
