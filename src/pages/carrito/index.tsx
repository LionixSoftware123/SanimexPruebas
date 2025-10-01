import React from 'react';
import dynamic from 'next/dynamic';
import { useCartHook } from '@/lib/cart/v2/cart-hooks';
import { InternalBannerResponse } from '@/utils/types/generated';
import IconEmpty from '@/images/icon-vaciar.svg';
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';
import { useCallAction } from '@cobuildlab/react-simple-state';
import { useRouter } from 'next/router';
import { fetchInternalBanner } from '@/modules/banner/banner-actions';
import { removeCartAction } from '@/lib/cart/v2/cart-actions';
import { UpsaleItem } from '@/lib/cart/v2/cart-types';
import ProductUpsale from '@/lib/cart/v2/components/ProductUpsale';

const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const CartDetails = dynamic(() => import('@/lib/cart/v2/CartDetails'));

const CartItem = dynamic(() => import('@/lib/cart/v2/CartItem'));
const CartLoading = dynamic(
  () => import('@/components/cart/components/CartLoading'),
);
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));
const Container = dynamic(() => import('@/components/utils/Container'));

type CartPageProps = {
  internalBanner?: InternalBannerResponse;
};
const CartPage: React.FC<CartPageProps> = ({ internalBanner }) => {
  const { cart, loading, updateCart } = useCartHook();
  const { addToast } = useToasts();
  const [removeCart] = useCallAction(removeCartAction, {
    onCompleted: (data) => {
      updateCart?.(data?.cart);
      // addToast('El producto se ha eliminado del carrito correctamente!', {
      //   appearance: 'success',
      // });
    },
    onError: (data) => {
      addToast(
        <div>
          <div dangerouslySetInnerHTML={{ __html: data.message }}></div>
        </div>,
        {
          appearance: 'error',
        },
      );
    },
  });

  // const [addCart] = useCallAction(addCartAction, {
  //   onCompleted: (data) => {
  //     updateCart(data.cart);
  //     addToast('El producto se ha agregado al carrito correctamente!', {
  //       appearance: 'success',
  //     });
  //   },
  //   onError: () => {
  //     addToast('Tenemos problemas para agregar el producto!', {
  //       appearance: 'error',
  //     });
  //   },
  // });

  const upsell = cart?.up_sells;

  const router = useRouter();

  return (
    <RootLayout>
      <StaticMeta
        title={'Sanimex - Carrito'}
        description={'Sanimex - Carrito'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <Container>
        <div className="mt-[140px]">
          <>
            {!loading ? (
              <>
                {cart && cart?.items && cart?.items?.length ? (
                  <div className="grid grid-cols-12 gap-4 mt-24">
                    <div className="col-span-full md:col-span-9 overflow-x-auto">
                      <div className="overflow-x-auto">
                        <div className="grid grid-cols-12 w-[850px] lg:w-full gap-4 border-[#C1C1C1] border-b pb-4">
                          <div className="col-span-4">
                            <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
                              Producto
                            </div>
                          </div>
                          <div className="col-span-3 text-center">
                            <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
                              Cant
                            </div>
                          </div>
                          <div className="col-span-3">
                            <div className=" text-center text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
                              Precio
                            </div>
                          </div>
                          <div className="col-span-2 text-center">
                            <div className="text-[#1C355E] text-[16px] font-Century-Gothic-Bold">
                              Total
                            </div>
                          </div>
                        </div>
                        <div className="w-[850px] lg:w-full">
                          {cart &&
                            cart.items &&
                            cart.items.map((item) => (
                              <>
                                <CartItem cartItem={item} />
                              </>
                            ))}
                        </div>
                      </div>
                      <div className="col-span-full text-end mb-6">
                        <button
                          className="inline-flex text-[#F17523] text-[12px]"
                          onClick={() =>
                            removeCart({
                              keys: [...cart.items.map((item) => item.key)],
                            })
                          }
                        >
                          <div className="relative w-[15px] h-[12px] flex self-center mr-2">
                            <IconEmpty />
                          </div>
                          VACIAR CARRITO
                        </button>
                      </div>
                      <div className="flex flex-col md:flex-row justify-center md:justify-between mb-8">
                        <Link href="/productos">
                          <button className="mb-2 border border-[#0071CE] rounded-[2px] uppercase h-[45px] w-full md:w-[300px] text-[#0071CE] font-Century-Gothic-Bold flex items-center justify-center text-[15px]">
                            SEGUIR COMPRANDO
                          </button>
                        </Link>

                        <button
                          disabled={loading}
                          onClick={() => {}}
                          className="mb-2 border border-[#0071CE] rounded-[2px] uppercase h-[45px] w-full md:w-[300px] text-[#0071CE] font-Century-Gothic-Bold flex items-center justify-center text-[15px] cursor-pointer"
                        >
                          {loading ? (
                            <div className="flex justify-center w-full">
                              <svg
                                aria-hidden="true"
                                className="inline w- h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                            </div>
                          ) : (
                            <div className="">ACTUALIZAR CARRITO</div>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="col-span-full md:col-span-3">
                      <CartDetails cart={cart} />
                      <div className="mb-6">
                        {internalBanner?.redirectUrl &&
                          internalBanner?.sourceUrl && (
                            <Link href={internalBanner?.redirectUrl as string}>
                              <div className="w-full h-[100px] md:h-[250px] relative hidden">
                                <ImageWithFallback
                                  src={internalBanner?.sourceUrl as string}
                                  alt="horizontal 1 banner"
                                  fill
                                  style={{
                                    objectFit: 'contain',
                                    background: 'white',
                                  }}
                                />
                              </div>
                            </Link>
                          )}
                      </div>
                    </div>

                    {upsell && upsell.length ? (
                      <div className="col-span-full md:col-span-9">
                        <div className="text-[20px] font-Century-Gothic mb-4">
                          Materiales de instalación necesarios
                        </div>
                        <div>
                          <div className="grid grid-cols-6 mb-6 gap-4 border-[#C1C1C1] border-b">
                            <div className="col-span-2">Producto</div>
                            <div className="text-center">Cant</div>
                            <div className="text-center">Costo x unid</div>
                          </div>
                          {upsell.map((item, key) => (
                            <div
                              className="border-[#C1C1C1] border-b"
                              key={key}
                            >
                              <ProductUpsale product={item as UpsaleItem} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center w-full mt-[140px] ">
                    <div className="mb-4">No hay productos agregados</div>
                    <div>
                      <Link
                        href={'/productos'}
                        className="mb-2 border border-[#0071CE] rounded-[2px] uppercase h-[45px] w-[250px] md:w-[300px] text-[#0071CE] font-Century-Gothic-Bold flex items-center justify-center text-[15px]"
                      >
                        Seguir comprando
                      </Link>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <CartLoading />
            )}
          </>
        </div>
      </Container>
    </RootLayout>
  );
};
export const getStaticProps = async () => {
  const internalBanner = await fetchInternalBanner();

  return {
    props: {
      internalBanner,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 60,
  };
};
export default CartPage;
