import { createAction } from '@cobuildlab/react-simple-state';

import axios, { AxiosError } from 'axios';
import currencyFormatter from 'currency-formatter';
import randomString from 'randomstring';
import {
  ActiveCampaignContact,
  ActiveCampaignContactContactList,
  ActiveCampaignCustomer,
  ActiveCampaignCustomerAlternateInput,
  ActiveCampaignCustomerInput,
  ActiveCampaignOrder,
  ActiveCampaignOrderInput,
  ActiveCampaignOrderProduct,
} from '@/modules/active-campaign/active-campaign-types';

import { ACTIVE_CAMPAIGN_TOKEN, FRONTEND_ENDPOINT } from '@/utils/constants';
import {
  fetchActiveCampaignCustomerEvent,
  fetchActiveCampaignCustomerErrorEvent,
  fetchActiveCampaignOrderEvent,
  fetchActiveCampaignOrderErrorEvent,
  createActiveCampaignUserOrderEvent,
  createActiveCampaignUserOrderErrorEvent,
  updateActiveCampaignUserOrderEvent,
  updateActiveCampaignUserOrderErrorEvent,
  updateActiveCampaignContactEvent,
  updateActiveCampaignContactErrorEvent,
  updateActiveCampaignContactCompleteEvent,
  updateActiveCampaignContactCompleteErrorEvent,
} from '@/modules/active-campaign/active-campaign-events';
import { Cart, Customer, User, SimpleProduct } from '@/utils/types/generated';
import moment from 'moment';
import { ShippingEnum } from '@/components/checkout/CheckoutShippingMethods';
import validator from 'validator';

export const fetchActiveCampaignCustomers = createAction(
  fetchActiveCampaignCustomerEvent,
  fetchActiveCampaignCustomerErrorEvent,
  async (user) => {
    const response = await axios.get<{
      ecomCustomers: ActiveCampaignCustomer[];
    }>(`/api/get-active-campaign-customers?email=${user?.email}`, {
      headers: {
        'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
      },
    });

    const customers = response.data.ecomCustomers;

    for (const customer of customers) {
      const { email, subscriberid } = customer;

      try {
        let contactRetrieve;

        if (subscriberid === '0') {
          contactRetrieve = await axios.get(
            `/api/get-contact-email-active-campaign?email=${email}`,
            {
              headers: {
                'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
              },
            },
          );
        }

        const contact = contactRetrieve?.data?.contacts[0];

        if (contact && user?.name) {
          const [firstName, ...lastNameParts] = user.name.split(' ');
          const lastName = lastNameParts.join(' ') || '';

          const updatedContact = {
            contact: {
              firstName: firstName || user?.name,
              lastName: lastName || '',
              email: user?.email,
            },
          };

          await axios.put(
            `/api/update-active-campaign-contact?id=${contact.id}`,
            updatedContact,
            {
              headers: {
                'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
              },
            },
          );
        }
      } catch (error) {
        console.error(
          `Error processing customer (email: ${email}, subscriberid: ${subscriberid}):`,
          error,
        );
      }
    }

    return customers;
  },
);

export const fetchActiveCampaignOrders = createAction(
  fetchActiveCampaignOrderEvent,
  fetchActiveCampaignOrderErrorEvent,
  async (externalCheckoutId?: string) => {
    const response = await axios.get<{ ecomOrders: ActiveCampaignOrder[] }>(
      `/api/get-active-campaign-orders?externalCheckoutId=${externalCheckoutId}`,
      {
        headers: {
          'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
        },
      },
    );

    return response.data.ecomOrders;
  },
);

