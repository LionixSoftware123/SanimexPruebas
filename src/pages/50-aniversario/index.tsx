import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import Logo from '@/images/logo50san.png';

import franja1 from '@/images/franja-dorada.jpg';
import franja2 from '@/images/franja-azul-manchas.jpg';

const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));
const Container = dynamic(() => import('@/components/utils/ContainerTwo'));

const Winners = {
  names: [
    'Marta González Ramírez',
    'Pablo Luis Fernández López',
    'Clara Rodríguez García',
    'Alejandro Martínez Martín',
    'María Isabel Pérez Sánchez',
    'Adrián Ruiz Díaz',
    'Laura Herrera Vargas',
    'Sergio Castro Jiménez',
    'Ana Soto Moreno',
    'Javier Herrera Delgado',
    'María Paredes Muñoz',
    'Ricardo Torres Castro',
    'Paulina Alejandra Gómez Herrera',
    'Daniel Moreno López',
    'Carolina Díaz Ramírez',
    'Víctor Flores Pérez',
    'Raquel Gutiérrez García',
    'Luis Ramos Rodríguez',
    'Eva Navarro Soto',
    'Antonio Ramírez Torres',
    'Beatriz Vargas Martínez',
    'Andrés Sánchez Ruiz',
    'Laura Rosa Martín Delgado',
    'Juan Fernández Herrera',
    'Silvia López García',
    'Miguel Pérez Martínez',
    'Elena Castro Soto',
    'Guillermo Muñoz Ramos',
    'Marina Jiménez Flores',
    'Roberto Moreno Gómez',
    'Claudia Torres Delgado',
    'Carlos Herrera Ramos',
    'Laura Díaz Martín',
    'Alejandro Soto López',
    'Carmen Ramírez García',
    'Francisco Vargas Castro',
    'Patricia Muñoz Herrera',
    'David Pérez Delgado',
    'Martina López Sánchez',
    'Raúl Martínez Vargas',
    'Nuria Torres Rodríguez',
    'Juan Carlos Moreno Castro',
    'Alba García Herrera',
    'Diego Manuel Ramírez Soto',
    'Clara Delgado Martín',
    'Sergio Vargas López',
    'Jessica Daniela Herrera Sánchez',
    'Daniel Muñoz Ramos',
    'Carla Pérez Delgado',
    'Lourdes Ortega',
  ],
};

const AnniversaryPage: React.FC = () => {
  return (
    <RootLayout>
      <div className="bg-[#0035C8] min-h-screen relative pb-8">
        <div className="absolute left-0 top-0 w-full">
          <div className=" relative h-[50px] md:h-[150px] ">
            <Image src={franja1} alt="" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className=" relative h-[100px] md:h-[300px] ">
            <Image src={franja2} alt="" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
        <Container>
          <div className="bg-[url('../images/landingporpartesconfetti-04.png')] bg-contain  bg-origin-content bg-no-repeat bg-top relative">
            <div className="  bg-[url('../images/globos.png')] bg-contain  bg-origin-content bg-no-repeat bg-top relative  ">
              <div className="flex justify-center py-[20px]">
                <div className=" relative w-[150px] h-[150px] md:w-[300px] md:h-[400px] lg:w-[400px] lg:h-[500px] ">
                  <Image
                    src={Logo}
                    alt=""
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-[20px]  font-Century-Gothic text-center mx-auto">
                <div className="text-[30px] text-white md:px-8 leading-[30px] lg:text-[70pt] lg:leading-[70pt] font-Aero">
                  <div>¡Felicidades a </div>
                  <div className="tracking-tighter text-[#C9A35D] font-Century-Gothic-Bold text-[30px] leading-[30px] lg:text-[75pt] lg:leading-[75pt]">
                    los ganadores!
                  </div>
                </div>
                <div className=" font-Antonio text-[#002640] pb-6 leading-[20px] text-[20px] lg:leading-[40pt] lg:text-[40pt] drop-shadow-[0_2px_1.2px_rgba(255,255,255,0.7)]">
                  de{' '}
                  <span className="uppercase">Arma la casa de tus Sueños</span>
                </div>

                <div className="flex flex-col text-white md:text-[22px] md:leading-[22px] justify-center space-x-4">
                  {Winners.names.map((nombre, index) => (
                    <div key={index}>
                      <span>
                        {index + 1}. {nombre}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="font-Century-Gothic-Bold text-[#2485FF] text-[20px] leading-[20px] lg:text-[35pt] lg:leading-[35pt] drop-shadow-[0_5px_1.2px_rgba(0,0,0,1)]">
                  Nos pondremos en contacto contigo
                </div>
                <div className="font-Century-Gothic-Bold text-[#2485FF] text-[20px] leading-[20px] lg:text-[35pt] lg:leading-[35pt] drop-shadow-[0_5px_1.2px_rgba(0,0,0,1)]">
                  antes del dia 13 de diciembre
                </div>
                <div className="pt-6 text-[30px] leading-[30px] lg:text-[40pt] lg:leading-[40pt] text-[#C9A35D] font-Aero">
                  ¡Mantente pendiente!
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </RootLayout>
  );
};

export default AnniversaryPage;
