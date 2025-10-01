import type { NextApiRequest, NextApiResponse } from 'next';
import { FetchCustomerDocument } from '@/utils/types/generated';
import { createApolloClient } from '@/apollo/client';

type BodyType = {
  refreshToken?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const refreshToken: BodyType = req.body.refreshToken;
  const client = createApolloClient(refreshToken as string);
  const response = await client.query({
    query: FetchCustomerDocument,
  });

  res.status(200).json(response.data);
}
