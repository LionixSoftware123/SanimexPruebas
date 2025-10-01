import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import {
  ACTIVE_CAMPAIGN_DOMAIN,
  ACTIVE_CAMPAIGN_TOKEN,
} from '@/utils/constants';
import { ActiveCampaignContactContactList } from '@/modules/active-campaign/active-campaign-types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await axios.get<{
      contactLists: ActiveCampaignContactContactList[];
    }>(
      `${ACTIVE_CAMPAIGN_DOMAIN}/api/3/contacts/${req.query.id}/contactLists`,
      {
        headers: {
          'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
        },
      },
    );
    return res.status(200).json(response.data.contactLists);
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(400).json(error.response?.data.description);
    }
  }
}
