import React from 'react';
import { Control } from 'react-hook-form/dist/types/form';
import { Controller } from 'react-hook-form';

type CheckoutBillingAddressProps = {
  control: Control;
};

const CheckoutShippingAddress: React.FC<CheckoutBillingAddressProps> = ({
  control,
}) => {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-full">
        <div className="text-[#333E48] font-Century-Gothic-Bold text-[25px] mb-[20px]">
          DETALLES DE ENVÍO
        </div>
      </div>
      <div className="col-span-full">
        <div className="grid grid-cols-12 gap-2 md:gap-4">
          <div className="col-span-full md:col-span-6">
            <Controller
              control={control}
              rules={{
                required: 'El nombre es requerido',
              }}
              render={({
                field: { onChange, value, name, ref },
                fieldState: { error },
              }) => (
                <>
                  <input
                    ref={ref}
                    className={`w-full h-[45px] border ${
                      value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                    } px-6`}
                    placeholder={'Nombre *'}
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
              name={'shipping.firstName'}
            />
          </div>
          <div className="col-span-full md:col-span-6">
            <Controller
              control={control}
              rules={{
                required: 'El Apellido es requerido',
              }}
              render={({
                field: { onChange, value, name, ref },
                fieldState: { error },
              }) => (
                <>
                  <input
                    ref={ref}
                    className={`w-full h-[45px] border ${
                      value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                    } px-6`}
                    name={name}
                    placeholder={'Apellido *'}
                    onChange={onChange}
                  />
                  {error ? (
                    <p className="text-red-500 text-xs italic">
                      {error.message}
                    </p>
                  ) : null}
                </>
              )}
              name={'shipping.lastname'}
            />
          </div>
          <div className="col-span-full md:col-span-6">
            <Controller
              control={control}
              defaultValue={'México'}
              render={({ field: { value, name } }) => (
                <input
                  className="w-full h-[45px] border border-[#30D672] px-6"
                  placeholder={'País *'}
                  value={value}
                  disabled
                  name={name}
                />
              )}
              name={'shipping.country'}
            />
          </div>
          <div className="col-span-full md:col-span-6">
            <Controller
              control={control}
              rules={{
                required: 'El estado es requerido',
              }}
              render={({
                field: { onChange, value, name, ref },
                fieldState: { error },
              }) => (
                <>
                  <input
                    ref={ref}
                    className={`w-full h-[45px] border ${
                      value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                    } px-6`}
                    placeholder="Estado *"
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
              name={'shipping.state'}
            />
          </div>
          <div className="col-span-12">
            <Controller
              control={control}
              rules={{
                required: 'La dirección es requerida',
              }}
              render={({
                field: { onChange, value, name, ref },
                fieldState: { error },
              }) => (
                <>
                  <input
                    ref={ref}
                    className={`w-full h-[45px] border ${
                      value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                    } px-6`}
                    placeholder="Dirección *"
                    onChange={onChange}
                    value={value}
                    name={name}
                  />
                  {error ? (
                    <p className="text-red-500 text-xs italic">
                      {error.message}
                    </p>
                  ) : null}
                </>
              )}
              name={'shipping.address1'}
            />
          </div>
          <div className="col-span-12">
            <Controller
              control={control}
              render={({
                field: { onChange, value, name, ref },
                fieldState: { error },
              }) => (
                <>
                  <input
                    ref={ref}
                    className={`w-full h-[45px] border ${
                      value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                    } px-6`}
                    placeholder="Colonia"
                    onChange={onChange}
                    value={value}
                    name={name}
                  />
                  {error ? (
                    <p className="text-red-500 text-xs italic">
                      {error.message}
                    </p>
                  ) : null}
                </>
              )}
              name={'billingAddress.address2'}
            />
          </div>
          <div className="col-span-full md:col-span-6">
            <Controller
              control={control}
              rules={{
                required: 'El código postal es requerido',
              }}
              render={({
                field: { onChange, value, name, ref },
                fieldState: { error },
              }) => (
                <>
                  <input
                    ref={ref}
                    className={`w-full h-[45px] border ${
                      value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                    } px-6`}
                    placeholder="Código postal *"
                    type="number"
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
              name={'shipping.postalCode'}
            />
          </div>
          <div className="col-span-full md:col-span-6">
            <Controller
              control={control}
              rules={{
                required: 'El teléfono es requerido',
              }}
              render={({
                field: { onChange, value, name, ref },
                fieldState: { error },
              }) => (
                <>
                  <input
                    ref={ref}
                    className={`w-full h-[45px] border ${
                      value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                    } px-6`}
                    placeholder="Teléfono *"
                    type="number"
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
              name={'shipping.phone'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutShippingAddress;
