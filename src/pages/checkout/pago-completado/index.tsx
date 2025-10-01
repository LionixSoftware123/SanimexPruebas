import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import {
  Order,
  LineItem,
  ProductCategory,
  Product,
  SimpleProduct,
} from '@/utils/types/generated';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '@/utils/constants';
import moment from 'moment/moment';
import 'moment/locale/es';
import { PaymentMethodEnum } from '@/modules/payment/payment-types';
import { useRouter } from 'next/router';
import { getProductBrand } from '@/modules/product/product-utils';
import currencyFormatter from 'currency-formatter';
import { useUTMCampaignHooks } from '@/modules/utm-campaign/utm-campaign-hooks';
{
  /**import bannerAnniversary from '@/images/banner-pago-finalizado.png';
import Image from 'next/image';
import Link from 'next/link';*/
}
moment.locale('es');

const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const CheckoutOrderDetails = dynamic(
  () => import('@/components/checkout/CheckoutOrderDetails'),
);
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));

const Container = dynamic(() => import('@/components/utils/Container'));

type PaymentCompleteProps = {
  order?: Order;
  orderId: number;
};
const PaymentComplete: React.FC<PaymentCompleteProps> = ({
  order,
  orderId,
}) => {
  const router = useRouter();

  const { processUTMURLs } = useUTMCampaignHooks();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const shipping = currencyFormatter.unformat(
        order?.shippingTotal as string,
        {
          code: 'USD',
        },
      );

      const totalTax = currencyFormatter.unformat(order?.totalTax as string, {
        code: 'USD',
      });

      const total = currencyFormatter.unformat(order?.total as string, {
        code: 'USD',
      });

      window.gtag('event', 'purchase', {
        currency: 'MXN',
        value: total,
        tax: totalTax,
        shipping: shipping,
        transaction_id: order?.databaseId,
        items: order?.lineItems?.nodes.map((node: LineItem) => {
          const categories: any = {};

          node.product?.node.productCategories?.nodes.forEach((category, i) => {
            if (i)
              categories[`item_category${i}` as keyof any] = (
                category as ProductCategory
              ).name;
            else
              categories['item_category' as keyof any] = (
                category as ProductCategory
              ).name;
          });

          if (node?.variation) {
            const price = currencyFormatter.unformat(
              node.variation.node.price as string,
              {
                code: 'USD',
              },
            );

            return {
              item_name: node.variation.node.name,
              item_id: node.variation.node.databaseId,
              price: price,
              item_brand: getProductBrand(node.product?.node as Product),
              quantity: node.quantity,
              ...categories,
            };
          }

          const price = currencyFormatter.unformat(
            (node.product?.node as SimpleProduct).price as string,
            {
              code: 'USD',
            },
          );

          return {
            item_name: node.product?.node.name,
            item_id: node.product?.node.databaseId,
            price: price,
            item_brand: getProductBrand(node.product?.node as Product),
            quantity: node.quantity,
            ...categories,
          };
        }),
      });
    }
  }, [order]);

  useEffect(() => {
    const products = order?.lineItems?.nodes.map(
      (node: LineItem) => node.productId,
    ) as number[];
    processUTMURLs(orderId ? parseInt(orderId.toString()) : 0, products);
  }, [orderId, order?.lineItems?.nodes, processUTMURLs]);

  return (
    <RootLayout>
      <StaticMeta
        title={'Sanimex - Pago Completado'}
        description={'Sanimex - Pago Completado'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <Container>
        <div className="w-full my-10">
          {/**Number(
            order?.total?.split('.')?.[0].replace(',', '').replace('$', ''),
          ) > 2500 ? (
            <div className="flex justify-center">
              <Link
                href={'/50-aniversario'}
                target="_blank"
                className="w-full sm:w-[350px] h-[300px] my-4"
              >
                <div className="w-full sm:w-[350px] h-[300px] relative ">
                  <Image
                    src={bannerAnniversary}
                    alt={'Important post'}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </Link>
            </div>
          ) : null*/}

          <div className="grid grid-cols-12">
            <div className="col-span-12 px-2 mb-8 text-center uppercase text-[18px] italic text-[#93278F]">
              Nota: Revise su correo donde encontrará los datos de su pedido
            </div>
            <div className="col-span-12 lg:col-start-3 lg:col-span-8 px-2 lg:px-0">
              <div className="grid grid-cols-2 lg:grid-cols-4 mb-10 border border-[#C1C1C1] ">
                <div className="border-r border-r-[#C1C1C1] p-2">
                  <p className="pb-2 text-[13px] lg:text-[16px] uppercase text-[#636464] font-Century-Gothic-Bold text-center">
                    Número del pedido:
                  </p>
                  <p className="font-Century-Gothic text-[12px] text-center">
                    #<span>{order?.databaseId}</span>
                  </p>
                </div>
                <div className="border-r border-r-[#C1C1C1] p-2">
                  <p className="text-[13px] lg:text-[16px] pb-2 uppercase text-[#636464] font-Century-Gothic-Bold text-center">
                    fecha:
                  </p>
                  <p className="font-Century-Gothic text-[12px] text-center">
                    {moment(order?.date).format('DD [de] MMMM, YYYY')}
                  </p>
                </div>
                <div className="border-r border-r-[#C1C1C1] p-2">
                  <p className="text-[13px] lg:text-[16px] pb-2 uppercase text-[#636464] font-Century-Gothic-Bold text-center">
                    Total de la orden:
                  </p>
                  <p className="font-Century-Gothic text-[12px] text-center">
                    {order?.total}
                  </p>
                </div>
                <div className="p-2">
                  <p className="text-[13px] lg:text-[16px] pb-2 uppercase text-[#636464] font-Century-Gothic-Bold text-center">
                    Método de pago:
                  </p>
                  <p className="font-Century-Gothic text-[12px] text-center">
                    {order?.paymentMethod === PaymentMethodEnum.OpenPay
                      ? 'Tarjeta'
                      : 'Transferencia bancaria directa'}
                  </p>
                </div>
              </div>
              {order?.paymentMethod === PaymentMethodEnum.Transfer ? (
                <>
                  <div>
                    <h2 className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
                      NUESTROS DETALLES BANCARIOS
                    </h2>
                  </div>
                  <div className="grid grid-cols-3 my-14">
                    <div className="border-r border-r-[#C1C1C1] p-2">
                      <p className="pb-2 uppercase text-[#636464] font-Century-Gothic-Bold text-center">
                        Banco:
                      </p>
                      <p className="font-Century-Gothic text-[12px] text-center">
                        Banorte
                      </p>
                    </div>
                    <div className="border-r border-r-[#C1C1C1] p-2">
                      <p className="pb-2 uppercase text-[#636464] font-Century-Gothic-Bold text-center">
                        Número de cuenta:
                      </p>
                      <p className="font-Century-Gothic text-[12px] text-center">
                        0633981015
                      </p>
                    </div>
                    <div className="p-2 m">
                      <p className="pb-2 uppercase text-[#636464] font-Century-Gothic-Bold text-center">
                        A nombre de:
                      </p>
                      <p className="font-Century-Gothic text-[12px] text-center">
                        Grupo Sanimex Ayuntamiento
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 my-14">
                    <div className="border-r border-r-[#C1C1C1] p-2">
                      <p className="pb-2 uppercase text-[#636464] font-Century-Gothic-Bold text-center">
                        Banco:
                      </p>
                      <p className="font-Century-Gothic text-[12px] text-center">
                        Bancomer
                      </p>
                    </div>
                    <div className="border-r border-r-[#C1C1C1] p-2">
                      <p className="pb-2 uppercase text-[#636464] font-Century-Gothic-Bold text-center">
                        Número de cuenta:
                      </p>
                      <p className="font-Century-Gothic text-[12px] text-center">
                        0117847610
                      </p>
                    </div>
                    <div className="p-2 m">
                      <p className="pb-2 uppercase text-[#636464] font-Century-Gothic-Bold text-center">
                        A nombre de:
                      </p>
                      <p className="font-Century-Gothic text-[12px] text-center">
                        Grupo Sanimex Ayuntamiento
                      </p>
                    </div>
                  </div>
                  <p className="font-Century-Gothic text-[12px] text-center pb-4">
                    <strong>
                      Para generar la referencia de pago comenzar con la palabra{' '}
                      {`ecomm`} + primer nombre del cliente*
                      <br />
                      Ejemplo: Ecomm Pedro
                    </strong>
                    <br />
                    *De no colocar correctamente la referencia, la validación
                    del pago podría tardar hasta 72 horas.
                  </p>
                </>
              ) : null}
              <CheckoutOrderDetails order={order} />
            </div>
          </div>
          {/**Number(
            order?.total?.split('.')?.[0].replace(',', '').replace('$', ''),
          ) > 2500 ? (
            <div className="flex justify-center">
              <Link
                href={'/50-aniversario'}
                target="_blank"
                className="w-full sm:w-[350px] h-[300px] my-4"
              >
                <div className="w-full sm:w-[350px] h-[300px] relative ">
                  <Image
                    src={bannerAnniversary}
                    alt={'Important post'}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </Link>
            </div>
          ) : null*/}
        </div>
      </Container>
    </RootLayout>
  );
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  if (query && !query.order_id) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
      props: {},
    };
  }

  const order = await axios.post(
    BACKEND_ENDPOINT,
    {
      query: `query FetchOrder($id: ID!, $idType: OrderIdTypeEnum) {
    order(id: $id, idType: $idType) {
        id
        databaseId
        date
        total
        totalTax
        billing {
            email
        }
        status
        transactionId
        paymentMethod
        shippingTotal
        subtotal
        lineItems {
            nodes {
                quantity
                variation {
                    node {
                        name
                        price
                        regularPrice
                        salePrice
                        stockStatus
                        dateOnSaleFrom
                        dateOnSaleTo
                        databaseId
                        sku
                        price
                        slug
                        stockStatus
                        stockQuantity
                        attributes {
                            nodes {
                                attributeId
                                name
                                label
                                value
                            }
                        }
                        featuredImage {
                            node {
                                sourceUrl
                            }
                        }
                    }
                }
                product {
                    node {
                        type
                        ... on SimpleProduct {
                            price
                            regularPrice
                            salePrice
                            stockStatus
                            dateOnSaleFrom
                            dateOnSaleTo
                            name
                            databaseId
                            sku
                            price
                            slug
                            stockStatus
                            stockQuantity
                        }
                        ... on VariableProduct {
                            price
                            regularPrice
                            salePrice
                            stockStatus
                            dateOnSaleFrom
                            dateOnSaleTo
                            name
                            databaseId
                            sku
                            price
                            slug
                            stockStatus
                            stockQuantity
                        }
                        productCategories {
                            nodes {
                                name
                                slug
                            }
                        }
                        featuredImage {
                            node {
                                sourceUrl
                            }
                        }
                        allPaMarcas {
                            edges {
                                node {
                                    databaseId
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
        customer {
            id
            databaseId
            email
        }
    }
}`,
      variables: {
        id: parseInt(query.order_id as string),
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

  return {
    props: {
      order: order.data.data.order,
      orderId: query.order_id,
    },
  };
};

export default PaymentComplete;
