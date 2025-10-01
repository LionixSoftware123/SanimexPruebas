import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BranchInfoProps {
  image: string;
  name: string;
  address: string;
  link: string;
  weekdays?: string;
  weekdayssaturday?: string;
  saturday?: string;
  sunday?: string;
}

const BranchInfo: React.FC<BranchInfoProps> = ({
  image,
  name,
  address,
  link,
  weekdays,
  weekdayssaturday,
  saturday,
  sunday,
}) => {
  return (
    <div className="grid gap-y-4 px-4">
      <div className="py-6 grid grid-cols-11 border-b border-[#707070]">
        <div className="col-span-8 lg:col-span-5 flex justify-center mr-[20px]">
          <div className="flex self-center relative h-[180px] md:h-[250px] lg:h-[200px] w-full">
            <Image fill style={{ objectFit: 'cover' }} src={image} alt={name} />
          </div>
        </div>
        <div className="hidden lg:block col-span-5 lg:col-span-3 lg:mr-[20px]">
          <div className="text-[#222222] text-[18px] font-Century-Gothic-Bold">
            {name}
          </div>
          <p className="text-[14px] font-Century-Gothic text-[#222222]">
            {address}
          </p>
          <Link
            href={link || '/default-path'}
            className="text-[14px] font-Century-Gothic underline text-[#0033A1]"
            target="_blank"
          >
            Ver en el mapa &gt;&gt;
          </Link>
        </div>
        <div className="flex flex-col space-y-[10px] col-span-3 lg:mr-[20px] gap-2">
          <div>
            <div className="text-[#222222] text-[14px] md:text-[18px] font-Century-Gothic-Bold">
              {weekdays
                ? 'Lunes a viernes'
                : weekdayssaturday
                ? 'Lunes a sábado'
                : ''}
            </div>
            <p className="text-[14px] font-Century-Gothic text-[#222222]">
              {weekdays ? weekdays : weekdayssaturday ? weekdayssaturday : ''}
            </p>
          </div>
          <div>
            <div className="text-[#222222] text-[14px] md:text-[18px] font-Century-Gothic-Bold">
              {saturday ? 'Sábado' : sunday ? 'Domingo' : ''}
            </div>
            <p className="text-[14px] font-Century-Gothic text-[#222222]">
              {saturday ? saturday : sunday ? sunday : ''}
            </p>
          </div>
        </div>
        <div className="lg:hidden col-span-full lg:px-4 py-4">
          <div className="text-[#222222] text-[18px] font-Century-Gothic-Bold">
            {name}
          </div>
          <p className="text-[14px] font-Century-Gothic text-[#222222]">
            {address}
          </p>
          <Link
            href={link || '/default-path'}
            className="text-[14px] font-Century-Gothic underline text-[#0033A1]"
            target="_blank"
          >
            Ver en el mapa &gt;&gt;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BranchInfo;
