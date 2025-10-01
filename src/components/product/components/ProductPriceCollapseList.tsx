import React, { useState } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid';
import { useToasts } from 'react-toast-notifications';

type PriceType = {
  minPrice: number;
  maxPrice: number;
};

type PriceFilterType = { label: string; value: PriceType };

const PRICE_LIST: PriceFilterType[] = [
  { label: 'Hasta $25', value: { minPrice: 0, maxPrice: 25 } },
  { label: '$25 a $250', value: { minPrice: 25, maxPrice: 250 } },
  { label: '$250 a $1000', value: { minPrice: 250, maxPrice: 1000 } },
  { label: '$1001 a $2500', value: { minPrice: 1001, maxPrice: 2500 } },
  { label: '$2501 y Más', value: { minPrice: 2501, maxPrice: 1000000 } },
];

type PriceCollapseListProps = {
  onFilter?: (value: PriceType) => void;
};

const ProductPriceCollapseList: React.FC<PriceCollapseListProps> = ({
  onFilter,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<PriceType>({
    minPrice: 0,
    maxPrice: 0,
  });
  const { addToast } = useToasts();

  const onHandleFilter = () => {
    if (data.minPrice > data.maxPrice) {
      return addToast('El monto mínimo  debe ser menor que el monto máximo', {
        appearance: 'error',
      });
    }
    onFilter && onFilter(data);
  };

  return (
    <div className="w-full rounded-[5px] border-b-[#0071CE] border-b-[3px]">
      <div className=" font-Century-Gothic">
        <div className="bg-[#F5F5F5] w-full flex h-[40px] items-center p-[20px] justify-between">
          <div className="font-Century-Gothic text-[#555555]">Precios</div>
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
            {PRICE_LIST?.map((listItem, i) => (
              <div
                className="cursor-pointer text-[#555555] text-[14px]"
                key={i}
                onClick={() => onFilter && onFilter(listItem.value)}
              >
                {listItem.label}
              </div>
            ))}

            <div className="flex items-center my-2 justify-between">
              <div>
                <input
                  placeholder="Mínimo"
                  onChange={(e) => {
                    setData({
                      ...data,
                      minPrice: e.target.value ? parseInt(e.target.value) : 0,
                    });
                    onFilter &&
                      onFilter({
                        ...data,
                        minPrice: e.target.value ? parseInt(e.target.value) : 0,
                      });
                  }}
                  className={
                    'border rounded-[5px] border-[#B2B2B2] px-2 w-[100px]'
                  }
                  type="number"
                />
              </div>
              <div>
                <input
                  placeholder="Máximo"
                  onChange={(e) => {
                    setData({
                      ...data,
                      maxPrice: e.target.value ? parseInt(e.target.value) : 0,
                    });
                    onFilter &&
                      onFilter({
                        ...data,
                        maxPrice: e.target.value ? parseInt(e.target.value) : 0,
                      });
                  }}
                  className={
                    'border rounded-[5px] border-[#B2B2B2] px-2 w-[100px]'
                  }
                  type="number"
                />
              </div>
              <button
                className="rounded-full bg-[#0071CE]"
                onClick={() => onHandleFilter()}
                disabled={!(data.minPrice || data.maxPrice)}
              >
                <ChevronRightIcon className="h-[25px] w-[25px] text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductPriceCollapseList;
