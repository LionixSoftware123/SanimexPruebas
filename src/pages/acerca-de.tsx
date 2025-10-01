import React from 'react';
import Image from 'next/image';

import PeopleWorking from '@/images/people-working.png';

import Variedad1 from '@/images/variedad-1.webp';
import Variedad2 from '@/images/variedad-2.webp';
import Variedad3 from '@/images/variedad-3.webp';
import Integral1 from '@/images/venta-integral-1.webp';
import Integral2 from '@/images/venta-integral-2.webp';
import Integral3 from '@/images/venta-integral-3.webp';
/**import Calidad1 from '@/images/calidad-1.webp';
import Calidad2 from '@/images/calidad-2.webp';
import Calidad3 from '@/images/calidad-3.webp';
import Calidad4 from '@/images/calidad-4.webp';**/
import HeaderImage from '@/images/acerca-de.webp';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const ShareBox = dynamic(() => import('@/components/utils/ShareBox'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));

const Container = dynamic(() => import('@/components/utils/Container'));

const titleStyle = ' text-[#555555] text-[20px] font-Century-Gothic-Bold';

const Blog: React.FC = () => {
  const router = useRouter();
  return (
    <RootLayout>
      <StaticMeta
        title={'Acerca de Sanimex'}
        description={'Acerca de Sanimex'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <div className="grid grid-cols-1  h-[200px] md:h-[340px]">
        <div className="  h-full w-full row-start-1 col-start-1 ">
          <div className="relative  h-[200px] md:h-[340px]">
            <Image
              fill
              style={{ objectFit: 'cover', objectPosition: '20% 0%' }}
              src={HeaderImage}
              alt={'blog'}
            />
          </div>
        </div>
        <div className="flex text-white z-10  h-[200px] md:h-[340px] bg-opacity-30 w-full row-start-1 col-start-1 bg-black">
          <Container classes="items-end h-full">
            <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)]  h-[200px] md:h-[340px]   text-[30px] leading-[30px] md:leading-[54px] md:text-[54px] font-Century-Gothic-Bold">
              ACERCA DE NOSOTROS
            </span>
          </Container>
        </div>
      </div>
      <Container>
        <div className="my-[40px] relative w-full h-[120px] md:h-[220px] lg:h-[460px]">
          <Image
            src={PeopleWorking}
            alt="logo sanimex"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </Container>
      <Container classes="text-[16px] font-Century-Gothic text-[#555555]">
        <div className={'pb-6' + titleStyle}>Damos vida a tu hogar</div>
        <div className="pb-6">
          Somos una empresa 100% mexicana dedicada a la comercialización de
          pisos, azulejos, sanitarios, grifería, adhesivos, tinas, muebles y
          accesorios para baño; atendiendo al mercado de mayoreo, menudeo y
          proyectos, por lo que enfocamos nuestros esfuerzos a mantener un alto
          índice de eficacia reflejado en nuestras más de 30 sucursales en la
          Ciudad de México y Estado de México.
        </div>
        <div className="grid grid-cols-12 md:gap-x-4 ">
          <div className={'col-span-8 md:col-span-5 mt-8 ' + titleStyle}>
            Ofrecemos variedad
          </div>
          <div className="col-span-4 md:col-span-7 flex mt-8">
            <div className="h-[1px] border border-b-0 w-full border-[#DFDFDF] flex self-center"></div>
          </div>
          <div className="col-span-full md:col-span-5 mb-4 md:mb-0 pt-[10px]">
            Te ofrecemos la mejor variedad de productos para la decoración de
            tus espacios a precios accesibles y con entrega a domicilio.
          </div>
          <div className="col-span-full md:col-span-7 ">
            <div className="grid grid-cols-2 gap-1 h-[200px] sm:h-[400px]">
              <div className="relative h-full">
                <Image
                  src={Variedad1}
                  alt="logo sanimex"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="relative h-full">
                <Image
                  src={Variedad2}
                  alt="logo sanimex"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="relative h-full hidden md:block">
                <Image
                  src={Variedad3}
                  alt="logo sanimex"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
          <div className="col-span-4 md:col-span-7 flex mt-8">
            <div className="h-[1px] border border-b-0 w-full border-[#DFDFDF] flex self-center"></div>
          </div>
          <div
            className={'col-span-8 md:col-span-5 mt-8 text-end' + titleStyle}
          >
            Venta Integral
          </div>

          <div className="col-span-full md:col-span-7 ">
            <div className="col-span-full md:hidden mb-4 md:col-span-5 md:mb-0  pt-[10px]">
              <div className="h-[100px] md:h-[200px]">
                Encuentra todas las soluciones en un solo lugar: pisos, baños,
                grifería y mucho más.
              </div>
              <div className="grid grid-cols-12">
                <div className={'col-span-8 md:col-span-5' + titleStyle}>
                  Calidad y confianza
                </div>
                <div className="col-span-4 md:col-span-7 flex ">
                  <div className="h-[1px] border border-b-0 w-full border-[#DFDFDF] flex self-center"></div>
                </div>
                <div className="col-span-full  mb-4 md:mb-0  pt-[10px]">
                  Ven a visitarnos en nuestras más de 30 sucursales.
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 h-[200px] sm:h-[400px]">
              <div className="relative h-full">
                <Image
                  src={Integral1}
                  alt="logo sanimex"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="relative h-full">
                <Image
                  src={Integral2}
                  alt="logo sanimex"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="relative h-full hidden md:block">
                <Image
                  src={Integral3}
                  alt="logo sanimex"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
          <div className="h-[200px] md:h-[400px] hidden md:block col-span-full md:col-span-5 mb-4 md:mb-0  pt-[10px]">
            <div className="h-[100px] md:h-[200px]">
              Encuentra todas las soluciones en un solo lugar: pisos, baños,
              grifería y mucho más.
            </div>
            <div className="grid grid-cols-12">
              <div className={'col-span-8 md:col-span-7' + titleStyle}>
                Calidad y confianza
              </div>
              <div className="col-span-4 md:col-span-5 flex ">
                <div className="h-[1px] border border-b-0 w-full border-[#DFDFDF] flex self-center"></div>
              </div>
              <div className="col-span-full  mb-4 md:mb-0  pt-[10px]">
                Ven a visitarnos en nuestras más de 30 sucursales.
              </div>
            </div>
          </div>
          {/**<div className={'col-span-8 md:col-span-5 mt-8' + titleStyle}>
            Calidad y confianza
          </div>
          <div className="col-span-4 md:col-span-7 flex mt-8">
            <div className="h-[1px] border border-b-0 w-full border-[#DFDFDF] flex self-center"></div>
          </div>
          <div className="col-span-full md:col-span-5 mb-4 md:mb-0  pt-[10px]">
            Ven a visitarnos en nuestras más de 30 sucursales.
          </div>**/}
          <div className="col-span-full md:col-span-7 ">
            {/**<div className="grid grid-cols-2 gap-1 h-[200px] sm:h-[400px]">
              <div className="relative h-full">
                <Image
                  src={Calidad1}
                  alt="logo sanimex"
                  fill
                  style={{ objectFit: 'fill' }}
                />
              </div>
              <div className="relative h-full">
                <Image
                  src={Calidad2}
                  alt="logo sanimex"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="relative h-full hidden md:block">
                <Image
                  src={Calidad3}
                  alt="logo sanimex"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="relative h-full hidden md:block">
                <Image
                  src={Calidad4}
                  alt="logo sanimex"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>**/}
          </div>
        </div>
        <ShareBox />
      </Container>
    </RootLayout>
  );
};

export default Blog;
