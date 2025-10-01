import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { EasySearchProductSortByProps } from '../types';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const EasySearchProductSortBy: React.FC<EasySearchProductSortByProps> = ({
  options,
  currentRefinement,
  onSortChange,
}) => {
  const router = useRouter();

  const handleSortChange = (value: string) => {
    onSortChange(value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort: value },
    });
  };

  const selectedOption = options.find(
    (option) => option.value === currentRefinement,
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          as="div"
          className="px-3  bg-[#F5F5F5] cursor-pointer  flex items-center justify-between rounded-[5px] text-[14px] font-semibold capitalize text-[#0071CE] h-[40px] w-[170px]"
        >
          {selectedOption?.label || 'Seleccionar'}
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
        <Menu.Items className="absolute right-0 w-full origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="text-[14px]">
            {options.map((option, key) => (
              <Menu.Item key={key}>
                <div
                  className={classNames(
                    option.value === currentRefinement
                      ? 'bg-[#0071CE] text-white'
                      : 'text-[#666666]',
                    'block px-4 py-[2px] text-sm cursor-pointer',
                  )}
                  onClick={() => handleSortChange(option.value)}
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

export default EasySearchProductSortBy;
