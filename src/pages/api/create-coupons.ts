import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { WP_ENDPOINT } from '@/utils/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await axios.post(
      `${WP_ENDPOINT}/wp-json/coupons/v1/cupones/crear`,
      req.body,
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
    if (axios.isAxiosError(error)) {
      res
        .status(500)
        .json({
          error: (error as any).response?.data || (error as any).message,
        });
    } else {
      res.status(500).json({ error: (error as any).message });
    }
  }
}
