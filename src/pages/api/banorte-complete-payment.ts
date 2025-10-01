import { NextApiRequest, NextApiResponse } from 'next';
import { createApolloClient } from '@/apollo/client';
import {
  // GetCartDocument,
  // GetCartQueryVariables,
  // GetCartQuery,
  // Customer,
  // User,
  // Cart,
  Order,
  RemoveToCartMutation,
  RemoveToCartMutationVariables,
  RemoveToCartDocument,
} from '@/utils/types/generated';
// import {
//   createActiveCampaignOrder,
//   updateActiveCampaignUserOrderAction,
// } from '@/modules/active-campaign/active-campaign-actions';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '@/utils/constants';
// import currencyFormatter from 'currency-formatter';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = req.body;
  const wooSessionToken = data.woo_session_token;
  const orderId = data.order_id;

  if (!wooSessionToken)
    return res.status(500).json({
      message: 'El session token es requerido',
    });

  const client = createApolloClient(wooSessionToken);
  try {
    await axios.post<{ data: { order: Order } }>(
      BACKEND_ENDPOINT,
      {
        query: `query FetchOrder($id: ID!, $idType: OrderIdTypeEnum) {
                  order(id: $id, idType: $idType) {
                    total
                    shippingTotal
                      billing{
                      email
                    }
                    shippingLines {
                      nodes {
                        methodTitle
                      }
                    }
                    metaData {
                      value
                      key
                    }
                  }
                }`,
        variables: {
          id: parseInt(orderId as string),
          idType: 'DATABASE_ID',
        },
      },
      {
        auth: {
          username: 'webmaster',
          password: 'cualquierwebmaster1%',
        },
      },
    );

    // const cart = await client.query<GetCartQuery, GetCartQueryVariables>({
    //   query: GetCartDocument,
    // });

    // const meta = order.metaData;
    // const shippingMethod = (
    //   order.shippingLines?.nodes.length
    //     ? order.shippingLines?.nodes[0].shippingMethod
    //     : ''
    // ) as string;
    // const customer = {
    //   email: order.billing?.email as string,
    // } as Customer;
    // const externalCheckoutId = meta?.find(
    //   (_meta) => _meta?.key === 'externalCheckoutId',
    // );

    // if (!externalCheckoutId) {
    //
    //   await createActiveCampaignOrder({
    //     customer,
    //     cart: cart.data?.cart as Cart,
    //     shippingTotal: currencyFormatter.unformat(
    //       order.shippingTotal as string,
    //       {
    //         code: 'USD',
    //       },
    //     ),
    //     shippingMethod,
    //     orderId: orderId,
    //   });
    // } else {
    //
    //   const abandonedDate = meta?.find(
    //     (_meta) => _meta?.key === 'abandonedDate',
    //   );
    //   const externalOrderId = meta?.find((_meta) => _meta?.key === 'orderId');
    //
    //   await updateActiveCampaignUserOrderAction({
    //     user: customer as User,
    //     cart: cart.data?.cart as Cart,
    //     shippingTotal: currencyFormatter.unformat(
    //       order.shippingTotal as string,
    //       {
    //         code: 'USD',
    //       },
    //     ) as 0 | 250,
    //     shippingMethod,
    //     externalOrderId: orderId,
    //     externalCheckoutId: externalCheckoutId?.value as string,
    //     orderId: externalOrderId?.value as string,
    //     abandonedDate: abandonedDate?.value as string,
    //   });
    // }

    await client.mutate<RemoveToCartMutation, RemoveToCartMutationVariables>({
      mutation: RemoveToCartDocument,
      variables: {
        all: true,
      },
    });

    return res.status(200).json({ message: 'success' });
  } catch (e) {
    return res.status(500).json(e);
  }
}
