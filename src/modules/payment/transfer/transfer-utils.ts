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
  OrderStatusEnum,
  UpdateOrderMutation,
  UpdateOrderMutationVariables,
  UpdateOrderDocument,
  User,
} from '@/utils/types/generated';
import { Cart } from '@/lib/cart/v2/cart-types';
import { createApolloClient } from '@/apollo/client';
import generatePassword from 'generate-password';
import {
  fetchUserEvent,
  OnTokenEvent,
  OnWooSessionTokenEvent,
} from '@/modules/auth/auth-events';
import { ShippingEnum } from '@/components/checkout/CheckoutShippingMethods';
import postalCodeShipping from '@/utils/postal-code-shipping.json';
import {
  PaymentDataType,
  ShippingAddressType,
} from '@/modules/payment/payment-types';
import {
  createActiveCampaignOrder,
  updateActiveCampaignUserOrderAction,
} from '@/modules/active-campaign/active-campaign-actions';
import { fetchActiveCampaignUserOrderEvent } from '@/modules/active-campaign/active-campaign-events';
import { confirmGeolocationStore } from '@/modules/geolocation/geolocation-events';
import { calculateCost } from '@/modules/geolocation/geolocation-utils';
import { ShopType } from '@/modules/shop/shop-types';

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

export const transferPayment = async (
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
  onSuccess: (data: {
    orderId?: number;
    temporalJwtAuthToken?: string;
  }) => void,
  onError?: (message: string) => void,
  setStep?: (step: number) => void,
) => {
  let jwtAuthToken = OnTokenEvent.get()?.token;
  const wooSessionToken = OnWooSessionTokenEvent.get()?.token;
  let customer: Customer | undefined = undefined;
  const activeCampaignUserOrder =
    fetchActiveCampaignUserOrderEvent.get()?.order;
  const user = fetchUserEvent.get()?.user;
  const { distance } = confirmGeolocationStore.get();
  const shippingAmount = calculateCost(distance);
  setStep && setStep(1);
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
  setStep && setStep(2);

  const shippingTotal = postalCodeShipping.includes(
    parseInt(shipping.postalCode || (userData.postalCode as string)),
  )
    ? shippingAmount
    : 0;

  const variablesCart = {
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
      paymentMethod: 'bacs',
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
          total: `$${shippingTotal}`,
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
                ).join(' y ')}`,
        },
      ],
      lineItems: cart.items.map((item) => {
        if (item.variation.length > 0) {
          return {
            name: item.name,
            quantity: item.quantity,
            sku: item.sku,
            total: (Number(item.totals.line_total) / 100).toFixed(2),
            subtotal: (Number(item.totals.line_subtotal) / 100).toFixed(2),
            variationId: item.id,
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

  const order = await client.mutate<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >({
    mutation: CreateOrderDocument,
    variables: variablesCart,
  });

  try {
    await client.mutate<UpdateOrderMutation, UpdateOrderMutationVariables>({
      mutation: UpdateOrderDocument,
      variables: {
        input: {
          orderId: order.data?.createOrder?.orderId,
          status: OrderStatusEnum.OnHold,
        },
      },
    });
  } catch (e) {
    return onError && onError((e as Error).message);
  }

  if (!user) {
    try {
      await createActiveCampaignOrder({
        customer,
        cart,
        shippingTotal,
        shippingMethod:
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
            : (shippingInfo.shippingZone?.address as string),
        orderId: order.data?.createOrder?.orderId,
      });
    } catch (e) {
      console.log('Tenemos problemas para cargar a active campaign');
    }
  } else {
    try {
      await updateActiveCampaignUserOrderAction({
        user: customer as User,
        cart,
        shippingTotal,
        shippingMethod:
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
            : (shippingInfo.shippingZone?.address as string),
        externalOrderId: order.data?.createOrder?.orderId,
        externalCheckoutId:
          activeCampaignUserOrder?.externalcheckoutid as string,
        orderId: activeCampaignUserOrder?.id as string,
        abandonedDate: activeCampaignUserOrder?.abandonedDate as string,
      });
    } catch (e) {
      console.log('Tenemos problemas para cargar a active campaign');
    }
  }

  return onSuccess({
    orderId: order.data?.createOrder?.orderId as number,
    temporalJwtAuthToken: jwtAuthToken as string,
  });
};
