import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Phone from '@/images/icon-circle-phone.png';
import Email from '@/images/icon-circle-email.png';
import Location from '@/images/icon-circle-location.png';
import Whatsapp from '@/images/icon-circle-whatsapp.png';
const Container = dynamic(() => import('@/components/utils/Container'));
const ShareBox: React.FC = () => {
  return (
    <Container>
      <div className="my-[10px] md:my-[50px] py-4 lg:py-0 lg:h-[177px] border border-[#0033A1]">
        <div className="grid md:grid-cols-2 gap-y-4 lg:grid-cols-4 h-full md:px-10">
          <div className="flex flex-col md:flex-row place-items-center  ">
            <a
              target="_blank"
              href="tel:+528005604746"
              className="text-[#222222] text-[12px] font-Century-Gothic"
            >
              <Image
                src={Phone}
                alt="logo sanimex"
                height={64}
                width={64}
                style={{ objectFit: 'contain' }}
                className="mr-3"
              />
            </a>
            <div className="text-center md:text-start">
              <div className="text-[#222222] text-[20px] font-Century-Gothic-Bold">
                Llámanos
              </div>
              <a
                href="tel:+528005604746"
                target="_blank"
                className="text-[#222222] text-[12px] font-Century-Gothic"
              >
                800 560 4746
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row place-items-center ">
            <a
              target="_blank"
              href="https://api.whatsapp.com/send?phone=5215581353955&text=%C2%A1Hola!%20%C2%BFMe%20podr%C3%ADan%20ayudar%3F%20Necesito%20m%C3%A1s%20informaci%C3%B3n"
            >
              <Image
                src={Whatsapp}
                alt="logo sanimex"
                height={64}
                width={64}
                style={{ objectFit: 'contain' }}
                className="mr-3"
              />
            </a>
            <div className="text-center md:text-start">
              <div className="text-[#222222] text-[20px] font-Century-Gothic-Bold">
                Contáctanos
              </div>
              <div className="text-[#222222] text-[12px] font-Century-Gothic">
                <a
                  target="_blank"
                  href="https://api.whatsapp.com/send?phone=5215581353955&text=%C2%A1Hola!%20%C2%BFMe%20podr%C3%ADan%20ayudar%3F%20Necesito%20m%C3%A1s%20informaci%C3%B3n"
                >
                  55 81 35 39 55
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row place-items-center  ">
            <Link   href={'/sucursales'}>
              <Image
                src={Location}
                alt="logo sanimex"
                height={64}
                width={64}
                style={{ objectFit: 'contain' }}
                className="mr-3"
              />
            </Link>
            <div className="text-center md:text-start">
              <div className="text-[#222222] text-[20px] font-Century-Gothic-Bold">
                Sucursales
              </div>

              <Link
                href={'/sucursales'}
                className="hover:text-[#0033A1] text-[#222222] text-[12px] font-Century-Gothic"
              >
                Encuéntranos
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row place-items-center  ">
            <a
              target="_blank"
              href="mailto:atencionaclientes@sanimex.com.mx"
              className="mr-3 text-[#222222] text-[12px] font-Century-Gothic"
            >
              <Image
                src={Email}
                alt="logo sanimex"
                height={64}
                width={64}
                style={{ objectFit: 'contain' }}
                className=""
              />
            </a>
            <div className="text-center md:text-start">
              <div className="text-[#222222]  text-[20px] font-Century-Gothic-Bold">
                Escríbenos
              </div>
              <a
                target="_blank"
                href="mailto:atencionaclientes@sanimex.com.mx"
                className="text-[#222222] text-[12px] font-Century-Gothic"
              >
                atencionaclientes@sanimex.com.mx
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ShareBox;
