import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { WP_ENDPOINT } from '@/utils/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await axios.get(
      `${WP_ENDPOINT}/wp-json/coupons/v1/cupones?status=1`,
      {
        auth: {
          username: 'webmaster',
          password: 'cualquierwebmaster1%',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo cupones' });
  }
}
