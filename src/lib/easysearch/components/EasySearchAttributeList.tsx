import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { IAttribute } from '@/lib/easysearch/types/generated';

export type EasySearchAttributeListProps = {
  title: string;
  items: IAttribute[];
  onSelected: (value: string) => void;
  selected: string;
  loading?: boolean;
  isVinilicos?: boolean;
};

const EasySearchAttributeList: React.FC<EasySearchAttributeListProps> = ({
  title,
  items = [],
  onSelected,
  selected = '',
  loading = false,
  isVinilicos,
}) => {
  const [open, setOpen] = useState<boolean>(true);
  const slugs = selected ? selected.split(',') : [];

  const handleClick = (value: string) => {
    if (slugs.includes(value)) {
      onSelected(slugs.filter((slug) => slug !== value).join(','));
    } else {
      onSelected([...slugs, value].join(','));
    }
  };

  console.log('isVinilicos', isVinilicos);

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
              {loading ? (
                <div className="animate-pulse flex flex-col gap-4 py-4">
                  <div className="h-4 bg-gray-200 w-full"></div>
                  <div className="h-4 bg-gray-200 w-full"></div>
                  <div className="h-4 bg-gray-200 w-full"></div>
                  <div className="h-4 bg-gray-200 w-full"></div>
                </div>
              ) : items.length === 0 ? (
                <div className="text-center text-gray-500">
                  No se encontraron resultados
                </div>
              ) : (
                items
                  .filter((item) => (isVinilicos ? item.name === 'Dune' : true))
                  .map((item, i) => (
                    <div
                      className={`cursor-pointer py-2 ${
                        slugs.includes(item.name as string)
                          ? 'text-[#0071CE] font-Century-Gothic-Bold'
                          : ''
                      } text-[14px] py-1`}
                      key={i}
                      onClick={() => handleClick(item.name as string)}
                      dangerouslySetInnerHTML={{
                        __html: `${item.name} (${item.count})`,
                      }}
                    ></div>
                  ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EasySearchAttributeList;
