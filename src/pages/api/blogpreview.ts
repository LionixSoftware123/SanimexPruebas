import type { NextApiRequest, NextApiResponse } from 'next';
import { FetchPostQueryVariables } from '@/utils/types/generated';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '@/utils/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body: { variables: FetchPostQueryVariables } = req.body;
  try {
    const response = await axios.post(
      BACKEND_ENDPOINT,
      {
        query: `query FetchPost($id: ID!, $idType: PostIdType) {
        post(id: $id, idType: $idType) {
          id
          slug
          title
          date
          excerpt(format: RENDERED)
          content(format: RENDERED)
          featuredImage {
            node {
              sourceUrl(size: MEDIUM_LARGE)
            }
          }
        }
      }`,
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
