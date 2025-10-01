import React from 'react';
import Link from 'next/link';

const ViewMoreButton: React.FC = () => {
  return (
    <Link
      href={'/mas-vendidos'}
      className="flex justify-center font-Century-Gothic-Bold text-[22px] text-white  uppercase w-[255px] h-[64px] rounded-[10px] bg-[#0071CE]"
    >
      <div className="flex justify-center self-center">Ver Más</div>
    </Link>
  );
};

export default ViewMoreButton;
