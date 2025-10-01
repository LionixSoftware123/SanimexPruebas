import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from '@/lib/cart/v2/cart-types';
import { WP_ENDPOINT } from '@/utils/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const cookieToken = req.cookies['cart-token'];

  try {
    const response = await fetch(`${WP_ENDPOINT}/wp-json/wc/store/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'cart-token': cookieToken || '',
      },
    });

    const headers = response.headers;
    const cart = await response.json();
    const token = headers.get('cart-token') || '';

    return res.status(200).json({
      token,
      cart,
    });
  } catch (error) {
    const apiError = error as ApiError;
    return res
      .status(500)
      .json({ message: apiError.message || 'Error al generar el carrito' });
  }
}
