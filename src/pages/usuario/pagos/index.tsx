import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import IconClipboard from '@/images/icon-awesome-clipboard-list.svg';
import IconStar from '@/images/icon-awesome-star.svg';
import IconProfile from '@/images/icon-material-person-outline.svg';
import IconBook from '@/images/icon-awesome-address-book.svg';
import IconPayment from '@/images/icon-awesome-credit-card.svg';
import IconPower from '@/images/icon-awesome-power-off.svg';
import IconPoint from '@/images/icon-simple-sitepoint.svg';
import IconCard from '@/images/icon-metro-visa.svg';

const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));

const Container = dynamic(() => import('@/components/utils/Container'));
const UserData: React.FC = () => {
  const cards = [
    {
      id: 'card-1',
      name: 'Carlos Carrillo',
      number: 1234,
    },
    {
      id: 'card-2',
      name: 'Carlos Carrillo',
      number: 1234,
    },
    {
      id: 'card-3',
      name: 'Carlos Carrillo',
      number: 1234,
    },
  ];
  return (
    <RootLayout>
      <Container>
        <div className="font-Century-Gothic grid grid-cols-12 gap-x-4 my-16">
          <div className="col-span-3 ">
            <div className=" bg-white rounded-[10px] border-b-[3px] border-[#0033A1] drop-shadow-lg">
              <div className="px-4 bg-[#F5F5F5] py-4 ">Mi cuenta</div>
              <div className="px-4 ">
                <div className="flex space-y-2 flex-col pt-6 pb-4 border-b border-[#C1C1C1]">
                  <Link   href={'/user-data/my-orders'} className="flex">
                    <Image
                      src={IconClipboard}
                      alt="cart"
                      height={12}
                      width={12}
                      className="mr-4"
                    />
                    Mis Pedidos
                  </Link>
                  <Link   href={'/user-data/my-points'} className="flex">
                    <Image
                      src={IconPoint}
                      alt="cart"
                      height={12}
                      width={12}
                      className="mr-4"
                    />
                    Mis puntos
                  </Link>
                  <Link   href={'/user-data/opinions'} className="flex">
                    <Image
                      src={IconStar}
                      alt="cart"
                      height={12}
                      width={12}
                      className="mr-4"
                    />
                    Reseñas
                  </Link>
                </div>
                <div className="flex space-y-2 flex-col py-4 border-b border-[#C1C1C1]">
                  <Link   href={'/user-data'} className="flex">
                    <Image
                      src={IconProfile}
                      alt="cart"
                      height={12}
                      width={12}
                      className="mr-4"
                    />
                    Mis Datos
                  </Link>
                  <Link   href={'/user-data/my-address'} className="flex">
                    <Image
                      src={IconBook}
                      alt="cart"
                      height={12}
                      width={12}
                      className="mr-4"
                    />
                    Mis direcciones
                  </Link>
                  <div className="flex text-[#0071CE] font-Century-Gothic-Bold">
                    <Image
                      src={IconPayment}
                      alt="cart"
                      height={12}
                      width={12}
                      className="mr-4"
                    />
                    Mis metodos de pago
                  </div>
                </div>
                <div className="pt-4 pb-16">
                  <div className="flex">
                    <Image
                      src={IconPower}
                      alt="cart"
                      height={12}
                      width={12}
                      className="mr-4"
                    />
                    <button>Cerrar sesión</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-9  text-[#333E48] font-century-Gothic">
            <div className="flex justify-between">
              <div className="font-century-Gothic-Bold text-[25px]">
                Mis Métodos de pago
              </div>
              <Link
                href={'/user-data/my-payment-methods/add-card'}
                className="text-[#93278F] font-century-Gothic-Bold text-[18px]"
              >
                + Agregar tarjeta
              </Link>
            </div>
            <div className="pt-8 grid grid-cols-3 gap-4">
              {cards.map((items, index) => (
                <div
                  key={index}
                  className={`flex h-[120px] text-[12px] text-[#222222] p-6 flex border`}
                >
                  <div className="flex self-center">
                    <div className="mr-1 flex self-center">
                      <Image
                        src={IconCard}
                        alt="cart"
                        height={18}
                        width={22}
                        className="mr-4"
                      />
                    </div>
                    <div>
                      <div>{items.name}</div>
                      <div>**** **** **** {items.number}</div>
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
