import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from '@/lib/cart/v2/cart-types';
import { WP_ENDPOINT } from '@/utils/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { keys, quantity = 1 } = req.body;
  const cookieToken = req.cookies['cart-token'];

  if (!cookieToken) {
    return res.status(500).json({
      message: 'Cart token is missing',
    });
  }

  try {
    if (keys.length) {
      let response;

      for (const key of keys) {
        response = await fetch(
          `${WP_ENDPOINT}/wp-json/wc/store/cart/update-item?key=${key}&quantity=${quantity}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'cart-token': cookieToken || '',
            },
          },
        );
      }

      const headers = response?.headers;
      const cart = await response?.json();
      const token = headers?.get('cart-token') || '';

      return res.status(200).json({
        token,
        cart,
      });
    }
  } catch (error) {
    const apiError = error as ApiError;

    return res.status(500).json({
      message: apiError.message || 'Error al actualizar el ítem del carrito',
    });
  }
}
