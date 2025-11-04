import React, { Fragment, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Dialog, Transition } from '@headlessui/react';
import { AuthSteps } from '@/modules/auth/auth-constants';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Cart } from './cart-types';
import { formatCurrency } from './utils/formats';

const AuthForm = dynamic(() => import('@/components/auth/AuthForm'));
const AuthRegisterForm = dynamic(
  () => import('@/components/auth/AuthRegisterForm'),
);
const AuthLoginForm = dynamic(() => import('@/components/auth/AuthLoginForm'));

type CartDetailsProps = {
  cart?: Cart;
};
const CartDetails: React.FC<CartDetailsProps> = ({ cart }) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [currentStep, setCurrentStep] = useState<AuthSteps>(AuthSteps.Auth);
  let content = <></>;
  const router = useRouter();

  switch (currentStep) {
    case AuthSteps.Auth:
      content = (
        <AuthForm
          onRedirect={() => router.push('/checkout/finalizar-compra')}
          onRegisterStep={() => setCurrentStep(AuthSteps.AuthRegister)}
          onLoginStep={() => setCurrentStep(AuthSteps.AuthLogin)}
        />
      );
      break;
    case AuthSteps.AuthRegister:
      content = (
        <AuthRegisterForm
          onSuccess={() => router.push('/checkout/finalizar-compra')}
        />
      );
      break;
    case AuthSteps.AuthLogin:
      content = (
        <AuthLoginForm
          onSuccess={() => router.push('/checkout/finalizar-compra')}
        />
      );
      break;
  }

  return (
    <div className="border border-[#707070] mb-6">
      <div className="p-2 text-[#666666] text-[14px] font-Century-Gothic border-b border-b-[#C1C1C1] text-center">
        Resumen
      </div>
      <div className="p-4 text-[14px] ">
        <div className=" text-[#666666] flex justify-between items-center font-Century-Gothic text-[14px]">
          <div>Subtotal</div>
          <div>{formatCurrency(cart?.totals?.total_items ?? 0)} MXN</div>
        </div>
        <div className=" text-[#666666] flex justify-between items-center font-Century-Gothic text-[14px]">
          <div>IVA</div>
          <div>{formatCurrency(cart?.totals?.total_items_tax ?? 0)} MXN</div>
        </div>
        <div className="flex justify-between items-center font-Century-Gothic mb-4">
          <div className="text-[#666666]">Total de Compra</div>
          <div className="text-[#666666] font-Century-Gothic-Bold">
            {formatCurrency(cart?.totals?.total_price ?? 0)} MXN
          </div>
        </div>

        <Link href="/checkout/finalizar-compra" prefetch>
          <button className="bg-[#1C355E] text-white rounded-[2px] uppercase h-[45px] w-full font-Century-Gothic-Bold flex items-center justify-center text-[15px]">
            CONTINUAR CON LA COMPRA
          </button>
        </Link>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[999]"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-[10] overflow-y-auto">
            <div className="flex min-h-full items-end lg:justify-center pr-6 md:p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[1060px]">
                  <div className="bg-white px-4 sm:p-6 sm:pb-4">
                    <Dialog.Title
                      as="h3"
                      className=" font-Century-Gothic-Bold leading-6 text-[#555555]"
                    >
                      <div>
                        <Link href="/checkout/finalizar-compra" prefetch>
                          <div className="text-[#0071CE] font-Century-Gothic-Bold text-end">
                            Omitir registro
                          </div>
                        </Link>
                      </div>
                    </Dialog.Title>
                    <Dialog.Description>
                      <div className="grid grid-rows-1 grid-cols-11 h-full pb-8">
                        <div className=" justify-center text-center font-Century-Gothic text-[#666666] col-span-full lg:col-span-5 pt-4 lg:pt-0 lg:px-[50px] flex place-items-center">
                          <div className="flex flex-col  mb-8">
                            <div className="text-[24px] pb-4">
                              Registrate para continuar
                            </div>
                            <div className="pb-4 font-Century-Gothic-Bold text-[#0071CE]">
                              Crear cuenta tiene beneficio:
                            </div>
                            <p className="pb-4">Promociones exclusivas</p>
                            <p className="pb-4">Ver historial de compra</p>
                            <p className="pb-4">
                              Guardar métodos de pago para compras mas rápidas
                            </p>
                            <button className="mx-auto w-[200px] h-[40px] uppercase bg-[#1C355E] text-white text-[11px]">
                              crear cuenta
                            </button>
                          </div>
                        </div>
                        <div className="col-span-full lg:col-span-1 flex lg:flex-col lg:justify-center">
                          <div className="border-b self-center lg:border-r border-black h-0 lg:h-[240px] lg:mx-auto w-5/12 lg:w-0"></div>
                          <div className="inline-flex mx-auto mb-1 text-[18px]">
                            ó
                          </div>
                          <div className="border-b self-center lg:border-r border-black h-0 lg:h-[240px] lg:mx-auto w-5/12 lg:w-0"></div>
                        </div>
                        <div className="my-auto col-span-full lg:col-span-5 ">
                          {content}
                        </div>
                      </div>
                    </Dialog.Description>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default CartDetails;
