import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import {
  ACTIVE_CAMPAIGN_DOMAIN,
  ACTIVE_CAMPAIGN_TOKEN,
} from '@/utils/constants';
import { AxiosError } from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const params: Partial<{ [p: string]: string | string[] }> = req.body;
  try {
    const response = await axios.post<{
      ecomOrder: any;
    }>(`${ACTIVE_CAMPAIGN_DOMAIN}/api/3/ecomOrders`, params, {
      headers: {
        'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
      },
    });
    return res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(400).json(error.response?.data.description);
    }
  }
}
