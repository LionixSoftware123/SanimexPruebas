import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { useFetchAllEspaciosQuery } from '@/utils/types/generated';

type ProductSpacesCollapseListProps = {
  onFilter?: (item: string[]) => void;
};

const ProductSpacesCollapseList: React.FC<ProductSpacesCollapseListProps> = ({
  onFilter,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { data, loading } = useFetchAllEspaciosQuery({
    variables: {
      first: 100,
    },
  });

  return (
    <div className="w-full rounded-[5px] border-b-[#0071CE] border-b-[3px]">
      <div className=" font-Century-Gothic">
        <div className="bg-[#F5F5F5] w-full flex h-[40px] items-center p-[20px] justify-between">
          <div className="font-Century-Gothic text-[#555555]">
            Interior / Exterior
          </div>
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
                {data?.allPaEspacio?.edges?.map((listItem, i) => (
                  <div
                    className={`cursor-pointer ${
                      selected.includes(listItem.node.slug as string) &&
                      'text-[#0071CE] font-Century-Gothic-Bold'
                    } text-[14px]`}
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
                    {listItem.node.name}
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

export default ProductSpacesCollapseList;
