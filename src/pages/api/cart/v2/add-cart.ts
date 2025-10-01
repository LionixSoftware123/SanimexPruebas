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

  const { id, quantity = 1 } = req.body;

  const cookieToken = req.cookies['cart-token'];

  if (!cookieToken) {
    return res.status(500).json({
      message: 'Cart token is missing',
    });
  }
  try {
    const response = await fetch(
      `${WP_ENDPOINT}/wp-json/wc/store/cart/add-item`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cart-token': cookieToken || '',
        },
        body: JSON.stringify({
          id,
          quantity,
        }),
      },
    );

    const headers = response?.headers;
    const cart = await response?.json();
    const token = headers?.get('cart-token') || '';

    return res.status(200).json({
      token,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as ApiError)?.message || 'Error al agregar al carrito',
    });
  }
}
