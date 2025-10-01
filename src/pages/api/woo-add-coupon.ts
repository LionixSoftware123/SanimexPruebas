import { NextApiRequest, NextApiResponse } from 'next';
import {
  ApplyCouponMutationVariables,
  ApplyCouponDocument,
  ApplyCouponMutation,
} from '@/utils/types/generated';
import { createApolloClient } from '@/apollo/client';
import { ApolloError } from '@apollo/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body: { variables: ApplyCouponMutationVariables } = req.body;
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
      ApplyCouponMutation,
      ApplyCouponMutationVariables
    >({
      mutation: ApplyCouponDocument,
      variables: body.variables,
    });
    return res.status(200).json(response.data?.applyCoupon);
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
