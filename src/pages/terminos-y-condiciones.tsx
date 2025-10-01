import dynamic from 'next/dynamic';
import promo_ms from '@/images/banner-promo-msi-mayo-2025.png';
import promo_verano from '@/images/promocion-verano-vajillas-corona.jpg';
import React from 'react';
import { useRouter } from 'next/router';

const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));
const Container = dynamic(() => import('@/components/utils/Container'));
const DownloadPdF = dynamic(() => import('@/components/utils/DownloadPdf'));
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));

const TerminosCondiciones: React.FC = () => {
  const router = useRouter();

  return (
    <RootLayout>
      <StaticMeta
        title={'Términos y condiciones'}
        description={'Términos y condiciones'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <div className="font-Century-Gothic bg-cover bg-no-repeat bg-center bg-[url('../images/banner-terminos-condi.webp')] h-[200px] lg:h-[400px] w-full">
        <Container classes="w-full h-full  flex items-end">
          <div className=" text-[30px] leading-[30px] md:leading-[64px] md:text-[64px] text-white font-bold">
            Términos y Condiciones
          </div>
        </Container>
      </div>

      <Container classes="sm:px-8 mb-[50px] text-justify">
        <div className="grid grid-cols-12 lg:gap-4 mt-8 text-[#777777]">
          {/* Entrega a Domicilio*/}
          <div className="col-span-12 ">
            <div className="text-[#777777] pt-4 pb-8">
              <div className="mb-4">
                En caso de que un producto se muestre erróneamente con un precio
                menor a $1.00 peso, o en su defecto aparezca la leyenda
                “prueba”; Esta situación se considerará un error de sistema.
                Sanimex se reserva el derecho de cancelar cualquier orden que
                incluya dicho producto y se contactará al cliente para
                informarle sobre el error. El cliente tendrá la opción de
                adquirir el producto al precio correcto o cancelar la orden. No
                nos hacemos responsables por pérdidas o inconvenientes causados
                por este error.
              </div>              
              <div className="text-[#777777] mb-8">
                <div className=" font-[600] mb-8 uppercase">
                  Información de productos y precios
                </div>
                <div className="mb-4">
                  Nos esforzamos por mantener la información de los productos,
                  incluyendo precios, descripciones y disponibilidad, lo más
                  precisa y actualizada posible. Sin embargo, pueden presentarse
                  errores involuntarios.
                </div>
                <div className="mx-6">
                  <ol className="list-decimal space-y-4 ">
                    <li>
                      <div className="font-[600]">Errores en precios</div>
                      <div className="mt-2">
                        En caso de que un producto se publique con un precio
                        incorrecto debido a un error tipográfico, técnico o de
                        sistema, nos reservamos el derecho de cancelar cualquier
                        pedido realizado con dicho precio incorrecto, incluso si
                        el pedido ya ha sido confirmado y/o el pago ha sido
                        procesado.
                      </div>
                      <div className="mt-2">
                        Si el pago ya fue realizado, se reembolsará la cantidad
                        total pagada una vez que el cliente envíe la
                        documentación solicitada.
                      </div>
                    </li>
                    <li>
                      <div className="font-[600]">
                        {' '}
                        Disponibilidad de productos
                      </div>
                      <div className="mt-2">
                        Todos los productos están sujetos a disponibilidad. Si
                        después de realizar una compra se detecta que el
                        producto no está disponible en inventario, el cliente
                        será notificado lo antes posible. En este caso, nos
                        reservamos el derecho de cancelar el pedido y proceder
                        con el reembolso total de la cantidad pagada, sin que
                        esto genere obligaciones adicionales para el sitio.
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
              <div className="text-[#777777]">
                <div className=" font-[600] mb-8 uppercase">
                  Confirmación de pedidos
                </div>
                <div className="mb-4">
                  Una vez realizado el pedido, el cliente recibirá una
                  confirmación por correo electrónico. Sin embargo, esta
                  confirmación no implica la aceptación final del pedido, ya que
                  está sujeta a validación de disponibilidad de productos,
                  verificación de precios y aprobación del pago.
                </div>
              </div>
              <div className="text-[#777777]">
                <div className=" font-[600] mb-8 uppercase">
                  Modificaciones y cancelaciones
                </div>
                <div className="mb-4">
                  Nos reservamos el derecho de modificar o cancelar pedidos por
                  razones justificadas incluyendo, pero no limitadas a: errores
                  en precios, falta de disponibilidad, problemas logísticos o
                  detección de posibles fraudes.
                </div>
              </div>
              <div className="text-[#777777] mb-8">
                <div className=" font-[600] mb-8 uppercase">Contacto</div>
                <div className="mb-2">
                  Para cualquier duda o aclaración sobre tu pedido, puedes
                  contactarnos por estos medios:
                </div>
                <div className="mb-2">
                  <span className="font-[600]">Correo:</span>{' '}
                  <a href="mailto:atencionaclientes@sanimex.com.mx" target="_blank">
                    atencionaclientes@sanimex.com.mx
                  </a>
                </div>
                <div className="mb-2">
                  <span className="font-[600]">Teléfono fijo:</span>{' '}
                  <a href="tel:8005604746" target="_blank">
                    800 560 4746
                  </a>
                </div>
                <div className="">
                  <span className="font-[600]">WhatsApp:</span>{' '}
                  <a href="https://wa.me/525581353955" target="_blank">
                    55 81 35 39 55
                  </a>
                </div>
              </div>
              <div className="mb-8">
                <div className=" font-[600] mb-8 ">
                  CONDICIONES DE LA ENTREGA A DOMICILIO
                </div>
                <div className="mx-6">
                  <ol className="list-decimal space-y-4 ">
                    <li>
                      <div>
                        No se entregará mercancía en la vía pública ni en las
                        calles de estacionamiento prohibido, el Cliente deberá
                        proporcionar las facilidades viales necesarias.
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="mb-4">
                          La empresa entregará exclusivamente mercancía:
                        </div>
                        <ul className="list-disc ml-4 space-y-4">
                          <li>a{')'} Planta baja</li>
                          <li>b{')'} Pie de carro</li>
                          <li>c{')'} Pie de obra</li>
                          <li>
                            d{')'} No se acomodarán a una distancia mayor de 25
                            metros de nuestro vehículo de reparto
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div>
                        Una vez que el cliente reciba y acepte el pedido no se
                        aceptarán cambios ni devoluciones de ningún tipo.
                      </div>
                    </li>
                    <li>
                      <div>
                        El material será entregado a solicitud del cliente
                        conforme al programa de entregas que le dará a conocer
                        el Asesor de Ventas, en horario abierto.
                      </div>
                    </li>
                    <li>
                      <div>
                        En caso de no encontrar al cliente en su domicilio,
                        nuestro operador sólo esperará hasta 15 minutos, después
                        de este tiempo dejará un aviso de visita para que el
                        cliente se comunique con su Asesor de Ventas y
                        reprogramar su entrega 48 horas después, la cual tendrá
                        un costo extra.
                      </div>
                    </li>
                    <li>
                      <div>
                        Al momento de entregar la mercancía el Cliente deberá
                        presentar su Ticket de Compra impreso, así como los
                        complementos de pago que haya realizado para firmar de
                        recibido. Deberá pagar en el momento de la entrega el
                        importe por cobrar que estipule la bitácora vehicular,
                        antes de iniciar la descarga de la mercancía.
                      </div>
                    </li>
                    <li>
                      <div>
                        En caso de que el pedido llegue incompleto, roto o con
                        algún defecto que no concuerde con la factura/ticket, es
                        indispensable que el cliente anote el detalle en la
                        remisión que lleva el Chofer, para que sea repuesto
                        posteriormente a las 72 horas. En caso contrario no
                        procederá ningún cambio o reposición.
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="mb-4">
                          A partir de la fecha que se realiza la compra no se
                          podrá tener almacenada la mercancía por más de 30
                          días, cumplido este plazo, la Empresa no se compromete
                          a:
                        </div>
                        <ul className="list-disc ml-4 space-y-4">
                          <li>
                            a{')'} Respetar la existencia y buen estado del
                            producto.
                          </li>
                          <li>b{')'} Respetar el precio, tono y calibres.</li>
                          <li>c{')'} Respetar saldos a favor.</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div>
                        En caso de cancelación de la venta por causas imputables
                        al Cliente se hará un cargo del 20% del valor total de
                        la factura por manejo administrativo.
                      </div>
                    </li>
                    <li>
                      <div>
                        No se aceptan devoluciones, ni cambios cuando el Cliente
                        recoja por sus propios medios la mercancía, aplica para
                        todas las marcas y productos.
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
              <div className="text-[#777777] mb-8">
                <div className=" font-[600] mb-8 uppercase">
                  Métodos de pago
                </div>
                <div className="mx-6">
                  <ol className="list-decimal space-y-4 ">
                    <li>
                      <div>
                        Pasarela de pago directamente en sitio web. {'('}
                        Tarjetas de crédito: Visa, Mastercard y American Express
                        {')'}.
                      </div>
                    </li>
                    <li>
                      <div>
                        <div>Liga de pago.</div>
                      </div>
                    </li>
                    <li>
                      <div>Transferencia electrónica.</div>
                    </li>
                    <li>
                      <div>Depósito en ventanilla.</div>
                    </li>
                  </ol>
                </div>
              </div>
              <div className="text-[#777777] mb-8">
                <div className=" font-[600] mb-8 uppercase">Reembolsos</div>
                <div className="mb-4">
                  Para gestionar un reembolso se requiere enviar la siguiente
                  documentación en .PDF al correo de atención a clientes{' '}
                  <a href="mailto:atencionaclientes@sanimex.com.mx" target="blank" className="underline">
                    atencionaclientes@sanimex.com.mx
                  </a>.
                </div>
                <div className="mb-4 font-[600]">
                  Pagos con: Tarjeta de débito, transferencia bancaria y liga de
                  pago.
                </div>
                <div className="mx-6 mb-4">
                  <ol className="list-decimal space-y-4 ">
                    <li>
                      <div>INE por ambos lados.</div>
                    </li>
                    <li>
                      <div>
                        <div>
                          Carta firmada indicando el motivo de la devolución.
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        Portada de estado de cuenta donde sea visible la CLABE
                        para realizar la transferencia.
                      </div>
                    </li>
                    <li>
                      <div>
                        Estado de cuenta don se aprecié el cargo realizando por
                        la compra.
                      </div>
                    </li>
                  </ol>
                </div>
                <div className="mb-4 font-[600]">
                  Pagos con: Tarjeta de crédito.
                </div>
                <div className="mx-6 mb-4">
                  <ol className="list-decimal space-y-4 ">
                    <li>
                      <div>INE por ambos lados.</div>
                    </li>
                    <li>
                      <div>
                        <div>
                          Carta firmada indicando el motivo de la devolución.
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        Portada de estado de cuenta de tarjeta de débito para
                        que se efectúe el reembolso en esta cuenta.
                      </div>
                    </li>
                    <li>
                      <div>
                        Estado de cuenta donde se aprecié el cargo realizando
                        por la compra.
                      </div>
                    </li>
                  </ol>
                </div>
                <div>
                  El tiempo aproximado de reembolso es de 15 días hábiles.
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <DownloadPdF />
            </div>
          </div>
          {/* Entrega a Domicilio */}

          {/*Gracias por llegar aquí */}
          <div className="col-span-12">
            <div className="mb-4 text-black text-[24px]">
              <strong>Estimado Cliente ¡Gracias por llegar hasta aquí!</strong>
            </div>
            <div className="mb-4">
              Estimado Cliente ¡Gracias por llegar hasta aquí! En esta sección
              podrá encontrar la información detallada de nuestras promociones
              en punto de venta; es decir, qué productos son válidos, vigencias,
              condiciones de compra, cobertura, etc.
            </div>
          </div>
          {/*Gracias por llegar aquí */}

          {/* Promocion Agosto 2025  */}
          <div className="col-span-12">
            <div className="mt-4 h-[60px] md:h-[30px] lg:h-[30px] text-[21px] bg-[#1e73be] text-white font-bold flex items-center px-4 mb-4">
              Promoción Verano – Vajillas Corona
            </div>
          </div>
          <div className=" col-span-12 lg:col-span-7">
            <p className="mb-4 text-black">
              <strong className="text-[22px]">
                Vigencia: 1º al 31 de agosto de 2025 | Hasta agotar existencias.
                <br />
                <span className="text-[#1e73be]">
                  Sucursales participantes: Santa Clara 1, Aragón 1, Coacalco, Chalco 1,
                  Zumpango 1 y 2, Izcalli, Los Reyes, Santa Clara 3, Chiconautla, Juárez 
                  y Bernardo Reyes.
                </span>
              </strong>
            </p>
            <p className="mb-4 text-black"><strong>Mecánica:</strong></p>
            <ul className="mb-4 list-disc list-inside flex flex-col space-y-4">
              <li>
                Por cada ticket que alcance los rangos establecidos, el cliente final recibirá una vajilla de regalo.
              </li>
              <li>
                Los montos válidos para participar incluyen IVA (precio de venta al público).
              </li>
              <li>
                Promoción válida únicamente para productos de la marca <strong>Corona</strong>. <i>Quedan excluidos los productos Ambiance</i>.
              </li>
              <li>
                Se podrá otorgar <strong>un solo juego de vajilla por ticket</strong>.
              </li>
              <li>
                Es indispensable que la vajilla se incluya en el ticket de compra del cliente con los códigos correspondientes, 
                ya que esto servirá como validación para la entrega del premio.
              </li>
            </ul>
            <p className="mb-4 text-black"><strong>Limitado a:</strong></p>
            <ul className="mb-4 list-disc list-inside flex flex-col space-y-4">
              <li>
                Por cada ticket que alcance los rangos establecidos, el cliente final recibirá una vajilla de regalo.
              </li>
              <li>
                200 piezas para modelos Ashley y Antonella.
              </li>
              <li>
                50 piezas para modelo Constela.
              </li>
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="relative h-[400px] md:h-[900px] lg:h-[900px] pt-4">
              <ImageWithFallback
                fill
                style={{
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                }}
                src={promo_verano}
                alt={'promocion verano'}
                className="bg-white"
              />
            </div>
          </div>          
          <div className="col-span-12">
            <div className="mt-4 h-[30px] text-[21px] bg-[#1e73be] text-white font-bold flex items-center px-4 mb-4">
              Promociones MSI
            </div>
            <div className=" mb-2">
              ¡Queremos que tu proyecto no se detenga por ninguna razón! Por
              ello durante este mes tendremos Meses sin intereses, ¡Visítanos
              cuanto antes y elige la mejor opción para ti!
            </div>
          </div>
          <div className=" col-span-12 lg:col-span-7">
            <p className="mb-4 text-black">
              <strong className="text-[22px]">
                Meses sin intereses en punto de venta.
                <br />
                <span className="text-[#1e73be]">
                  Descuento + 3 Meses sin intereses
                </span>
              </strong>
            </p>
            <ul className="mb-4 list-disc list-inside flex flex-col space-y-4">
              <li>
                <strong>Mínimo de compra en tiendas:</strong> $3,500.
              </li>
              <li>
                <strong> Tarjetas participantes:</strong> Banamex
                y Banorte
              </li>
              <li>
                Consorcio Banorte, que incluye: Afirme, Banco Azteca, BanBajío,
                Banjercito, BanRegio, Banorte, Falabella Soriana, Inbursa, Invex, Konfío,
                Liverpool Visa, Mifel, Multiva, NanoPay, RappiCard, Santander y Scotiabank.
              </li>
              <li>
                <strong>Vigencia:</strong> 01 al 30 de septiembre de 2025.
              </li>
            </ul>
            <p className="mb-4 text-black">
              <strong className="text-[22px]">
                Meses sin intereses Tienda en línea.
                <br />
                <span className="text-[#1e73be]">
                  Descuento + 3 Meses Sin Intereses
                </span>
              </strong>
            </p>
            <ul className="mb-4 list-disc list-inside flex flex-col space-y-4">
              <li>
                <strong>Mínimo de compra en tienda en línea:</strong> $6,000
              </li>
              <li>
                <strong> Tarjetas participantes:</strong> Banorte
              </li>
              <li>
                Consorcio Banorte (Afirme, Banco Azteca, BanBajío, Banjercito,
                BanRegio, Banorte, Falabella Soriana, Inbursa, Invex, Konfío,
                Liverpool Visa, Mifel, Multiva, NanoPay, RappiCard, Santander
                y Scotiabank).
              </li>
              <li>
                <strong>Vigencia:</strong> 01 al 30 de septiembre.
              </li>
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="relative h-[240px] md:h-[360px] lg:h-[350px]   pt-4">
              <ImageWithFallback
                fill
                style={{
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                }}
                src={promo_ms}
                alt={'promocion'}
                className="bg-white"
              />
            </div>
          </div>
        </div>
      </Container>
    </RootLayout>
  );
};

export default TerminosCondiciones;
