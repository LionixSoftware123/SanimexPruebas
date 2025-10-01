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
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.query;
  const contactData = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Contact ID is required' });
  }

  try {
    const response = await axios.put(
      `${ACTIVE_CAMPAIGN_DOMAIN}/api/3/contacts/${id}`,
      contactData,
      {
        headers: {
          'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
        },
      },
    );

    return res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error updating contact:', error.response?.data);
      return res
        .status(error.response?.status || 500)
        .json(error.response?.data || { error: 'Internal Server Error' });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
