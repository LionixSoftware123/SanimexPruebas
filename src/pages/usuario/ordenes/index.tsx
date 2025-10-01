import React from 'react';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import { createApolloClient } from '@/apollo/client';
import jwtDecode from 'jwt-decode';
import {
  FetchUserDocument,
  UserNodeIdTypeEnum,
  User,
  useFetchOrdersQuery,
  VariableProduct,
  ProductTypesEnum,
} from '@/utils/types/generated';
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/es';
import { getOrderStatus } from '@/modules/orders/order-utils';
import { useRouter } from 'next/router';
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
moment.locale('es');

const OrderSkeleton = dynamic(
  () => import('@/components/user/components/OrderSkeleton'),
);
const LayoutUser = dynamic(() => import('@/components/layouts/LayoutUser'));

const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));

const Container = dynamic(() => import('@/components/utils/Container'));

type UserOrdersProps = {
  user?: User;
};

const UserOrders: React.FC<UserOrdersProps> = ({ user }) => {
  const { data, loading } = useFetchOrdersQuery({
    variables: {
      where: {
        customerId: user?.databaseId,
      },
    },
  });
  const router = useRouter();
  return (
    <RootLayout>
      <StaticMeta
        title={'Ordenes'}
        description={'Ordenes'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <Container>
        <LayoutUser>
          <div className="col-span-full  text-[#333E48] font-century-Gothic">
            <div className="flex justify-between">
              <div className="font-Century-Gothic-Bold text-[25px]">
                Mis pedidos
              </div>
            </div>
            {loading ? (
              <OrderSkeleton />
            ) : (
              <div className="text-[14px] flex flex-col pb-4 ">
                {data &&
                data.orders &&
                data.orders.nodes &&
                data.orders.nodes.length > 0 ? (
                  data.orders.nodes.map((item, index) => (
                    <div key={index} className="border-b border-[#C1C1C1] pb-2">
                      <div className="mb-1 font-Century-Gothic-Bold">
                        Comprado el {moment(item.date).format('LLL')}
                      </div>
                      {item.paymentMethod === 'openpay_cards' && (
                        <div className="mb-1 font-Century-Gothic-Bold">
                          Pagado con Tarjeta de débito/crédito
                        </div>
                      )}

                      {item.paymentMethod === 'bacs' && (
                        <div className="mb-1 font-Century-Gothic-Bold">
                          Pagado por transferencia
                        </div>
                      )}

                      {item.transactionId ? (
                        <div className="mb-1 font-Century-Gothic-Bold">
                          Numero de transacción {item.transactionId}
                        </div>
                      ) : null}

                      <div className="grid grid-cols-2 ">
                        <div className="mb-1 ">
                          {item?.lineItems?.nodes.map((node, key) => {
                            if (
                              node.product?.node?.type ===
                              ProductTypesEnum.Variable
                            ) {
                              return (
                                <div className="mb-1" key={key}>
                                  {node.variation?.node.name} x{node?.quantity}
                                </div>
                              );
                            }

                            return (
                              <div className="mb-1" key={key}>
                                {(node.product?.node as VariableProduct)?.name}{' '}
                                x{node?.quantity}
                              </div>
                            );
                          })}

                          <div className="text-[12px] text-[#666666]">
                            <span className="">Total de Compra</span>
                            <span className="ml-4 font-Century-Gothic-Bold ">
                              {item?.total}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col place-items-end self-end">
                          <div className="text-[#0071CE] font-Century-Gothic-Bold text-[18px]">
                            {getOrderStatus(item?.status)}
                          </div>
                          <Link
                            className="font-Century-Gothic-Bold text-[12px] text-[#93278F]"
                            href={'/usuario/ordenes/' + item.databaseId}
                          >
                            Ver detalles de compra
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center items-center h-[200px] w-full font-century-Gothic text-[16px]  ">
                      No hay pedidos para mostrar.
                    </div>
                    <Link
                      href={'/productos'}
                      className="flex justify-center font-Century-Gothic-Bold font-[600] text-[16px] text-white  uppercase w-[220px] h-[54px] rounded-[5px] bg-[#1c355e]"
                    >
                      <div className="flex justify-center self-center">
                        Ver Productos
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </LayoutUser>
      </Container>
    </RootLayout>
  );
};

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
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

  const decodeToken = jwtDecode<{
    data: { user: { id: string } };
    exp?: number;
  }>(req.cookies.jwtAuthToken as string);

  const user = await client.query({
    query: FetchUserDocument,
    variables: {
      id: decodeToken.data.user.id,
      idType: UserNodeIdTypeEnum.DatabaseId,
    },
  });

  return {
    props: {
      user: user.data.user,
    },
  };
};

export default UserOrders;