export const createActiveCampaignOrder = async (data: {
  customer?: Customer;
  cart?: Cart;
  orderId?: number | null;
  shippingMethod?: string;
  shippingTotal: number;
}) => {
  let customer;
  const customers = await getActiveCampaignCustomers(
    data?.customer?.email as string,
  );
  if (customers.length) {
    customer = customers[0];
  } else {
    customer = await createActiveCampaignCustomer(data?.customer as Customer);
  }

  const cart = data?.cart;
  const shippingMethod = data?.shippingMethod;
  const shippingTotal = data?.shippingTotal;
  const orderId = data?.orderId;

  const orderData: {
    ecomOrder: ActiveCampaignOrderInput;
  } = {
    ecomOrder: {
      externalid: orderId?.toString(),
      source: '1',
      email: customer.email,
      orderProducts: cart?.contents?.nodes.map((node) => {
        if (node.variation) {
          return {
            externalid: node.variation.node.databaseId,
            name: node.variation.node.name,
            quantity: node.quantity,
            sku: node.variation.node.sku,
            price:
              currencyFormatter.unformat(node.subtotal as string, {
                code: 'USD',
              }) * 100,
            imageUrl: node.variation.node.featuredImage?.node.sourceUrl,
            productUrl: `${FRONTEND_ENDPOINT}/productos/${node.variation.node.slug}`,
          };
        }

        return {
          externalid: node.product?.node.databaseId,
          name: node.product?.node.name,
          quantity: node.quantity,
          sku: node.product?.node.sku,
          price:
            currencyFormatter.unformat(node.subtotal as string, {
              code: 'USD',
            }) * 100,
          imageUrl: node.product?.node.featuredImage?.node.sourceUrl,
          productUrl: `${FRONTEND_ENDPOINT}/productos/${node.product?.node.slug}`,
        };
      }) as ActiveCampaignOrderProduct[],
      orderUrl: '',
      externalCreatedDate: moment().format().toString(),
      externalUpdatedDate: moment().format().toString(),
      connectionid: customer.connectionid,
      customerid: customer.id,
      currency: 'MXN',
      orderNumber: orderId?.toString(),
      shippingMethod: shippingMethod,
      totalPrice:
        currencyFormatter.unformat(cart?.total as string, {
          code: 'USD',
        }) * 100,
      shippingAmount: shippingTotal * 100,
      taxAmount: 0,
      discountAmount: 0,
    },
  };

  const response = await axios.post<{
    ecomOrder: ActiveCampaignOrderInput;
  }>(`/api/create-active-campaign-order`, orderData, {
    headers: {
      'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
    },
  });

  return response.data;
};

export const createActiveCampaignCustomer = async (customer: Customer) => {
  const response = await axios.post<{
    ecomCustomer: ActiveCampaignCustomer;
  }>(
    `/api/create-active-campaign-customer`,
    {
      ecomCustomer: {
        connectionid: '1',
        externalid: customer.databaseId?.toString(),
        email: customer.email,
        acceptsMarketing: 1,
        name: customer.firstName,
      },
    },
    {
      headers: {
        'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
      },
    },
  );

  return response.data.ecomCustomer;
};

export const createActiveCampaignRandomCustomer = async (
  params: ActiveCampaignCustomerInput,
) => {
  let response;
  try {
    response = await axios.post<{
      ecomCustomer: ActiveCampaignCustomer;
    }>(`/api/create-active-campaign-customer`, params, {
      headers: {
        'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
      },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('createActiveCampaignCustomer', error);
    }
  }

  return response?.data.ecomCustomer;
};

export const createActiveCampaignRandomCustomerAlternative = async (
  params: ActiveCampaignCustomerAlternateInput,
) => {
  let response;
  try {
    response = await axios.post<{
      ecomCustomer: ActiveCampaignCustomer;
    }>(
      `${FRONTEND_ENDPOINT}/api/create-active-campaign-customer-alternate`,
      {
        ecomCustomer: {
          connectionid: '1',
          externalid: randomString.generate(10),
          email: params.ecomCustomer.email,
          acceptsMarketing: 1,
        },
      },
      {
        headers: {
          'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
        },
      },
    );
    console.log({ response });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('createActiveCampaignCustomer', error);
    }
  }

  return response?.data.ecomCustomer;
};

export const getActiveCampaignCustomers = async (email?: string) => {
  const response = await axios.get<{
    ecomCustomers: ActiveCampaignCustomer[];
  }>(`/api/get-active-campaign-customers?email=${email}`, {
    headers: {
      'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
    },
  });
  return response.data.ecomCustomers;
};

