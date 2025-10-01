import React, { ReactNode, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';

type CollapseListSimpleProps = {
  list?: (string | React.ReactElement)[];
  name?: string;
  extraComponent?: ReactNode;
};
const CollapseListSimple: React.FC<CollapseListSimpleProps> = ({
  name,
  list,
  extraComponent,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="w-full ">
      <div className=" font-Century-Gothic border border-[#DFDFDF] ">
        <div
          className="bg-[#F5F5F5] px-4 w-full flex min-h-[32px] items-center  py-[10px] justify-between cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div className="font-Century-Gothic text-[#555555]">{name}</div>
          <div className="cursor-pointer">
            {open ? (
              <ChevronUpIcon
                className={'h-[20px] w-[20px] flex-shrink-0 text-[#555555]'}
                aria-hidden="true"
              />
            ) : (
              <ChevronDownIcon
                className={'h-[20px] w-[20px] flex-shrink-0 text-[#555555]'}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
        {open && (
          <div className="p-[20px]">
            {list?.map((listItem: string | React.ReactElement, i) => (
              <div
                className="cursor-pointer text-[#555555] text-[14px]"
                key={i}
              >
                {listItem}
              </div>
            ))}
            {extraComponent && extraComponent}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollapseListSimple;
