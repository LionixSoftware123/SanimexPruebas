import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import IconClipboard from '@/images/icon-awesome-clipboard-list.svg';
import IconStar from '@/images/icon-awesome-star.svg';
import IconProfile from '@/images/icon-material-person-outline.svg';
import IconBook from '@/images/icon-awesome-address-book.svg';
import IconPayment from '@/images/icon-awesome-credit-card.svg';
import IconPower from '@/images/icon-awesome-power-off.svg';
import IconPoint from '@/images/icon-simple-sitepoint.svg';
import { useRouter } from 'next/router';
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));

const Container = dynamic(() => import('@/components/utils/Container'));
const UserData: React.FC = () => {
  const [data, setData] = useState({
    name: '',
    apellidos: '',
    telefono: '',
    documento: '',
    calle: '',
    numero: '',
    colonia: '',
    piso: '',
    alcaldia: '',
    postal: '',
    estado: '',
    tipo: 'casa',
  });
  const [aditionalData, setAditionalData] = useState({
    parquimetro: false,
    viaRapida: false,
    calleTransversal: false,
    hayDesnivel: false,
    hayRampa: false,
    hayEscaleras: false,
    distanciaAprox: '',
    distanciaTech: '',
    consideraciones: '',
    descripcion: '',
  });
  const router = useRouter();
  return (
    <RootLayout>
      <StaticMeta
        title={'Agregar dirección'}
        description={'Agregar dirección'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <Container>
        <div className="font-Century-Gothic grid grid-cols-12 gap-x-4 my-16">
          <div className="col-span-full md:col-span-3 ">
            <div className=" bg-white rounded-[10px] border-b-[3px] border-[#0033A1] drop-shadow-lg">
              <div className="px-4 bg-[#F5F5F5] py-4 ">Mi cuenta</div>
              <div className="px-4 ">
                <div className="flex space-y-2 flex-col pt-6 pb-4 border-b border-[#C1C1C1]">
                  <Link   href={'/usuario/ordenes'} className="flex items-center">
                    <div className="mr-4">
                      <IconClipboard />
                    </div>
                    Mis Pedidos
                  </Link>
                  <Link
                    href={'/usuario/my-points'}
                    className="flex items-center"
                  >
                    <div className="mr-4">
                      <IconPoint />
                    </div>
                    Mis puntos
                  </Link>
                  <Link
                    href={'/usuario/opinions'}
                    className="flex items-center"
                  >
                    <div className="mr-4">
                      <IconStar />
                    </div>
                    Reseñas
                  </Link>
                </div>
                <div className="flex space-y-2 flex-col py-4 border-b border-[#C1C1C1]">
                  <Link   href={'/usuario'} className="flex items-center">
                    <div className="mr-4">
                      <IconProfile />
                    </div>
                    Mis Datos
                  </Link>
                  <div className="flex text-[#0071CE] font-Century-Gothic-Bold items-center">
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
          <div className="text-[14px] col-span-full md:col-span-9 mt-8 md:mt-0  text-[#333E48] font-century-Gothic">
            <div className="flex justify-between mb-8 font-Century-Gothic-Bold">
              <div className=" text-[#333E48] text-[25px]">Mis direcciones</div>
              <Link   href={'./'} className="text-[#93278F] text-[18px] ">
                Ver direcciones guardadas
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="col-span-full font-Century-Gothic-Bold text-[#222222]">
                Información de contacto
              </div>
              <div>
                <div className="mb-[5px]">Nombre *</div>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full border border-[#DFDFDF] h-[32px]"
                />
              </div>
              <div>
                <div className="mb-[5px]">Apellidos *</div>
                <input
                  type="text"
                  value={data.apellidos}
                  onChange={(e) =>
                    setData({ ...data, apellidos: e.target.value })
                  }
                  className="w-full border border-[#DFDFDF] h-[32px]"
                />
              </div>
              <div>
                <div className="mb-[5px]">Teléfono</div>
                <input
                  type="text"
                  value={data.telefono}
                  onChange={(e) =>
                    setData({ ...data, telefono: e.target.value })
                  }
                  className="w-full border border-[#DFDFDF] h-[32px]"
                />
              </div>
              <div>
                <div className="mb-[5px]">Teléfono</div>
                <input
                  type="text"
                  value={data.telefono}
                  onChange={(e) =>
                    setData({ ...data, telefono: e.target.value })
                  }
                  className="w-full border border-[#DFDFDF] h-[32px]"
                />
              </div>
              <div className="pt-4 col-span-full font-Century-Gothic-Bold text-[#222222]">
                Direccion
              </div>
              <div>
                <div className="mb-[5px]">Calle</div>
                <input
                  type="text"
                  value={data.calle}
                  onChange={(e) => setData({ ...data, calle: e.target.value })}
                  className="w-full border border-[#DFDFDF] h-[32px]"
                />
              </div>
              <div>
                <div className="mb-[5px]">Número</div>
                <input
                  type="text"
                  value={data.numero}
                  onChange={(e) => setData({ ...data, numero: e.target.value })}
                  className="w-full border border-[#DFDFDF] h-[32px]"
                />
              </div>
              <div>
                <div className="mb-[5px]">Colonia</div>
                <input
                  type="text"
                  value={data.colonia}
                  onChange={(e) =>
                    setData({ ...data, colonia: e.target.value })
                  }
                  className="w-full border border-[#DFDFDF] h-[32px]"
                />
              </div>
              <div>
                <div className="mb-[5px]">Piso</div>
                <input
                  type="text"
                  value={data.piso}
                  onChange={(e) => setData({ ...data, piso: e.target.value })}
                  className="w-full border border-[#DFDFDF] h-[32px]"
                />
              </div>
              <div>
                <div className="mb-[5px]">Alcaldía / Municipio</div>
                <input
                  type="text"
                  value={data.alcaldia}
                  onChange={(e) =>
                    setData({ ...data, alcaldia: e.target.value })
                  }
                  className="w-full border border-[#DFDFDF] h-[32px]"
                />
              </div>
              <div>
                <div className="mb-[5px]">Código postal</div>
                <input
                  type="text"
                  value={data.postal}
                  onChange={(e) => setData({ ...data, postal: e.target.value })}
                  className="w-full border border-[#DFDFDF] h-[32px]"
                />
              </div>
              <div>
                <div className="mb-[5px]">Estado</div>
                <input
                  type="text"
                  value={data.estado}
                  onChange={(e) => setData({ ...data, estado: e.target.value })}
                  className="w-full border border-[#DFDFDF] h-[32px]"
                />
              </div>
              <div>
                <div className="mb-[5px]">Tipo de destino</div>
                <div className="h-[32px] flex">
                  <div className="flex self-center">
                    <button
                      onClick={() => setData({ ...data, tipo: 'casa' })}
                      className="self-center mr-2 flex justify-center border rounded-full border-[#0071CE] w-[10px] h-[10px]"
                    >
                      <div
                        className={`${
                          data.tipo === 'casa' ? 'bg-[#0071CE]' : 'bg-white'
                        } flex w-[6px] h-[6px] rounded-full  my-auto`}
                      ></div>
                    </button>
                    <div className="mr-4">Casa</div>
                    <button
                      onClick={() => setData({ ...data, tipo: 'oficina' })}
                      className="self-center mr-2 flex justify-center border rounded-full border-[#0071CE] w-[10px] h-[10px]"
                    >
                      <div
                        className={`${
                          data.tipo === 'oficina' ? 'bg-[#0071CE]' : 'bg-white'
                        } flex w-[6px] h-[6px] rounded-full bg-[#0071CE] my-auto`}
                      ></div>
                    </button>
                    <div className="mr-4">Oficina</div>
                    <button
                      onClick={() => setData({ ...data, tipo: 'departamento' })}
                      className="self-center mr-2 flex justify-center border rounded-full border-[#0071CE] w-[10px] h-[10px]"
                    >
                      <div
                        className={`${
                          data.tipo === 'departamento'
                            ? 'bg-[#0071CE]'
                            : 'bg-white'
                        } flex w-[6px] h-[6px] rounded-full bg-[#0071CE] my-auto`}
                      ></div>
                    </button>
                    <div className="mr-4">Departamento</div>
                    <button
                      onClick={() => setData({ ...data, tipo: 'local' })}
                      className="self-center mr-2 flex justify-center border rounded-full border-[#0071CE] w-[10px] h-[10px]"
                    >
                      <div
                        className={`${
                          data.tipo === 'local' ? 'bg-[#0071CE]' : 'bg-white'
                        } flex w-[6px] h-[6px] rounded-full bg-[#0071CE] my-auto`}
                      ></div>
                    </button>
                    <div className="mr-4">Local</div>
                  </div>
                </div>
              </div>
              <div className="col-span-full grid grid-cols-2 pt-8">
                <div className="text-[#93278F] text-[18px] font-Century-Gothic-Bold">
                  <Link   href={'./'}>&lt;&lt; Volver atrás</Link>
                </div>
                <div>
                  <button className="w-full h-[32px] bg-[#1C355E] text-white">
                    Guardar direccion
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-16 mb-8 text-[#222222] font-Century-Gothic-Bold">
              Información adicional de casa
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-[14px] mb-4">
              <div className="col-span-full">
                Donde se estaciona la unidad para la entrega de producto:
              </div>
              <div className="h-[40px] px-4 flex justify-between bg-[#FCFCFC] border border-[#DFDFDF]">
                <div className="flex self-center">Parquímetro</div>
                <div className="flex self-center">
                  <button
                    onClick={() =>
                      setAditionalData({ ...aditionalData, parquimetro: true })
                    }
                    className="self-center mr-2 flex justify-center border rounded-full border-[#0071CE] w-[10px] h-[10px]"
                  >
                    <div
                      className={`${
                        aditionalData.parquimetro ? 'bg-[#0071CE]' : 'bg-white'
                      } flex w-[6px] h-[6px] rounded-full bg-[#0071CE] my-auto`}
                    ></div>
                  </button>
                  <div className="mr-4">Si</div>
                  <button
                    onClick={() =>
                      setAditionalData({ ...aditionalData, parquimetro: false })
                    }
                    className="self-center mr-2 flex justify-center border rounded-full border-[#0071CE] w-[10px] h-[10px]"
                  >
                    <div
                      className={`${
                        !aditionalData.parquimetro ? 'bg-[#0071CE]' : 'bg-white'
                      } flex w-[6px] h-[6px] rounded-full bg-[#0071CE] my-auto`}
                    ></div>
                  </button>
                  <div>No</div>
                </div>
              </div>
              <div className="h-[40px] px-4 flex justify-between bg-[#FCFCFC] border border-[#DFDFDF]">
                <div className="flex self-center">Vía rápida</div>
                <div className="flex self-center">
                  <button
                    onClick={() =>
                      setAditionalData({ ...aditionalData, viaRapida: true })
                    }
                    className="self-center mr-2 flex justify-center border rounded-full border-[#0071CE] w-[10px] h-[10px]"
                  >
                    <div
                      className={`${
                        aditionalData.viaRapida ? 'bg-[#0071CE]' : 'bg-white'
                      } flex w-[6px] h-[6px] rounded-full bg-[#0071CE] my-auto`}
                    ></div>
                  </button>
                  <div className="mr-4">Si</div>
                  <button
                    onClick={() =>
                      setAditionalData({ ...aditionalData, viaRapida: false })
                    }
                    className="self-center mr-2 flex justify-center border rounded-full border-[#0071CE] w-[10px] h-[10px]"
                  >
                    <div
                      className={`${
                        !aditionalData.viaRapida ? 'bg-[#0071CE]' : 'bg-white'
                      } flex w-[6px] h-[6px] rounded-full bg-[#0071CE] my-auto`}
                    ></div>
                  </button>
                  <div>No</div>
                </div>
              </div>
              <div className="h-[40px] px-4 flex justify-between bg-[#FCFCFC] border border-[#DFDFDF]">
                <div className="flex self-center">Calle transversal</div>
                <div className="flex self-center">
                  <button
                    onClick={() =>
                      setAditionalData({
                        ...aditionalData,
                        calleTransversal: true,
                      })
                    }
                    className="self-center mr-2 flex justify-center border rounded-full border-[#0071CE] w-[10px] h-[10px]"
                  >
                    <div
                      className={`${
                        aditionalData.calleTransversal
                          ? 'bg-[#0071CE]'
                          : 'bg-white'
                      } flex w-[6px] h-[6px] rounded-full bg-[#0071CE] my-auto`}
                    ></div>
                  </button>
                  <div className="mr-4">Si</div>
                  <button
                    onClick={() =>
                      setAditionalData({
                        ...aditionalData,
                        calleTransversal: false,
                      })
                    }
                    className="self-center mr-2 flex justify-center border rounded-full border-[#0071CE] w-[10px] h-[10px]"
                  >
                    <div
                      className={`${
                        !aditionalData.calleTransversal
                          ? 'bg-[#0071CE]'
                          : 'bg-white'
                      } flex w-[6px] h-[6px] rounded-full bg-[#0071CE] my-auto`}
                    ></div>
                  </button>
                  <div>No</div>
                </div>
              </div>
              <div className="h-[40px] px-4 flex justify-between bg-[#FCFCFC] border border-[#DFDFDF]">
                <div className="flex self-center">Hay desnivel</div>
                <div className="flex self-center">
                  <button
                    onClick={() =>
                      setAditionalData({ ...aditionalData, hayDesnivel: true })
                    }
                    className="self-center mr-2 flex justify-center border rounded-full border-[#0071CE] w-[10px] h-[10px]"
                  >
                    <div
                      className={`${
                        aditionalData.hayDesnivel ? 'bg-[#0071CE]' : 'bg-white'
                      } flex w-[6px] h-[6px] rounded-full bg-[#0071CE] my-auto`}
                    ></div>
                  </button>
                  <div className="mr-4">Si</div>
                  <button
                    onClick={() =>
                      setAditionalData({ ...aditionalData, hayDesnivel: false })
                    }
                    className="self-center mr-2 flex justify-center border rounded-full border-[#0071CE] w-[10px] h-[10px]"
                  >
                    <div
                      className={`${
                        !aditionalData.hayDesnivel ? 'bg-[#0071CE]' : 'bg-white'
                      } flex w-[6px] h-[6px] rounded-full bg-[#0071CE] my-auto`}
                    ></div>
                  </button>
                  <div>No</div>
                </div>
              </div>
              <div className="h-[40px] px-4 flex justify-between bg-[#FCFCFC] border border-[#DFDFDF]">
                <div className="flex self-center">Hay rampa</div>
                <div className="flex self-center">
                  <button
                    onClick={() =>
                      setAditionalData({ ...aditionalData, hayRampa: true })
                    }
                    className="self-center mr-2 flex justify-center border rounded-full border-[#0071CE] w-[10px] h-[10px]"
                  >
                    <div
                      className={`${
                        aditionalData.hayRampa ? 'bg-[#0071CE]' : 'bg-white'
                      } flex w-[6px] h-[6px] rounded-full bg-[#0071CE] my-auto`}
                    ></div>
                  </button>
                  <div className="mr-4">Si</div>
                  <button
                    onClick={() =>
                      setAditionalData({ ...aditionalData, hayRampa: false })
                    }
                    className="self-center mr-2 flex justify-center border rounded-full border-[#0071CE] w-[10px] h-[10px]"
                  >
                    <div
                      className={`${
                        !aditionalData.hayRampa ? 'bg-[#0071CE]' : 'bg-white'
                      } flex w-[6px] h-[6px] rounded-full bg-[#0071CE] my-auto`}
                    ></div>
                  </button>
                  <div>No</div>
                </div>
              </div>
              <div className="h-[40px] px-4 flex justify-between bg-[#FCFCFC] border border-[#DFDFDF]">
                <div className="flex self-center">Hay escaleras</div>
                <div className="flex self-center">
                  <button
                    onClick={() =>
                      setAditionalData({ ...aditionalData, hayEscaleras: true })
                    }
                    className="self-center mr-2 flex justify-center border rounded-full border-[#0071CE] w-[10px] h-[10px]"
                  >
                    <div
                      className={`${
                        aditionalData.hayEscaleras ? 'bg-[#0071CE]' : 'bg-white'
                      } flex w-[6px] h-[6px] rounded-full bg-[#0071CE] my-auto`}
                    ></div>
                  </button>
                  <div className="mr-4">Si</div>
                  <button
                    onClick={() =>
                      setAditionalData({
                        ...aditionalData,
                        hayEscaleras: false,
                      })
                    }
                    className="self-center mr-2 flex justify-center border rounded-full border-[#0071CE] w-[10px] h-[10px]"
                  >
                    <div
                      className={`${
                        !aditionalData.hayEscaleras
                          ? 'bg-[#0071CE]'
                          : 'bg-white'
                      } flex w-[6px] h-[6px] rounded-full bg-[#0071CE] my-auto`}
                    ></div>
                  </button>
                  <div>No</div>
                </div>
              </div>
            </div>
            <div className="md:h-[40px] md:flex justify-between mb-4">
              <div className="flex self-center mb-4 md:mb-0">
                Considerando el ligar de desembarque cual es la distancia
                aproximada que hay hasta la casa
              </div>
              <div className="flex self-center">
                <input
                  onChange={(e) =>
                    setAditionalData({
                      ...aditionalData,
                      distanciaAprox: e.target.value,
                    })
                  }
                  type="text"
                  className="w-[61px] mr-2 border border-[#C1C1C1]"
                />
                <div>Metros</div>
              </div>
            </div>
            <div className="md:h-[40px] md:flex justify-between mb-4">
              <div className="flex self-center mb-4 md:mb-0">
                Considerando el ligar de desembarque cual es la distancia
                aproximada que hay hasta la casa
              </div>
              <div className="flex self-center">
                <input
                  onChange={(e) =>
                    setAditionalData({
                      ...aditionalData,
                      distanciaTech: e.target.value,
                    })
                  }
                  type="text"
                  className="w-[61px] mr-2 border border-[#C1C1C1]"
                />
                <div>Metros</div>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-x-4">
              <div className="px-2 pb-2 bg-[#FCFCFC] border border-[#DFDFDF]">
                <div className="my-2">Consideraciones especiales</div>
                <textarea
                  onChange={(e) => {
                    setAditionalData({
                      ...aditionalData,
                      consideraciones: e.target.value,
                    });
                  }}
                  rows={5}
                  cols={33}
                  className="p-2 w-full h-[97px] border border-[#C1C1C1]"
                ></textarea>
              </div>
              <div className="px-2 pb-2 bg-[#FCFCFC] border border-[#DFDFDF]">
                <div className="my-2">Descripción del lugar</div>
                <textarea
                  onChange={(e) => {
                    setAditionalData({
                      ...aditionalData,
                      descripcion: e.target.value,
                    });
                  }}
                  rows={5}
                  cols={33}
                  className="p-2 w-full h-[97px] border border-[#C1C1C1]"
                ></textarea>
              </div>
              <div className="col-start-2">
                <button className="my-4 w-full bg-[#1C355E] h-[32px] text-white">
                  Agregar Información
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </RootLayout>
  );
};

export default UserData;
