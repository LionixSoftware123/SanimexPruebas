import React, { useState } from 'react';
import Select from 'react-select';
import {
  getShopSelectOptions,
  getShopSelectValue,
} from '@/modules/geolocation/geolocation-utils';
import shops from '@/utils/sucursales.json';
import { ShopType } from '@/modules/shop/shop-types';

type SelectShopProps = {
  onChange: (shop: ShopType | undefined) => void;
};
const SelectShop: React.FC<SelectShopProps> = ({ onChange }) => {
  const [selectedShop, setSelectedShop] = useState<ShopType | undefined>(
    undefined,
  );

  return (
    <Select
      value={getShopSelectValue(selectedShop)}
      onChange={(selectedOption) => {
        const _shop = shops.find(
          (_shop) => _shop.ID === (selectedOption?.value as number),
        );
        setSelectedShop(_shop);
        onChange(_shop);
      }}
      styles={{
        menu: (provided: any) => ({
          ...provided,
          zIndex: 100,
        }),
        input: (provided: any) => ({
          ...provided,
          font: 'inherit',
          fontSize: '16px',
          height: '40px',
          border: '1px solid transparent',
          outline: 'none',
        }),
        container: (provided: any) => ({
          ...provided,
          width: '100%',
        }),
        control: (provided: any) => ({
          ...provided,
          '&:hover': {
            border: '1px solid black',
            boxShadow: 'none',
          },
          border: '1px solid black',
          boxShadow: 'none',
        }),
      }}
      options={getShopSelectOptions}
    />
  );
};

export default SelectShop;
