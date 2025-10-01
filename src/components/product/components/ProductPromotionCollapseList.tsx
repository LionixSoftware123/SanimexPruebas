import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';

type PromotionType = {
  label?: string;
  value?: boolean;
  type?: string;
};

const PROMOTION_LIST = [{ label: 'Ofertas', value: true, type: 'onSale' }];

type ProductPromotionCollapseListProps = {
  onFilter?: (value: PromotionType | undefined) => void;
};

const ProductPromotionCollapseList: React.FC<
  ProductPromotionCollapseListProps
> = ({ onFilter }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<PromotionType | undefined>(
    undefined,
  );

  return (
    <div className="w-full rounded-[5px] border-b-[#0071CE] border-b-[3px]">
      <div className=" font-Century-Gothic">
        <div
          className="bg-[#F5F5F5] w-full flex h-[40px] items-center p-[20px] justify-between cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div className="font-Century-Gothic text-[#555555]">Promoción</div>
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
          <div className="p-[20px] max-h-[350px] overflow-auto">
            {PROMOTION_LIST?.map((listItem, i) => (
              <div
                className={`cursor-pointer text-[14px] ${
                  selected === listItem &&
                  'text-[#0071CE] font-Century-Gothic-Bold'
                }`}
                key={i}
                onClick={() => {
                  if (selected === listItem) {
                    setSelected(undefined);

                    const newObject = { ...listItem, value: false };
                    return onFilter && onFilter(newObject);
                  }

                  setSelected(listItem);
                  return onFilter && onFilter(listItem);
                }}
              >
                {listItem.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPromotionCollapseList;
