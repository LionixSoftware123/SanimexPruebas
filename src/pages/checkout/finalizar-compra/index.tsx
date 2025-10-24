import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useCartHook } from '@/lib/cart/v2/cart-hooks';
import InputMask from 'react-input-mask';
import { useToasts } from 'react-toast-notifications';
import cardValidator from 'card-validator';
import {
  UserNodeIdTypeEnum,
  InternalBannerResponse,
} from '@/utils/types/generated';
import { fetchUser } from '@/modules/auth/auth-actions';
import Link from 'next/link';
import { FRONTEND_ENDPOINT } from '@/utils/constants';
import { useUserHook } from '@/modules/auth/user-hooks';
import { ShippingEnum } from '@/components/checkout/CheckoutShippingMethods';
import {
  PaymentDataType,
  PaymentMethodEnum,
  PaymentValues,
  ShippingZone,
} from '@/modules/payment/payment-types';
import { transferPayment } from '@/modules/payment/transfer/transfer-utils';
import { useCallAction, useStore } from '@cobuildlab/react-simple-state';
import {
  Controller,
  useForm,
  useWatch,
  SubmitErrorHandler,
  Control,
} from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  checkCreditCardBin,
  createBanortePayment,
  FormType,
} from '@/modules/payment/banorte/banorte-utils';
import { OnWooSessionTokenEvent } from '@/modules/auth/auth-events';
import { fetchInternalBanner } from '@/modules/banner/banner-actions';
import postalCodeShipping from '@/utils/postal-code-shipping.json';
import IconWhatsapp from '@/images/icon-whatsapp-modal.svg';
import Bugsnag, { NotifiableError } from '@bugsnag/js';
import BankList from '@/components/utils/BankList';
import { confirmGeolocationStore } from '@/modules/geolocation/geolocation-events';
import { selectedShopStore } from '@/modules/shop/shop-events';
import { ShopType } from '@/modules/shop/shop-types';
import { useUTMCampaignHooks } from '@/modules/utm-campaign/utm-campaign-hooks';
import { Cart, CartItem } from '@/lib/cart/v2/cart-types';
import { applyCouponAction, fetchCart } from '@/lib/cart/v2/cart-actions';
import { UniversalCookies } from '@/lib/cart/v2/utils/cookies';

//import { updateActiveCampaignCompleteContact } from '@/modules/active-campaign/active-campaign-actions';
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const PayPhases = dynamic(() => import('@/components/checkout/PayPhases'));
const CheckoutDetails = dynamic(
  () => import('@/lib/cart/v2/components/CheckoutDetails'),
);

const CheckoutShippingMethods = dynamic(
  () => import('@/components/checkout/CheckoutShippingMethods'),
);

const CheckoutBillingAddress = dynamic(
  () => import('@/components/checkout/CheckoutBillingAddress'),
);
const CheckoutShippingAddress = dynamic(
  () => import('@/components/checkout/CheckoutShippingAddress'),
);
const AlertPaymentError = dynamic(() => import('@/components/utils/Alert'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));

const Container = dynamic(() => import('@/components/utils/Container'));

type DataProps = {
  internalBanner?: InternalBannerResponse;
};

interface OrderData {
  orderId?: number | undefined;
}

