import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ticket from '@/images/ticketExample.png';
import { useForm, Controller } from 'react-hook-form';
import { RegisterAnniversaryUserInput } from '@/modules/anniversary/anniversary-types';
import { useCallAction } from '@cobuildlab/react-simple-state';
import { registerAnniversaryUser } from '@/modules/anniversary/anniversary-actions';
import { useUserHook } from '@/modules/auth/user-hooks';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/navigation';
import { setTimeout } from 'timers';
import BannerFormComplete from '@/images/landingSuccesForm.jpg';
/**import ImageSuccess from '@/images/successImage.jpg'; */
import {
  createActiveCampaignContact,
  fetchActiveCampaignContactContactLists,
  fetchActiveCampaignContactsList,
  updateActiveCampaignContact,
  updateActiveCampaignContactList,
} from '@/modules/active-campaign/active-campaign-actions';
import { ActiveCampaignContact } from '@/modules/active-campaign/active-campaign-types';

const RegisterForm: React.FC = () => {
  const { push } = useRouter();
  const [success, setSuccess] = useState<boolean>(false);

  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');
  const { handleSubmit, control, setValue, getValues } = useForm();
  const [selectedVideo, setSelectedVideo] = useState<File | undefined>(
    undefined,
  );
  const ref = useRef<HTMLInputElement | null>(null);
  const {
    state: { user },
  } = useUserHook();
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);

  const handleActiveCampaign = async (data: {
    ticketUrl?: string | null;
    videoUrl?: string | null;
  }) => {
    const values = getValues();
    const activeCampaignContacts = await fetchActiveCampaignContactsList(
      values.email,
    );
    let contact: undefined | ActiveCampaignContact;
    const fieldValues = [
      { field: '9', value: values?.state ?? '' },
      { field: '5', value: values?.postalCode ?? '' },
      { field: '4', value: values.age ?? '' },
      { field: '8', value: values?.ticket?.store ?? '' },
      { field: '2', value: data.videoUrl ?? '' },
      { field: '3', value: data.ticketUrl ?? '' },
      { field: '7', value: values?.video?.caption ?? '' },
      {
        field: '6',
        value: values?.ticket?.ticketNumber ?? '',
      },
    ];
    if (activeCampaignContacts?.length) {
      contact = activeCampaignContacts?.length
        ? activeCampaignContacts[0]
        : undefined;

      await updateActiveCampaignContact({
        id: contact?.id,
        contact: {
          firstName: values.name ?? '',
          phone: values.phone ?? '',
          fieldValues,
        },
      });
    } else {
      contact = await createActiveCampaignContact({
        contact: {
          firstName: values.name ?? '',
          phone: values.phone ?? '',
          email: values.email ?? '',
          fieldValues,
        },
      });
    }

    if (contact) {
      const contactContactList = await fetchActiveCampaignContactContactLists(
        contact?.id as number,
      );
      if (!contactContactList?.length) {
        await updateActiveCampaignContactList({
          contactList: {
            list: 5,
            contact: contact?.id as number,
            status: 1,
          },
        });
      }
    }
  };

  const [callRegisterAnniversary] = useCallAction(registerAnniversaryUser, {
    onCompleted: (data) => {
      if (data?.registerAnniversaryUser?.success) {
        setSuccess(true);
        handleActiveCampaign({
          videoUrl: data?.registerAnniversaryUser?.videoUrl,
          ticketUrl: data?.registerAnniversaryUser?.ticketUrl,
        });
        addToast('Se enviaron tus datos correctamente', {
          appearance: 'success',
        });
      } else {
        addToast('Tenemos problemas para enviar tus datos', {
          appearance: 'error',
        });
      }
    },
    onError: () => {
      setLoading(false);
      addToast('Tenemos problemas para enviar tus datos', {
        appearance: 'error',
      });
    },
  });

  useEffect(() => {
    if (user) {
      setValue('email', user.email);
    }
  }, [setValue, user]);

  useEffect(() => {
    setTimeout(() => {
      if (success) {
        push('/promociones');
      }
    }, 10000);
  }, [success, push]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(async (values: RegisterAnniversaryUserInput) => {
          setLoading(true);
          console.log('getValues', getValues());
          const inputFile = document.getElementById(
            'fileInput',
          ) as HTMLInputElement;
          const file = inputFile?.files?.item(0) as File;

          const { video, ticket, ...rest } = values;

          callRegisterAnniversary({
            upload: {
              ...rest,
              video: {
                file: selectedVideo as File,
                caption: video?.caption,
              },
              ticket: {
                ticketNumber: ticket?.ticketNumber,
                store: ticket?.store,
                file,
              },
            },
          });
        })}
        className="flex flex-col space-y-4 px-1"
      >
        <div className="flex flex-col space-y-2">
          <div className="uppercase text-[20px] md:text-[40px] font-Century-Gothic-Bold text-white">
            {user ? 'Llena tus datos:' : 'Regístrate:'}
          </div>
          <div className="flex md:flex-row flex-col md:space-x-2">
            <div className="w-[220px] text-[20px] text-white font-Century-Gothic-Bold">
              Nombre completo:
            </div>
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'El nombre completo es requerido',
              }}
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => (
                <div className="w-full">
                  <input
                    className={`w-full h-[45px] border ${
                      value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                    } px-6`}
                    onChange={onChange}
                    name={name}
                  />
                  {error ? (
                    <p className="text-red-500 text-xs italic">
                      {error.message}
                    </p>
                  ) : null}
                </div>
              )}
            />
          </div>
          <div className="flex md:flex-row flex-col  md:space-x-2">
            <div className="w-[220px] text-[20px] text-white font-Century-Gothic-Bold">
              Edad:
            </div>
            <Controller
              control={control}
              name="age"
              rules={{
                required: 'El campo de edad es requerido',
              }}
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => (
                <div className="w-full">
                  <input
                    className={`w-full h-[45px] border ${
                      value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                    } px-6`}
                    onChange={onChange}
                    name={name}
                  />
                  {error ? (
                    <p className="text-red-500 text-xs italic">
                      {error.message}
                    </p>
                  ) : null}
                </div>
              )}
            />
          </div>
          <div className="flex md:flex-row flex-col md:space-x-2">
            <div className="w-[220px] text-[20px] text-white font-Century-Gothic-Bold">
              Email:
            </div>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'El email es requerida',
              }}
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => (
                <div className="w-full">
                  <input
                    className={`w-full h-[45px] border ${
                      value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                    } px-6`}
                    onChange={onChange}
                    name={name}
                    disabled={!!user}
                    value={value}
                  />
                  {error ? (
                    <p className="text-red-500 text-xs italic">
                      {error.message}
                    </p>
                  ) : null}
                </div>
              )}
            />
          </div>
          <div className="flex md:flex-row flex-col md:space-x-2">
            <div className="w-[220px] text-[20px] text-white font-Century-Gothic-Bold">
              Teléfono móvil:
            </div>
            <Controller
              control={control}
              name="phone"
              rules={{
                required: 'El teléfono móvil es requerida',
              }}
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => (
                <div className="w-full">
                  <input
                    className={`w-full h-[45px] border ${
                      value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                    } px-6`}
                    onChange={onChange}
                    name={name}
                  />
                  {error ? (
                    <p className="text-red-500 text-xs italic">
                      {error.message}
                    </p>
                  ) : null}
                </div>
              )}
            />
          </div>
          <div className="flex md:flex-row flex-col md:space-x-2">
            <div className="w-[220px] text-[20px] text-white font-Century-Gothic-Bold">
              Estado:
            </div>
            <Controller
              control={control}
              name="state"
              rules={{
                required: 'El estado es requerido',
              }}
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => (
                <div className="w-full">
                  <input
                    className={`w-full h-[45px] border ${
                      value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                    } px-6`}
                    onChange={onChange}
                    name={name}
                  />
                  {error ? (
                    <p className="text-red-500 text-xs italic">
                      {error.message}
                    </p>
                  ) : null}
                </div>
              )}
            />
          </div>
          <div className="flex md:flex-row flex-col md:space-x-2">
            <div className="w-[220px] text-[20px] text-white font-Century-Gothic-Bold">
              Código postal:
            </div>
            <Controller
              control={control}
              name="postalCode"
              rules={{
                required: 'El código postal es requerido',
              }}
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => (
                <div className="w-full">
                  <input
                    className={`w-full h-[45px] border ${
                      value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                    } px-6`}
                    onChange={onChange}
                    name={name}
                  />
                  {error ? (
                    <p className="text-red-500 text-xs italic">
                      {error.message}
                    </p>
                  ) : null}
                </div>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="text-[22px] sm:text-[40px] leading-[40px] font-Century-Gothic-Bold text-white">
            REGISTRA tu ticket de compra:
          </div>
          <div className="text-black text-[20px] leading-[20px] sm:text-[30px] sm:leading-[30px] font-Century-Gothic">
            Recuerda guardar tu ticket de compra hasta el final de la dinámica.
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2">
            <div className="w-[220px] text-[20px] text-white font-Century-Gothic-Bold">
              Número del pedido:
            </div>
            <Controller
              control={control}
              name="ticket.ticketNumber"
              rules={{
                required: 'El número del ticket es requerido',
              }}
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => (
                <div className="w-full">
                  <input
                    className={`w-full h-[45px] border ${
                      value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                    } px-6`}
                    onChange={onChange}
                    name={name}
                  />
                  {error ? (
                    <p className="text-red-500 text-xs italic">
                      {error.message}
                    </p>
                  ) : null}
                </div>
              )}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2">
            <div className="w-[220px] flex items-center text-[20px] text-white font-Century-Gothic-Bold">
              Monto de compra:
            </div>
            <Controller
              control={control}
              name="ticket.ticketAmount"
              rules={{
                required: 'El monto de compra es requerido',
              }}
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => (
                <div className="w-full">
                  <input
                    className={`w-full h-[45px] border ${
                      value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                    } px-6`}
                    onChange={onChange}
                    name={name}
                  />
                  {error ? (
                    <p className="text-red-500 text-xs italic">
                      {error.message}
                    </p>
                  ) : null}
                </div>
              )}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2">
            <div className="flex items-center w-[220px] text-[20px] text-white font-Century-Gothic-Bold">
              Tienda:
            </div>
            <Controller
              control={control}
              name="ticket.store"
              rules={{
                required: 'La tienda es requerida',
              }}
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => (
                <div className="w-full">
                  <input
                    className={`w-full h-[45px] border ${
                      value ? 'border-[#30D672]' : 'border-[#CCCCCC]'
                    } px-6`}
                    onChange={onChange}
                    name={name}
                  />
                  {error ? (
                    <p className="text-red-500 text-xs italic">
                      {error.message}
                    </p>
                  ) : null}
                </div>
              )}
            />
          </div>
          <div className="flex flex-col sm:flex-row text-white sm:space-x-4 space-y-2">
            <div className="w-[220px] text-[20px] font-Century-Gothic-Bold">
              Carga tu ticket aquí:
            </div>
            {/*<div className='text-white'>{ticketRegister.fileName}</div>*/}
            <Controller
              control={control}
              name="ticket.file"
              rules={{
                required: 'La imagen del ticket es requerido',
              }}
              render={({
                field: { onChange, name },
                fieldState: { error },
              }) => (
                <>
                  <input
                    id="fileInput"
                    onChange={onChange}
                    name={name}
                    type="file"
                  />
                  {error ? (
                    <p className="text-red-500 text-xs italic">
                      {error.message}
                    </p>
                  ) : null}
                </>
              )}
            />
          </div>
        </div>
        <div className="flex justify-center py-4">
          <div className="w-full h-[500px] relative">
            <Image src={ticket} alt="" fill style={{ objectFit: 'contain' }} />
          </div>
        </div>
        <div className="flex flex-col space-y-4 pb-4">
          <div className="text-[22px] sm:text-[40px] leading-[40px] font-Century-Gothic-Bold text-white">
            RESPONDE para participar:
          </div>
          <div className="sm:pl-[150px] flex items-center">
            <div className="pr-4 text-white font-Century-Gothic text-[22px] sm:text-[24px]">
              ¿Cuántos años cumple Sanimex?
            </div>
            <div>
              <select
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="flex self-center text-[20px]"
              >
                <option value="A">64</option>
                <option value="B">50</option>
                <option value="C">20</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 pb-8">
          <div className=" text-[22px] sm:text-[40px] leading-[40px] font-Century-Gothic-Bold text-white">
            COMPARTE tu video:
          </div>
          <div className="text-white sm:text-[20px] font-Century-Gothic flex flex-col space-y-2">
            <div>
              En un video de máximo 60 segundos enséñanos la porra que creaste
              para Sanimex y súbela antes del 30 de diciembre.
            </div>
            <div>* Solo se aceptará un video por persona.</div>
            <div>
              * Deberá estar en formato .mp4 en resolución estándar 1080p{' '}
              {'(HD)'}: 1920 x 1080.
            </div>
            <div>* Título de video (incluye un título a tu porra).</div>
          </div>
          <div>
            <Controller
              control={control}
              name="video.file"
              rules={{
                required: 'El video es requerido',
              }}
              render={({
                field: { onChange, name },
                fieldState: { error },
              }) => (
                <>
                  <input
                    ref={ref}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target?.files?.item(0) as File;

                      setSelectedVideo(file);
                      onChange(e);
                    }}
                    name={name}
                    type="file"
                  />
                  {error ? (
                    <p className="text-red-500 italic">{error.message}</p>
                  ) : null}
                </>
              )}
            />
            {selectedVideo ? (
              <div onClick={() => ref.current?.click()}>
                <video autoPlay>
                  <source
                    src={URL.createObjectURL(selectedVideo)}
                    type="video/mp4"
                  />
                </video>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px',
                  width: '100%',
                  border: '1px dotted',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                }}
                onClick={() => ref.current?.click()}
                className="mx-auto"
              >
                Arrastre y suelte los archivos aquí.
              </div>
            )}
          </div>
          <div>
            <div className="text-white font-Century-Gothic sm:text-[20px]">
              Título de video
            </div>
            <Controller
              control={control}
              name="video.caption"
              rules={{
                required: 'El titulo del video es requerido',
              }}
              render={({
                field: { onChange, name },
                fieldState: { error },
              }) => (
                <>
                  <textarea
                    id="w3review"
                    name={name}
                    placeholder="Ingresar título de video."
                    onChange={onChange}
                    className="w-full border border-gray p-2"
                    rows={4}
                    cols={50}
                  ></textarea>
                  {error ? (
                    <p className="text-red-500 text-xs italic">
                      {error.message}
                    </p>
                  ) : null}
                </>
              )}
            />
          </div>
        </div>
        <div className="flex">
          <div className="">
            <div className="flex">
              <input
                id="acceptTerms"
                type="checkbox"
                onChange={() => setAcceptTerms(!acceptTerms)}
                className=""
              />
              <div className="pl-2 font-Century-Gothic flex items-center">
                <div className="leading-[20px]">
                  He leído, entendido y acepto los{' '}
                  <span className="font-bold">
                    <Link href={'terminos-y-condiciones'} className="underline">
                      Términos y Condiciones
                    </Link>{' '}
                    y{' '}
                    <Link href={'aviso-de-privacidad'} className="underline">
                      Aviso de privacidad{' '}
                    </Link>{' '}
                    del sitio web
                  </span>
                  .
                </div>
              </div>
            </div>
            {!acceptTerms ? (
              <p className="text-red-500 text-xs italic">
                {'Acepte los términos y condiciones'}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button
            className="p-4 rounded-[8px] font-Century-Gothic-Bold bg-[#002640] text-white text-[20px] w-[200px] disabled:opacity-50"
            disabled={!acceptTerms}
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
              <div className="flex justify-center text-center">Enviar</div>
            )}
          </button>
        </div>
      </form>
      {/**{success ? (
        typeof selectedVideo === 'undefined' ? (
          <div className=" left-0 top-0 fixed bg-white bg-opacity-20 flex justify-center items-center w-full h-screen z-50 backdrop-blur-sm ">
            <div className="  drop-shadow-[0_3px_1.2px_rgba(0,0,0,1)]">
              <Link   href={'/promociones'}>
                <div className="relative w-[300px] h-[250px] md:w-[450px] md:h-[375px] lg:w-[600px] lg:h-[500px] rounded-[8px] overflow-hidden">
                  <Image
                    alt={'Envío de formulario correcto'}
                    src={BannerFormComplete}
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </Link>
              {Ya estas participando, ¡Muchas Gracias!
              <div className="text-[40px] text-black">Redireccionando . . .</div>}
            </div>
          </div>
        ) : (
          <div className=" left-0 top-0 fixed bg-white bg-opacity-20 flex justify-center items-center w-full h-screen z-50 backdrop-blur-sm ">
            <div className="  drop-shadow-[0_3px_1.2px_rgba(0,0,0,1)]">
              <Link   href={'/promociones'}>
                <div className="relative w-[300px] h-[250px] md:w-[450px] md:h-[375px] lg:w-[600px] lg:h-[500px] rounded-[8px] overflow-hidden">
                  <Image
                    alt={'Envío de formulario correcto'}
                    src={ImageSuccess}
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </Link>
              {Ya estas participando, ¡Muchas Gracias!
              <div className="text-[40px] text-black">Redireccionando . . .</div>}
            </div>
          </div>
        )
      ) : null}
      ; */}
      {success ? (
        <div className=" left-0 top-0 fixed bg-white bg-opacity-20 flex justify-center items-center w-full h-screen z-50 backdrop-blur-sm ">
          <div className="  drop-shadow-[0_3px_1.2px_rgba(0,0,0,1)]">
            <Link href={'/promociones'}>
              <div className="relative w-[300px] h-[250px] md:w-[450px] md:h-[375px] lg:w-[600px] lg:h-[500px] rounded-[8px] overflow-hidden">
                <Image
                  alt={'Envío de formulario correcto'}
                  src={BannerFormComplete}
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </div>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RegisterForm;
