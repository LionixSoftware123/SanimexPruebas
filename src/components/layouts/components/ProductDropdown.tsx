import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';

import Link from 'next/link';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

type ProductDropTypes = {
  menuItems: {
    category: { name: string; slug: string };
    items: { name: string; slug: string }[];
  };
};

const ProductDropdown: React.FC<ProductDropTypes> = ({ menuItems }) => {
  return (
    <Menu as="div" className=" block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              as="div"
              className="text-[14px] font-Century-Gothic-Bold flex justify-between text-[10px] bg-transparent flex w-full rounded-md font-semibold capitalize text-black"
            >
              <Link   href={`/${menuItems.category.slug}`}>
                {menuItems.category.name}
              </Link>
              {!open ? (
                <ChevronDownIcon
                  className="h-[17px] w-[17px]"
                  aria-hidden="true"
                />
              ) : (
                <ChevronUpIcon
                  className="h-[17px] w-[17px]"
                  aria-hidden="true"
                />
              )}
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
            <Menu.Items className="h-[80px] overflow-y-auto hover:cursor-pointer w-full origin-bottom-left bg-white focus:outline-none border-b  border-[#DFDFDF]">
              <div className="">
                {menuItems.items.map((item, index) => (
                  <Menu.Item key={'dropProd-' + index}>
                    {({ active }) => (
                      <Link
                        className={classNames(
                          active
                            ? ' bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block text-sm',
                        )}
                        href={`/${menuItems.category.slug}/${item.slug}`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default ProductDropdown;
