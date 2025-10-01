import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { OrderEnum, ProductsOrderByEnum } from '@/utils/types/generated';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const ORDER_OPTIONS = [
  {
    value: OrderEnum.Desc,
    label: 'Seleccionar',
    field: ProductsOrderByEnum.Date,
  },
  {
    value: OrderEnum.Asc,
    label: 'Menor Precio',
    field: ProductsOrderByEnum.Price,
  },
  {
    value: OrderEnum.Desc,
    label: 'Mayor Precio',
    field: ProductsOrderByEnum.Price,
  },
  /**{
    value: OrderEnum.Desc,
    label: 'Mayor Descuento',
    field: ProductsOrderByEnum.RegularPrice,
  },**/
];

type PriceOptionType = {
  value: OrderEnum | string;
  label: string;
  field: ProductsOrderByEnum;
};

type DropdownFilterProps = {
  onChange: (option: PriceOptionType) => void;
};
const DropdownFilter: React.FC<DropdownFilterProps> = ({ onChange }) => {
  const [filter, setFilter] = useState<PriceOptionType>({
    value: '',
    label: 'Seleccionar',
    field: ProductsOrderByEnum.Date,
  });

  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button
          as="div"
          className="px-3 bg-[#F5F5F5] cursor-pointer flex items-center justify-between rounded-[5px] text-[14px] font-semibold capitalize text-[#0071CE] h-[40px] w-[170px]"
        >
          {filter.label}
          <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute  right-0 z-10 w-full origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="text-[14px]">
            {ORDER_OPTIONS.map((option, key) => (
              <Menu.Item key={key}>
                <div
                  className={classNames(
                    option.label === filter.label
                      ? 'bg-[#0071CE] text-white'
                      : 'text-[#666666]',
                    'block px-4 py-[2px] text-sm cursor-pointer',
                  )}
                  onClick={() => {
                    setFilter(option);
                    onChange(option);
                  }}
                >
                  {option.label}
                </div>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownFilter;
