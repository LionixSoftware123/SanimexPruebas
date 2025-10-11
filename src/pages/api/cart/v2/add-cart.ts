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
    console.log('DEBUG: La cookie "cart-token" no se encontró en la solicitud.');

    return res.status(500).json({
      message: (error as any)?.message || 'Error al agregar al carrito (FALLO API)',
      // Si el error tiene más detalles (ej: un objeto de error)
      details: JSON.stringify(error, Object.getOwnPropertyNames(error))

      message: 'Cart token is missing 1',
    });
  }
  // ⬅️ CONFIRMACIÓN DE ÉXITO
  console.log('DEBUG: Cookie "cart-token" encontrada:', cookieToken.substring(0, 10) + '...'); 

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

     // **Paso clave: Verificar si la respuesta fue exitosa (código 200-299)**
    if (!response.ok) { 
      // Si no fue exitosa, lee el cuerpo como texto (puede ser HTML, texto o JSON de error)
      const errorBody = await response.text(); 
      
      // ¡ESTO ES LO IMPORTANTE! Imprimir en el log del servidor
      console.error('ERROR WOOCOMMERCE:', response.status, errorBody);

      // Devolver el error real al frontend para que lo veas en el navegador
      return res.status(response.status).json({
        message: `Fallo de WooCommerce. Código: ${response.status}.`,
        // Puedes pasar un fragmento del cuerpo del error para debug:
        errorDetails: errorBody.substring(0, 200) 
      });
    }

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
