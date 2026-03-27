import {
  CountriesEnum,
  CreateOrderDocument,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  Customer,
  OrderStatusEnum,
  UpdateOrderMutation,
  UpdateOrderMutationVariables,
  UpdateOrderDocument,
  User,
} from '@/utils/types/generated';
import { Cart } from '@/lib/cart/v2/cart-types';
import { createApolloClient } from '@/apollo/client';
import {
  fetchUserEvent,
  OnTokenEvent,
  OnWooSessionTokenEvent,
} from '@/modules/auth/auth-events';
import { ShippingEnum } from '@/components/checkout/CheckoutShippingMethods';
import postalCodeShipping from '@/utils/postal-code-shipping.json';
import postalCodeShippingProvincia from '@/utils/postal-code-shipping-provincia.json';
import postalCodeShippingProvinciaNL from '@/utils/postal-code-shipping-provincia-nl.json';
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

/**
 * NOTA: Se ha eliminado 'fetchRegisterCustomer' para evitar la creación 
 * automática de cuentas. Si el correo es nuevo, el pedido entra como invitado.
 */

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
  const activeCampaignUserOrder = fetchActiveCampaignUserOrderEvent.get()?.order;
  const user = fetchUserEvent.get()?.user;
  const { distance } = confirmGeolocationStore.get();
  const shippingAmount = calculateCost(distance);

  setStep && setStep(1);

  /**
   * NUEVA LÓGICA DE IDENTIDAD:
   * 1. Si hay token, recuperamos al usuario.
   * 2. Si NO hay token, no intentamos registrar. Dejamos que sea una compra de invitado.
   * (La validación de si el correo existe ya se hace en el componente previo con el Toast)
   */
  if (jwtAuthToken) {
    customer = fetchUserEvent.get()?.user as Customer;
  } else {
    customer = undefined;
    jwtAuthToken = undefined;
  }

  // Creamos el cliente de Apollo. Si es invitado, solo llevará el woo-session.
  const client = createApolloClient(
    wooSessionToken as string,
    jwtAuthToken ? (jwtAuthToken as string) : undefined
  );

  setStep && setStep(2);

  const shippingTotal = calculateCost(distance); // Simplificado para usar la constante

  // 1. Definimos el objeto 'input' de la orden
  const orderInput: any = {
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
      email: userData.email, // Email real, sin sufijos
      firstName: userData.firstname,
      lastName: userData.lastname,
      postcode: userData.postalCode,
      phone: userData.phone,
      country: CountriesEnum.Mx,
    },
    paymentMethod: 'bacs',
    shipping: {
      address1: shipping.address1 ? shipping.address1 : userData.address1,
      state: shipping.state ? shipping.state : userData.state,
      firstName: shipping.firstname ? shipping.firstname : userData.firstname,
      lastName: shipping.lastname ? shipping.lastname : userData.lastname,
      postcode: shipping.postalCode ? shipping.postalCode : userData.postalCode,
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
            ? (postalCodeShipping.includes(parseInt(shipping.postalCode || userData.postalCode || "0")) ||
               postalCodeShippingProvincia.includes(parseInt(shipping.postalCode || userData.postalCode || "0")) ||
               postalCodeShippingProvinciaNL.includes(parseInt(shipping.postalCode || userData.postalCode || "0"))
                ? 'Envió a Domicilio'
                : 'Su Código Postal está fuera de nuestra área servicio...')
            : `Recoger en: ${shop.CALLE}, C.P. ${shop.CP}`,
      },
    ],
    lineItems: cart.items.map((item) => ({
      productId: item.variation.length > 0 ? undefined : item.id,
      variationId: item.variation.length > 0 ? item.id : undefined,
      name: item.name,
      quantity: item.quantity,
      sku: item.sku,
      total: (Number(item.totals.line_total) / 100).toFixed(2),
      subtotal: (Number(item.totals.line_subtotal) / 100).toFixed(2),
    })),
  };

  // 2. Solo vinculamos el ID si el usuario inició sesión
  if (customer?.databaseId) {
    orderInput.customerId = customer.databaseId;
  }

  // 3. Ejecución de la mutación de orden
  try {
    const order = await client.mutate<CreateOrderMutation, CreateOrderMutationVariables>({
      mutation: CreateOrderDocument,
      variables: { input: orderInput },
    });

    // Actualizamos el estado a OnHold (Transferencia)
    await client.mutate<UpdateOrderMutation, UpdateOrderMutationVariables>({
      mutation: UpdateOrderDocument,
      variables: {
        input: {
          orderId: order.data?.createOrder?.orderId,
          status: OrderStatusEnum.OnHold,
        },
      },
    });

    // --- Active Campaign Logics ---
    if (!user) {
      await createActiveCampaignOrder({
        customer,
        cart,
        shippingTotal,
        shippingMethod: shippingInfo.shippingOption === ShippingEnum.ByShipping ? 'Envío a Domicilio' : 'Recoger en tienda',
        orderId: order.data?.createOrder?.orderId,
      });
    } else {
      await updateActiveCampaignUserOrderAction({
        user: customer as User,
        cart,
        shippingTotal,
        shippingMethod: 'Envío a Domicilio',
        externalOrderId: order.data?.createOrder?.orderId,
        orderId: activeCampaignUserOrder?.id as string,
      });
    }

    return onSuccess({
      orderId: order.data?.createOrder?.orderId as number,
      temporalJwtAuthToken: jwtAuthToken as string,
    });

  } catch (e) {
    console.error("Error en el proceso de pago:", e);
    return onError && onError((e as Error).message);
  }
};
