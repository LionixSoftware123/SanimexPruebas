import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import {
  ACTIVE_CAMPAIGN_DOMAIN,
  ACTIVE_CAMPAIGN_TOKEN,
} from '@/utils/constants';
import { ActiveCampaignCustomer } from '@/modules/active-campaign/active-campaign-types';
import { AxiosError } from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const params: {
    email?: string;
  } = req.query;
  try {
    const response = await axios.get<{
      ecomCustomers: ActiveCampaignCustomer[];
    }>(
      `${ACTIVE_CAMPAIGN_DOMAIN}/api/3/ecomCustomers?filters[email]=${params?.email}&filters[connectionid]=1`,
      {
        headers: {
          'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
        },
      },
    );
    return res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(400).json(error.response?.data.description);
    }
  }
}
