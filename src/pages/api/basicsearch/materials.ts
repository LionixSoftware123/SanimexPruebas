import { NextApiRequest, NextApiResponse } from 'next';
import { BASIC_WP_SEARCH_ENDPOINT } from '@/lib/basicsearch/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const params = new URLSearchParams(req.query as Record<string, string>);

    // Construir la URL de la API externa con los parámetros dinámicos
    const url = `${BASIC_WP_SEARCH_ENDPOINT}/wp-json/search/v1/materials?${params.toString()}`;
    console.log({ url });
    const response = await fetch(url);
    const data = await response.json();

    // Devuelve los datos al cliente
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
}
