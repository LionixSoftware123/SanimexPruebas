import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import {
  ACTIVE_CAMPAIGN_DOMAIN,
  ACTIVE_CAMPAIGN_TOKEN,
} from '@/utils/constants';
import { ActiveCampaignContact } from '@/modules/active-campaign/active-campaign-types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await axios.get<{
      contacts: ActiveCampaignContact[];
    }>(
      `${ACTIVE_CAMPAIGN_DOMAIN}/api/3/contacts?filters[email]=${req.query.email}&filters[connectionid]=1`,
      {
        headers: {
          'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
        },
      },
    );
    return res.status(200).json(response.data.contacts);
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(400).json(error.response?.data.description);
    }
  }
}