export const createActiveCampaignUserOrder = createAction(
  createActiveCampaignUserOrderEvent,
  createActiveCampaignUserOrderErrorEvent,
  async (data: {
    cart: Cart;
    user: User;
    externalCheckoutId: string;
    abandonedDate: string;
  }) => {
    const user = data.user;
    const cart = data.cart;
    const abandonedDate = data.abandonedDate;
    const externalCheckoutId = data.externalCheckoutId;
    let customer;
    const customers = await getActiveCampaignCustomers(user?.email as string);
    if (customers.length) {
      customer = customers[0];
    } else {
      customer = await createActiveCampaignCustomer(user as Customer);
    }

    const orderData: {
      ecomOrder: ActiveCampaignOrderInput;
    } = {
      ecomOrder: {
        externalid: null,
        externalcheckoutid: externalCheckoutId,
        abandonedDate: abandonedDate,
        source: '1',
        email: customer.email,

        orderProducts: cart?.contents?.nodes.map((node) => {
          if (node.variation) {
            return {
              externalid: node.variation.node.databaseId,
              name: node.variation.node.name,
              quantity: node.quantity,
              sku: node.variation.node.sku,
              price:
                currencyFormatter.unformat(
                  node.variation.node.price as string,
                  {
                    code: 'USD',
                  },
                ) * 100,
              imageUrl: node.variation.node.featuredImage?.node.sourceUrl,
              productUrl: `${FRONTEND_ENDPOINT}/productos/${node.variation.node.slug}`,
            };
          }

          return {
            externalid: node.product?.node.databaseId,
            name: node.product?.node.name,
            quantity: node.quantity,
            sku: node.product?.node.sku,
            price:
              currencyFormatter.unformat(
                (node.product?.node as SimpleProduct).price as string,
                {
                  code: 'USD',
                },
              ) * 100,
            imageUrl: node.product?.node.featuredImage?.node.sourceUrl,
            productUrl: `${FRONTEND_ENDPOINT}/productos/${node.product?.node.slug}`,
          };
        }) as ActiveCampaignOrderProduct[],
        orderUrl: '',
        externalCreatedDate: moment().format().toString(),
        externalUpdatedDate: moment().format().toString(),
        connectionid: customer.connectionid,
        customerid: customer.id,
        currency: 'MXN',
        orderNumber: '',
        shippingMethod: '',
        totalPrice:
          currencyFormatter.unformat(cart?.total as string, {
            code: 'USD',
          }) * 100,
        shippingAmount: 0,
        taxAmount: 0,
        discountAmount: 0,
      },
    };

    const response = await axios.post<{
      ecomOrder: ActiveCampaignOrder;
    }>(`/api/create-active-campaign-order`, orderData, {
      headers: {
        'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
      },
    });
    return response.data.ecomOrder;
  },
);

export const updateActiveCampaignUserOrder = createAction(
  updateActiveCampaignUserOrderEvent,
  updateActiveCampaignUserOrderErrorEvent,
  async (data: {
    cart: Cart;
    user: User;
    externalCheckoutId: string;
    abandonedDate: string;
    orderId: string;
    externalOrderId: null;
    shippingInfo?: {
      shippingOption: ShippingEnum;
      shippingZone:
        | {
            id: number;
            name: string;
            postalCode: string[];
            address?: string;
          }
        | undefined;
    };
    shippingTotal: 0 | 250;
  }) => {
    return await updateActiveCampaignUserOrderAction(data);
  },
);

