import {
  CreditCardDataType,
  PaymentDataType,
  ShippingAddressType,
} from '@/modules/payment/payment-types';
import { createApolloClient } from '@/apollo/client';
import generatePassword from 'generate-password';
import {
  CountriesEnum,
  CreateCustomerDocument,
  CreateCustomerMutation,
  CreateCustomerMutationVariables,
  CreateOrderDocument,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  Customer,
  RegisterCustomerPayload,
} from '@/utils/types/generated';
import { ShippingEnum } from '@/components/checkout/CheckoutShippingMethods';
import {
  fetchUserEvent,
  OnTokenEvent,
  OnWooSessionTokenEvent,
} from '@/modules/auth/auth-events';
import postalCodeShipping from '@/utils/postal-code-shipping.json';
import {
  BANORTE_MERCHANT_ID,
  BANORTE_PAYMENT_ENDPOINT,
} from '@/utils/constants';
import randomString from 'randomstring';
import cardValidator from 'card-validator';
import { fetchActiveCampaignUserOrderEvent } from '@/modules/active-campaign/active-campaign-events';
import currencyFormatter from 'currency-formatter';
import BinList from '@/utils/bin-list2.json';
import { confirmGeolocationStore } from '@/modules/geolocation/geolocation-events';
import { calculateCost } from '@/modules/geolocation/geolocation-utils';
import { ShopType } from '@/modules/shop/shop-types';
import { Cart } from '@/lib/cart/v2/cart-types';

export type FormType = {
  CARD_NUMBER: string;
  CARD_EXP: string;
  AMOUNT: string;
  CARD_TYPE: 'VISA' | 'MC';
  MERCHANT_ID: string;
  MERCHANT_NAME: string;
  MERCHANT_CITY: string;
  FORWARD_PATH: string;
  '3D_CERTIFICATION': string;
  REFERENCE3D: string;
  COUNTRY: string;
  CITY: string;
  EMAIL: string;
  INITIAL_DEFERMENT?: string;
  PAYMENTS_NUMBER?: string;
  PLAN_TYPE?: string;
  NAME: string;
  LAST_NAME: string;
  POSTAL_CODE: string;
  STREET: string;
  THREED_VERSION: string;
  MOBILE_PHONE: string;
  CREDIT_TYPE: string;
  SECURITY_CODE: string;
};
const fetchRegisterCustomer = async (
  data: PaymentDataType,
): Promise<RegisterCustomerPayload> => {
  const client = createApolloClient();
  const response = await client.mutate<
    CreateCustomerMutation,
    CreateCustomerMutationVariables
  >({
    mutation: CreateCustomerDocument,
    variables: {
      input: {
        username: data.email,
        email: data.email,
        password: generatePassword.generate({
          length: 10,
          numbers: true,
        }),
      },
    },
  });

  return response.data?.registerCustomer as RegisterCustomerPayload;
};

