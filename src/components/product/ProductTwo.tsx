import React from 'react';
import Image from 'next/image';

const ProductTwo: React.FC = () => {
  return (
    <div className="w-full h-full flex">
      <div className=" border border-[#F2F2F2] p-2">
        <div className="relative w-[100px] h-[100px] ">
          <Image
            fill
            style={{ objectFit: 'contain' }}
            src="https://sanimex.com.mx/wp-content/uploads/2019/08/G06-20-1-61_x2-200x200.jpg"
            alt={'product'}
          />
        </div>
      </div>

      <div className="pl-4">
        <div className="font-Century-Gothic text-[#999999] text-[18px] mb-2">
          Apple 10.9-inch iPad Air Wi-Fi Cellular 64GB
        </div>
        <div>
          <div className="text-[#006FDC] font-Century-Gothic-Bold">$1,199</div>
        </div>
      </div>
    </div>
  );
};

export default ProductTwo;
