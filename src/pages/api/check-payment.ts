import type { NextApiRequest, NextApiResponse } from 'next';
import OpenPay from 'openpay';
import {
  isProductionReady,
  OPEN_PAY_MERCHANT_ID,
  OPEN_PAY_SECRET_ID,
} from '@/utils/constants';
import { createApolloClient } from '@/apollo/client';
import {
  RemoveToCartMutation,
  RemoveToCartDocument,
  RemoveToCartMutationVariables,
} from '@/utils/types/generated';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id: string | string[] | undefined = req.query.id;

  const cookies: Partial<{ [p: string]: string }> = req.cookies;

  const openpay = new OpenPay(
    OPEN_PAY_MERCHANT_ID,
    OPEN_PAY_SECRET_ID,
    isProductionReady,
  );

  openpay.charges.get(id as string, async function (error, body) {
    if (error)
      return res.redirect(
        `/checkout/finalizar-compra?error=${error.description}`,
      );
    if (cookies.wooSessionToken as string) {
      const client = createApolloClient(cookies.wooSessionToken as string);

      try {
        await client.mutate<
          RemoveToCartMutation,
          RemoveToCartMutationVariables
        >({
          mutation: RemoveToCartDocument,
          variables: {
            all: true,
          },
        });
      } catch (e) {
        return res.redirect(
          `/checkout/pago-completado?order_id=${body.order_id}`,
        );
      }
    }
    return res.redirect(`/checkout/pago-completado?order_id=${body.order_id}`);
  });
}
