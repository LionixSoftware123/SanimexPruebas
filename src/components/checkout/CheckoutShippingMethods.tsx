import React, { useEffect, useState } from 'react';
import axios from 'axios';
import postalCodeShipping from '@/utils/postal-code-shipping.json';
import shops from '@/utils/sucursales.json';
import dynamic from 'next/dynamic';
import { selectedShopStoreAction } from '@/modules/shop/shop-actions';
import { ShopType } from '@/modules/shop/shop-types';
import Select from 'react-select';

import { confirmGeolocationStoreAction } from '@/modules/geolocation/geolocation-actions';
import IconShop from '@/images/icoshop.svg';
const GeolocationDialog = dynamic(
  () => import('@/components/geolocation/GeolocationDialog'),
);

export enum ShippingEnum {
  InShop = 'in_shop',
  ByShipping = 'by_shipping',
}

type ShippingZoneType = {
  id: number;
  name: string;
  postalCode: string[];
  address?: string;
}[];

type ShippingZone =
  | {
      id: number;
      name: string;
      postalCode: string[];
      address?: string;
    }
  | undefined;

type CheckoutShippingMethodsProps = {
  postalCode?: string;
  onSelected: (
    option: ShippingEnum,
    selectedShippingZone: ShippingZone | undefined,
  ) => void;
  FreeShippingSku: boolean;
};

