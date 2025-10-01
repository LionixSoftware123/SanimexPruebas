import { createContext } from 'react';
import { CartContext } from './cart-types';
import { CART_CONTEXT_VALUES } from '@/lib/cart/v2/cart-contants';

export const Context = createContext<CartContext>(CART_CONTEXT_VALUES);

export const { Provider } = Context;
