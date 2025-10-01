import React, { useRef, useState } from 'react';
import {
  Control,
  Controller,
  SubmitErrorHandler,
  useForm,
} from 'react-hook-form';
import cardValidator from 'card-validator';
import InputMask from 'react-input-mask';
import dynamic from 'next/dynamic';

const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));

const Container = dynamic(() => import('@/components/utils/Container'));

type FormType = {
  CARD_NUMBER: string;
  CARD_EXP: string;
  AMOUNT: string;
  CARD_TYPE: string;
  MERCHANT_ID: string;
  MERCHANT_NAME: string;
  FORWARD_PATH: string;
  '3D_CERTIFICATION': string;
  REFERENCE3D: string;
  COUNTRY: string;
  CITY: string;
  EMAIL: string;
  NAME: string;
  LAST_NAME: string;
  POSTAL_CODE: string;
  STREET: string;
  THREED_VERSION: string;
  MOBILE_PHONE: string;
  CREDIT_TYPE: string;
  SECURITY_CODE: string;
};
const PaymentForm: React.FC = () => {
  const ref = useRef<HTMLFormElement | null>(null);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      CARD_NUMBER: '',
      CARD_EXP: '',
      AMOUNT: '3',
      CARD_TYPE: 'MC',
      MERCHANT_ID: '9159213',
      MERCHANT_NAME: 'SA911753717',
      FORWARD_PATH: 'https://sanimex.com.mx/api/banorte',
      '3D_CERTIFICATION': '03',
      REFERENCE3D: '14255',
      COUNTRY: 'MX',
      CITY: 'Ciudad de mexico',
      EMAIL: 'luiseulacio1255@gmail.com',
      NAME: 'luis',
      LAST_NAME: 'Eulacio',
      POSTAL_CODE: '01060',
      STREET: 'Av La Paz',
      THREED_VERSION: '2',
      MOBILE_PHONE: '584242927574',
      CREDIT_TYPE: 'CR',
      SECURITY_CODE: '',
    },
  });
  const [error, setError] = useState(false);

  const onSubmitError: SubmitErrorHandler<Control> = () => setError(true);
  return (
    <RootLayout>
      <Container>
        <form
          ref={ref}
          id="banorte-form"
          action="https://via.banorte.com/secure3d/Solucion3DSecure.htm"
          className="hidden"
          method="post"
        ></form>
        <form
          className="col-span-full"
          onSubmit={handleSubmit((values: FormType) => {
            const { AMOUNT, SECURITY_CODE, CARD_NUMBER, CARD_EXP } = values;
            const requiredFields = {
              AMOUNT,
              SECURITY_CODE,
              CARD_EXP,
              CARD_NUMBER,
            };
            const result = '?' + new URLSearchParams(requiredFields).toString();

            values.FORWARD_PATH += result;
            values.CARD_NUMBER = values.CARD_NUMBER.replaceAll(' ', '');
            const form = document.getElementById('banorte-form');
            Object.keys(values).forEach((value) => {
              const input = document.createElement('input');
              input.name = value;
              input.setAttribute(
                'value',
                values[value as keyof FormType] as string,
              );
              form?.appendChild(input);
              ref.current?.submit();
            });
          }, onSubmitError)}
        >
          <div className="grid grid-cols-12 md:gap-x-10">
            <div className="col-span-full md:col-span-6">
              <div className="grid grid-cols-5">
                <div className="col-span-full">
                  <div className="text-[#333E48] font-Century-Gothic-Bold text-[25px] mt-[80px]">
                    Información de pago
                  </div>
                </div>
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
                            />
                            {error ? (
                              <p className="text-red-500 text-xs italic">
                                {error.message}
                              </p>
                            ) : null}
                          </>
                        )}
                        name={'NAME'}
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
                              onChange={onChange}
                            />
                            {error ? (
                              <p className="text-red-500 text-xs italic">
                                {error.message}
                              </p>
                            ) : null}
                          </>
                        )}
                        name={'CARD_NUMBER'}
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
                        name={'CARD_EXP'}
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
                            />
                            {error ? (
                              <p className="text-red-500 text-xs italic">
                                {error.message}
                              </p>
                            ) : null}
                          </>
                        )}
                        name={'SECURITY_CODE'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 md:gap-x-10">
            <div className="col-span-full md:col-span-6 flex justify-end mt-8 mb-2">
              {
                <button
                  type="submit"
                  className="flex text-[11px] text-white uppercase w-[210px] h-[47px] bg-[#1C355E]"
                >
                  <div className="flex self-center mx-auto">
                    Realizar compra
                  </div>
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
        </form>
      </Container>
    </RootLayout>
  );
};

export default PaymentForm;
