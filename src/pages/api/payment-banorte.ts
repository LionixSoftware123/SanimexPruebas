import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import {
  BACKEND_ENDPOINT,
  BANORTE_MERCHANT_ID,
  BANORTE_PASSWORD,
  BANORTE_USER,
} from '@/utils/constants';
import { OrderStatusEnum } from '@/utils/types/generated';

type QueryParams = {
  CARD_NUMBER: string;
  CARD_EXP: string;
  AMOUNT: string;
  SECURITY_CODE: string;
  ORDER_ID?: string;
};

type BodyParams = {
  CAVV: string;
  ECI: string;
  Status: string;
  REFERENCE3D: string;
  XID: string;
  TRANSACTION_ID: string;
};

type ResponseParams = {
  MERCHANT_ID?: string;
  USER?: string;
  PASSWORD?: string;
  CMD_TRANS?: string;
  TERMINAL_ID?: string;
  MODE?: 'PRD' | 'AUT' | 'DEC' | 'RND';
  STATUS_3D?: string;
  CAVV?: string;
  VERSION_3D?: string;
  ENTRY_MODE?: 'MANUAL' | 'NORMAL';
  ECI?: string;
  XID?: string;
} & QueryParams;

type HeaderParams = {
  date?: string;
  texto?: string;
  resultado_payw: 'A' | 'D' | 'R' | 'T';
  id_afiliacion?: string;
  fecha_rsp_cte?: string;
  codigo_aut?: string;
  referencia?: string;
  fecha_req_cte?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = req.body as BodyParams;
  const query = req.query as QueryParams;

  if (!(body.CAVV || body.XID))
    return res.writeHead(200, {
      Location: `/checkout/finalizar-compra?status_code=${body.Status}`,
      method: 'GET',
    });

  let data: ResponseParams = {
    MERCHANT_ID: BANORTE_MERCHANT_ID,
    USER: BANORTE_USER,
    PASSWORD: BANORTE_PASSWORD,
    CMD_TRANS: 'VENTA',
    TERMINAL_ID: '91592131',
    MODE: 'AUT',
    STATUS_3D: '200',
    CAVV: body.CAVV,
    VERSION_3D: '2',
    ENTRY_MODE: 'MANUAL',
    ECI: body.ECI,
    CARD_NUMBER: query.CARD_NUMBER.replaceAll(' ', ''),
    CARD_EXP: query.CARD_EXP,
    AMOUNT: query.AMOUNT,
    SECURITY_CODE: query.SECURITY_CODE,
  };

  if (body.XID) {
    data = {
      ...data,
      XID: body.XID,
    };
  }

  const result = '?' + new URLSearchParams(data).toString();
  const response = await axios.post(
    `https://via.pagosbanorte.com/payw2${result}`,
  );

  const headers = response.headers as HeaderParams;
  if (headers.resultado_payw !== 'A') {
    return res.redirect(
      `/checkout/finalizar-compra?resultado_payw=${headers.resultado_payw}`,
    );
  }

  await axios.post(
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
          orderId: parseInt(query.ORDER_ID as string),
          isPaid: true,
          status: OrderStatusEnum.Completed,
          transactionId: headers.referencia,
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

  return res.redirect('/checkout/pago-completado');
}
