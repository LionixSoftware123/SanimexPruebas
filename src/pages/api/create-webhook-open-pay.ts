import OpenPay, { ErrorResponse } from 'openpay';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  isProductionReady,
  OPEN_PAY_MERCHANT_ID,
  OPEN_PAY_SECRET_ID,
} from '@/utils/constants';
// import { OPEN_PAY_MERCHANT_ID } from '@/utils/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const openpay = new OpenPay(
    OPEN_PAY_MERCHANT_ID,
    OPEN_PAY_SECRET_ID,
    isProductionReady,
  );
  const params = {
    url: `https://sanimex.com.mx/api/charge-response`,
    user: 'juanito',
    password: 'passjuanito',
    event_types: [
      'verification',
      'charge.refunded',
      'charge.failed',
      'charge.cancelled',
      'charge.created',
      'charge.succeeded',
      'subscription.charge.failed',
      'transaction.expired',
      'payout.created',
      'payout.succeeded',
      'payout.failed',
      'transfer.succeeded',
      'fee.succeeded',
      'spei.received',
      'chargeback.created',
      'chargeback.rejected',
      'chargeback.accepted',
      'adjustment.created',
      'cashout.created',
      'cashout.canceled',
      'cashout.expired',
      'cashout.charged',
      'dropped.call',
      'charges.3ds.authenticated',
    ],
  };

  openpay.webhooks.create(params, function (error, webhook) {
    if (error) {
      return res.status(400).json((error as ErrorResponse).description);
    }

    return res.status(200).json(webhook);
  });
}
