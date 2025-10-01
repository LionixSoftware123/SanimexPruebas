import { NextApiRequest, NextApiResponse } from 'next';
import { BASIC_WP_SEARCH_ENDPOINT } from '@/lib/basicsearch/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    search = '',
    color = '',
    brand = '',
    material = '',
    measure = '',
    design = '',
    sort = '',
    skip = '0',
    take = '12',
    parent_category = '',
    on_sale = 'false',
  } = req.query;

  const params = new URLSearchParams({
    search: search as string,
    color: color as string,
    brand: brand as string,
    material: material as string,
    measure: measure as string,
    design: design as string,
    sort: sort as string,
    skip: skip as string,
    take: take as string,
    parent_category: parent_category as string,
    on_sale: on_sale as string,
  });

  try {
    // Realiza la solicitud a la API externa

    const response = await fetch(
      `${BASIC_WP_SEARCH_ENDPOINT}/wp-json/search/v1/products?${params.toString()}`,
    );

    const data = await response.json();

    // Devuelve los datos al cliente
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
}
