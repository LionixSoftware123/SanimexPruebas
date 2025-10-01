import React from 'react';
import { SimpleProduct, VariableProduct } from '@/utils/types/generated';

type PriceDisplayProps = {
  finalPrice: number | null;
  price: string | undefined;
  precioMts: string | null;
  precioPor: string | undefined;
  formatPrecioPor: (precioPor: string) => string;
  product?: SimpleProduct | VariableProduct;
};

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  finalPrice,
  price,
  precioMts,
  precioPor,
  formatPrecioPor,
  product,
}) => {
  //console.log({ product });

  const brands =
    product?.allPaMarcas?.edges.map((edge) => (edge.node as any).slug) || [];
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-end">
        {precioMts && !brands.includes('dune') && (
          <div className="flex flex-row">
            <h2
              className={`text-[32px] font-Century-Gothic-Bold h-12  ${
                finalPrice || price ? 'text-[#8f8f8f]' : 'text-[#000]'
              }`}
            >
              {precioMts.includes('-')
                ? `${precioMts.split(' - ')[0].trim()}`
                : precioMts}
            </h2>
            <div className="text-[32px] h-12 items-end flex text-gray-300">
              |
            </div>
          </div>
        )}

        {price && (
          <div className="mr-4">
            <div className="text-[30px] font-Century-Gothic-Bold h-12 items-end flex w-auto">
              {price.includes('-') ? `${price.split(' - ')[0].trim()}` : price}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row gap-7">
        {precioMts?.length && price  && !brands.includes('dune')  && (
          <div className="text-[#000] text-[14px] font-Segoe-Ui font-bold mb-4 w-[116px]">
            Precio por m<sup>2</sup>
          </div>
        )}
        <div className="text-[#000] text-[14px] font-Segoe-Ui font-bold mb-4 w-[116px]">
          {precioPor && formatPrecioPor(precioPor)}
        </div>
      </div>
    </div>
  );
};

export default PriceDisplay;
