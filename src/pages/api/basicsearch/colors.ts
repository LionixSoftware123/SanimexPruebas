import { NextApiRequest, NextApiResponse } from 'next';
import { BASIC_WP_SEARCH_ENDPOINT } from '@/lib/basicsearch/constants';

// API handler para obtener colores con soporte para el parámetro opcional `parent_category`
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const params = new URLSearchParams(req.query as Record<string, string>);

    // Construir la URL de la API externa con los parámetros dinámicos
    const url = `${BASIC_WP_SEARCH_ENDPOINT}/wp-json/search/v1/colors?${params.toString()}`;
    console.log({ url });

    // Realizar la solicitud a la API externa
    const response = await fetch(url);

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    // Parsear los datos de la respuesta
    const data = await response.json();

    // Devolver los datos obtenidos al cliente
    res.status(200).json(data);
  } catch (error) {
    // Manejo de errores y respuesta con código 500
    console.error('Error fetching colors:', error);
    res.status(500).json({ error: 'Error fetching colors' });
  }
}
