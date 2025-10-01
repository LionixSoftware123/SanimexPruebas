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
  const params: {
    email?: string;
  } = req.query;

  // Validar email
  if (!params.email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Llamada a la API de ActiveCampaign para buscar el contacto por email
    const response = await axios.get(
      `${ACTIVE_CAMPAIGN_DOMAIN}/api/3/contacts?email=${params.email}`,
      {
        headers: {
          'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
        },
      },
    );

    return res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error fetching contact:', error.response?.data);
      return res
        .status(error.response?.status || 500)
        .json(error.response?.data || { error: 'Internal Server Error' });
    }

    // Manejar cualquier otro error
    console.error('Unexpected error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
