import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// import ImageWithFallback from '@/utils/ImageWithFallback';
// import promocion_1 from '@/images/Promocion_Sanitarios_Corona_Sanimex.webp';
// import Herramienta_1s from '@/images/promoPerdura.png';
// import promo_ms from '@/images/banner-promo-msi-mayo-2023.webp';
// import participaFacil from '@/images/Ganadores.jpg';
// import Link from 'next/link';
// const DownloadPdF = dynamic(() => import('@/components/utils/DownloadPdf'));

const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));
const Container = dynamic(() => import('@/components/utils/Container'));
const ShopConditions: React.FC = () => {
  const router = useRouter();
  return (
    <RootLayout>
      <StaticMeta
        title={'Sanimex - Condiciones en tienda'}
        description={'Sanimex - Condiciones en tienda'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <div className="relative h-[200px] md:h-[340px] bg-cover bg-no-repeat bg-center bg-[url('../images/condiciones_tienda.jpg')]">
        <Container classes="w-full h-full  flex items-end">
          <div className="uppercase font-Century-Gothic text-[30px] leading-[30px] md:leading-[54px] md:text-[54px] text-white font-bold">
            Condiciones en tienda
          </div>
        </Container>
      </div>
      <Container classes="sm:px-8 mb-[50px]">
        <div>
          {/** 
          <DownloadPdF />
        </div>

        <div className="grid grid-cols-12 lg:gap-4 mt-8 text-[#777777]">
          <div className="col-span-12">
            <div className="mb-4 text-black text-[24px]">
              <strong>Estimado Cliente ¡Gracias por llegar hasta aquí!</strong>
            </div>
            <div className="mb-4">
              En esta sección podrá encontrar la información detallada de
              nuestras promociones en punto de venta; es decir, qué productos
              son válidos, vigencias, condiciones de compra, cobertura, etc.
            </div>
          </div>
          <div className="col-span-12">
            <p className="h-[30px] text-[21px] bg-[#1e73be] text-white font-bold flex items-center px-4 ">
              Promoción para cliente final:
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="mb-4">
              ¡Celebremos juntos! Arma la casa de tus sueños
            </div>
            <div className="flex justify-start">
              <Link   href={'50-aniversario'} className="">
                <div className=" relative w-[240px] md:w-[360px] lg:w-[350px] h-[240px] md:h-[360px] lg:h-[350px]">
                  <ImageWithFallback
                    fill
                    style={{
                      objectFit: 'contain',
                    }}
                    src={participaFacil}
                    alt={'promocio'}
                  />
                </div>
              </Link>
            </div>
            <div className="py-4">
              Descubre a nuestros ganadores de “La casa de tus sueños” en{' '}
              <Link
                target="blank"
                className="underline"
                href={'50-aniversario'}
              >
                https://sanimex.com.mx/50-aniversario
              </Link>
              {`".`}
            </div>
            <div className="py-4">
              Consulta términos y condiciones en:{' '}
              <Link
                target="blank"
                className="underline"
                href={'terminos-y-condiciones'}
              >
                https://sanimex.com.mx/terminos-y-condiciones
              </Link>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="relative h-[240px] md:h-[360px] lg:h-[350px]"></div>
          </div>
          <div className="col-span-12">
            <div className="mt-4 h-[30px] text-[21px] bg-[#1e73be] text-white font-bold flex items-center px-4 mb-4">
              Promoción MSI
            </div>
            <div className="text-black mb-8">
              ¡Queremos que tu proyecto no se detenga por ninguna razón! Por
              ello durante diciembre tendremos Meses sin intereses, ¡Visítanos
              cuanto antes y elige la mejor opción para ti!
            </div>
          </div>
          <div className=" col-span-12 lg:col-span-7">
           <p className="mb-4 text-black">
              <strong className="text-[22px]">
                Promoción Meses sin intereses – Tienda física:{' '}
              </strong>
            </p>
            <div className="font-bold mb-4">
              Meses sin intereses + Descuento
            </div>
            <ul className="list-disc list-inside mb-4 flex flex-col space-y-4">
              <li>Compras mínimas a partir de $3,500 pesos.</li>
              <li>Aplica Descuento + 3 o 6 Meses Sin Interese</li>
              <li>Vigencia: Del 1 al 31 de diciembre</li>
            </ul>
            <div className="mb-4">
              Tarjetas participantes: Banorte y Bancomer BBVA Consorcio Banorte
              (Banorte, HSBC, Inbursa, Santander, Scotiabank, Falabella Soriana,
              Afirme, BanBajío, Banca Mifel, Banjercito, BanRegio, Liverpool
              Visa, Ixe, Multiva, Invex, Banco Azteca, Konfío, RappiCard).
            </div>
            <div className="mb-6">
              Aplica únicamente para compras en tienda física y compras en
              Ecommerce.
            </div>

            <p className="mb-4 text-black">
              <strong className="text-[22px]">
                Promoción 3 Meses sin intereses – compras en tienda física{' '}
              </strong>
            </p>
            <ul className="mb-4 list-disc list-inside flex flex-col space-y-4">
              <li>Compras mínimas a partir de $3,500 pesos.</li>
              <li>
                Solo participan tarjetas, Banorte y consorcio.
              </li>
              <li>Del 1 al 31 de Diciembre del 2023.</li>
            </ul>
            <div className="mb-4">
              Consorcio Banorte (Banorte, HSBC, Inbursa, Santander, Scotiabank,
              Falabella Soriana, Afirme, BanBajío, Banca Mifel, Banjercito,
              BanRegio, Liverpool Visa, Ixe, Multiva, Invex, Banco Azteca,
              Konfío, RappiCard).
            </div>
          <div className="mb-4 font-bold">
              Promoción: Descuento y 3 o 6 meses sin intereses.
            </div>
            <ul className="mb-4 list-disc list-inside flex flex-col space-y-4">
              <li>Compras minimas a partir de $3500 pesos.</li>
              <li>
                Solo participan tarjetas, Banorte y consorcio.
              </li>
              <li>Vigencia: Del 1 al 31 diciembre del 2023.</li>
            </ul>

            <div className="mb-4 font-bold">Promoción: Ecommerce.</div>
            <ul className="mb-4 list-disc list-inside flex flex-col space-y-4">
              <li>Compras minimas a partir de $6000 pesos.</li>
              <li>Vigencia: Del 1 al 31 diciembre del 2023.</li>
              <li>
                {' '}
                Sólo participan tarjetas, Banorte y consorcio.
              </li>
            </ul>

            <div className="mb-4">
              Consorcio Banorte (Banorte, HSBC, Inbursa, Santander, Scotiabank, Falabella Soriana, Afirme, BanBajío, Banca Mifel, Banjercito,
              BanRegio, Liverpool Visa, Ixe, Multiva, Invex, Banco Azteca, Konfío, RappiCard).
            </div> 

            <p className="mb-4 text-black text-[22px]">
              <strong>
                Promoción 3 Meses sin intereses – compras en línea:
              </strong>
            </p>
           <div className="mb-4">DESCUENTO Ó 3 MESES SIN INTERESES</div> 
            <ul className="mb-4 list-disc list-inside flex flex-col space-y-4">
              <li>Compras mínimas a partir de $6,000 pesos.</li>
              <li>Vigencia: Del 1 al 31 de Diciembre del 2023.</li>
              <li>
                Solo participan tarjetas, Banorte y consorcio.
              </li>
            </ul>
            <div className="mb-4">
              Consorcio Banorte (Banorte, HSBC, Inbursa, Santander, Scotiabank,
              Falabella Soriana, Afirme, BanBajío, Banca Mifel, Banjercito,
              BanRegio, Liverpool Visa, Ixe, Multiva, Invex, Banco Azteca,
              Konfío, RappiCard).
            </div>
           <div className="mb-4">
              Aplica para compras en línea en el sitio oficial{' '}
              <a
                href="https://sanimex.com.mx/"
                className="text-[#0000ff] underline"
              >
                https://sanimex.com.mx/
              </a>
            </div> 
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="relative h-[240px] md:h-[360px] lg:h-[350px]">
              <ImageWithFallback
                fill
                style={{
                  objectFit: 'contain',
                }}
                src={promo_ms}
                alt={'promocio'}
                className="bg-white"
              />
            </div>
          </div>
          <div className="col-span-12"></div>

         <div className="col-span-12 lg:col-span-7">
            <div className="h-[30px] text-[21px] bg-[#1e73be] text-white font-bold flex items-center px-4 mb-4">
              Promociones Corona
            </div>
            <div className="my-4 font-bold">Promocion:</div>
            <div className="mb-2">
              <p>
                - Eco Vienna a un precio de $1,999 (tiene 25% de descuento, eñ
                precio full es de $2,666)
              </p>
              <p>
                - One Peace con hasta 20% de descuento en modelos seleccionados.
              </p>
            </div>
            <p className="mb-2">
              <strong>Promoción:</strong>
            </p>

            <p className="mb-2">Modelos con promoción durante diciembre 2023:</p>
            <p className="mb-2">
              L01-07-5-43 One Piece Urban Blanco 25% de descuento
            </p>
            <p className="mb-2">
              L01-07-5-44 One Piece Urban Hueso 25% de descuento
            </p>

            <p className="mb-2">
              L01-50-6-53 Sanitario Smart blanco 25% de descuento{' '}
            </p>
            <p className="mb-2">
              L01-50-6-56 Sanitario Smart hueso 25% de descuento{' '}
            </p>
            <p className="mb-2">
              L01-00-5-101 One Piece Oporto Blanco 25% de descuento{' '}
            </p>
            <p className="mb-4">
              L01-00-5-76 One Piece Fussion 15% de descuento{' '}
            </p>
            <p className="mb-4">
              L01-50-6-54 One Piece Montecarlo EL Blanco 25% de descuento{' '}
            </p>
            <p className="mb-4">
              L01-50-6-55 One Piece Montecarlo El Hueso 25% de descuento{' '}
            </p>
            <p>
              Válido del 1 al 31 de diciembre de 2023. Sujeto a disponibilidad de
              tienda y existencias en sucursal, consulta directo con tu asesor
              en tienda.
            </p>

            <div className="mt-2">
              <p>**Descuento en artículos seleccionados.</p>
              <p>fotogtafías Ilustrativas</p>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="relative h-[240px] md:h-[360px] lg:h-[350px]">
              <ImageWithFallback
                fill
                style={{
                  objectFit: 'cover',
                }}
                src={promocion_1}
                alt={'promocio'}
                className="bg-white"
              />
            </div>
          </div> */}
          {/** <div className="col-span-12 lg:col-span-7">
            <div className="mt-4 h-[30px] text-[21px] bg-[#1e73be] text-white font-bold flex items-center px-4 mb-4">
              Promoción Perdura
            </div>
            <div className="mb-4 text-black text-[24px]">
              <strong>Promoción Perdura</strong>
            </div>
            <div className="mb-4">
              1.- PRODUCTOS PARTICIPANTES: Adhesivos de la marca Porcelanite,
              Pegabum y Perdura (cualquiera de sus variantes).
            </div>
            <div className="mb-4">
              <strong className="mr-2">Regalo:</strong> hasta 1,500 juegos de
              contenedores, un juego de 5 contenedores.
            </div>
            <div>
              <table className="table-auto mx-auto mb-4">
                <thead>
                  <tr>
                    <th className="border border-black">Articulos Ap(C40)</th>
                    <th className="border border-black">
                      DESCRIPCION ARTICULO (C40)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black">V01-10-0-22</td>
                    <td className="border border-black">TOPPERS PLASTICOS</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mb-4">2.-MECÁNICA DE LA PROMOCIÓN</div>
            <div className="mb-4">
              Al realizar una compra de $1,000 o más en adhesivos de las marcas
              participantes PERDURA, PEGABUM Y PORCELANITE se entregará un
              paquete de Contenedores plásticos y se deberá reflejar en el
              ticket el código V01-10-0-22, lo que significa que el cliente se
              hace acreedor a un regalo.
            </div>

            <div className="uppercase mb-4">Entrega de regalo</div>
            <div className="mb-12">
              La entrega será inmediata en cualquiera de las sucursales
              participantes, una vez que el cliente haya cumplido por completo
              con los requisitos de la mecánica.
            </div>

            <div className="mb-4 mt-8">3.-CONDICIONES Y RESDTRICCIONES</div>
            <ul className="list-disc list-inside flex flex-col space-y-4 mb-4">
              <li>Válido a un PREMIO por cliente.</li>
              <li>Los tickets no serán acumulables.</li>
              <li>Limitado a 3066 CAJA DE HERRAMIENTAS PLASTICA.</li>
              <li>
                El ticket de compra deberá amparar la compra de $1000 pesos en
                adhesivos participantes de las marcas PERDURA, PEGABUM Y
                PORCELANITE. No participan productos ajenos a los mencionados.
              </li>
              <li>
                En caso de que el cliente quiera cancelar la compra deberá
                entregar el regalo.
              </li>
              <li>
                Los regalos no se pueden enviar a Ruta, en cuanto se le imprima
                el ticket al cliente se le debe entregar, independientemente si
                el material adquirido va a ruta.
              </li>
            </ul>
            <div>
              Más información en: Visitar -{' '}
              <Link
                className="underline"
                href={'https://www.promocionesperdura.com.mx/'}
                target="_blank"
              >
                https://www.promocionesperdura.com.mx/
              </Link>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="grid">
              <div className="relative h-[500px]">
                <ImageWithFallback
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                  src={Herramienta_1s}
                  alt={'promocio'}
                  className="bg-white"
                />
              </div>
             <div className="grid py-2 grid-cols-12 border-b border-[#777777]">
                <div className="col-span-5">ARITUCULOS (C40)</div>
                <div className="col-span-7">DESCRIPCION ARTICULO (C40)</div>
              </div>
              <div className="grid py-2 grid-cols-12 border-b border-[#777777]">
                <div className="col-span-5">V01-10-0-21</div>
                <div className="col-span-7">CAJA DE HERRAMIENTAS PLASTICA</div>
              </div>
              <div className="my-8">
                Conslta existencias{' '}
                <a href="" className="text-[#0000ff] underline">
                  aquí
                </a>
              </div> 
            </div>
          </div>*/}
        </div>
      </Container>
    </RootLayout>
  );
};

export default ShopConditions;
