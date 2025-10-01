import type { NextApiRequest, NextApiResponse } from 'next';
import {
  AddToCartMutation,
  AddToCartDocument,
  AddToCartMutationVariables,
} from '@/utils/types/generated';
import { createApolloClient } from '@/apollo/client';
import { ApolloError } from '@apollo/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body: { variables: AddToCartMutationVariables } = req.body;
  const cookies = req.cookies;
  console.log({ cookies });
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
      AddToCartMutation,
      AddToCartMutationVariables
    >({
      mutation: AddToCartDocument,
      variables: body.variables,
    });
    return res.status(200).json(response.data?.addToCart?.cart);
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
