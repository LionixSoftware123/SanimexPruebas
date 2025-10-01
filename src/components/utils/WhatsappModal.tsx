import React from 'react';
import IconWhatsapp from '@/images/icon-whatsapp-modal.svg';
import { useRouter } from 'next/router';
type WppModal = {
  dialog?: boolean;
};
const WhatsappModal: React.FC<WppModal> = ({ dialog = false }) => {
  const router = useRouter();
  const isProductosRoute = router.pathname === '/productos/[product]';

  return (
    <div className="pointer-events-none w-full h-screen left-0 top-0 fixed flex justify-end items-end z-50">
      <div
        className={`${
          dialog ? 'w-[160px] md:w-[220px]' : 'w-[65px]'
        }  h-[65px] mr-2  mb-[40px] flex ${isProductosRoute ? 'mb-24' : ''}`}
      >
        <div
          className={`${
            dialog ? '' : 'hidden'
          } text-[12px] md:text-[16px] flex self-center w-[160px] h-[20px] md:h-[37px] text-white bg-[#F17523] rounded-[5px] justify-center items-center font-Century-Gothic`}
        >
          ¿Necesitas ayuda?
        </div>
        <a
          href="https://api.whatsapp.com/send?phone=5215581353955&text=%C2%A1Hola!%20%C2%BFMe%20podr%C3%ADan%20ayudar%3F%20Necesito%20m%C3%A1s%20informaci%C3%B3n"
          className=" flex self-center ml-1 w-[40px] h-[40px] md:w-[60px] md:h-[60px] drop-shadow-lg pointer-events-auto"
          target="_blank"
        >
          <IconWhatsapp />
        </a>
      </div>
    </div>
  );
};

export default WhatsappModal;
