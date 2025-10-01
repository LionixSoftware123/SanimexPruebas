import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import IconClipboard from '@/images/icon-awesome-clipboard-list.svg';
import IconStar from '@/images/icon-awesome-star.svg';
import IconProfile from '@/images/icon-material-person-outline.svg';
import IconBook from '@/images/icon-awesome-address-book.svg';
import IconPayment from '@/images/icon-awesome-credit-card.svg';
import IconPower from '@/images/icon-awesome-power-off.svg';
import IconPoint from '@/images/icon-simple-sitepoint.svg';
import IconEdit from '@/images/material-edit.svg';
import IconTrash from '@/images/icon-papelera.svg';
import { useRouter } from 'next/router';
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));

const Container = dynamic(() => import('@/components/utils/Container'));
const UserData: React.FC = () => {
  const addresses = [
    {
      name: 'Carlitos Carrillo',
      dir1: 'Calle 12 #161-44',
      dir2: 'Belen las Playas AP 2502, Medellin',
      telefono: '123 123-45-67',
    },
    {
      name: 'Carlitos Carrillo',
      dir1: 'Calle 12 #161-44',
      dir2: 'Belen las Playas AP 2502, Medellin',
      telefono: '123 123-45-67',
    },
    {
      name: 'Carlitos Carrillo',
      dir1: 'Calle 12 #161-44',
      dir2: 'Belen las Playas AP 2502, Medellin',
      telefono: '123 123-45-67',
    },
  ];
  const router = useRouter();
  return (
    <RootLayout>
      <StaticMeta
        title={'Dirección'}
        description={'Dirección'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <Container>
        <div className="font-Century-Gothic grid grid-cols-12 gap-x-4 my-16">
          <div className="col-span-full mb-8 md:mb:0 md:col-span-3 ">
            <div className=" bg-white rounded-[10px] border-b-[3px] border-[#0033A1] drop-shadow-lg">
              <div className="px-4 bg-[#F5F5F5] py-4 ">Mi cuenta</div>
              <div className="px-4 ">
                <div className="flex space-y-2 flex-col pt-6 pb-4 border-b border-[#C1C1C1]">
                  <Link   href={'/usuario/ordenes'} className="items-center flex">
                    <div className="mr-4">
                      <IconClipboard />
                    </div>
                    Mis Pedidos
                  </Link>
                  <Link
                    href={'/usuario/my-puntos'}
                    className="items-center flex"
                  >
                    <div className="mr-4">
                      <IconPoint />
                    </div>
                    Mis puntos
                  </Link>
                  <Link
                    href={'/usuario/opinions'}
                    className="items-center flex"
                  >
                    <div className="mr-4">
                      <IconStar />
                    </div>
                    Reseñas
                  </Link>
                </div>
                <div className="flex space-y-2 flex-col py-4 border-b border-[#C1C1C1]">
                  <Link   href={'/usuario'} className="flex items-center ">
                    <div className="mr-4">
                      <IconProfile />
                    </div>
                    Mis Datos
                  </Link>
                  <div className="flex items-center text-[#0071CE] font-Century-Gothic-Bold">
                    <div className="mr-4">
                      <IconBook />
                    </div>
                    Mis direcciones
                  </div>
                  <Link
                    href={'/usuario/metodos-de-pago'}
                    className="flex items-center"
                  >
                    <div className="mr-4">
                      <IconPayment />
                    </div>
                    Mis metodos de pago
                  </Link>
                </div>
                <div className="pt-4 pb-16">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <IconPower />
                    </div>
                    <button>Cerrar sesión</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full md:col-span-9  text-[#333E48] font-century-Gothic">
            <div className="flex justify-between">
              <div className="font-century-Gothic-Bold text-[25px]">
                Mis direcciones
              </div>
              <Link
                href={'/usuario/direccion/add-address'}
                className="text-[#93278F] font-century-Gothic-Bold text-[18px]"
              >
                + Agregar dirección
              </Link>
            </div>
            <div className="text-[14px] mt-8 flex flex-col space-y-4 pb-4 border-b border-[#C1C1C1]">
              {addresses.map((item, index) => (
                <div key={index}>
                  <div className="font-Century-Gothic-Bold">{item.name}</div>
                  <div className="flex justify-between">
                    <div>
                      <div>{item.dir1}</div>
                      <div>{item.dir2}</div>
                      <div>Telefono:&nbsp;{item.telefono}</div>
                    </div>
                    <div className="flex self-center items-center">
                      <div className="mr-4">
                        <IconEdit />
                      </div>
                      <div className="mr-4">
                        <IconTrash />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </RootLayout>
  );
};

export default UserData;
