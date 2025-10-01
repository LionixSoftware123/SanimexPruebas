import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
  useSaveFavoriteProductMutation,
  SaveFavoriteProductResponseEnum,
} from '@/utils/types/generated';
import { Dialog, Transition } from '@headlessui/react';
import { AuthSteps } from '@/modules/auth/auth-constants';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import CrossClose from '@/images/crossClose.svg';
import { useUserHook } from '@/modules/auth/user-hooks';
import { useToasts } from 'react-toast-notifications';
import FavoriteIcon from '@/images/favorite.svg';
import { IProduct } from '@/lib/easysearch/types/generated';

const AuthForm = dynamic(() => import('@/components/auth/AuthForm'));
const AuthRegisterForm = dynamic(
  () => import('@/components/auth/AuthRegisterForm'),
);
const AuthLoginForm = dynamic(() => import('@/components/auth/AuthLoginForm'));

type FavoriteComponentProps = {
  product?: IProduct;
  onSuccess?: (favorites: number[]) => void;
};

const EasySearchFavorite: React.FC<FavoriteComponentProps> = ({
  product,
  onSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [currentStep, setCurrentStep] = useState<AuthSteps>(AuthSteps.Auth);
  const router = useRouter();
  const {
    state: { user },
    favoriteProducts,
    dispatchFavoriteProducts,
  } = useUserHook();
  const { addToast } = useToasts();
  const [, setIsFavorite] = useState<boolean>(false);
  let content = <></>;

  const [savePosts] = useSaveFavoriteProductMutation({
    onCompleted: (data) => {
      let newFavoriteProducts: any = [];

      if (
        data.saveFavoriteProduct?.type ===
        SaveFavoriteProductResponseEnum.AddFavoriteProduct
      ) {
        addToast(data.saveFavoriteProduct?.message, {
          appearance: 'success',
        });

        newFavoriteProducts = [
          ...favoriteProducts,
          product?.external_id || product?.id,
        ];
        setIsFavorite(true);
      } else {
        newFavoriteProducts = favoriteProducts.filter(
          (favoriteProductId: number) =>
            favoriteProductId !== product?.external_id,
        );
        addToast(data.saveFavoriteProduct?.message, {
          appearance: 'error',
        });
        setIsFavorite(false);
      }

      dispatchFavoriteProducts(newFavoriteProducts);

      onSuccess && onSuccess(newFavoriteProducts);
    },
  });

  useEffect(() => {
    if (favoriteProducts) {
      const findProduct = favoriteProducts?.find(
        (favoriteProductId) => favoriteProductId === product?.external_id,
      );
      setIsFavorite(!!findProduct);
    }
  }, [product, favoriteProducts]);

  switch (currentStep) {
    case AuthSteps.Auth:
      content = (
        <AuthForm
          onRedirect={() => router.push('/')}
          onRegisterStep={() => setCurrentStep(AuthSteps.AuthRegister)}
          onLoginStep={() => setCurrentStep(AuthSteps.AuthLogin)}
        />
      );
      break;
    case AuthSteps.AuthRegister:
      content = <AuthRegisterForm onSuccess={() => router.push('/')} />;
      break;
    case AuthSteps.AuthLogin:
      content = <AuthLoginForm onSuccess={() => router.push('/')} />;
      break;
  }

  return (
    <>
      <div
        onClick={() =>
          !user
            ? setOpen(!open)
            : savePosts({
                variables: {
                  input: {
                    databaseUserId: user?.databaseId,
                    databaseProductId: parseInt(product?.id ?? '0', 10),
                  },
                },
              })
        }
        className="flex flex-row py-2 gap-2  justify-start cursor-pointer"
      >
        <div className="relative h-[17px] w-[20px] mr-2">
          <FavoriteIcon className="" />
        </div>
        <span>Guardar</span>
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
                      className="font-Century-Gothic-Bold leading-6 text-[#555555]"
                    >
                      <div className="flex w-[12px] h-[12px] justify-end cursor-pointer">
                        <CrossClose onClick={() => setOpen(!open)} />
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
                            <button className="mx-auto w-[200px] h-[40px] uppercase bg-[#000] text-white text-[11px]">
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
    </>
  );
};

export default EasySearchFavorite;