const Data: React.FC<DataProps> = ({ internalBanner }) => {
  const { addToast } = useToasts();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [isShipping, setIsShipping] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const ref = useRef<HTMLFormElement | null>(null);
  const [initialDeferment, setInitialDeferment] = useState('');
  const { shop } = useStore(selectedShopStore);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    PaymentMethodEnum.OpenPay,
  );
  const [shippingOption, setShippingOption] = useState<ShippingEnum>(
    ShippingEnum.ByShipping,
  );
  // const { emitActiveCampaignCustomer } = useActiveCampaignSocketHook();
  const { distance } = useStore(confirmGeolocationStore);
  const [orderId, setOrderId] = useState<number | undefined>(undefined);
  const [shippingZone, setShippingZone] = useState<ShippingZone | undefined>(
    undefined,
  );
  const onSubmitError: SubmitErrorHandler<Control> = () => setError(true);
  const {
    state: { user },
  } = useUserHook();
  const { handleSubmit, control /**, watch */ } = useForm();
  const [hasProductSku, setHasProductSku] = useState('');
  const [isCheckedBin, setIsCheckedBin] = useState<boolean>(false);
  const postalCodeForm = useWatch({
    control,
    name: 'billingAddress.postalCode',
  });

  const billingAddress = useWatch({
    control,
    name: 'billingAddress',
  });

  const shippingPostalCodeForm = useWatch({
    control,
    name: 'shipping.postalCode',
  });

  const router = useRouter();
  const free = router.query.free ? true : false;

  const { cart, updateCart } = useCartHook();

  const [couponCode, setCouponCode] = useState('');
  const [applyCoupon, loadingApplyCoupon] = useCallAction(applyCouponAction, {
    onCompleted: (data) => {
      updateCart?.(data?.cart);
      if (data?.cart?.message) {
        addToast(data?.cart?.message, {
          appearance: 'warning',
        });
      } else {
        addToast('Se aplico el cupón correctamente', {
          appearance: 'success',
        });
      }
    },
    onError: (error) => {
      let errorMessage = error?.message;
      if (
        error?.message === 'This coupon has already been applied to the cart'
      ) {
        errorMessage = 'Este cupón ya ha sido aplicado al carrito';
      }
      addToast(errorMessage, {
        appearance: 'error',
      });
    },
  });

  useEffect(() => {
    const hasProduct = cart?.items;
    if (hasProduct) {
      hasProduct.forEach((item: CartItem) => {
        const sku = item?.sku;
        if (sku === 'T10-00-0-07') {
          setHasProductSku(sku);
        }
      });
    }
  }, [cart]);

  const hasProductWithSku = hasProductSku === 'T10-00-0-07';

  // const [removeCart] = useCallAction(removeCartFromPaymentCompleteAction, {
  //   onCompleted: () => {
  //     setLoading(false);
  //     setPaymentStep(1);
  //     return (window.location.href = `/checkout/pago-completado?order_id=${orderId}`);
  //   },
  //   onError: () => {
  //     setLoading(false);
  //   },
  // });

  const { processUTMURLs } = useUTMCampaignHooks();

  // const [updateContact] = useCallAction(updateActiveCampaignCompleteContact, {
  //   onCompleted: () => {
  //     console.log('Contacto actualizado exitosamente.');
  //   },
  //   onError: (error) => {
  //     console.error('Error al actualizar el contacto:', error);
  //   },
  // });

  //  useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value.billingAddress);
  //     updateContact(value.billingAddress);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [updateContact, watch]);

  // useEffect(() => {
  //   const subscription = watch((value) =>
  //     emitActiveCampaignCustomer(value.billingAddress),
  //   );
  //   return () => subscription.unsubscribe();
  // }, [emitActiveCampaignCustomer, watch]);

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && cart) {
  //     const shipping = currencyFormatter.unformat(
  //       cart?.shippingTotal as string,
  //       {
  //         code: 'USD',
  //       },
  //     );

  //     const totalTax = currencyFormatter.unformat(cart?.totalTax as string, {
  //       code: 'USD',
  //     });

  //     const total = currencyFormatter.unformat(cart?.total as string, {
  //       code: 'USD',
  //     });

  //     window.gtag('event', 'begin_checkout', {
  //       currency: 'MXN',
  //       value: total,
  //       tax: totalTax,
  //       shipping: shipping,
  //       items: cart?.contents?.nodes?.map((node: CartItem) => {
  //         const categories: any = {};

  //         node.product?.node.productCategories?.nodes.forEach((category, i) => {
  //           if (i)
  //             categories[`item_category${i}` as keyof any] = (
  //               category as ProductCategory
  //             ).name;
  //           else
  //             categories['item_category' as keyof any] = (
  //               category as ProductCategory
  //             ).name;
  //         });

  //         if (node?.variation) {
  //           const price = currencyFormatter.unformat(
  //             node.variation.node.price as string,
  //             {
  //               code: 'USD',
  //             },
  //           );

  //           return {
  //             item_name: node.variation.node.name,
  //             item_id: node.variation.node.databaseId,
  //             price: price,
  //             item_brand: getProductBrand(node.product?.node as Product),
  //             quantity: node.quantity,
  //             ...categories,
  //           };
  //         }

  //         const price = currencyFormatter.unformat(
  //           (node.product?.node as SimpleProduct).price as string,
  //           {
  //             code: 'USD',
  //           },
  //         );

  //         return {
  //           item_name: node.product?.node.name,
  //           item_id: node.product?.node.databaseId,
  //           price: price,
  //           item_brand: getProductBrand(node.product?.node as Product),
  //           quantity: node.quantity,
  //           ...categories,
  //         };
  //       }),
  //     });
  //   }
  // }, [cart]);

  //console.log({ cart });
  console.log({ shop });

  const handleOrderCompletion = (orderId: number | undefined) => {
    setOrderId(orderId);
    setLoading(false);
    setPaymentStep(1);
    UniversalCookies.remove('cart-token');
    window.location.href = `/checkout/pago-completado?order_id=${orderId}`;
  };

  const handleCompletePayment = async (data: PaymentValues) => {
    if (shippingOption === ShippingEnum.ByShipping && !distance) {
      return addToast(
        <div>Es necesario que se calcule el precio a domicilio</div>,
        {
          appearance: 'error',
        },
      );
    }

    setLoadingButton(true);
    const billingInfo = {
      ...data.billingAddress,
      email: user ? user.email : data.billingAddress?.email,
    };

    const checkUser = await fetchUser({
      idType: UserNodeIdTypeEnum.Email,
      id: billingInfo.email as string,
    });

    if (checkUser.user && !user) {
      setLoadingButton(false);
      return addToast(
        <div>
          El email ya se encuentra registrado, por favor{' '}
          <Link
            className="underline font-bold"
            href={`/auth?redirect=${FRONTEND_ENDPOINT}/checkout/finalizar-compra`}
          >
            ingrese con su cuenta
          </Link>{' '}
          para mantener la información de sus compras
        </div>,
        {
          appearance: 'error',
        },
      );
    }

    return await createBanortePayment(
      data.card,
      billingInfo as PaymentDataType,
      {
        ...data.shipping,
      },
      shop as ShopType,
      {
        shippingOption,
        shippingZone,
      },
      cart as Cart,
      (data) => {
        try {
          const {
            AMOUNT,
            SECURITY_CODE,
            CARD_NUMBER,
            CARD_EXP,
            REFERENCE3D,
            EMAIL,
          } = data.form;
          const requiredFields: {
            AMOUNT: string;
            SECURITY_CODE: string;
            CARD_EXP: string;
            CARD_NUMBER: string;
            ORDER_ID: string;
            WOO_SESSION_TOKEN: string;
            INITIAL_DEFERMENT?: string;
            PAYMENTS_NUMBER?: string;
            PLAN_TYPE?: string;
          } = {
            AMOUNT,
            SECURITY_CODE,
            CARD_EXP,
            CARD_NUMBER,
            ORDER_ID: data.orderId,
            WOO_SESSION_TOKEN: OnWooSessionTokenEvent.get()?.token as string,
          };

          if ((Number(total) >= 6000 && isCheckedBin) || free) {
            requiredFields.INITIAL_DEFERMENT = '00';
            requiredFields.PAYMENTS_NUMBER = initialDeferment;
            requiredFields.PLAN_TYPE = '03';
          }

          const result = '?' + new URLSearchParams(requiredFields).toString();
          Bugsnag.notify(new Error('Bad, but not fatal'), function (event) {
            event.severity = 'info';
            event.addMetadata('banorte-data', {
              REFERENCE3D,
              ORDER_ID: data.orderId,
              EMAIL,
            });
          });
          data.form.FORWARD_PATH += result;
          data.form.CARD_NUMBER = (data.form.CARD_NUMBER || '').replaceAll(
            ' ',
            '',
          );
          const form = document.getElementById('banorte-form');
          Object.keys(data.form).forEach((value) => {
            const input = document.createElement('input');
            input.name = value;
            input.setAttribute(
              'value',
              data.form[value as keyof FormType] as string,
            );
            form?.appendChild(input);
            ref.current?.submit();
          });
        } catch (e) {
          Bugsnag.notify(e as unknown as NotifiableError);
        }

        setLoadingButton(false);
      },
      (message) => {
        setLoadingButton(false);
        return addToast(message, {
          appearance: 'error',
        });
      },
    );
  };

  const paymentWithTransfer = async (data: PaymentValues) => {
    if (shippingOption === ShippingEnum.ByShipping && !distance) {
      return addToast(
        <div>Es necesario que se calcule el precio a domicilio</div>,
        {
          appearance: 'error',
        },
      );
    }

    setLoading(true);
    const billingInfo = {
      ...data.billingAddress,
      email: user ? user.email : data.billingAddress?.email,
    };

    const checkUser = await fetchUser({
      idType: UserNodeIdTypeEnum.Email,
      id: billingInfo.email as string,
    });

    if (checkUser.user && !user) {
      setLoading(false);
      return addToast(
        <div>
          El email ya se encuentra registrado, por favor{' '}
          <Link
            className="underline font-bold"
            href={`/auth?redirect=${FRONTEND_ENDPOINT}/checkout/finalizar-compra`}
          >
            ingrese con su cuenta
          </Link>{' '}
          para mantener la información de sus compras
        </div>,
        {
          appearance: 'error',
        },
      );
    }

    transferPayment(
      billingInfo as PaymentDataType,
      {
        ...data.shipping,
      },
      shop as ShopType,

      {
        shippingOption,
        shippingZone,
      },
      cart as Cart,
      (data: OrderData) => {
        handleOrderCompletion(data.orderId);
      },
      (message) => {
        setLoading(false);
        setPaymentStep(1);
        return addToast(message, {
          appearance: 'error',
        });
      },
      (step) => setPaymentStep(step),
    );
  };

  useEffect(() => {
    const products: number[] = cart?.items?.map((item: CartItem) =>
      item?.id ? parseInt(item?.id.toString(), 10) : 0,
    ) as number[];
    processUTMURLs(orderId ? parseInt(orderId.toString()) : 0, products);
  }, [orderId, cart?.items, processUTMURLs]);

  const postalCode = isShipping ? shippingPostalCodeForm : postalCodeForm;

  const total = cart?.totals?.total_price ?? 0;

  let content = <></>;
  const redirect = typeof window !== 'undefined' ? window.location.href : '';

  const disableDropdown = () => {
    //if (free) return false;

    return !(Number(total) >= 6000 && isCheckedBin);
  };

  const PaymentForm: React.FC = () => {
    return (
      <>
        <div className="col-span-full">
          <div className="text-[#333E48] font-Century-Gothic-Bold text-[25px]">
            Información de pago
          </div>
        </div>
        <div className="col-span-full">
          <div className="flex items-center mb-2">
            <div
              onClick={() => {
                setSelectedPaymentMethod(PaymentMethodEnum.OpenPay);
              }}
              className="rounded-[2px] border border-[#919191] w-[12px] h-[12px] mx-2 flex self-center"
            >
              <div
                className={`${
                  selectedPaymentMethod === PaymentMethodEnum.OpenPay
                    ? 'bg-[#F17523]'
                    : 'bg-white'
                } rounded-[2px] mx-auto flex self-center  w-[8px] h-[8px]`}
              ></div>
            </div>
            <div>Pago con tarjeta de crédito o débito</div>
          </div>
          <BankList />
        </div>
        {selectedPaymentMethod === PaymentMethodEnum.OpenPay ? (
          <div className="col-span-full">
            <div className="mb-4 text-[#1C355E]">
              <div className=" w-full text-[14px] sm:text-[18px] font-bold text-justify">
                Te sugerimos usar tu tarjeta digital para comprar rápido y
                seguro
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <Controller
                  control={control}
                  rules={{
                    required: 'El nombre del títular es requerido',
                  }}
                  render={({
                    field: { onChange, value, name },
                    fieldState: { error },
                  }) => (
                    <>
                      <input
                        className={`w-full h-[45px] border ${
                          value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                        } px-6`}
                        placeholder={'Nombre del títular *'}
                        onChange={onChange}
                        name={name}
                        value={value}
                      />
                      {error ? (
                        <p className="text-red-500 text-xs italic">
                          {error.message}
                        </p>
                      ) : null}
                    </>
                  )}
                  name={'card.cardHolderName'}
                />
              </div>
              <div className="col-span-6">
                <Controller
                  control={control}
                  rules={{
                    required: 'El número de tarjeta es requerido',
                    validate: (value) => {
                      if (!cardValidator.number(value).isValid) {
                        return 'El numero de tarjeta es incorrecto';
                      }
                      return true;
                    },
                  }}
                  render={({
                    field: { onChange, value, name },
                    fieldState: { error },
                  }) => (
                    <>
                      <InputMask
                        mask="9999 9999 9999 9999"
                        maskChar=" "
                        className={`w-full h-[45px] border ${
                          value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                        } px-6`}
                        placeholder={'Número de tarjeta *'}
                        name={name}
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                          const creditCard = e.target.value.replaceAll(' ', '');
                          if (creditCard.length === 16) {
                            setIsCheckedBin(checkCreditCardBin(creditCard));
                          }
                        }}
                      />
                      {error ? (
                        <p className="text-red-500 text-xs italic">
                          {error.message}
                        </p>
                      ) : null}
                    </>
                  )}
                  name={'card.creditCardNumber'}
                />
              </div>
              <div className="col-span-6">
                <Controller
                  control={control}
                  rules={{
                    required: 'La Fecha de vencimiento es requerido',
                    validate: (value) => {
                      if (!cardValidator.expirationDate(value).isValid) {
                        return 'La fecha de expiración es incorrecta';
                      }
                      return true;
                    },
                  }}
                  render={({
                    field: { onChange, value, name },
                    fieldState: { error },
                  }) => (
                    <>
                      <InputMask
                        mask="99/99"
                        maskChar=" "
                        className={`w-full h-[45px] border ${
                          value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                        } px-6`}
                        placeholder="Fecha de vencimiento *"
                        value={value}
                        name={name}
                        onChange={onChange}
                      />
                      {error ? (
                        <p className="text-red-500 text-xs italic">
                          {error.message}
                        </p>
                      ) : null}
                    </>
                  )}
                  name={'card.expiredDate'}
                />
              </div>
              <div className="col-span-6">
                <Controller
                  control={control}
                  rules={{
                    required: 'El CVV es requerido',
                    validate: (value) => {
                      if (!cardValidator.cvv(value).isValid) {
                        return 'El CVV es incorrecto';
                      }
                      return true;
                    },
                  }}
                  render={({
                    field: { onChange, value, name },
                    fieldState: { error },
                  }) => (
                    <>
                      <InputMask
                        mask="999"
                        maskChar=" "
                        className={`w-full h-[45px] border ${
                          value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                        } px-6`}
                        placeholder="CVV *"
                        name={name}
                        onChange={onChange}
                        value={value}
                      />
                      {error ? (
                        <p className="text-red-500 text-xs italic">
                          {error.message}
                        </p>
                      ) : null}
                    </>
                  )}
                  name={'card.cvc'}
                />
              </div>

              <div className="col-span-12">
                <select
                  disabled={disableDropdown()}
                  id="initialDeferment"
                  className={`w-full h-[45px] border border-[#CCCCCC] px-6`}
                  onChange={(e) => {
                    setInitialDeferment(e.target.value);
                  }}
                  value={initialDeferment}
                >
                  <option value="">Pago única exhibicion</option>
                  {Number(total) >= 6000 && isCheckedBin && (
                    <option value="03">Promoción 3 Meses sin intereses</option>
                  )}
                  {/**Number(total) >= 10000 && isCheckedBin && (
                    <option value="06">Promoción 6 Meses sin intereses</option>
                  )} */}
                  {/**{total >= 10000 && isCheckedBin && (
                   <option value="06">Promoción 6 Meses sin intereses</option>
                   )} */}

                  {free ? (
                    <>
                      <option value="06">
                        Promoción 6 Meses sin intereses
                      </option>
                      <option value="09">
                        Promoción 9 Meses sin intereses
                      </option>
                      <option value="12">
                        Promoción 12 Meses sin intereses
                      </option>
                      <option value="18">
                        Promoción 18 Meses sin intereses
                      </option>
                    </>
                  ) : null}
                </select>
              </div>
            </div>
          </div>
        ) : null}
        {selectedPaymentMethod === PaymentMethodEnum.Transfer ? (
          <div className="col-span-full text-[12px]">
            Realiza tu pago directamente en nuestra cuenta bancaria. Por favor,
            usa el número del pedido como referencia de pago. Tu pedido no se
            procesará hasta que se haya recibido el importe en nuestra cuenta.
            <p className="font-bold">
              Nota: Luego de dar click a &quot;Realizar compra&quot; te daremos
              el numero de pedido para realizar tu transferencia.
            </p>
          </div>
        ) : null}

        <div className="col-span-full">
          <div className="flex items-center my-4">
            <div
              onClick={() => {
                setSelectedPaymentMethod(PaymentMethodEnum.Transfer);
              }}
              className="rounded-[2px] border border-[#919191] w-[12px] h-[12px] mx-2 flex self-center"
            >
              <div
                className={`${
                  selectedPaymentMethod === PaymentMethodEnum.Transfer
                    ? 'bg-[#F17523]'
                    : 'bg-white'
                } rounded-[2px] mx-auto flex self-center  w-[8px] h-[8px]`}
              ></div>
            </div>
            <div>Transferencia bancaria directa</div>
          </div>
          <div className="flex justify-end mt-8 mb-2">
            {
              <button
                type="submit"
                className="flex items-center text-[11px] text-white uppercase w-[210px] h-[47px] bg-[#1C355E]"
              >
                {loadingButton ? (
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
                  <div className="flex self-center mx-auto">
                    Realizar compra
                  </div>
                )}
              </button>
            }
          </div>
          <div className="flex justify-end mb-8 ">
            {error ? (
              <p className="text-red-500 text-sm italic">
                Faltan campos por llenar
              </p>
            ) : null}
          </div>
        </div>
      </>
    );
  };

  if (
    postalCodeShipping.includes(parseInt(postalCode as string)) &&
    postalCode &&
    postalCode?.length > 4
  )
    content = <PaymentForm />;
  else if (postalCode?.length > 4 && postalCode)
    content = (
      <div className="col-span-full flex justify-center mb-6">
        <a
          href={`https://api.whatsapp.com/send?phone=5215581353955&text=¡Hola!
         ¿Me podrían ayudar? Necesito ayuda con una compra, mis código postal 
         es:${
           billingAddress && billingAddress.postalCode
             ? billingAddress.postalCode
             : ''
         }
          mi correo:${
            billingAddress && billingAddress.email ? billingAddress.email : ''
          } y teléfono:
           ${
             billingAddress && billingAddress.phone ? billingAddress.phone : ''
           }con los productos: SKU: (${(cart?.items || [])
            .map((item: CartItem) => {
              return item?.sku;
            })
            .join(',')})`}
          className={`rounded-[5px] border border-[#0033A1] w-[200px] lg:min-w-[200px] h-[65px] lg:h-[45px] flex justify-center items-center text-[#0033A1] text-[11px] px-4`}
          target="_blank"
        >
          <div className="flex self-center w-[20px] h-[20px] mr-2">
            <IconWhatsapp />
          </div>
          <div className="flex self-center w-full">HABLAR CON ASESOR</div>
        </a>
      </div>
    );
  else content = <PaymentForm />;
  return (
    <RootLayout>
      <StaticMeta
        title={'Sanimex - Finalizar compra'}
        description={'Sanimex - Finalizar compra'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />

      <AlertPaymentError
        statusCode={router.query.status_code as string}
        message={router.query.message as string}
      />
      <Container>
        <div className="font-Century-Gothic grid grid-cols-12">
          <form
            ref={ref}
            id="banorte-form"
            action="https://via.banorte.com/secure3d/Solucion3DSecure.htm"
            className="hidden"
            method="post"
          ></form>
          <form
            className="col-span-full"
            onSubmit={handleSubmit((values) => {
              setError(false);
              return selectedPaymentMethod === PaymentMethodEnum.OpenPay
                ? handleCompletePayment(values as PaymentValues)
                : paymentWithTransfer(values as PaymentValues);
            }, onSubmitError)}
          >
            <div className="grid grid-cols-12 md:gap-x-10  ">
              <div className="col-span-full">
                {user && (
                  <div className="h-[90px] mt-12">
                    <span className="col-span-full text-[18px] mt-[10px] mb-6">
                      ¿Tienes un cupón de descuento?{' '}
                    </span>
                    <div className="flex justify-between gap-4 pt-2">
                      <Controller
                        control={control}
                        render={({ field: { onChange, value, name } }) => (
                          <>
                            <input
                              className={`w-full h-[45px] border px-6 border-[#CCCCCC]`}
                              placeholder={'Cupón de descuento '}
                              onChange={(e) => {
                                onChange(e);
                                setCouponCode(e.target.value);
                              }}
                              name={name}
                              value={value}
                            />
                          </>
                        )}
                        name={'discount.coupon'}
                      />
                      <button
                        onClick={() =>
                          applyCoupon({
                            code: couponCode,
                            email: user?.email as string,
                          })
                        }
                        type="button"
                        className="flex justify-center items-center text-[11px] text-white uppercase w-[210px] h-[45px] bg-[#1c355e]"
                      >
                        {loadingApplyCoupon ? (
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
                          <div className="flex self-center mx-auto">
                            Aplicar cupón
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-span-full text-[18px]">
                {!user ? (
                  <div className="h-[90px] mt-12">
                    ¿Ya eres cliente?{' '}
                    <Link
                      className="underline"
                      href={`/auth?redirect=${redirect}`}
                    >
                      Haz clic aquí para acceder
                    </Link>
                  </div>
                ) : null}
              </div>
              <div className="col-span-full md:col-span-6">
                <CheckoutBillingAddress control={control} />
                <div className="flex items-center my-4">
                  <button
                    onClick={() => {
                      setIsShipping(!isShipping);
                    }}
                    type="button"
                    className="rounded-[2px] border border-[#919191] w-[12px] h-[12px] mx-2 flex self-center"
                  >
                    <div
                      className={`${
                        isShipping ? 'bg-[#F17523]' : 'bg-white'
                      } rounded-[2px] mx-auto flex self-center  w-[8px] h-[8px]`}
                    ></div>
                  </button>
                  <div>¿Enviar a una dirección diferente?</div>
                </div>
                {isShipping ? (
                  <div className="mb-4">
                    <CheckoutShippingAddress control={control} />
                  </div>
                ) : null}
                <Controller
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <textarea
                        placeholder="Indicaciones del pedido (opcional)"
                        className="w-full h-[200px] border border-[#CCCCCC] px-6 py-4"
                        cols={30}
                        rows={10}
                        onChange={onChange}
                        value={value}
                      ></textarea>
                      {error ? (
                        <p className="text-red-500 text-xs italic">
                          {error.message}
                        </p>
                      ) : null}
                    </>
                  )}
                  name={'note'}
                />
              </div>

              <div className="col-span-full md:col-span-6">
                <div className="grid grid-cols-5 ">
                  <div className="col-span-full">
                    <div className="text-[#333E48] font-Century-Gothic-Bold text-[25px]  mb-[20px]">
                      DETALLES DE TU COMPRA
                    </div>
                  </div>
                  <div className="col-span-full">
                    <CheckoutDetails
                      cart={cart}
                      FreeShipping={hasProductWithSku}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-5">
                  <div className="col-span-full">
                    <CheckoutShippingMethods
                      postalCode={postalCode}
                      onSelected={(_shippingOption, _shippingZone) => {
                        setShippingOption(_shippingOption);
                        setShippingZone(_shippingZone);
                      }}
                      FreeShippingSku={hasProductWithSku}
                    />
                  </div>
                  <div className="col-span-full">
                    <div className="my-6 ">
                      {internalBanner?.redirectUrl &&
                        internalBanner?.sourceUrl && (
                          <Link href={internalBanner?.redirectUrl as string}>
                            <div className="w-[300px] h-[250px] relative m-auto hidden">
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
                  {content}
                </div>
              </div>
            </div>
          </form>
        </div>
      </Container>
      <PayPhases step={paymentStep} loading={loading} />
    </RootLayout>
  );
};

export const getServerSideProps = async () => {
  try {
    const cart = await fetchCart();
    const internalBanner = await fetchInternalBanner();

    return {
      props: {
        cart,
        internalBanner,
      },
    };
  } catch {
    console.error('Error fetching cart:');

    return {
      props: {
        cart: null,
        internalBanner: null,
      },
    };
  }
};

export default Data;
