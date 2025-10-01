import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { useFetchAllColorQuery } from '@/utils/types/generated';

type ProductColorCollapseListProps = {
  onFilter?: (item: string[]) => void;
};

const ProductColorCollapseList: React.FC<ProductColorCollapseListProps> = ({
  onFilter,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);

  const { data, loading } = useFetchAllColorQuery({
    variables: {
      first: 100,
    },
  });

  return (
    <div className="w-full rounded-[5px] border-b-[#0071CE] border-b-[3px]">
      <div className=" font-Century-Gothic">
        <div className="bg-[#F5F5F5] w-full flex h-[40px] items-center p-[20px] justify-between">
          <div className="font-Century-Gothic text-[#555555]">Tonos</div>
          <div className="cursor-pointer">
            {open ? (
              <ChevronUpIcon
                className={'h-[20px] w-[20px] flex-shrink-0 text-[#555555]'}
                aria-hidden="true"
                onClick={() => setOpen(!open)}
              />
            ) : (
              <ChevronDownIcon
                className={'h-[20px] w-[20px] flex-shrink-0 text-[#555555]'}
                aria-hidden="true"
                onClick={() => setOpen(!open)}
              />
            )}
          </div>
        </div>
        {open && (
          <div className="p-[20px] max-h-[350px] overflow-auto">
            {loading ? (
              <>
                <div className="w-full h-[10px] bg-gray-200 dark:bg-gray-700 mb-2" />
                <div className="w-full h-[10px] bg-gray-200 dark:bg-gray-700 mb-2" />
                <div className="w-full h-[10px] bg-gray-200 dark:bg-gray-700 mb-2" />
              </>
            ) : (
              <>
                {data?.allPaColor?.edges?.map((listItem, i) => (
                  <div
                    className="cursor-pointer text-[14px] flex items-center mb-2"
                    key={i}
                    onClick={() => {
                      let items: string[];
                      if (selected.includes(listItem.node.slug as string)) {
                        items = selected.filter(
                          (sld) => sld !== (listItem.node.slug as string),
                        );
                      } else {
                        items = [...selected, listItem.node.slug as string];
                      }

                      setSelected(items);
                      onFilter && onFilter(items);
                    }}
                  >
                    <div
                      key={i}
                      className={`border border-[#707070] h-[20px] w-[20px] rounded-full cursor-pointer mr-2`}
                      style={{ background: listItem.node.hex as string }}
                    />
                    <div
                      className={`cursor-pointer ${
                        selected.includes(listItem.node.slug as string) &&
                        'text-[#0071CE] font-Century-Gothic-Bold'
                      } text-[14px]`}
                    >
                      {listItem.node.name}
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

export default ProductColorCollapseList;