export const createBanortePayment = async (
  creditCardData: CreditCardDataType,
  userData: PaymentDataType,
  shipping: ShippingAddressType,
  shop: ShopType,
  shippingInfo: {
    shippingOption: ShippingEnum;
    shippingZone:
      | {
          id: number;
          name: string;
          postalCode: string[];
          address?: string;
        }
      | undefined;
  },
  cart: Cart,
  onSuccess: (data: { form: FormType; orderId: any }) => void,
  onError?: (message: string) => void,
) => {
  let jwtAuthToken = OnTokenEvent.get()?.token;
  const wooSessionToken = OnWooSessionTokenEvent.get()?.token;
  const activeCampaignUserOrder =
    fetchActiveCampaignUserOrderEvent.get()?.order;
  let customer: Customer | undefined = undefined;
  const { distance } = confirmGeolocationStore.get();
  const shippingAmount = calculateCost(distance);

  if (!jwtAuthToken) {
    try {
      const customerData = await fetchRegisterCustomer(userData);
      jwtAuthToken = customerData.authToken;
      customer = customerData?.customer as Customer;
    } catch (error) {
      return onError && onError('Tenemos problemas para generar el customer');
    }
  } else {
    customer = fetchUserEvent.get()?.user as Customer;
  }

  const client = createApolloClient(
    wooSessionToken as string,
    jwtAuthToken as string,
  );

  const shippingTotal = postalCodeShipping.includes(
    parseInt(shipping.postalCode || (userData.postalCode as string)),
  )
    ? shippingAmount
    : 0;

  const variables: CreateOrderMutationVariables = {
    input: {
      isPaid: false,
      currency: 'MXN',
      customerNote: userData.note,
      coupons: cart?.coupons
        ? cart.coupons.map((appliedCoupon) => appliedCoupon?.code as string)
        : [],
      billing: {
        address1: userData.address1,
        address2: userData.address2,
        state: userData.state,
        email: userData.email,
        firstName: userData.firstname,
        lastName: userData.lastname,
        postcode: userData.postalCode,
        phone: userData.phone,
        country: CountriesEnum.Mx,
      },
      customerId: customer?.databaseId,
      paymentMethod: 'openpay_cards',
      shipping: {
        address1: shipping.address1 ? shipping.address1 : userData.address1,
        state: shipping.state ? shipping.state : userData.state,
        firstName: shipping.firstname ? shipping.firstname : userData.firstname,
        lastName: shipping.lastname ? shipping.lastname : userData.lastname,
        postcode: shipping.postalCode
          ? shipping.postalCode
          : userData.postalCode,
        phone: shipping.phone ? shipping.phone : userData.phone,
        country: CountriesEnum.Mx,
      },
      shippingLines: [
        {
          total:
            shippingInfo.shippingOption === ShippingEnum.ByShipping
              ? `$${shippingTotal}`
              : `$0`,
          methodId:
            shippingInfo.shippingOption === ShippingEnum.ByShipping
              ? 'flat_rate'
              : 'local_pickup',
          methodTitle:
            shippingInfo.shippingOption === ShippingEnum.ByShipping
              ? postalCodeShipping.includes(
                  parseInt(
                    shipping.postalCode
                      ? shipping.postalCode
                      : (userData.postalCode as string),
                  ),
                )
                ? 'Envió a Domicilio'
                : 'Su Código Postal está fuera de nuestra área servicio; sin embargo, al terminar su compra nuestro equipo de venta le llamará para definir su costo de envío según la distancia.'
              : `Recoger en: ${shop.CALLE}, C.P. ${shop.CP} Municipio ${
                  shop.CIUDAD
                } ${shop.ESTADO} Teléfono: ${shop.TELÉFONOS.map(
                  ({ key }) => key,
                ).join(' y ')}` || 'Retiro en tienda',
        },
      ],
      lineItems: cart.items.map((item) => {
        if (item.variation.length > 0) {
          return {
            variationId: item.id,
            name: item.name,
            quantity: item.quantity,
            sku: item.sku,
            total: (Number(item.totals.line_total) / 100).toFixed(2),
            subtotal: (Number(item.totals.line_subtotal) / 100).toFixed(2),
          };
        }

        return {
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          sku: item.sku,
          total: (Number(item.totals.line_total) / 100).toFixed(2),
          subtotal: (Number(item.totals.line_subtotal) / 100).toFixed(2),
        };
      }),
    },
  };

  if (activeCampaignUserOrder) {
    variables.input.metaData = [
      {
        key: 'orderId',
        value: activeCampaignUserOrder?.id as string,
      },
      {
        key: 'abandonedDate',
        value: activeCampaignUserOrder?.abandonedDate as string,
      },
      {
        key: 'externalCheckoutId',
        value: activeCampaignUserOrder?.externalcheckoutid as string,
      },
    ];
  }

  const order = await client.mutate<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >({
    mutation: CreateOrderDocument,
    variables: variables,
  });

  const cardInfo = cardValidator.number(
    creditCardData.creditCardNumber as string,
  );
  const cartTotal = currencyFormatter.unformat(
    (Number((cart as Cart).totals.total_price) / 100).toString(),
    {
      code: 'USD',
      precision: 2,
    },
  );

  const form: FormType = {
    CARD_NUMBER: creditCardData.creditCardNumber as string,
    CARD_EXP: creditCardData.expiredDate as string,
    AMOUNT:
      shippingInfo.shippingOption === ShippingEnum.ByShipping
        ? (cartTotal + shippingTotal).toFixed(2)
        : cartTotal.toFixed(2),
    MERCHANT_ID: BANORTE_MERCHANT_ID,
    MERCHANT_NAME: 'SANIMEX AYUNTAMIENTO',
    MERCHANT_CITY: 'ESTADO DE MEXICO',
    FORWARD_PATH: BANORTE_PAYMENT_ENDPOINT,
    '3D_CERTIFICATION': '03',
    REFERENCE3D: randomString.generate(10),
    COUNTRY: 'MX',
    CITY: userData.state as string,
    EMAIL: userData.email as string,
    NAME: userData.firstname as string,
    LAST_NAME: userData.lastname as string,
    POSTAL_CODE: userData.postalCode as string,
    STREET: userData.address1 as string,
    THREED_VERSION: '2',
    MOBILE_PHONE: userData.phone as string,
    CREDIT_TYPE: 'CR',
    SECURITY_CODE: creditCardData.cvc as string,
    CARD_TYPE: cardInfo.card?.type === 'visa' ? 'VISA' : 'MC',
  };

  return onSuccess({ form, orderId: order?.data?.createOrder?.orderId });
};

export const checkCreditCardBin = (card: string) => {
  const creditCard = (card || '').replaceAll(' ', '');
  if (creditCard.length < 16) return false;

  return !!(BinList as { bin: number; type: 'DÉBITO' | 'CRÉDITO' }[]).find(
    (binData) =>
      creditCard.includes(binData.bin.toString()) && binData.type === 'CRÉDITO',
  );
};
