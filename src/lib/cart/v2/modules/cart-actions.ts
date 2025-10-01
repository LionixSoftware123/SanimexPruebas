import { createAction } from '@cobuildlab/react-simple-state';
import {
  addCartErrorEvent,
  addCartEvent,
  removeCartErrorEvent,
} from '@/lib/cart/v2/cart-events';
import axios, { AxiosError } from 'axios';
import { removeCartEvent } from '../../../../modules/cart/cart-events';
import { WP_ENDPOINT } from '@/utils/constants';
import { Cart } from '@/lib/cart/v2/cart-types';

export const addCartAction = createAction(
  addCartEvent,
  addCartErrorEvent,
  async (variables) => {
    let response;

    try {
      response = await axios.post<Cart>('/api/cart/v2/add-cart', {
        variables,
      });
    } catch (e) {
      throw Error((e as AxiosError).response?.data as string);
    }

    return { cart: response.data as Cart };
  },
);

export const removeCartAction = createAction(
  removeCartEvent,
  removeCartErrorEvent,
  async (variables: any) => {
    try {
      const response = await axios.post<Cart>('/api/cart/v2/remove-cart', {
        variables,
      });

      return { cart: response.data };
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>).response?.data?.message ||
        'Error al eliminar el ítem del carrito';
      throw new Error(errorMessage);
    }
  },
);

export const removeAllCartAction = createAction(
  removeCartEvent,
  removeCartErrorEvent,
  async (variables: any) => {
    try {
      const response = await axios.post<Cart>('/api/cart/v2/remove-cart-all', {
        variables,
      });

      return { cart: response.data };
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>).response?.data?.message ||
        'Error al eliminar el ítem del carrito';
      throw new Error(errorMessage);
    }
  },
);

export const addToCartApi = async (
  productId: number,
  quantity: number,
  cartToken: string,
) => {
  if (!productId) {
    console.log('El ID del producto es requerido');
  }

  const response = await fetch(
    `${WP_ENDPOINT}/wp-json/wc/store/cart/add-item`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cart-token': cartToken || '',
      },
      body: JSON.stringify({
        id: productId,
        quantity,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al agregar al carrito');
  }

  return data;
};

export const getTokenApi = async (cookie: string): Promise<string> => {
  const cartResponse = await fetch(`${WP_ENDPOINT}/wp-json/wc/store/cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookie || '',
    },
  });

  const cartHeaders = cartResponse.headers;
  const tokenCart = cartHeaders.get('cart-token') || '';

  if (!cartResponse.ok) {
    throw new Error('Error al generar token');
  }

  return tokenCart;
};

export const removeAllCartItemsApi = async (
  cartToken: string,
): Promise<any> => {
  if (!cartToken) {
    throw new Error('El token del carrito es requerido');
  }

  const response = await fetch(`${WP_ENDPOINT}/wp-json/wc/store/cart/items`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'cart-token': cartToken || '',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al eliminar el ítem del carrito');
  }

  return data;
};

export const removeCartItemApi = async (
  key: string,
  cartToken: string,
): Promise<any> => {
  if (!key) {
    throw new Error('El identificador del ítem del carrito es requerido');
  }

  const response = await fetch(
    `${WP_ENDPOINT}/wp-json/wc/store/cart/remove-item?key=${key}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cart-token': cartToken || '',
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al eliminar el ítem del carrito');
  }

  return data;
};

export const getStockApi = async (
  productId: number,
  cartToken: string,
): Promise<any> => {
  if (!productId) {
    throw new Error('El ID del producto es requerido');
  }

  const response = await fetch(
    `${WP_ENDPOINT}/wp-json/wc/store/products/${productId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'cart-token': cartToken || '',
      },
    },
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener el stock del producto');
  }

  return data;
};
