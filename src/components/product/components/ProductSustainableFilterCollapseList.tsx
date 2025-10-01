import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';

type ProductTaxonomyFilterCollapseListProps = {
  onFilter?: (item: string[]) => void;
  title?: string;
  total?: number;
  active?: boolean;
};

const ProductSustainableFilterCollapseList: React.FC<
  ProductTaxonomyFilterCollapseListProps
> = ({ onFilter, title = 'Marcas', active, total }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const sustainables = [
    {
      slug: 'ecologico',
      name: 'Ecologico',
      total: 1,
      color: 'green',
    },
  ];
  return (
    <div className="w-full rounded-[5px] border-b-[#0071CE] border-b-[3px]">
      <div className=" font-Century-Gothic">
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
            {!sustainables ? (
              <>
                <div className="w-full h-[10px] bg-gray-200 dark:bg-gray-700 mb-2" />
                <div className="w-full h-[10px] bg-gray-200 dark:bg-gray-700 mb-2" />
                <div className="w-full h-[10px] bg-gray-200 dark:bg-gray-700 mb-2" />
              </>
            ) : (
              <>
                {sustainables?.map((listItem, i) => (
                  <div
                    className={`cursor-pointer ${
                      active && 'text-[#0071CE] font-Century-Gothic-Bold'
                    } text-[14px]`}
                    key={i}
                    onClick={() => {
                      let items: string[];
                      if (selected.includes(listItem?.slug as string)) {
                        items = selected.filter(
                          (sld) => sld !== (listItem?.slug as string),
                        );
                      } else {
                        items = [...selected, listItem?.slug as string];
                      }

                      setSelected(items);
                      onFilter && onFilter(items);
                    }}
                  >
                    <div className="cursor-pointer text-[14px] flex items-center mb-2">
                      {listItem?.color ? (
                        <div
                          key={i}
                          className={`border  cursor-pointer mr-2`}
                        />
                      ) : null}
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            (((listItem?.name as string) +
                              ' ' +
                              '(' +
                              total) as string) + ')',
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSustainableFilterCollapseList;
