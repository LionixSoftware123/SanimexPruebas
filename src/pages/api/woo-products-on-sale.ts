import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { WP_ENDPOINT } from '@/utils/constants';

export type WooProductFilter = {
  per_page?: number;
  category_slug?: string;
  order?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const params: WooProductFilter = req.query;

  try {
    const products = await axios.get(
      `${WP_ENDPOINT}/wp-json/wp/v2/products-on-sale`,
      {
        auth: {
          username: 'webmaster',
          password: 'cualquierwebmaster1%',
        },
        headers: {
          'Content-Type': 'application/json',
        },
        params,
      },
    );
    return res.status(200).json(products.data);
  } catch (e) {
    console.log('e', e);
  }
}
