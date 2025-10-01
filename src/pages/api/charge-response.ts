import type { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '@/utils/constants';
import { OrderStatusEnum } from '@/utils/types/generated';

enum ChargeResponseTypeEnum {
  Succeeded = 'charge.succeeded',
  Created = 'charge.created',
  Cancelled = 'charge.cancelled',
  Failed = 'charge.failed',
  Refunded = 'charge.refunded',
}

type ChargeResponse = {
  type: ChargeResponseTypeEnum;
  event_date: string;
  transaction: {
    id: string;
    order_id: string;
    status: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body: ChargeResponse = req.body;

  let status = OrderStatusEnum.Pending;

  if (!(body && body.transaction && body.transaction.status))
    res.status(200).json({});

  switch (body.transaction.status) {
    case 'charge_pending':
      status = OrderStatusEnum.Pending;
      break;
    case 'in_progress':
      status = OrderStatusEnum.Processing;
      break;
    case 'completed':
      status = OrderStatusEnum.Completed;
      break;
    case 'cancelled':
      status = OrderStatusEnum.Cancelled;
      break;
    case 'failed':
      status = OrderStatusEnum.Failed;
      break;
  }

  const response = await axios.post(
    BACKEND_ENDPOINT,
    {
      query: `mutation UpdateOrder($input:UpdateOrderInput!){
    updateOrder(input:$input){
        order{
            id
        }
    }}`,
      variables: {
        input: {
          orderId: parseInt(body.transaction.order_id),
          isPaid: status === OrderStatusEnum.Completed,
          status: status,
          transactionId: body.transaction.id,
        },
      },
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
