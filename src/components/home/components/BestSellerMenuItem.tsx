import React from "react";

type BestSellerMenuItemProps = {
  name?: string;
  active?: boolean;
}
const BestSellerMenuItem: React.FC<BestSellerMenuItemProps> = (
  { name, active }
) => {
  return (
    <div
      className={`px-3 rounded-full hover:bg-[#0071CE] hover:text-white cursor-pointer text-[#7B8186] min-w-[90px] h-[30px] font-Century-Gothic text-[16px] flex items-center justify-center ${active && "bg-[#0071CE] text-[white!important]"} `}>{name}</div>
  );
};

export default BestSellerMenuItem;