const CheckoutShippingMethods: React.FC<CheckoutShippingMethodsProps> = ({
  postalCode,
  onSelected,
  FreeShippingSku,
}) => {
  const [selectedShippingOption, setSelectedShippingOption] =
    useState<ShippingEnum>(ShippingEnum.ByShipping);
  const [shippingZone, setShippingZone] = useState<ShippingZoneType>([]);
  const [selectedShop, setSelectedShop] = useState<ShopType | undefined>(
    undefined,
  );
  const [selectedShippingZone, setSelectedShippingZone] = useState<
    | {
        id: number;
        name: string;
        postalCode: string[];
        address?: string;
      }
    | undefined
  >(undefined);

  const options = shops.map((shop, i) => ({
    value: i,
    label: `${shop.TIENDA}, ${shop.COLONIA}, ${shop.ESTADO}`,
  }));

  const handleShippingZone = async () => {
    const response = await axios.get('/api/woo-shipping-zones');

    setShippingZone(response.data);
  };

  useEffect(() => {
    handleShippingZone();
  }, []);

  useEffect(() => {
    if (postalCode && postalCode.length > 4) {
      setSelectedShippingZone(
        shippingZone.find((zone) => zone.postalCode.includes(postalCode)),
      );
      onSelected(selectedShippingOption, selectedShippingZone);
    } else {
      setSelectedShippingZone(undefined);
    }
  }, [
    onSelected,
    postalCode,
    selectedShippingOption,
    selectedShippingZone,
    shippingZone,
  ]);

  const selectOptions = [
    { value: '', label: 'Seleccionar una tienda' },
    ...options,
  ];

  return (
    <div>
      {postalCode && postalCode?.length > 4 ? (
        <div className="flex justify-center lg:justify-start flex-col lg:flex-row lg:gap-4 items-center lg:items-start pt-4">
          <div className="flex  items-center mb-4">
            <button
              onClick={(e) => {
                setSelectedShippingOption(ShippingEnum.ByShipping);
                onSelected(ShippingEnum.ByShipping, selectedShippingZone);
                e.preventDefault();
              }}
              className={` ${
                !postalCodeShipping.includes(parseInt(postalCode as string))
                  ? 'hidden'
                  : ' flex'
              } rounded-full  border border-[#919191] w-[14px] h-[14px] mx-2 flex ml-8 mb-6 self-center items-start justify-start absolute `}
            >
              <div
                className={`${
                  selectedShippingOption === ShippingEnum.ByShipping
                    ? 'bg-[#0071CE]'
                    : 'bg-white'
                } rounded-full mx-auto    flex self-center  w-[8px] h-[8px]`}
              ></div>
            </button>
            <div className="text-[14px] flex">
              {postalCodeShipping.includes(parseInt(postalCode as string)) ? (
                <div
                  className=" self-center pb-1"
                  onClick={(e) => {
                    setSelectedShippingOption(ShippingEnum.ByShipping);
                    onSelected(ShippingEnum.ByShipping, selectedShippingZone);
                    e.preventDefault();
                  }}
                >
                  <GeolocationDialog
                    selectedShippingOption={
                      selectedShippingOption === ShippingEnum.ByShipping
                    }
                    FreeShipping={FreeShippingSku}
                  />
                </div>
              ) : (
                <div className="italic text-[#93278F] flex self-center pb-1">
                  Su Código Postal está fuera de nuestra área servicio; sin
                  embargo, al terminar su compra nuestro equipo de venta le
                  llamará para definir su costo de envío según la distancia.
                </div>
              )}
            </div>
          </div>
          {selectedShippingZone ? (
            <div className="flex flex-col">
              <div className="flex justify-center lg:justify-start flex-col lg:flex-row lg:gap-4 items-center lg:items-start">
                <div className="flex">
                  <button
                    onClick={(e) => {
                      setSelectedShippingOption(ShippingEnum.InShop);
                      onSelected(ShippingEnum.InShop, selectedShippingZone);
                      confirmGeolocationStoreAction(undefined, undefined);
                      selectedShopStoreAction(shops[0]);
                      e.preventDefault();
                    }}
                    className="rounded-full  border border-[#919191] w-[14px] h-[14px] mx-2 flex ml-8 mb-5 self-center absolute "
                  >
                    <div
                      className={`${
                        selectedShippingOption === ShippingEnum.InShop
                          ? 'bg-[#0071CE]'
                          : 'bg-white'
                      } rounded-full mx-auto flex self-center justify-start lg:justify-center  w-[8px] h-[8px]`}
                    ></div>
                  </button>
                  <div
                    className={`mt-2 flex  flex-col justify-center items-center border cursor-pointer ${
                      selectedShippingOption === ShippingEnum.InShop
                        ? 'border-[#0071CE]'
                        : 'border-gray-300'
                    } rounded-md w-[280px] h-[121px]`}
                    onClick={(e) => {
                      setSelectedShippingOption(ShippingEnum.InShop);
                      onSelected(ShippingEnum.InShop, selectedShippingZone);
                      confirmGeolocationStoreAction(undefined, undefined);
                      selectedShopStoreAction(shops[0]);
                      e.preventDefault();
                    }}
                  >
                    <div className="flex items-center h-[50px]">
                      <IconShop className="ml-7 mt-[2px]" />
                      <span className="text-[16px] ml-6 font-century-Gothic mt-[10px]">
                        Recoger en tienda{' '}
                      </span>
                    </div>
                    <div className="text-[14px] text-start w-[230px]">
                      <Select
                        className="select-checkout-shipping bg-[#F9F9F9]"
                        styles={{
                          control: (provided: any) => ({
                            ...provided,
                            border: '2px solid #B2B2B2',
                            borderRadius: '5px',
                          }),
                          option: (provided: any) => ({
                            ...provided,
                            backgroundColor: 'white',
                            borderBottom: '1px solid #ccc',
                            color: '#B2B2B2',
                          }),
                          singleValue: (provided: any) => ({
                            ...provided,
                            color: '#B2B2B2',
                          }),
                        }}
                        onChange={(selectedOption) => {
                          const value = selectedOption?.value;
                          if (value !== undefined) {
                            setSelectedShop((shops as any)?.[value]);
                            selectedShopStoreAction((shops as any)?.[value]);
                          }
                        }}
                        options={selectOptions}
                        defaultValue={selectOptions[0]}
                        isDisabled={
                          selectedShippingOption !== ShippingEnum.InShop
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <div>
        {selectedShop ? (
          <div className="w-full">
            <span className="font-bold">Recoger en:</span> {selectedShop.CALLE},
            C.P. {selectedShop.CP} Municipio {selectedShop.CIUDAD}{' '}
            {selectedShop.ESTADO} Teléfono:{' '}
            {selectedShop.TELÉFONOS.map(({ key, value }, index) => (
              <span key={index}>
                <a
                  href={`tel:${value}`}
                  className="hover:cursor-pointer text-[#0071CE] font-Century-Gothic-Bold"
                >
                  {key}
                </a>
                {selectedShop.TELÉFONOS[index + 1] ? ' y ' : ''}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CheckoutShippingMethods;
