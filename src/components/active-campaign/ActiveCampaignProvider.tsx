import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import {
  Provider,
  ActiveCampaignContextType,
} from '@/components/active-campaign/ActiveCampaignContext';
import { useUserHook } from '@/modules/auth/user-hooks';
import { useCallAction, useSubscription } from '@cobuildlab/react-simple-state';
import {
  createActiveCampaignUserOrder,
  fetchActiveCampaignCustomers,
  fetchActiveCampaignOrders,
  updateActiveCampaignUserOrder,
} from '@/modules/active-campaign/active-campaign-actions';
import {
  ActiveCampaignCustomer,
  ActiveCampaignOrder,
} from '@/modules/active-campaign/active-campaign-types';
import { Cart, User } from '@/utils/types/generated';
import { useCookies } from 'react-cookie';
import { addCartEvent, removeCartEvent } from '@/modules/cart/cart-events';
import { fetchActiveCampaignUserOrderEvent } from '@/modules/active-campaign/active-campaign-events';
import randomString from 'randomstring';
import { DOMAIN_SITE } from '@/utils/constants';
import moment from 'moment';

type ActiveCampaignProviderProps = {
  children?: ReactNode;
};

const ActiveCampaignProvider: React.FC<ActiveCampaignProviderProps> = ({
  children,
}) => {
  const { state: { user } } = useUserHook();
  const [cookies, setCookie] = useCookies(['wooSessionToken', 'checkoutToken']);
  const [customer, setCustomer] = useState<ActiveCampaignCustomer | undefined>(undefined);
  const [order, setOrder] = useState<ActiveCampaignOrder | undefined>(undefined);

  // --- ACCIONES MEMORIZADAS ---
  const [createOrder] = useCallAction(createActiveCampaignUserOrder, {
    onCompleted: (data) => {
      if (data) {
        setOrder(data);
        fetchActiveCampaignUserOrderEvent.dispatch({ order: data });
      }
    },
  });

  const [updateOrder] = useCallAction(updateActiveCampaignUserOrder, {
    onCompleted: (data) => {
      if (data) {
        setOrder(data);
        fetchActiveCampaignUserOrderEvent.dispatch({ order: data });
      }
    },
  });

  const [fetchCustomers] = useCallAction(fetchActiveCampaignCustomers, {
    onCompleted: (data: any) => {
      if (data?.length) setCustomer(data[0]);
    },
  });

  const [fetchOrders] = useCallAction(fetchActiveCampaignOrders, {
    onCompleted: (data) => {
      if (data?.length) {
        setOrder(data[0]);
        fetchActiveCampaignUserOrderEvent.dispatch({ order: data[0] });
      }
    },
  });

  // --- LÓGICA DE ÓRDENES OPTIMIZADA ---
  const addOrder = useCallback(async (cart?: Cart) => {
    if (!user || !cookies.checkoutToken) return;
    createOrder({
      cart: cart as Cart,
      user: user as User,
      externalCheckoutId: cookies.checkoutToken,
      abandonedDate: moment().format(),
    });
  }, [user, cookies.checkoutToken, createOrder]);

  const editOrder = useCallback((cart?: Cart, orderId = '') => {
    if (!user || !cookies.checkoutToken) return;
    updateOrder({
      cart: cart as Cart,
      user: user as User,
      externalCheckoutId: cookies.checkoutToken,
      orderId,
      shippingTotal: 0,
      externalOrderId: null,
      abandonedDate: moment().format(),
    });
  }, [user, cookies.checkoutToken, updateOrder]);

  // 1. Efecto Clientes: Solo si el usuario está logueado
  useEffect(() => {
    if (user?.id) {
      fetchCustomers(user);
    }
  }, [user?.id, fetchCustomers]);

  // 2. Token de Checkout: NO generar para anónimos al inicio. 
  // Solo se genera si hay usuario o cuando ocurra un evento de carrito.
  useEffect(() => {
    if (!cookies.checkoutToken && user) {
      setCookie('checkoutToken', randomString.generate(10), {
        expires: moment().add(30, 'days').toDate(),
        path: '/',
        domain: DOMAIN_SITE,
      });
    }
  }, [cookies.checkoutToken, user, setCookie]);

  // 3. Fetch Orders: Solo si existe el token
  useEffect(() => {
    if (cookies.checkoutToken) {
      fetchOrders(cookies.checkoutToken);
    }
  }, [cookies.checkoutToken, fetchOrders]);

  // --- SUSCRIPCIONES (Solo actúan si hay usuario) ---
  useSubscription(addCartEvent, (data) => {
    if (!user) return;
    if (order) {
      editOrder(data?.cart as Cart, order.id as string);
    } else {
      addOrder(data?.cart as Cart);
    }
  });

  useSubscription(removeCartEvent, (data) => {
    if (!user) return;
    if (order) {
      editOrder(data?.cart as Cart, order.id as string);
    }
  });

  const values: ActiveCampaignContextType = {
    connectionId: '1', // Mantengo tu ID de Staging
    customer,
    order,
  };

  return <Provider value={values}>{children}</Provider>;
};

export default ActiveCampaignProvider;
