import React from 'react';

type DiscountDisplayProps = {
  regularPrice: string | undefined;
  precioPor: string | undefined;
  afterPrecioPor: (precioPor: string) => string;
};

const DiscountDisplay: React.FC<DiscountDisplayProps> = ({
  regularPrice,
  precioPor,
  afterPrecioPor,
}) => {
  return (
    <div className="text-[#0274CC] text-[16px] font-bold font-Century-Gothic">
      <span>
        Antes {precioPor && afterPrecioPor(precioPor)}{' '}
        <span className="line-through">{regularPrice}</span>
      </span>{' '}
    </div>
  );
};

export default DiscountDisplay;
