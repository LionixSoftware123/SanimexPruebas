import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ContactFormVip from '@/components/form-vip/ContactFormVip';
import Image from 'next/image';
import Paso1 from '@/images/ofertas/icons/fi-rr-address-book.png';
import Paso2 from '@/images/ofertas/icons/fi-rr-at.png';
import Paso3 from '@/images/ofertas/icons/fi-rr-car.png';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';
import { FileText } from 'lucide-react';
import Link from 'next/link';

const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));
const Container = dynamic(() => import('@/components/utils/Container'));

const ReviveYourSpaces: React.FC = () => {
  const router = useRouter();
  const { addToast } = useToasts();
  const [newcoupon, setNewCoupon] = useState(null);

  const handleFormSubmit = async (formData: {
    name: any;
    email: any;
    company: any;
    employee: any;
    whatsapp: any;
    referral: any;
    consent: any;
  }) => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.company ||
      !formData.employee ||
      !formData.whatsapp ||
      !formData.referral ||
      !formData.consent
    ) {
      addToast('Por favor, completa todos los campos.', {
        appearance: 'error',
      });
      return;
    }

    try {
      const couponResponse = await axios.get('/api/get-coupons');
      const coupons = couponResponse.data;
      const foundCoupon = coupons[0];
      console.log('coupons', coupons);
      console.log('foundCoupon', foundCoupon);

      if (foundCoupon) {
        const updatedFormData = { ...formData, coupon_id: foundCoupon.id };

        await axios.post('/api/create-coupons', updatedFormData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        addToast('Formulario enviado con éxito.', { appearance: 'success' });
        setNewCoupon(foundCoupon);
        console.log('se guardo el cupon');
      } else {
        addToast('No hay cupones disponibles.', { appearance: 'error' });
      }
    } catch (error: any) {
      console.log('Error enviando datos: ', error?.response?.data.error.error);
      addToast('Error enviando datos: ' + error?.response?.data.error.error, {
        appearance: 'error',
      });
    }
  };

  const Step1: React.FC = () => (
    <div className="border  py-8 rounded w-auto   p-4 bg-[#F9F9F9]  lg:h-[700px] h-auto ">
      <ContactFormVip onFormSubmit={handleFormSubmit} />
    </div>
  );

  const Step2: React.FC = () => (
    <div className="border  pt-8 rounded  w-auto  p-4 bg-[#F9F9F9]  lg:h-[700px] h-auto flex items-center">
      <p className="font-Century-Gothic py-8 text-[20px]">
        Una vez completado el registro, recibirás un correo donde podrás
        encontrar tus cupones de descuento. Asegúrate de revisar su bandeja de
        entrada y carpeta de spam por si acaso.
      </p>
    </div>
  );

  const Step3: React.FC = () => (
    <div className="border  pt-8 rounded  w-auto  p-4 bg-[#F9F9F9] lg:h-[700px]  h-auto flex items-center">
      <p className="font-Century-Gothic py-8 text-[20px]">
        Lleva sus cupones descargados a cualquier tienda Sanimex. Presenta los
        cupones en la caja para disfrutar de los descuentos VIP.
      </p>
    </div>
  );

  const FinalStep: React.FC = () => (
    <div className="flex flex-col justify-center mx-auto my-2">
      <div className="max-w-md mx-auto p-4 bg-white  font-Century-Gothic">
        <p>Ya tienes tus cupones para disfrutar grandes descuentos.</p>

        <div className="flex items-center space-x-2 my-2 flex-col">
          <span
            id="cpnCode"
            className="border-dashed border text-white px-4 py-2 rounded-l bg-[#305a9c]"
          >
            OFVIP0924S
          </span>
          <span
            id="cpnBtn"
            className="font-Century-Gothic border border-white bg-white text-[#1c355e] px-4 py-2 rounded-r cursor-pointer"
            onClick={() => {
              navigator.clipboard
                .writeText('OFVIP0001')
                .then(() => {
                  addToast('Cupón copiado al portapapeles', {
                    appearance: 'success',
                  });
                })
                .catch((err) => {
                  console.error('Error al copiar el cupón: ', err);
                });
            }}
          >
            Copiar cupón
          </span>
        </div>
        <p className="font-bold">Precios VIP en productos seleccionados.</p>
        <p>
          Válido en tienda física, esta promoción no aplica para tienda en
          línea, sujetos a disponibilidad.
        </p>
        <p className="my-4">Vigencia: 01 al 31 de octubre.</p>

        <div className="flex items-center space-x-2 my-2 flex-col">
          <span
            id="cpnCode"
            className="border-dashed border text-white px-4 py-2 rounded-l bg-[#1c355e]"
          >
            {(newcoupon as any)?.coupon}
          </span>
          <span
            id="cpnBtn"
            className="font-Century-Gothic border border-white bg-white text-[#1c355e] px-4 py-2 rounded-r cursor-pointer"
            onClick={() => {
              navigator.clipboard
                .writeText((newcoupon as any)?.coupon)
                .then(() => {
                  addToast('Cupón copiado al portapapeles', {
                    appearance: 'success',
                  });
                })
                .catch((err) => {
                  console.error('Error al copiar el cupón: ', err);
                });
            }}
          >
            Copiar cupón
          </span>
        </div>
        <p className="font-bold">
          10% Descuento Adicional en todos los productos.
        </p>
        <p>
          Aplica en todos los productos de tienda física con stock, no aplica
          para tienda en línea.
        </p>
        <p className="my-4">Vigencia: 01 al 31 de octubre.</p>
      </div>
      <div>
        <div className="flex gap-4 justify-center mx-auto">
          <Link
            href="/varios.zip"
            download
            className="gap-2 bg-[#1c355e] px-2 mt-4 h-[50px] text-[16px] rounded font-bold text-white flex text-center items-center justify-center"
          >
            <FileText />
            Varios
          </Link>
          <Link
            href="/revestimiento.zip"
            download
            className="gap-2 bg-[#1c355e] px-2 mt-4 h-[50px] text-[16px] rounded font-bold text-white flex text-center items-center justify-center"
          >
            <FileText />
            Revestimiento
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <RootLayout>
      <StaticMeta
        title={'Ofertas VIP'}
        description={'Ofertas VIP'}
        asPath={router.asPath}
        image="/src/images/logo-gam.svg"
      />
      <Container classes="my-8  items-center justify-center h-auto mt-[100px] font-Century-Gothic hidden">
        <div className="text-center">
          <div className="my-12">
            <h2 className="text-[24px] font-Century-Gothic">
              Agradecemos tu participación
            </h2>
            <h3 className="text-[24px] font-Century-Gothic-Bold  ">
              ¡Eres Fundamental para nosotros!
            </h3>
          </div>
          {newcoupon && (
            <div className="flex">
              <FinalStep />
            </div>
          )}
          {!newcoupon && (
            <div className="grid grid-cols-3 gap-4">
              <div className="lg:col-span-1 col-span-3">
                <div className="h-24">
                  <h3 className="text-[24px] font-bold font-Century-Gothic">
                    PASO 1
                  </h3>
                  <span className="text-[16px] font-bold font-Century-Gothic  uppercase flex justify-center gap-4">
                    <Image src={Paso1} alt="Paso 1" /> Registra tus datos
                  </span>
                </div>

                <Step1 />
              </div>
              <div className="lg:col-span-1 col-span-3">
                <div className="h-24">
                  <h3 className="text-[24px] font-bold font-Century-Gothic">
                    PASO 2
                  </h3>
                  <span className="text-[16px] font-bold font-Century-Gothic  uppercase flex justify-center gap-4">
                    <Image src={Paso2} alt="Paso 2" /> Obtén tus cupones
                  </span>
                </div>
                <Step2 />
              </div>
              <div className="lg:col-span-1 col-span-3">
                <div className="h-24">
                  <h3 className="text-[24px] font-bold font-Century-Gothic">
                    PASO 3
                  </h3>
                  <span className="text-[16px] font-bold font-Century-Gothic  uppercase flex justify-center gap-4">
                    <Image src={Paso3} alt="Paso 3" />
                    Visita tu tienda más cercana
                  </span>
                </div>

                <Step3 />
              </div>
            </div>
          )}
        </div>
      </Container>
    </RootLayout>
  );
};

export default ReviveYourSpaces;
