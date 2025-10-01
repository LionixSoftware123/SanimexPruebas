import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ImageWithFallback from '@/utils/ImageWithFallback';
import { getProductBrand } from '@/modules/product/product-utils';
import {
  Product as ProductType,
  SimpleProduct,
  VariableProduct,
} from '@/utils/types/generated';
import dynamic from 'next/dynamic';
import { useStore } from '@cobuildlab/react-simple-state';
import { openNecessaryProductDialogStore } from '@/modules/product/product-events';
import { closeNecessaryProductDialogStoreAction } from '@/modules/product/product-actions';
import { XIcon } from 'lucide-react';

const ProductFour = dynamic(() => import('@/components/product/ProductFour'));

const SliderLazy = dynamic(() => import('@/components/slider/Slider1'));

type NecessaryProductDialogProps = {
  product?: ProductType;
  quantity?: number;
  variationProduct?: VariableProduct;
};
const NecessaryProductDialog: React.FC<NecessaryProductDialogProps> = () => {
  const { product, quantity, variationProduct, isOpen } = useStore(
    openNecessaryProductDialogStore,
  );
  const cancelButtonRef = useRef(null);

  const items = product?.upsell?.edges.map((_product, i) => {
    return (
      <div className="col-span-full gap-y-4 lg:gap-y-0" key={i}>
        <ProductFour productIn={_product.node as any} closeModal={() => {}} />
      </div>
    );
  });

  const goToShoppingCart = () => {
    closeNecessaryProductDialogStoreAction();
    window.location.href = '/carrito';
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999]"
        initialFocus={cancelButtonRef}
        onClose={() => closeNecessaryProductDialogStoreAction()}
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
          <div className="flex min-h-full justify-center  p-4 text-center items-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[1060px] lg:py-4">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => closeNecessaryProductDialogStoreAction()}
                  aria-label="Cerrar"
                >
                  <XIcon className="h-6 w-6" />
                </button>
                <div className="bg-white px-4 pb-2 pt-2 sm:py-2 sm:px-6 sm:pb-2">
                  <Dialog.Title
                    as="h3"
                    className="font-Century-Gothic-Bold leading-4 text-[#555555]"
                  >
                    Agregaste al carrito
                  </Dialog.Title>
                  <Dialog.Description>
                    <div className="grid grid-cols-12 gap-1 sm:gap-2 mt-1">
                      <div className="col-span-full sm:col-span-6 md:col-span-3">
                        <div className="relative w-full lg:w-[200px] h-[120px] sm:h-[185px] m-auto">
                          <ImageWithFallback
                            fill
                            style={{
                              objectFit: 'contain',
                            }}
                            src={
                              product?.featuredImage?.node.sourceUrl as string
                            }
                            alt={product?.name as string}
                          />
                        </div>
                      </div>
                      <div className="col-span-full sm:col-span-6 md:col-span-9">
                        <div className="font-Century-Gothic-Bold uppercase text-[14px] text-[#555555]">
                          {getProductBrand(product)}
                        </div>
                        <div className="text-[16px] lg:text-[20px] text-[#0033A1] font-Century-Gothic-Bold mb-1">
                          {variationProduct
                            ? variationProduct.name
                            : product?.name}
                        </div>
                        <div className="text-[12px] lg:text-[14px] text-[#B2B2B2] mb-1">
                          {variationProduct
                            ? variationProduct.sku
                            : product?.sku}
                        </div>
                        <div className="text-[#555555] text-[14px] mb-1 font-Century-Gothic-Bold">
                          <span className="text-[#222222] text-[20px] mr-2">
                            {variationProduct
                              ? variationProduct.price
                              : (product as SimpleProduct)?.price}
                          </span>
                        </div>
                        <div className="font-Century-Gothic text-[12px] lg:text-[14px]">
                          Cajas agregadas: {quantity}
                        </div>
                      </div>
                      <div className="col-span-full grid grid-cols-12 gap-1">
                        <div className="text-[14px] font-Century-Gothic-Bold col-span-6 lg:col-span-2 text-[#222222]">
                          Productos necesarios
                        </div>
                        <div className="col-span-6 lg:col-span-10 my-auto h-0 border"></div>
                        <div className="font-Century-Gothic col-span-full text-justify text-[#222222] text-[14px]">
                          Para la correcta instalación de tu material, sugerimos
                          realizar la compra de los siguientes elementos.
                        </div>
                      </div>
                      <div className="w-full col-span-full">
                        {items?.length ? (
                          <SliderLazy items={items} controls />
                        ) : null}
                      </div>
                    </div>
                  </Dialog.Description>
                </div>
                <div className="bg-gray-50 px-4 py-3 flex flex-col mx-auto lg:flex-row justify-center w-[240px] lg:w-full">
                  <button
                    className="border border-[#1C355E] hover:bg-[#0033A1] hover:text-white mb-4 lg:mb-0 lg:mr-2 rounded-[5px] bg-white  h-[45px] flex items-center text-[#1C355E] text-[12px] px-8"
                    onClick={() => closeNecessaryProductDialogStoreAction()}
                  >
                    SEGUIR COMPRANDO
                  </button>

                  <button
                    className="border border-[#1C355E] hover:bg-[#0033A1] hover:text-white mb-4 lg:mb-0 lg:mr-2 rounded-[5px] bg-white  h-[45px] flex items-center text-[#1C355E] text-[12px] px-8"
                    onClick={() => goToShoppingCart()}
                  >
                    IR AL CARRITO
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NecessaryProductDialog;
