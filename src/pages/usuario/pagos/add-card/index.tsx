import React, { useState } from 'react';
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

let currentYear = new Date().getFullYear();
const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step,
  );
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));

const Container = dynamic(() => import('@/components/utils/Container'));
const UserData: React.FC = () => {
  const months = arrayRange(0, 12, 1);
  const years = arrayRange(currentYear, currentYear + 100, 1);
  const [data, setData] = useState({
    name: '',
    lastName: '',
    cardNumber: '',
    monthExp: '0',
    yearExp: currentYear.toString(),
  });
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
              <div className="font-Century-Gothic-Bold text-[25px]">
                Mis Métodos de pago
              </div>
              <Link
                href={'/user-data/my-payment-methods'}
                className="text-[#93278F] font-century-Gothic-Bold text-[18px]"
              >
                ver tarjetas guardadas
              </Link>
            </div>
            <div>Agregar una tarjeta de credito o débito</div>
            <form className="my-4 grid grid-cols-2 gap-4" onSubmit={() => {}}>
              <div>
                <div>Nombre del titular*</div>
                <input
                  required
                  onChange={(e) => {
                    setData({ ...data, name: e.target.value });
                  }}
                  type="text"
                  className="border border-[#DFDFDF] w-full h-[32px] px-2"
                />
              </div>
              <div>
                <div>Apellido del titular*</div>
                <input
                  onChange={(e) => {
                    setData({ ...data, lastName: e.target.value });
                  }}
                  required
                  type="text"
                  className="border border-[#DFDFDF] w-full h-[32px] px-2"
                />
              </div>
              <div>
                <div>Número de tarjeta</div>
                <input
                  onChange={(e) => {
                    setData({ ...data, cardNumber: e.target.value });
                  }}
                  required
                  type="text"
                  className="border border-[#DFDFDF] w-full h-[32px] px-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div>Mes de expiracion</div>
                  <select
                    onChange={(e) => {
                      setData({ ...data, monthExp: e.target.value });
                    }}
                    required
                    name=""
                    id=""
                    className="w-full border borer-[#DFDFDF] h-[32px] px-2"
                  >
                    {months.map((item, key) => (
                      <option value={item} key={key}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div>Año de expiracion</div>
                  <select
                    onChange={(e) => {
                      setData({ ...data, yearExp: e.target.value });
                    }}
                    required
                    name=""
                    id=""
                    className="w-full border borer-[#DFDFDF] h-[32px] px-2"
                  >
                    {years.map((item, key) => (
                      <option value={item} key={key}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-[#93278F] text-[18px] font-Century-Gothic-Bold">
                &lt;&lt; Volver atrás
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full h-[32px] bg-[#1C355E] text-white"
                >
                  Guardar direccion
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </RootLayout>
  );
};

export default UserData;
