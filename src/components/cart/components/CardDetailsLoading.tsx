import React from 'react';

const CartDetailsLoading: React.FC = () => {
  const color = 'bg-gray-200 dark:bg-gray-700';
  return (
    <div role="status" className=" max-w-sm  border border-[#707070]">
      <div className="py-4 text-[#666666] text-[14px] font-Century-Gothic border-b border-b-[#C1C1C1] text-center">
        <div className={'flex self-center mx-auto h-2.5 w-16 ' + color}></div>
      </div>
      <div className="p-4 text-[14px] ">
        <div className="mb-1 text-[#666666] flex justify-between items-center font-Century-Gothic text-[14px]">
          <div className={'flex self-center h-2.5 w-16 ' + color}></div>
          <div className="h-2.5 bg-gray-200 dark:bg-gray-700 w-24 "> </div>
        </div>
        <div className=" flex justify-between items-center font-Century-Gothic mb-4">
          <div className={'flex self-center h-2.5 w-16 ' + color}></div>
          <div className=" h-2.5 bg-gray-200 dark:bg-gray-700 w-24"></div>
        </div>
        <div className="text-[#93278F] font-Century-Gothic text-[12px] mb-10">
          <div
            className={'flex self-center h-2.5 w-11/12 lg:w-[200px] ' + color}
          ></div>
        </div>
        <button className="bg-[#1C355E] text-white uppercase h-[45px] w-full font-Century-Gothic-Bold flex items-center justify-center text-[15px]">
          <div className={'flex self-center h-2.5 w-16 ' + color}></div>
        </button>
      </div>
    </div>
  );
};

export default CartDetailsLoading;
