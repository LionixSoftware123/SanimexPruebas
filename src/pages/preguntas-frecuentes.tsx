import dynamic from 'next/dynamic';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));
const Container = dynamic(() => import('@/components/utils/Container'));
const Animation = dynamic(() => import('@/components/utils/AnimationPreset'));

const FrecuentQuestion: React.FC = () => {
  const [dropdownOne, setDropdownOne] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);
  const [dropdown4, setDropdown4] = useState(false);
  const [dropdown5, setDropdown5] = useState(false);
  const [dropdown6, setDropdown6] = useState(false);
  const [dropdown7, setDropdown7] = useState(false);
  const [dropdown8, setDropdown8] = useState(false);
  const [dropdown9, setDropdown9] = useState(false);
  const [dropdown10, setDropdown10] = useState(false);
  const [dropdown11, setDropdown11] = useState(false);
  const [dropdown12, setDropdown12] = useState(false);
  const [dropdown13, setDropdown13] = useState(false);
  const [dropdown15, setDropdown15] = useState(false);
  const router = useRouter();
  return (
    <RootLayout>
      <StaticMeta
        title={'Sanimex - Preguntas frecuentes'}
        description={'Preguntas frecuentes'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <div className="font-Century-Gothic bg-cover bg-no-repeat bg-center bg-[url('../images/banner-preg-frec.webp')] h-[200px] lg:h-[400px] w-full">
        <Container classes="w-full h-full  flex items-end">
          <div className=" text-[30px] leading-[30px] md:leading-[64px] md:text-[64px] text-white font-bold">
            Preguntas Frecuentes
          </div>
        </Container>
      </div>
      <Container classes="my-8">
        <div className=" text-[30px] font-bold mb-8 md:h-[100px] border-b border-[#EBEBEB] text-[#323232] mt-2">
          Aquí encontrarás respuestas a las dudas más frecuentes de nuestros
          usuarios.
        </div>
        <div className="py-4 text-[18px] border-b border-[#EBEBEB] text-[#323232]">
          <button
            className="flex items-center text-[#000] font-[600]"
            onClick={() => setDropdownOne(!dropdownOne)}
          >
            {dropdownOne ? (
              <ChevronUpIcon className="w-[20px] h-[20px] mr-2" />
            ) : (
              <ChevronDownIcon className="mr-2 w-[20px] h-[20px]" />
            )}
            ¿Dónde puedo solicitar mi factura?
          </button>
          <div className="ml-8">
            <Animation open={dropdownOne} setOpen={() => {}}>
              <div className="my-4 text-[#777777]">
                <div className="mb-4">
                  Si realizaste tu compra en línea, es necesario solicitarla al
                  asesor al momento de la confirmación de pedido, se te
                  solicitara únicamente tu Constancia de Situación Fiscal y uso
                  de CFDI, el tiempo de respuesta es inmediato, tu factura se te
                  hará llegar por el medio que desees.
                </div>
                <div className="">
                  Si realizaste tu compra en línea, es necesario solicitarla al
                  asesor al momento de la confirmación de pedido, se te
                  solicitara únicamente tu Constancia de Situación Fiscal y uso
                  de CFDI, el tiempo de respuesta es inmediato, tu factura se te
                  hará llegar por el medio que desees.
                </div>
              </div>
            </Animation>
          </div>
        </div>
        <div className="py-4 text-[18px] border-b border-[#EBEBEB] text-[#323232]">
          <button
            className="flex items-center text-[#000] font-[600]"
            onClick={() => setDropdown2(!dropdown2)}
          >
            {dropdownOne ? (
              <ChevronUpIcon className="w-[20px] h-[20px] mr-2" />
            ) : (
              <ChevronDownIcon className="mr-2 w-[20px] h-[20px]" />
            )}
            ¿Cuentan con entregas fuera de la CDMX y Área Metropolitana?
          </button>
          <div className="ml-8">
            <Animation open={dropdown2} setOpen={() => {}}>
              <div className="my-4 text-[#777777]">
                <div className="mb-4">
                  Tenemos presencia en Ciudad de México y Área Metropolitana
                </div>
                <div className="">
                  Contamos con sucursales en Chalco, Coacalco, Cuautitlán
                  Izcalli, Ecatepec, Nicolás Romero, Nezahualcóyotl, Tecámac,
                  Teoloyucan, Texcoco y Zumpango. En algunas zonas puedes variar
                  la cobertura de acuerdo con el C.P. ingresado para realizar la
                  compra.
                </div>
              </div>
            </Animation>
          </div>
        </div>
        <div className="py-4 text-[18px] border-b border-[#EBEBEB] text-[#323232]">
          <button
            className="flex items-center text-[#000] font-[600]"
            onClick={() => setDropdown3(!dropdown3)}
          >
            {dropdown3 ? (
              <ChevronUpIcon className="w-[20px] h-[20px] mr-2" />
            ) : (
              <ChevronDownIcon className="mr-2 w-[20px] h-[20px]" />
            )}
            ¿Cuál es el tiempo de entrega de mi compra en E-commerce?
          </button>
          <div className="ml-8">
            <Animation open={dropdown3} setOpen={() => {}}>
              <div className="my-4 text-[#777777]">
                <div className="">
                  Una vez confirmada tu compra, recibirás un correo electrónico
                  con la fecha tentativa de entrega. El costo está en función a
                  tu ciudad y/o código postal; En Área Metropolitana y en
                  Interior de la República Mexicana el tiempo de entrega será en
                  un periodo de 1 a 5 días hábiles.
                </div>
              </div>
            </Animation>
          </div>
        </div>
        <div className="py-4 text-[18px] border-b border-[#EBEBEB] text-[#323232]">
          <button
            className="flex items-center text-[#000] font-[600]"
            onClick={() => setDropdown4(!dropdown4)}
          >
            {dropdown4 ? (
              <ChevronUpIcon className="w-[20px] h-[20px] mr-2" />
            ) : (
              <ChevronDownIcon className="mr-2 w-[20px] h-[20px]" />
            )}
            ¿Cual es el costo de envío?
          </button>
          <div className="ml-8">
            <Animation open={dropdown4} setOpen={() => {}}>
              <div className="my-4 text-[#777777]">
                <div className="mb-4">
                  Se calcula de acuerdo con el código postal que se ingresa para
                  realizar la compra.
                </div>
                <div className="">
                  Para entregas fuera del Área Metropolitana se cotizará por
                  separado, es necesario comunicarse al teléfono de atención a
                  clientes 800 560 4746 para determinar el monto y tiempo de
                  entrega de acuerdo con la disponibilidad de producto.
                </div>
              </div>
            </Animation>
          </div>
        </div>
        <div className="py-4 text-[18px] border-b border-[#EBEBEB] text-[#323232]">
          <button
            className="flex items-center text-[#000] font-[600]"
            onClick={() => setDropdown5(!dropdown5)}
          >
            {dropdown5 ? (
              <ChevronUpIcon className="w-[20px] h-[20px] mr-2" />
            ) : (
              <ChevronDownIcon className="mr-2 w-[20px] h-[20px]" />
            )}
            ¿Cuáles son los métodos de pago para compra en línea?
          </button>
          <div className="ml-8">
            <Animation open={dropdown5} setOpen={() => {}}>
              <div className="my-4 text-[#777777]">
                <div className="">
                  En tienda en línea aceptamos pago con tarjeta de crédito y
                  débito (Podrás pagar con Visa, Mastercard y Carnet). Depósito
                  o transferencia bancaria.
                </div>
              </div>
            </Animation>
          </div>
        </div>
        <div className="py-4 text-[18px] border-b border-[#EBEBEB] text-[#323232]">
          <button
            className="flex items-center text-[#000] font-[600]"
            onClick={() => setDropdown6(!dropdown6)}
          >
            {dropdown6 ? (
              <ChevronUpIcon className="w-[20px] h-[20px] mr-2" />
            ) : (
              <ChevronDownIcon className="mr-2 w-[20px] h-[20px]" />
            )}
            ¿Cuál es el Horario de atención a clientes?
          </button>
          <div className="ml-8">
            <Animation open={dropdown6} setOpen={() => {}}>
              <div className="my-4 text-[#777777]">
                <div className="">
                  De Lunes a Viernes de 8:30 am a 6:30 pm en días hábiles.
                </div>
              </div>
            </Animation>
          </div>
        </div>
        <div className="py-4 text-[18px] border-b border-[#EBEBEB] text-[#323232]">
          <button
            className="flex items-center text-[#000] font-[600]"
            onClick={() => setDropdown7(!dropdown7)}
          >
            {dropdown7 ? (
              <ChevronUpIcon className="w-[20px] h-[20px] mr-2" />
            ) : (
              <ChevronDownIcon className="mr-2 w-[20px] h-[20px]" />
            )}
            ¿Qué pasa si aún no recibo mi compra?
          </button>
          <div className="ml-8">
            <Animation open={dropdown7} setOpen={() => {}}>
              <div className="my-4 text-[#777777]">
                <div className="mb-4">
                  Si han transcurrido los días establecidos de acuerdo con
                  nuestras políticas de tiempo de entrega y tu orden aún no ha
                  sido entregada puedes comunicarte con uno de nuestros agentes
                  de atención a clientes en un horario de lunes a viernes de
                  8:30 a 18:30 hrs en días hábiles.
                </div>
                <div className="mb-4">
                  Para Interior de la República Mexicana 800 560 4746
                </div>
                <div className="">
                  CDMX y Área Metropolitana: 55 57 47 22 44
                </div>
              </div>
            </Animation>
          </div>
        </div>
        <div className="py-4 text-[18px] border-b border-[#EBEBEB] text-[#323232]">
          <button
            className="flex items-center text-[#000] font-[600]"
            onClick={() => setDropdown8(!dropdown8)}
          >
            {dropdown8 ? (
              <ChevronUpIcon className="w-[20px] h-[20px] mr-2" />
            ) : (
              <ChevronDownIcon className="mr-2 w-[20px] h-[20px]" />
            )}
            ¿Es seguro comprar en Sanimex.com.mx?
          </button>
          <div className="ml-8">
            <Animation open={dropdown8} setOpen={() => {}}>
              <div className="my-4 text-[#777777]">
                <div className="mb-4">
                  Somos una empresa 100% mexicana, tenemos más de 45 años
                  dedicada a la comercialización de pisos, azulejos, sanitarios,
                  grifería, adhesivos, tinas, muebles y accesorios para baño
                  estamos comprometidos a ofrecerte la mayor calidad,
                  garantizando que tu compra en línea es completamente segura.
                </div>
                <div className="">
                  Queremos que te sientas completamente seguro cuando compras en
                  Sanimex.com.mx por ese motivo te comunicamos que utilizamos
                  tecnología llamada “Secure Socket Layer” (SSL) que encripta (o
                  codifica) información sensible antes de que ésta sea enviada a
                  través de internet.
                </div>
              </div>
            </Animation>
          </div>
        </div>
        <div className="py-4 text-[18px] border-b border-[#EBEBEB] text-[#323232]">
          <button
            className="flex items-center text-[#000] font-[600]"
            onClick={() => setDropdown9(!dropdown9)}
          >
            {dropdown9 ? (
              <ChevronUpIcon className="w-[20px] h-[20px] mr-2" />
            ) : (
              <ChevronDownIcon className="mr-2 w-[20px] h-[20px]" />
            )}
            ¿Es necesario registrarme en la página para comprar en línea?
          </button>
          <div className="ml-8">
            <Animation open={dropdown9} setOpen={() => {}}>
              <div className="my-4 text-[#777777]">
                <div className="">
                  No es necesario, puedes realizar tu compra como invitado, solo
                  debes llenar los campos de envío y facturación en caso de que
                  lo requieras.
                </div>
              </div>
            </Animation>
          </div>
        </div>
        <div className="py-4 text-[18px] border-b border-[#EBEBEB] text-[#323232]">
          <button
            className="flex items-center text-[#000] font-[600]"
            onClick={() => setDropdown10(!dropdown10)}
          >
            {dropdown10 ? (
              <ChevronUpIcon className="w-[20px] h-[20px] mr-2" />
            ) : (
              <ChevronDownIcon className="mr-2 w-[20px] h-[20px]" />
            )}
            ¿Puedo encontrar los mismos productos que en tienda física?
          </button>
          <div className="ml-8">
            <Animation open={dropdown10} setOpen={() => {}}>
              <div className="my-4 text-[#777777]">
                <div className="">
                  Sí, sin embargo, las promociones publicadas en nuestro sitio
                  son exclusivas sólo para compras en línea, al igual que el
                  precio con el que aparecen publicadas y están sujetas a
                  disponibilidad, además de que en línea tenemos un gran surtido
                  que complementa el de nuestras tiendas.
                </div>
              </div>
            </Animation>
          </div>
        </div>
        <div className="py-4 text-[18px] border-b border-[#EBEBEB] text-[#323232]">
          <button
            className="flex items-center text-[#000] font-[600]"
            onClick={() => setDropdown11(!dropdown11)}
          >
            {dropdown11 ? (
              <ChevronUpIcon className="w-[20px] h-[20px] mr-2" />
            ) : (
              <ChevronDownIcon className="mr-2 w-[20px] h-[20px]" />
            )}
            ¿Cuentan con meses sin intereses?
          </button>
          <div className="ml-8">
            <Animation open={dropdown11} setOpen={() => {}}>
              <div className="my-4 text-[#777777]">
                <div className="">
                  Se cuentan cuando existe alguna promoción de por medio, es
                  importante estar pendiente en nuestra página, así como en
                  nuestras redes oficiales, donde nos puedes encontrar como
                  Sanimex en Facebook y Sanimex.Oficial en Instagram.
                </div>
              </div>
            </Animation>
          </div>
        </div>
        <div className="py-4 text-[18px] border-b border-[#EBEBEB] text-[#323232]">
          <button
            className="flex items-center text-[#000] font-[600]"
            onClick={() => setDropdown12(!dropdown12)}
          >
            {dropdown12 ? (
              <ChevronUpIcon className="w-[20px] h-[20px] mr-2" />
            ) : (
              <ChevronDownIcon className="mr-2 w-[20px] h-[20px]" />
            )}
            No encuentro el producto que quiero comprar en la página
          </button>
          <div className="ml-8">
            <Animation open={dropdown12} setOpen={() => {}}>
              <div className="my-4 text-[#777777]">
                <div className="mb-4">
                  Trabajamos continuamente para tener disponibilidad, sin
                  embargo, puede que algún producto caiga en agotado por la alta
                  rotación, en caso presentar otro inconveniente en la página
                  por favor comunícate con nuestra área de soporte de atención a
                  clientes.
                </div>
                <div className="mb-4">
                  Para Interior de la República Mexicana 800 560 4746
                </div>
                <div className="">
                  CDMX y Área Metropolitana: 55 57 47 22 44
                </div>
              </div>
            </Animation>
          </div>
        </div>
        <div className="py-4 text-[18px] border-b border-[#EBEBEB] text-[#323232]">
          <button
            className="flex items-center text-[#000] font-[600]"
            onClick={() => setDropdown13(!dropdown13)}
          >
            {dropdown13 ? (
              <ChevronUpIcon className="w-[20px] h-[20px] mr-2" />
            ) : (
              <ChevronDownIcon className="mr-2 w-[20px] h-[20px]" />
            )}
            Realice mi compra en la página y el mail de confirmación no llega
          </button>
          <div className="ml-8">
            <Animation open={dropdown13} setOpen={() => {}}>
              <div className="my-4 text-[#777777]">
                <div className="">
                  Los pagos en línea tardan en reflejarse en nuestro sistema de
                  48 a 72 horas, en ese momento recibirás tu correo de
                  confirmación. ¡Gracias por tu compra!
                </div>
              </div>
            </Animation>
          </div>
        </div>
        <div className="py-4 text-[18px] border-b border-[#EBEBEB] text-[#323232]">
          <button
            className="flex items-center text-[#000] font-[600]"
            onClick={() => setDropdown15(!dropdown15)}
          >
            {dropdown13 ? (
              <ChevronUpIcon className="w-[20px] h-[20px] mr-2" />
            ) : (
              <ChevronDownIcon className="mr-2 w-[20px] h-[20px]" />
            )}
            Compré productos de prueba o con precio menor a $1.00
          </button>
          <div className="ml-8">
            <Animation open={dropdown15} setOpen={() => {}}>
              <div className="my-4 text-[#777777]">
                <div className="">
                  En caso de que un producto se muestre erróneamente con un
                  precio menor a $1.00 peso, o en su defecto aparezca la leyenda
                  {'“'}prueba{'”'}; Esta situación se considerará un error de
                  sistema. Sanimex se reserva el derecho de cancelar cualquier
                  orden que incluya dicho producto y se contactará al cliente
                  para informarle sobre el error. El cliente tendrá la opción de
                  adquirir el producto al precio correcto o cancelar la orden.
                  No nos hacemos responsables por pérdidas o inconvenientes
                  causados por este error.
                </div>
              </div>
            </Animation>
          </div>
        </div>
      </Container>
    </RootLayout>
  );
};

export default FrecuentQuestion;
