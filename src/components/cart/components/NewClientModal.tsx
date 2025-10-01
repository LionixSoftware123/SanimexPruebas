import React from 'react';
import Link from 'next/link';
import IconGoogle from '@/images/icon-google.svg';
import IconFacebookLogin from '@/images/icon-facebook-login.svg';
import IconEmailLogin from '@/images/icon-email-login.svg';
import Image from 'next/image';
type ClientModalprops = {
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  open: boolean;
};
const NewClientModal: React.FC<ClientModalprops> = ({ setOpen, open }) => {
  return (
    <div className="w-full h-screen left-0 top-[140px]  fixed  bg-opacity-50 bg-white z-50 flex justify-center">
      <div className="grid bg-white lg:w-[971px] h-[500px] overflow-y-auto lg:h-[590px] drop-shadow-xl lg:my-auto px-4 lg:px-[30px] py-[10px]">
        <button
          onClick={() => setOpen(!open)}
          className="text-[#0071CE] font-Century-Gothic-Bold text-end pt-4"
        ></button>
        <div className="grid grid-rows-1 grid-cols-11 h-full">
          <div className=" justify-center text-center font-Century-Gothic text-[#666666] col-span-full lg:col-span-5 pt-4 lg:pt-0 lg:px-[50px] flex place-items-center">
            <div className="flex flex-col  mb-8">
              <div className="text-[24px] pb-4">Registrate para continuar</div>
              <div className="pb-4 font-Century-Gothic-Bold text-[#0071CE]">
                Crear cuenta tiene beneficio:
              </div>
              <p className="pb-4">Promociones exclusivas</p>
              <p className="pb-4">Ver historial de compra</p>
              <p className="pb-4">
                Guardar métodos de pago para compras mas rápidas
              </p>
              <button className="mx-auto w-[200px] h-[40px] mx-[60px] uppercas bg-[#1C355E] text-white text-[11px]">
                crear cuenta
              </button>
            </div>
          </div>
          <div className="col-span-full lg:col-span-1 flex lg:flex-col lg:justify-center">
            <div className="border-b self-center lg:border-r border-black h-0 lg:h-[240px] lg:mx-auto w-5/12 lg:w-0"></div>
            <div className="inline-flex mx-auto mb-1 text-[18px]">ó</div>
            <div className="border-b self-center lg:border-r border-black h-0 lg:h-[240px] lg:mx-auto w-5/12 lg:w-0"></div>
          </div>
          <div className="my-auto col-span-full lg:col-span-5 ">
            <div className="text-[14px] font-Century-Gothic py-2 ">
              <div className="flex justify-center px-4 pb-2  text-[#1C355E]">
                <div className="text-[20px] text-[#1C355E]">
                  Inicio de sesión
                </div>
              </div>
              <div className=" text-[16px] text-[#999999] lg:px-[60px] py-12 space-y-[15px]">
                <button className=" w-full h-[45px] border border-[#CCCCCC]">
                  <div className=" flex space-x-[10px] text-start  w-[230px] mx-auto">
                    <div className=" relative flex self-center w-[15px] h-[15px]">
                      <Image
                        fill
                        style={{ objectFit: 'cover' }}
                        src={IconGoogle}
                        alt={'product'}
                      />
                    </div>
                    <div>Continua con Google</div>
                  </div>
                </button>
                <button className="w-full h-[45px] border border-[#CCCCCC]">
                  <div className=" flex space-x-[10px] text-start  w-[230px] mx-auto">
                    <div className="flex self-center relative w-[15px] h-[15px]">
                      <Image
                        fill
                        style={{ objectFit: 'cover' }}
                        src={IconFacebookLogin}
                        alt={'product'}
                      />
                    </div>
                    <div>Continua con Facebook</div>
                  </div>
                </button>
                <button className="w-full h-[45px] border border-[#CCCCCC]">
                  <div className=" flex space-x-[10px] text-start  w-[230px] mx-auto">
                    <div className="relative flex self-center w-[15px] h-[12px]">
                      <Image
                        fill
                        style={{ objectFit: 'cover' }}
                        src={IconEmailLogin}
                        alt={'product'}
                      />
                    </div>
                    <div>Continua con tu Email</div>
                  </div>
                </button>
              </div>
              <div className="text-center pb-8">
                <Link
                  href={'/restaurar-contrasena'}
                  className=" text-[#0071CE] text-[14px]"
                >
                  Olvidé mi contraseña
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewClientModal;
