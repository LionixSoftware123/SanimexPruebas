import {
  createAction,
  createStoreAction,
} from '@cobuildlab/react-simple-state';
import {
  addCartErrorEvent,
  addCartEvent,
  addCartProductNecessaryErrorEvent,
  addCartProductNecessaryEvent,
  addNecessaryProductCartErrorEvent,
  addNecessaryProductCartEvent,
  removeCartErrorEvent,
  removeCartEvent,
  removeCartFromPaymentCompleteErrorEvent,
  removeCartFromPaymentCompleteEvent,
  removeCartInSectionErrorEvent,
  removeCartInSectionEvent,
  updateCartItemsErrorEvent,
  updateCartItemsEvent,
  updateCartItemsStore,
} from '@/modules/cart/cart-events';
import {
  RemoveToCartMutationVariables,
  UpdateCartItemsMutationVariables,
  AddToCartMutationVariables,
  Cart,
  CartItem,
} from '@/utils/types/generated';
import axios, { AxiosError } from 'axios';

export const addCartProductNecessaryAction = createAction(
  addCartProductNecessaryEvent,
  addCartProductNecessaryErrorEvent,
  async (variables: AddToCartMutationVariables) => {
    let response;

    try {
      response = await axios.post<Cart>('/api/woo-add-cart', { variables });
    } catch (e) {
      throw Error((e as AxiosError).response?.data as string);
    }

    return { cart: response.data };
  },
);

export const addCartAction = createAction(
  addCartEvent,
  addCartErrorEvent,
  async (variables: AddToCartMutationVariables) => {
    let response;

    try {
      response = await axios.post<Cart>('/api/woo-add-cart', { variables });
    } catch (e) {
      throw Error((e as AxiosError).response?.data as string);
    }

    return { cart: response.data };
  },
);

export const addNecessaryProductCartAction = createAction(
  addNecessaryProductCartEvent,
  addNecessaryProductCartErrorEvent,
  async (variables: AddToCartMutationVariables) => {
    let response;

    try {
      response = await axios.post<Cart>('/api/woo-add-cart', { variables });
    } catch (e) {
      throw Error((e as AxiosError).response?.data as string);
    }

    return { cart: response.data };
  },
);

export const removeCartAction = createAction(
  removeCartEvent,
  removeCartErrorEvent,
  async (variables: RemoveToCartMutationVariables) => {
    let response;

    try {
      response = await axios.post<Cart>('/api/woo-remove-cart', { variables });
    } catch (e) {
      throw Error((e as AxiosError).response?.data as string);
    }

    return { cart: response.data };
  },
);

export const removeCartFromPaymentCompleteAction = createAction(
  removeCartFromPaymentCompleteEvent,
  removeCartFromPaymentCompleteErrorEvent,
  async (variables: RemoveToCartMutationVariables) => {
    let response;

    try {
      response = await axios.post<Cart>('/api/woo-remove-cart', { variables });
    } catch (e) {
      throw Error((e as AxiosError).response?.data as string);
    }

    return { cart: response.data };
  },
);

export const removeCartInSectionAction = createAction(
  removeCartInSectionEvent,
  removeCartInSectionErrorEvent,
  async (variables: RemoveToCartMutationVariables) => {
    let response;

    try {
      response = await axios.post<Cart>('/api/woo-remove-cart', { variables });
    } catch (e) {
      throw Error((e as AxiosError).response?.data as string);
    }

    return { cart: response.data };
  },
);

export const updateCartItems = createStoreAction(
  updateCartItemsStore,
  (prev, newCartItems: CartItem[]) => ({
    ...prev,
    items: newCartItems,
  }),
);

export const updateCartItemsAction = createAction(
  updateCartItemsEvent,
  updateCartItemsErrorEvent,
  async (variables: UpdateCartItemsMutationVariables) => {
    let response;

    try {
      response = await axios.post<Cart>('/api/woo-update-cart', { variables });
    } catch (e) {
      throw Error((e as AxiosError).response?.data as string);
    }

    return { cart: response.data };
  },
);
