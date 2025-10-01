import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { WP_ENDPOINT } from '@/utils/constants';
import { ProductFilterCustom } from '@/modules/product/product-types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const params: ProductFilterCustom = req.query;

  try {
    const response = await axios.get(`${WP_ENDPOINT}/wp-json/wp/v2/products`, {
      auth: {
        username: 'webmaster',
        password: 'cualquierwebmaster1%',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      params,
    });

    return res.status(200).json(response.data);
  } catch (e) {
    console.log('error');
  }
}
