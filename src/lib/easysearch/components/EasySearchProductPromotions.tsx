import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';

type RefinementListItem = {
  label: string;
  value: string;
  count: number;
};

type RefinementListProps = {
  title: string;
  items: RefinementListItem[];
  onRefine: (value: string) => void;
};

const EasySearchProductPromotions: React.FC<RefinementListProps> = ({
  title,
  items,
  onRefine,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = (value: string) => {
    if (selectedValue === value) {
      setSelectedValue(null);
      onRefine(value);
    } else {
      if (selectedValue) {
        onRefine(selectedValue);
      }
      setSelectedValue(value);
      onRefine(value);
    }

    const query = value ? { ...router.query, promotions: value } : router.query;
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: false },
    );
  };

  return (
    <div className="mb-6">
      <div className="w-full rounded-[5px] border-b-[#0071CE] border-b-[3px]">
        <div className="font-Century-Gothic">
          <div
            className="bg-[#F5F5F5] w-full flex h-[40px] items-center p-[20px] justify-between cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <div className="font-Century-Gothic text-[#555555]">{title}</div>
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
              {items.map((listItem, i) => (
                <div
                  className={`cursor-pointer ${
                    selectedValue === listItem.value &&
                    'text-[#0071CE] font-Century-Gothic-Bold'
                  } text-[14px] py-1`}
                  key={i}
                  onClick={() => handleClick(listItem.value)}
                >{`${listItem.label} (${listItem.count})`}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EasySearchProductPromotions;
