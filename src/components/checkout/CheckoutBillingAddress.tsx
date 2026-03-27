import React, { useEffect /**{ useEffect } */ } from 'react';
import { useUserHook } from '@/modules/auth/user-hooks';
import validator from 'validator';
import { Control } from 'react-hook-form/dist/types/form';
import { Controller /**useWatch  */, useWatch } from 'react-hook-form';
import { useCallAction } from '@cobuildlab/react-simple-state';
import { updateActiveCampaignCompleteContact } from '@/modules/active-campaign/active-campaign-actions';
//import { useCallAction } from '@cobuildlab/react-simple-state';
//import { updateActiveCampaignContact } from '@/modules/active-campaign/active-campaign-actions';

type CheckoutBillingAddressProps = {
  control: Control;
};

const CheckoutBillingAddress: React.FC<CheckoutBillingAddressProps> = ({
  control,
}) => {
  const {
    state: { user },
  } = useUserHook();

  // const updateContact = async (data: any) => {
  //   try {
  //     const response = await axios.get(
  //       `/api/get-contact-email-active-campaign?email=${data.email}`,
  //       {
  //         headers: {
  //           'Api-Token': ACTIVE_CAMPAIGN_TOKEN,
  //         },
  //       },
  //     );

  //     const contact = response?.data?.contacts[0];
  //     const contactId = contact?.id;

  //     if (contactId) {
  //       await axios.put(`/api/update-active-campaign-contact?id=${contactId}`, {
  //         contact: {
  //           firstname: data.firstname,
  //           lastname: data.lastname,
  //           email: data.email,
  //           phone: data.phone,
  //           fieldValues: [
  //             { field: '0', value: 'No tiene Cuenta' },
  //             { field: '1', value: data.state },
  //             { field: '2', value: data.postalCode },
  //             { field: '3', value: data.address1 },
  //           ],
  //         },
  //       });
  //     } else {
  //       console.error('No se encontró el contacto con el email proporcionado.');
  //     }
  //   } catch (error) {
  //     console.error('Error al actualizar el contacto:', error);
  //   }
  // };

  const [updateContact] = useCallAction(updateActiveCampaignCompleteContact, {
    onCompleted: () => {
      console.log('Contacto actualizado exitosamente.');
    },
    onError: (error) => {
      console.error('Error al actualizar el contacto:', error);
    },
  });
  const postalCodeForm = useWatch({
    control,
    name: 'billingAddress.postalCode',
  });
  const firstnameForm = useWatch({ control, name: 'billingAddress.firstname' });
  const lastnameForm = useWatch({ control, name: 'billingAddress.lastname' });
  const emailForm = useWatch({ control, name: 'billingAddress.email' });
  const phoneForm = useWatch({ control, name: 'billingAddress.phone' });
  const address1Form = useWatch({ control, name: 'billingAddress.address1' });
  const address2Form = useWatch({ control, name: 'billingAddress.address2' });
  const countryForm = useWatch({ control, name: 'billingAddress.country' });
  const stateForm = useWatch({ control, name: 'billingAddress.state' });

  useEffect(() => {
    const billingAddress = {
      firstname: firstnameForm,
      lastname: lastnameForm,
      email: user?.email || emailForm,
      phone: phoneForm,
      postalCode: postalCodeForm,
      address1: address1Form,
      address2: address2Form,
      country: countryForm,
      state: stateForm,
    };

    updateContact(billingAddress);
  }, [
    firstnameForm,
    lastnameForm,
    emailForm,
    phoneForm,
    postalCodeForm,
    address1Form,
    address2Form,
    countryForm,
    stateForm,
  ]);

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-full">
        <div className="text-[#333E48] font-Century-Gothic-Bold text-[25px]  mb-[20px]">
          DETALLES DE PEDIDO
        </div>
      </div>
      <div className="col-span-full">
        <div className="grid grid-cols-12 gap-2 md:gap-4">
          <div className="col-span-full md:col-span-6">
            <Controller
              control={control}
              rules={{
                required: 'El nombre es requerido',
                validate: (value) => {
                  if (
                    typeof value === 'string' &&
                    (value as string).length > 60
                  ) {
                    return 'EL nombre debe tener máximo 60 caracteres';
                  }
                  return true;
                },
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
              name={'billingAddress.firstname'}
            />
          </div>
          <div className="col-span-full md:col-span-6">
            <Controller
              control={control}
              rules={{
                required: 'El Apellido es requerido',
                validate: (value) => {
                  if (
                    typeof value === 'string' &&
                    (value as string).length > 60
                  ) {
                    return 'EL apellido debe tener máximo 60 caracteres';
                  }
                  return true;
                },
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
              name={'billingAddress.lastname'}
            />
          </div>
          <div className="col-span-full">
            {user?.email ? (
              <Controller
                key={'1'}
                control={control}
                defaultValue={user?.email as string}
                render={({ field: { name }, fieldState: { error } }) => (
                  <>
                    <input
                      className={`w-full h-[45px] border border-[#30D672] px-6`}
                      placeholder={'Email *'}
                      name={name}
                      disabled
                      defaultValue={user?.email as string}
                      value={user?.email as string}
                    />
                    {error ? (
                      <p className="text-red-500 text-xs italic">
                        {error.message}
                      </p>
                    ) : null}
                  </>
                )}
                name={'billingAddress.email'}
              />
            ) : (
              <Controller
                key={'2'}
                control={control}
                rules={{
                  required: 'El email es requerido',
                  validate: (value) => {
                    if (!validator.isEmail(value)) {
                      return 'EL formato dEl correo no está registrado';
                    }
                    return true;
                  },
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
                      placeholder={'Email *'}
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
                name={'billingAddress.email'}
              />
            )}
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
              name={'billingAddress.country'}
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
              name={'billingAddress.state'}
            />
          </div>
          <div className="col-span-12">
            <Controller
              control={control}
              rules={{
                required: 'La dirección es requerida',
                validate: (value) => {
                  if (
                    typeof value === 'string' &&
                    (value as string).length > 60
                  ) {
                    return 'La dirección debe tener máximo 60 caracteres';
                  }
                  return true;
                },
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
              name={'billingAddress.address1'}
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
              name={'billingAddress.postalCode'}
            />
          </div>
          <div className="col-span-full md:col-span-6">
            <Controller
              control={control}
              rules={{
                required: 'El teléfono es requerido',
                validate: (value) => {
                  if (
                    typeof value === 'string' &&
                    (value as string).length > 60
                  ) {
                    return 'El teléfono debe tener máximo 25 caracteres';
                  }
                  return true;
                },
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
              name={'billingAddress.phone'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBillingAddress;
