/* eslint-disable no-undef */
import React, { Fragment, useCallback, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { GOOGLE_MAP_API_KEY } from '@/utils/constants';
import { useCallAction, useStore } from '@cobuildlab/react-simple-state';
import {
  checkStoreAction,
  confirmGeolocationStoreAction,
} from '@/modules/geolocation/geolocation-actions';
import {
  calculateCost,
  getDistance,
} from '@/modules/geolocation/geolocation-utils';
import SelectGoogleAutocomplete from '@/components/geolocation/components/SelectGoogleAutocomplete';
import { LngLatType } from '@/modules/geolocation/geolocation-types';
import { confirmGeolocationStore } from '@/modules/geolocation/geolocation-events';
import { ShopType } from '@/modules/shop/shop-types';
import IconWhatsapp from '@/images/icon-whatsapp-modal.svg';
import IconHouse from '@/images/icohogar.svg';

const POSITION_DEFAULT = {
  lat: 19.390734,
  lng: -99.143613,
};

const options: google.maps.MapOptions = {
  gestureHandling: 'cooperative',
  zoom: 15,
};

type GeolocationDialogProps = {
  selectedShippingOption: boolean;
  FreeShipping: boolean;
};

const GeolocationDialog: React.FC<GeolocationDialogProps> = ({
  selectedShippingOption,
  FreeShipping,
}) => {
  const [open, setOpen] = useState(false);
  const [directionsRender, setDirectionRender] = useState<
    google.maps.DirectionsRenderer | undefined
  >(undefined);
  const { distance: distanceResult } = useStore(confirmGeolocationStore);
  const [canConfirm, setCanConfirm] = useState(true);
  const [canCalculate, setCanCalculate] = useState(true);
  const [country, setCountry] = useState('');
  const cancelButtonRef = useRef(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: ['places'],
  });
  const [selectedShop, setSelectedShop] = useState<ShopType | undefined>(
    undefined,
  );
  const [center, setCenter] = useState<LngLatType>(POSITION_DEFAULT);

  const [directions, setDirections] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  const [origin, setOrigin] = useState<LngLatType>(undefined);

  const [, setMap] = React.useState<google.maps.Map | undefined>(undefined);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    const _directionsRenderer = new google.maps.DirectionsRenderer();
    setMap(map);
    _directionsRenderer.setMap(map);
    setDirectionRender(_directionsRenderer);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(undefined);
  }, []);

  const [callCheckStore, loading] = useCallAction(checkStoreAction, {
    onCompleted: (data) => {
      directionsRender?.setDirections(
        data.directions as google.maps.DirectionsResult,
      );
      const _distance = getDistance(directions);
      setSelectedShop(data.shop);
      setDirections(data.directions);
      setCanConfirm(!(calculateCost(_distance, FreeShipping) <= 25));
      console.log(
        'calculateCost(_distance, FreeShipping) <= 25',
        calculateCost(_distance, FreeShipping) <= 25,
      );
    },
  });

  const distance = getDistance(directions);
  console.log(selectedShippingOption);
  return (
    <>
      <div
        className={`mt-2  flex  flex-col justify-center items-center border cursor-pointer ${
          selectedShippingOption ? 'border-[#0071CE]' : 'border-gray-300'
        } rounded-md w-[280px] h-[121px]`}
      >
        {' '}
        <div className="flex items-center h-[50px] ">
          <IconHouse className="ml-7" />
          <span className="text-[16px] ml-6 font-century-Gothic ">
            Envío a Domicilio{' '}
          </span>
        </div>
        {distanceResult ? (
          <div>
            :
            <span className="font-bold">
              {' '}
              ${calculateCost(distanceResult, FreeShipping).toFixed(2)}
            </span>
          </div>
        ) : (
          ''
        )}
        <div
          className="underline ml-2 mb-3 underline-[#0274CC text-[#0274CC] font-bold cursor-pointer text-[14px] font-Century-Gothic-Bold uppercase"
          onClick={() => setOpen(true)}
        >
          {`${distanceResult ? 'MODIFICAR' : 'CALCULAR PRECIO A DOMICILIO'}`}
        </div>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[1060px] lg:py-4">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <Dialog.Title
                      as="h3"
                      className="font-Century-Gothic-Bold leading-6 text-[#555555] mb-4"
                    >
                      Calcular distancia
                    </Dialog.Title>
                    <Dialog.Description>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                          {isLoaded ? (
                            <>
                              <GoogleMap
                                mapContainerStyle={{
                                  width: '100%',
                                  height: '400px',
                                }}
                                center={center}
                                options={options}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                                zoom={15}
                              ></GoogleMap>
                            </>
                          ) : (
                            'Cargando mapa...'
                          )}
                        </div>
                        <div className="col-span-1">
                          <div className="mb-4">
                            <SelectGoogleAutocomplete
                              onChange={(geoData) => {
                                setCenter(geoData);
                                setOrigin(geoData);
                              }}
                              onCountry={(country) => {
                                setCanCalculate(!(country === 'MX'));
                                setCountry(country);
                                setSelectedShop(undefined);
                                setDirections(undefined);
                                setCanConfirm(true);
                              }}
                            />
                          </div>
                          <div className="mb-2">
                            Costo mínimo de envío: $250
                          </div>
                          <div className="mb-2">
                            Luego de 10 km se le agrega un adicional de $20 por
                            km
                          </div>
                          <button
                            disabled={canCalculate}
                            className="border border-[#1C355E] disabled:hover:bg-transparent disabled:hover:text-[#1C355E] disabled:cursor-pointer hover:bg-[#0033A1] hover:text-white mb-4 lg:mb-0 lg:mr-2 rounded-[5px] bg-white  h-[45px] flex items-center text-[#1C355E] text-[12px] px-8"
                            onClick={() => callCheckStore(origin)}
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
                              <div className="flex items-center justify-center">
                                CALCULAR
                              </div>
                            )}
                          </button>
                          {country && country !== 'MX' ? (
                            <div>
                              La dirección seleccionada no se encuentra dentro
                              de México{' '}
                            </div>
                          ) : null}
                          {distance ? (
                            <>
                              <div>
                                {selectedShop ? (
                                  <div className="w-full">
                                    <span className="font-bold">
                                      {selectedShop.TIENDA}
                                    </span>{' '}
                                    {selectedShop.CALLE}, C.P. {selectedShop.CP}{' '}
                                    Municipio {selectedShop.CIUDAD}{' '}
                                    {selectedShop.ESTADO} Teléfono:{' '}
                                    {selectedShop.TELÉFONOS.map(
                                      ({ key, value }, index) => (
                                        <span key={index}>
                                          <a
                                            href={`tel:${value}`}
                                            className="hover:cursor-pointer text-[#0071CE] font-Century-Gothic-Bold"
                                          >
                                            {key}
                                          </a>
                                          {selectedShop.TELÉFONOS[index + 1]
                                            ? ' y '
                                            : ''}
                                        </span>
                                      ),
                                    )}
                                  </div>
                                ) : null}
                              </div>
                              <div>Distancia recorrida: {distance.text}</div>
                              {distance.value > 10000 ? (
                                <div>
                                  km extra:{' '}
                                  {((distance.value - 10000) / 1000).toFixed(1)}{' '}
                                  km
                                </div>
                              ) : null}
                              {distance.value > 25000 ? (
                                <div className="mt-2 flex flex-col justify-center items-center">
                                  <div className="mb-2">
                                    ¡Hola! Parece que actualmente no contamos
                                    con cobertura de envío para esta ubicación,
                                    sin embargo podemos cotizar el envío
                                    haciendo clic en el botón de WhatsApp
                                    ¡Estamos aquí para ayudarte a encontrar la
                                    mejor opción!
                                  </div>
                                  <a
                                    href={`https://api.whatsapp.com/send?phone=5215581353955&text=Necesito ayuda excedo el limite de distancia permitida para la entrega a domicilio`}
                                    className={`rounded-[5px] border border-[#0033A1]   h-[45px] w-[150px]  flex justify-center items-center text-[#0033A1] text-[11px] px-4`}
                                    target="_blank"
                                  >
                                    <div className="flex self-center w-[20px] h-[20px] mr-2">
                                      <IconWhatsapp />
                                    </div>
                                    <div className=" flex self-center text-center">
                                      Contactar
                                    </div>
                                  </a>
                                </div>
                              ) : (
                                <div>
                                  Costo total de envío:{' '}
                                  <strong>
                                    $
                                    {calculateCost(
                                      distance,
                                      FreeShipping,
                                    ).toFixed(2)}
                                  </strong>
                                </div>
                              )}
                            </>
                          ) : null}
                        </div>
                      </div>
                    </Dialog.Description>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 flex flex-col mx-auto lg:flex-row justify-center w-[240px] lg:w-full">
                    <button
                      className="border border-[#1C355E] hover:bg-[#0033A1] hover:text-white mb-4 lg:mb-0 lg:mr-2 rounded-[5px] bg-white  h-[45px] flex items-center text-[#1C355E] text-[12px] px-8"
                      onClick={() => {
                        setSelectedShop(undefined);
                        setDirections(undefined);
                        setOpen(false);
                      }}
                    >
                      CERRAR
                    </button>
                    <button
                      disabled={canConfirm}
                      className="border border-[#1C355E] disabled:opacity-70 text-white mb-4 lg:mb-0 lg:mr-2 rounded-[5px] bg-[#0033A1]  h-[45px] flex items-center text-[12px] px-8"
                      onClick={() => {
                        setOpen(false);
                        confirmGeolocationStoreAction(distance, selectedShop);
                      }}
                    >
                      CONFIRMAR
                    </button>
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

export default GeolocationDialog;
