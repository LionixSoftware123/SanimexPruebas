import type { NextApiRequest, NextApiResponse } from 'next';
import {
  RemoveToCartMutation,
  RemoveToCartDocument,
  RemoveToCartMutationVariables,
} from '@/utils/types/generated';
import { createApolloClient } from '@/apollo/client';
import { ApolloError } from '@apollo/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body: { variables: RemoveToCartMutationVariables } = req.body;
  const cookies = req.cookies;
  const wooSessionToken = cookies.wooSessionToken;

  if (!wooSessionToken)
    return res.status(500).json({
      message: 'El session token es requerido',
    });

  if (!body.variables)
    return res.status(500).json({
      message: 'El parámetro variables es requerido',
    });

  const client = createApolloClient(wooSessionToken);
  try {
    const response = await client.mutate<
      RemoveToCartMutation,
      RemoveToCartMutationVariables
    >({
      mutation: RemoveToCartDocument,
      variables: body.variables,
    });
    return res.status(200).json(response.data?.removeItemsFromCart?.cart);
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
