import React from 'react';
import Image from 'next/image';
import QuienesSomos from '@/images/quienes-somos.webp';
import NuestraRazon from '@/images/nuestra-razon.png';
import PorqueSanimex from '@/images/porque-sanimex.webp';
import MarcasLideres from '@/images/marcas-lideres.webp';
import TuBano from '@/images/tu-baño.webp';
import TuSala from '@/images/tu-sala.webp';
import TuCocina from '@/images/tu-cocina.webp';
import TuNegocio from '@/images/tu-negocio.webp';
import Link from 'next/link';

const OurCompany: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-5 mb-10">
      <div className="col-span-full overflow-x-auto">
        <div className="w-[1100px] lg:w-full grid gap-2 md:gap-4 grid-cols-3">
          <div className=" text-[20px] relative md:mx-auto w-[350px] md:w-[370px] lg:w-full h-[485px] pt-[20px] pl-[30px]">
            <div className="grid h-full overflow-y-auto">
              <Image
                fill
                style={{ objectFit: 'fill' }}
                src={QuienesSomos}
                alt={'About up image'}
                className="row-span-full"
              />
              <div className=" font-Century-Gothic text-white row-start-1 z-10 pr-[40px]">
                Somos líderes en el mercado, nos respaldan más de 50 años de
                trayectoria y 32 sucursales distribuidas en el Valle de México,
                contamos con soluciones integrales para el sector de
                construcción con fines decorativos para que tu casa, sea tu gran
                orgullo. Nuestros valores
              </div>
              <Link
                href={'/acerca-de'}
                className="pb-2 text-[#0071CE] z-10 grid place-items-end h-full pr-5"
              >
                Ver mas
              </Link>
            </div>
          </div>
          <div className="mx-auto text-[20px] relative w-[350px] lg:w-full h-[485px] pt-[20px] pl-[30px]">
            <div className="grid h-full">
              <Image
                fill
                style={{ objectFit: 'fill' }}
                src={NuestraRazon}
                alt={'nuestra razon'}
              />
              <div className=" font-Century-Gothic text-white row-start-1 z-10 pr-[40px]">
                Le damos vida a tu hogar, te ofrecemos un increíble portafolio
                compuesto por marcas líderes en recubrimientos cerámicos,
                adhesivos, grifería, muebles para baño, calentadores, y otros
                complementos de acabados para la construcción ideales que
                materialices el espacio de tus sueños.
              </div>
              <Link
                href={'/acerca-de'}
                className="pb-2 text-[#0071CE] z-10 grid place-items-end h-full pr-5"
              >
                Ver mas
              </Link>
            </div>
          </div>
          <div className="mx-auto text-[20px] relative w-[350px] lg:w-full h-[485px] pt-[20px] pl-[30px]">
            <div className="grid h-full">
              <Image
                fill
                style={{ objectFit: 'fill' }}
                src={PorqueSanimex}
                alt={'porque sanimex'}
              />
              <div className=" font-Century-Gothic text-white row-start-1 z-10 pr-[40px]">
                Sabemos el valor que tiene para nuestros clientes la creación de
                espacios auténticos, por lo que nuestro compromiso es ofrecer
                una experiencia extraordinaria en la que se sientan acompañados
                y respaldados por nuestro equipo por lo que podrán confiar para
                vivir mejor sus momentos inolvidables.
              </div>
              <Link
                href={'/acerca-de'}
                className="pb-2 text-[#0071CE] z-10 grid place-items-end h-full pr-5"
              >
                Ver mas
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-[570px] md:h-[577px] md:row-span-2 ">
        <Link   href={'/marcas'}>
          <Image
            fill
            style={{ objectFit: 'cover', objectPosition: '100% 100%' }}
            src={MarcasLideres}
            alt={'marcas lideres'}
          />
        </Link>
      </div>
      <div className="relative h-[279px]">
        <Link   href={'/productos/banos'} className="h-[279px]">
          <Image
            fill
            style={{ objectFit: 'cover', objectPosition: '10% 100%' }}
            src={TuBano}
            alt={'tu bano'}
          />
        </Link>
      </div>
      <div className="relative h-[279px]">
        <Link   href={'/productos/pisos-y-muros'} className="h-[279px]">
          <Image
            fill
            style={{ objectFit: 'cover', objectPosition: '10% 100%' }}
            src={TuSala}
            alt={'tu sala'}
          />
        </Link>
      </div>
      <div className="relative h-[279px]">
        <Link   href={'/productos/cocina'} className="h-[279px]">
          <Image
            fill
            style={{ objectFit: 'cover', objectPosition: '10% 100%' }}
            src={TuCocina}
            alt={'tu cocina'}
          />
        </Link>
      </div>
      <div className="relative  h-[279px]">
        <Link   href={'/productos/pisos-y-muros'} className="h-[279px] ">
          <Image
            fill
            style={{ objectFit: 'cover', objectPosition: '10% 100%' }}
            src={TuNegocio}
            alt={'tu negocio'}
          />
        </Link>
      </div>
    </div>
  );
};

export default OurCompany;
