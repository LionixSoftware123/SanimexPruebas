import React from 'react';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import { createApolloClient } from '@/apollo/client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FetchOrderDocument,
  Order,
  LineItem,
  OrderIdTypeEnum,
} from '@/utils/types/generated';

import moment from 'moment';
import 'moment/locale/es';
import { PaymentMethodEnum } from '@/modules/payment/payment-types';
import { useRouter } from 'next/router';
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
moment.locale('es');

const LayoutUser = dynamic(() => import('@/components/layouts/LayoutUser'));

const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));

const Container = dynamic(() => import('@/components/utils/Container'));

type UserOrderProps = {
  order?: Order;
};

const UserOrder: React.FC<UserOrderProps> = ({ order }) => {
  const plural = (order?.lineItems?.nodes.length as number) > 1 ? 's' : '';
  const router = useRouter();
  return (
    <RootLayout>
      <StaticMeta
        title={'Orden: #' + order?.databaseId}
        description={'Orden: #' + order?.databaseId}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <Container>
        <LayoutUser>
          <div className="mb-8 px-4 py-8 border border-[#D6D6D6] font-Century-Gothic">
            <div className="my-4 bg-[#F8F8F8]">
              <div className="grid grid-cols-2 md:grid-cols-4 mb-10 border border-[#C1C1C1] ">
                <div className="border-r border-r-[#C1C1C1] p-2">
                  <p className="pb-2 uppercase text-[#636464] font-Century-Gothic-Bold text-center">
                    Número del pedido:
                  </p>
                  <p className="font-Century-Gothic text-[12px] text-center">
                    #<span>{order?.databaseId}</span>
                  </p>
                </div>
                <div className="border-r border-r-[#C1C1C1] p-2">
                  <p className="pb-2 uppercase text-[#636464] font-Century-Gothic-Bold text-center">
                    fecha:
                  </p>
                  <p className="font-Century-Gothic text-[12px] text-center">
                    {moment(order?.date).format('DD [de] MMMM, YYYY')}
                  </p>
                </div>
                <div className="border-r border-r-[#C1C1C1] p-2">
                  <p className="pb-2 uppercase text-[#636464] font-Century-Gothic-Bold text-center">
                    Total de la orden:
                  </p>
                  <p className="font-Century-Gothic text-[12px] text-center">
                    {order?.total}
                  </p>
                </div>
                <div className="p-2">
                  <p className="pb-2 uppercase text-[#636464] font-Century-Gothic-Bold text-center">
                    Método de pago:
                  </p>
                  <p className="font-Century-Gothic text-[12px] text-center">
                    {order?.paymentMethod === PaymentMethodEnum.OpenPay
                      ? 'Open Pay'
                      : 'Transferencia bancaria directa'}
                  </p>
                </div>
              </div>
            </div>
            <div className="font-bold my-4">
              Artículo<span>{plural}</span> ordenado<span>{plural}</span> (
              {order?.lineItems?.nodes.length ?? 0})
            </div>
            {order?.lineItems?.nodes && order?.lineItems?.nodes ? (
              (order?.lineItems?.nodes as LineItem[]).map((item, index) => (
                <div className="my-4 border-[#D6D6D6] border-t " key={index}>
                  <div className="my-4">
                    <div className="md:flex md:space-x-4">
                      <div className=" relative w-full h-[200px] md:w-[80px] md:h-[80px] border border-[#D6D6D6]">
                        <Image
                          src={
                            item.product?.node.featuredImage?.node.sourceUrl ??
                            ''
                          }
                          fill
                          style={{ objectFit: 'cover' }}
                          alt={'items'}
                        />
                      </div>

                      <div>
                        <div>
                          <span>
                            {item.variation?.node.name ||
                              item.product?.node.name}
                          </span>{' '}
                          <span>, {item.quantity} unidades</span>
                        </div>
                        <div className="mb-4">
                          <span>{item.variation?.node.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
          <div className="mb-8 px-8 py-8 border border-[#D6D6D6] font-Century-Gothic">
            <p className="mb-4">Detalles de facturación y envío</p>
            <div className="py-3 border-b border-[#D6D6D6] mb-2 sm:mb-0 sm:flex justify-between text-[#414B69]">
              <p className="font-bold">Subtotal:</p>
              <p>
                <span>{order?.subtotal}</span>{' '}
              </p>
            </div>
            <div className="py-3 border-b border-[#D6D6D6] mb-2 sm:mb-0 sm:flex justify-between text-[#414B69]">
              <p className="font-bold">Envío:</p>
              <p>${'250,00'}</p>
            </div>
            <div className="py-3 border-b border-[#D6D6D6] mb-2 sm:mb-0 sm:flex justify-between text-[#414B69]">
              <p className="font-bold">Método de pago:</p>
              {order?.paymentMethod === 'openpay_cards' ? (
                <p className="mb-1 font-Century-Gothic-Bold">
                  Pagado con Tarjeta de débito/crédito
                </p>
              ) : (
                <p>{order?.paymentMethod}</p>
              )}
            </div>
            <div className="py-3 border-b border-[#D6D6D6] mb-2 sm:mb-0 sm:flex justify-between text-black">
              <p className="font-bold">Total:</p>
              <p className="font-bold">
                <span>{order?.total}</span>{' '}
              </p>
            </div>
          </div>
          <div className="px-8 mb-8 py-8 border border-[#D6D6D6] font-Century-Gothic">
            <p className="font-bold mb-4">Detalles de facturación y envío</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6">
              <div className="font-bold flex flex-col space-y-2 text-[#7B818E]">
                <p className=" text-black ">Dirección de facturación</p>
                <p>
                  {order?.billing?.firstName} {order?.billing?.lastName}
                </p>
                <p>{order?.billing?.address1}</p>
                <p>{order?.billing?.state}</p>
                <p>{order?.billing?.country}</p>
                <p>{order?.billing?.phone}</p>
                <p>{order?.billing?.email}</p>
              </div>
              <div className="font-bold flex flex-col space-y-2 text-[#7B818E]">
                <p className=" text-black ">Dirección de envío</p>
                <p>
                  {order?.shipping?.firstName} {order?.shipping?.lastName}
                </p>
                <p>{order?.shipping?.address1 ?? '-'}</p>
                <p>{order?.shipping?.state ?? '-'}</p>
                <p>{order?.shipping?.country ?? '-'}</p>
                <p>{order?.shipping?.phone ?? '-'}</p>
                <p>{order?.shipping?.email ?? '-'}</p>
              </div>
            </div>
          </div>
          <Link className="my-8" href={'./'}>
            &lt;&lt; Atrás
          </Link>
        </LayoutUser>
      </Container>
    </RootLayout>
  );
};

type ParamsType = {
  order?: string;
};
export const getServerSideProps = async ({
  req,
  params,
}: GetServerSidePropsContext<ParamsType>) => {
  if (req.cookies && !req.cookies.jwtAuthToken) {
    return {
      redirect: {
        destination: `/auth`,
        permanent: false,
      },
      props: {},
    };
  }

  const client = createApolloClient(
    req.cookies.wooSessionToken,
    req.cookies.jwtAuthToken,
  );

  const order = await client.query({
    query: FetchOrderDocument,
    variables: {
      id: params?.order as string,
      idType: OrderIdTypeEnum.DatabaseId,
    },
  });

  return {
    props: {
      order: order.data.order,
      baseId: params?.order as unknown as number,
    },
  };
};

export default UserOrder;
