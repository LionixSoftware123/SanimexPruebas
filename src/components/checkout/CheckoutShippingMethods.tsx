import React, { useState } from 'react';
import shops from '@/utils/sucursales.json';
import dynamic from 'next/dynamic';
import { selectedShopStoreAction } from '@/modules/shop/shop-actions';
import { ShopType } from '@/modules/shop/shop-types';

import { confirmGeolocationStoreAction } from '@/modules/geolocation/geolocation-actions';
import IconShop from '@/images/icoshop.svg';

const GeolocationDialog = dynamic(
  () => import('@/components/geolocation/GeolocationDialog'),
);

export enum ShippingEnum {
  InShop = 'in_shop',
  ByShipping = 'by_shipping',
}

type CheckoutShippingMethodsProps = {
  onSelected: (option: ShippingEnum) => void;
};

const CheckoutShippingMethods: React.FC<CheckoutShippingMethodsProps> = ({
  onSelected,
}) => {
  const [selectedShippingOption, setSelectedShippingOption] =
    useState<ShippingEnum>(ShippingEnum.ByShipping);
  const [selectedShop, setSelectedShop] = useState<ShopType | undefined>(
    undefined,
  );

  return (
    <>
      <div className="flex justify-center lg:justify-start flex-col lg:flex-row lg:gap-4 items-center lg:items-start pt-4">
        <div className="flex  items-center mb-4">
          <button
            onClick={(e) => {
              setSelectedShippingOption(ShippingEnum.ByShipping);
              onSelected(ShippingEnum.ByShipping);
              e.preventDefault();
            }}
            className="rounded-full border border-[#919191] w-[14px] h-[14px] mx-2 flex ml-8 mb-6 self-center items-start justify-start absolute"
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
            <div className=" self-center pb-1">
              <GeolocationDialog />
            </div>
          </div>
        </div>
        <div>
          <div className="mt-2 flex flex-col justify-center items-center border cursor-pointer rounded-md  px-4   w-[280px] h-[121px] border-[#0071CE]">
            <div className="flex">
              <button
                onClick={(e) => {
                  setSelectedShippingOption(ShippingEnum.InShop);
                  onSelected(ShippingEnum.InShop);
                  confirmGeolocationStoreAction(undefined, undefined);
                  selectedShopStoreAction(shops[0]);
                  e.preventDefault();
                }}
                className="rounded-full  border border-[#919191] w-[14px] h-[14px]  flex mt-2 self-center absolute"
              >
                <div
                  className={`${
                    selectedShippingOption === ShippingEnum.InShop
                      ? 'bg-[#0071CE]'
                      : 'bg-white'
                  } rounded-full mx-auto flex self-center justify-start lg:justify-center  w-[8px] h-[8px]`}
                ></div>
              </button>

              <div className="flex items-center h-[50px]">
                <IconShop className="ml-7 mt-[10px]" />
                <span className="text-[16px] ml-6 font-century-Gothic mt-[12px]">
                  Recoger en tienda{' '}
                </span>
              </div>
            </div>

            <div className="text-[14px] text-start w-full">
              <select
                className="w-full h-[45px] border rounded pl-2"
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedShop(shops[parseInt(value)]);
                  selectedShopStoreAction(shops[parseInt(value)]);
                }}
                disabled={selectedShippingOption !== ShippingEnum.InShop}
              >
                <option value="">Seleccionar una tienda</option>
                {shops.map((shop, i) => (
                  <option value={i} key={i}>
                    {shop.TIENDA} - {shop.ESTADO}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default CheckoutShippingMethods;