export const updateActiveCampaignUserOrderAction = async (data: {
  cart: Cart;
  user: User;
  externalCheckoutId: string;
  abandonedDate: string;
  orderId: string;
  externalOrderId?: null | number;
  shippingMethod?: string;
  shippingTotal: number;
}) => {
  const user = data.user;
  const cart = data.cart;
  const externalCheckoutId = data.externalCheckoutId;
  const shippingMethod = data?.shippingMethod;
  const shippingTotal = data?.shippingTotal;
  const externalOrderId = data?.externalOrderId;
  const abandonedDate = data?.abandonedDate;

  let customer;
  const customers = await getActiveCampaignCustomers(user?.email as string);
  if (customers.length) {
    customer = customers[0];
  } else {
    customer = await createActiveCampaignCustomer(user as Customer);
  }
  const orderData: {
    ecomOrder: ActiveCampaignOrderInput;
  } = {
    ecomOrder: {
      externalid: externalOrderId ? externalOrderId.toString() : null,
      externalcheckoutid: externalCheckoutId,
      source: '1',
      email: customer.email,
      abandonedDate: abandonedDate,
      orderProducts: cart?.contents?.nodes.map((node) => {
        if (node.variation) {
          return {
            externalid: node.variation.node.databaseId,
            name: node.variation.node.name,
            quantity: node.quantity,
            sku: node.variation.node.sku,
            price:
              currencyFormatter.unformat(node.variation.node.price as string, {
                code: 'USD',
              }) * 100,
            imageUrl: node.variation.node.featuredImage?.node.sourceUrl,
            productUrl: `${FRONTEND_ENDPOINT}/productos/${node.variation.node.slug}`,
          };
        }

        return {
          externalid: node.product?.node.databaseId,
          name: node.product?.node.name,
          quantity: node.quantity,
          sku: node.product?.node.sku,
          price:
            currencyFormatter.unformat(
              (node.product?.node as SimpleProduct).price as string,
              {
                code: 'USD',
              },
            ) * 100,
          imageUrl: node.product?.node.featuredImage?.node.sourceUrl,
          productUrl: `${FRONTEND_ENDPOINT}/productos/${node.product?.node.slug}`,
        };
      }) as ActiveCampaignOrderProduct[],
      orderUrl: `${FRONTEND_ENDPOINT}/checkout/pago-completado?order_id=${externalOrderId}`,
      externalCreatedDate: moment().format().toString(),
      externalUpdatedDate: moment().format().toString(),
      connectionid: customer.connectionid,
      customerid: customer.id,
      currency: 'MXN',
      orderNumber: '',
      shippingMethod: '',
      totalPrice:
        currencyFormatter.unformat(cart?.total as string, {
          code: 'USD',
        }) *
          100 +
        shippingTotal * 100,
      shippingAmount: shippingTotal * 100,
      taxAmount: 0,
      discountAmount: 0,
    },
  };

  if (shippingMethod) {
    orderData.ecomOrder.shippingMethod = shippingMethod;
  }

  const response = await axios.put<{
    ecomOrder: ActiveCampaignOrder;
  }>(`/api/update-active-campaign-order?order_id=${data.orderId}`, orderData, {
    headers: {
      'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
    },
  });
  return response.data.ecomOrder;
};

export const createActiveCampaignContact = async (data?: {
  contact: {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    fieldValues?: {
      field?: string;
      value?: string;
    }[];
  };
}) => {
  let response;
  try {
    response = await axios.post<{
      contact: ActiveCampaignContact;
    }>('/api/create-active-campaign-contact', data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('fetchActiveCampaignContactsList', error.response);
    }
  }
  return response?.data.contact;
};

