import type { NextApiRequest, NextApiResponse } from 'next';
import {
  UpdateCartItemsMutation,
  UpdateCartItemsDocument,
  UpdateCartItemsMutationVariables,
} from '@/utils/types/generated';
import { createApolloClient } from '@/apollo/client';
import { ApolloError } from '@apollo/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body: { variables: UpdateCartItemsMutationVariables } = req.body;
  const cookies = req.cookies;

  if (!cookies.wooSessionToken)
    return res.status(500).json({
      message: 'El session token es requerido',
    });

  if (!body.variables)
    return res.status(500).json({
      message: 'El parámetro variables es requerido',
    });

  const client = createApolloClient(cookies.wooSessionToken);
  try {
    const response = await client.mutate<
      UpdateCartItemsMutation,
      UpdateCartItemsMutationVariables
    >({
      mutation: UpdateCartItemsDocument,
      variables: body.variables,
    });
    return res.status(200).json(response.data?.updateItemQuantities?.cart);
  } catch (e) {
    return res
      .status(500)
      .json(
        (e as ApolloError).graphQLErrors
          .map(({ message }) => message)
          .join('\n'),
      );
  }
}
