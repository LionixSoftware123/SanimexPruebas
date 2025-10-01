import type { NextApiRequest, NextApiResponse } from 'next';
import { FetchUserQueryVariables } from '@/utils/types/generated';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '@/utils/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body: { variables: FetchUserQueryVariables } = req.body;
  const response = await axios.post(
    BACKEND_ENDPOINT,
    {
      query: `query FetchUser($id: ID!, $idType: UserNodeIdTypeEnum) {
    user(id: $id, idType: $idType) {
        id
        email
        name
        favoriteProducts
        databaseId  
       }}`,
      variables: body.variables,
    },
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
  return res.status(200).json(response.data.data);
}