// export const updateActiveCampaignContact = async (
//   id?: number,
//   data?: {
//     contact: {
//       email?: string;
//       firstName?: string;
//       lastName?: string;
//       phone?: string;
//       fieldValues?: {
//         field?: string;
//         value?: string;
//       }[];
//     };
//   },
// ) => {
//   let response;
//   try {
//     response = await axios.put<{
//       contact: ActiveCampaignContact;
//     }>(`/api/update-active-campaign-contact?id=${id}`, data);
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       console.log(
//         'fetchActiveCampaignContactsList',
//         error.response?.data.description,
//       );
//     }
//   }

//   return response?.data.contact;
// };

export const updateActiveCampaignContact = createAction(
  updateActiveCampaignContactEvent,
  updateActiveCampaignContactErrorEvent,
  async (data: any): Promise<ActiveCampaignCustomer | undefined> => {
    console.log('contact data', data);
    try {
      const response = await axios.get(
        `/api/get-contact-email-active-campaign?email=${data?.email}`,
        {
          headers: {
            'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
          },
        },
      );

      const contact = response?.data?.contacts[0];
      console.log('contact', contact);
      const contactId = contact?.id;

      if (contactId) {
        const updatedContactResponse = await axios.put(
          `/api/update-active-campaign-contact?id=${contactId}`,
          {
            contact: {
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              phone: data.phone,
              fieldValues: [
                { field: '0', value: 'No tiene Cuenta' },
                { field: '1', value: data.state },
                { field: '2', value: data.postalCode },
                { field: '3', value: data.address1 },
              ],
            },
          },
        );
        return updatedContactResponse.data.contact;
      } else {
        console.error('No se encontró el contacto con el email proporcionado.');
      }
    } catch (error) {
      console.error('Error al actualizar el contacto:', error);
    }
    return undefined;
  },
);

export const updateActiveCampaignCompleteContact = createAction(
  updateActiveCampaignContactCompleteEvent,
  updateActiveCampaignContactCompleteErrorEvent,
  async (data: any): Promise<ActiveCampaignCustomer | undefined> => {
    console.log('contact data', data);

    try {
      if (data.email && validator.isEmail(data.email as string)) {
        const contacts = await fetchActiveCampaignContactsAlternateList(
          data.email,
        );
        //console.log({contacts});
        let contact;

        if (contacts?.length) {
          contact = contacts?.length ? contacts[0] : undefined;
        } else {
          // Si no existe el customer, se chequea en la base de datos de wordpress para obtener el external id

          await createActiveCampaignRandomCustomerAlternative({
            ecomCustomer: {
              connectionid: '1',
              externalid: randomString.generate(10),
              email: data.email,
              acceptsMarketing: '1',
            },
          });

          //console.log({response});

          const contacts = await fetchActiveCampaignContactsList(data.email);
          contact = contacts?.length ? contacts[0] : undefined;
        }
        //console.log('contact', contact);
        const contactId = contact?.id;

        if (contactId) {
          const updatedContactResponse = await axios.put(
            `/api/update-active-campaign-contact?id=${contactId}`,
            {
              contact: {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                fieldValues: [
                  { field: '0', value: 'No tiene Cuenta' },
                  { field: '1', value: data?.state ?? '' },
                  { field: '2', value: data?.postalCode ?? '' },
                  { field: '3', value: data?.address1 ?? '' },
                  { field: '5', value: data?.postalCode ?? '' },
                  { field: '10', value: data?.note ?? '' },
                  { field: '9', value: data?.state ?? '' },
                  { field: '11', value: data?.country ?? '' },
                ],
              },
            },
          );
          return updatedContactResponse.data.contact;
        }
        return undefined;
      } else {
        throw new Error(
          'No se encontró el contacto con el email proporcionado.',
        );
      }
    } catch (error) {
      throw new Error((error as Error)?.message);
    }
    //return undefined;
  },
);

export const fetchActiveCampaignContactContactLists = async (
  contactListId: number,
): Promise<ActiveCampaignContactContactList[] | undefined> => {
  let response;
  try {
    response = await axios.get<{
      contactLists: ActiveCampaignContactContactList[];
    }>(`/api/get-active-campaign-contact-list?id=${contactListId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(
        'fetchActiveCampaignContactsList',
        error.response?.data.description,
      );
    }
  }

  return response?.data.contactLists;
};

export const fetchActiveCampaignContactsList = async (
  email?: string,
): Promise<ActiveCampaignContact[] | undefined> => {
  let response;
  try {
    response = await axios.get<{
      contacts: ActiveCampaignContact[];
    }>(
      `/api/get-active-campaign-contacts?email=${encodeURIComponent(
        email as string,
      )}`,
      {
        headers: {
          'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
        },
      },
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(
        'fetchActiveCampaignContactsList',
        error.response?.data.description,
      );
    }
  }

  return response?.data.contacts;
};

export const fetchActiveCampaignContactsAlternateList = async (
  email?: string,
): Promise<ActiveCampaignContact[] | undefined> => {
  let response;
  try {
    response = await axios.get<ActiveCampaignContact[]>(
      `${FRONTEND_ENDPOINT}/api/get-active-campaign-contact-list-alternate?email=${email}`,
      {
        headers: {
          'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
        },
      },
    );
    //console.log('list customer',{response})
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(
        'fetchActiveCampaignContactsList',
        error.response?.data.description,
      );
    }
  }
  //console.log('respuesta completa',response?.data)
  return response?.data;
};

export const updateActiveCampaignContactList = async (data?: {
  contactList: {
    list: number;
    contact: number;
    status: 1;
  };
}) => {
  let response;
  try {
    response = await axios.post<{
      contact: ActiveCampaignContact;
    }>(`/api/update-active-campaign-contact-list`, data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(
        'updateActiveCampaignContactList',
        error.response?.data.description,
      );
    }
  }

  return response?.data.contact;
};
