import React, { useEffect, useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import CartIcon from '@/images/cart.svg';
import CartBlueIcon from '@/images/cartBlue.svg';
import Link from 'next/link';
import Crossclose from '@/images/crossClose.svg';
import { useCartHook } from '@/lib/cart/v2/cart-hooks';
import dynamic from 'next/dynamic';
import { useUserHook } from '@/modules/auth/user-hooks';
import { formatCurrency } from '../utils/formats';
import { CartItem } from '../cart-types';

const CartItemMenu = dynamic(
  () => import('@/lib/cart/v2/components/CartItemMenu'),
);

const Cart: React.FC = () => {
  const { cart } = useCartHook();
  const {
    state: { user },
  } = useUserHook();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cart) {
      setIsLoading(false);
    }
  }, [cart]);

  return (
    <Menu as="div" className="relative top-1">
      {cart && cart.items && cart?.items?.length > 0 ? (
        <div className="text-center absolute bg-[#D200BB] h-[15px] w-[15px] left-0 z-10 rounded-full -top-[5px] text-[10px] text-white">
          {cart?.items?.length}
        </div>
      ) : null}
      <div>
        <Menu.Button>
          <CartIcon />
        </Menu.Button>
      </div>
      {cart ? (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 mt-2 w-[350px] origin-top-right bg-white shadow-lg ring-1 ring-black right-[-10px] ring-opacity-5 focus:outline-none ">
            <div className="flex justify-between text-black px-4 py-2 text-[14px] font-Century-Gothic border-b border-b-[#C1C1C1]">
              <div>Carrito de compra</div>

              <div className=" relative  flex self-center h-[9px] w-[9px]">
                <Menu.Button>
                  <div className="w-[12px] h-[12px] flex self-center">
                    <Crossclose />
                  </div>
                </Menu.Button>
              </div>
            </div>
            <div className="max-h-[350px] overflow-auto">
              {cart?.items?.map((item: CartItem, key: number) => (
                <CartItemMenu item={item} key={key} />
              ))}
            </div>

            {!isLoading ? (
              <div className="py-4 px-4">
                <div className="flex justify-between mb-2">
                  <div className="text-[#666666] text-[16px]">Subtotal:</div>
                  <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
                    {formatCurrency(cart?.totals?.total_items)} MXN
                  </div>
                </div>
                <div className="flex justify-between mb-2">
                  <div className="text-[#666666] text-[16px]">IVA:</div>
                  <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
                    {formatCurrency(cart?.totals?.total_tax)} MXN
                  </div>
                </div>
                <div className="flex justify-between mb-2">
                  <div className="text-[#666666] text-[16px]">Total:</div>
                  <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
                    {formatCurrency(cart?.totals?.total_price)} MXN
                  </div>
                </div>
                <Link href="/carrito">
                  <button className="mb-2 border border-[#0071CE] rounded-[2px] uppercase h-[45px] w-full text-[#0071CE] font-Century-Gothic-Bold flex items-center justify-center text-[12px]  md:text-[15px]">
                    <div className="relative h-[17px] w-[20px] mr-2">
                      <CartBlueIcon />
                    </div>
                    ver carrito
                  </button>
                </Link>
                {user || !user ? (
                  <Link href="/checkout/finalizar-compra">
                    <button className="bg-[#1C355E] rounded-[2px] uppercase h-[45px] w-full text-[#fff] font-Century-Gothic-Bold flex items-center justify-center text-[11px] md:text-[15px]">
                      FINALIZAR COMPRA
                    </button>
                  </Link>
                ) : null}
              </div>
            ) : (
              <>
                <div className="mb-5">
                  <div className="w-full">
                    <div className="grid grid-cols-6 mt-4 ml-2">
                      <div className="h-2 bg-gray-200 rounded-full col-span-4 dark:bg-gray-100 max-w-[80px] mb-2.5 "></div>
                      <div className="h-2 bg-gray-200 rounded-full col-span-2 dark:bg-gray-100 max-w-[80px] mb-2.5 ml-4"></div>
                    </div>

                    <div className="grid grid-cols-6 mt-1 ml-2">
                      <div className="h-2 bg-gray-200 rounded-full col-span-4 dark:bg-gray-100 max-w-[80px] mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full col-span-2 dark:bg-gray-100 max-w-[80px] mb-2.5  ml-4"></div>
                    </div>
                    <div className="grid grid-cols-6 mt-1 ml-2">
                      <div className="h-2 bg-gray-200 rounded-full col-span-4 dark:bg-gray-100 max-w-[80px] mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full col-span-2 dark:bg-gray-100 max-w-[80px] mb-2.5  ml-4"></div>
                    </div>
                    <div className="h-12 bg-gray-200 rounded  dark:bg-gray-100 mx-2 mb-2.5"></div>
                    <div className="h-12 bg-gray-200 rounded  dark:bg-gray-100 mx-2 mb-2.5"></div>
                  </div>
                </div>
              </>
            )}
          </Menu.Items>
        </Transition>
      ) : null}
    </Menu>
  );
};

export default Cart;
