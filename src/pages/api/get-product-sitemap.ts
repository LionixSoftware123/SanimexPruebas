import type { NextApiRequest, NextApiResponse } from 'next';
import { createApolloClient } from '@/apollo/client';
import {
  ProductsDocument,
  ProductsQuery,
  ProductsQueryVariables,
  OrderEnum,
  SimpleProduct,
  ProductsOrderByEnum,
} from '@/utils/types/generated';
import { FRONTEND_ENDPOINT } from '@/utils/constants';
import moment from 'moment/moment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader('Content-Type', 'application/json');

  const queries: Partial<{ [p: string]: string | string[] }> = req.query;
  const page = parseInt(queries.take as string) / 100;

  let data: {
    loc: string;
    priority: number;
    changeFreq: string;
    lastMod: string;
  }[] = [];

  const client = createApolloClient();

  for (let i = 0; i < page; i++) {
    const offset = parseInt(queries.skip as string) + 100 * i;
    const response = await client.query<ProductsQuery, ProductsQueryVariables>({
      query: ProductsDocument,
      variables: {
        where: {
          offsetPagination: {
            size: 100,
            offset,
          },
          orderby: [
            {
              field: ProductsOrderByEnum.Date,
              order: OrderEnum.Asc,
            },
          ],
        },
      },
    });

    const products =
      response &&
      response.data &&
      response.data.products &&
      response.data.products.edges &&
      response.data.products.edges.length
        ? response.data.products?.edges.map((edge) => edge.node)
        : [];
    data = [
      ...data,
      ...products.map((product) => ({
        loc: `${FRONTEND_ENDPOINT}/productos/${
          (product as SimpleProduct)?.slug
        }`,
        priority: 0.7,
        changeFreq: 'daily',
        lastMod: moment(product.date as string).format('YYYY-MM-DD HH:mm:ss'),
      })),
    ];
  }

  res.status(200).json(data);
}
