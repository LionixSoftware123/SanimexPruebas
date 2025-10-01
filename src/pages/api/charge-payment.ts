import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import {
  OPEN_PAY_BASE_URI,
  OPEN_PAY_MERCHANT_ID,
  OPEN_PAY_SECRET_ID,
} from '@/utils/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const merchantId = OPEN_PAY_MERCHANT_ID;
  const privateKey = OPEN_PAY_SECRET_ID;

  const chargeData: {
    method: string;
    source_id: string;
    amount: string | number;
    currency: string;
    description: string;
    order_id: number;
    device_session_id: string;
    customer: {
      name: string;
      last_name: string;
      phone_number: string;
      email: string;
    };
    capture: boolean;
    redirect_url: string;
  } = req.body;

  let customers: {
    id: string;
  }[] = [];

  let customerId = undefined;

  try {
    const response = await axios.get(
      `${OPEN_PAY_BASE_URI}/v1/${merchantId}/customers?external_id=${chargeData.customer.email}&limit=1`,
      {
        auth: {
          username: privateKey,
          password: '',
        },
      },
    );

    customers = response.data;
  } catch (e) {
    return res.status(400).json((e as Error).message);
  }

  if (customers.length) {
    customerId = customers[0].id;
  } else {
    try {
      const response = await axios.post(
        `${OPEN_PAY_BASE_URI}/v1/${merchantId}/customers`,
        {
          name: chargeData.customer.name,
          email: chargeData.customer.email,
          external_id: chargeData.customer.email,
        },
        {
          auth: {
            username: privateKey,
            password: '',
          },
        },
      );

      const customer: {
        id: string;
      } = response.data;

      customerId = customer.id;
    } catch (e) {
      return res.status(400).json((e as Error).message);
    }
  }

  let charge = null;

  try {
    const response = await axios.post(
      `${OPEN_PAY_BASE_URI}/v1/${merchantId}/customers/${customerId}/charges`,
      {
        method: chargeData.method,
        source_id: chargeData.source_id,
        amount: chargeData.amount,
        currency: chargeData.currency,
        description: chargeData.description,
        order_id: chargeData.order_id,
        device_session_id: chargeData.device_session_id,
        redirect_url: chargeData.redirect_url,
        capture: true,
        use_3d_secure: 'true',
      },
      {
        auth: {
          username: privateKey,
          password: '',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    charge = response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(400).json(error.response?.data.description);
    }
  }

  return res.status(200).json({ charge });
}
