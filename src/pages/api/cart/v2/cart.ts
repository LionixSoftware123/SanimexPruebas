import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from '@/lib/cart/v2/cart-types';
import { WP_ENDPOINT } from '@/utils/constants';
import { serialize } from 'cookie'; 

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
    const newToken = headers.get('cart-token'); 
    // ----------------------------------------------------------------
    // ⬇️ PASO CRÍTICO: ESTABLECER LA COOKIE ⬇️
    // ----------------------------------------------------------------
    if (newToken && newToken !== cookieToken) {
        // 1. Crear el string de la cookie con atributos de seguridad
        const cookieString = serialize('cart-token', newToken, {
            httpOnly: true, // No accesible por JavaScript del frontend (recomendado)
            secure: true,   // Solo enviar sobre HTTPS (necesario en DigitalOcean App Platform)
            sameSite: 'Lax',// Permite que se envíe en navegación externa
            path: '/',      // Disponible en toda la aplicación
            maxAge: 60 * 60 * 24 * 30, // 30 días de duración
        });

        // 2. Adjuntar el string de la cookie a la respuesta de Next.js
        res.setHeader('Set-Cookie', cookieString);
    }



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
