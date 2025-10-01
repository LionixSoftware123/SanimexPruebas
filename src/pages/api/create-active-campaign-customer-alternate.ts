import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import {
  ACTIVE_CAMPAIGN_DOMAIN,
  ACTIVE_CAMPAIGN_TOKEN,
} from '@/utils/constants';
import {
  ActiveCampaignCustomer,
  ActiveCampaignCustomerAlternateInput,
} from '@/modules/active-campaign/active-campaign-types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const params: Partial<ActiveCampaignCustomerAlternateInput> = req.body;

  try {
    console.log({ params });
    const response = await axios.post<{
      ecomCustomer: ActiveCampaignCustomer;
    }>(`${ACTIVE_CAMPAIGN_DOMAIN}/api/3/ecomCustomers`, params, {
      headers: {
        'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
      },
    });
    //console.log('create-response',{response});
    return res.status(200).json(response.data.ecomCustomer);
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(400).json(error.response?.data.description);
    }
  }
}
