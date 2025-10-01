import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import IconEye from '@/images/icon-eye.svg';
import IconEyeSlash from '@/images/icon-eye-slash.svg';
import { useRouter } from 'next/router';
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));

const Container = dynamic(() => import('@/components/utils/Container'));
const UserData: React.FC = () => {
  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const router = useRouter();
  return (
    <RootLayout>
      <StaticMeta
        title={'Cambiar Contraseña'}
        description={'Cambiar Contraseña'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <Container>
        <div className="mt-18 mb-[200px] text-[#222222] md:w-[440px] text-[14px] mx-auto font-Century-Gothic grid  gap-x-4 my-16">
          <div className="mb-4 text-[#333E48] text-[25px] font-Century-Gothic-Bold">
            Cambiar contraseña
          </div>
          <div className="mb-2">Contraseña actual</div>
          <div className="mb-2 relative w-full h-[45px] ">
            <input
              className="w-full h-[36px] border border-[#CCCCCC] px-6"
              placeholder={'escriba su conraseña actual'}
              type={eye ? 'text' : 'password'}
            />
            <button
              className="absolute top-[10px] right-[15px]"
              onClick={() => setEye(!eye)}
            >
              {eye ? (
                <Image
                  width={15}
                  height={15}
                  style={{ objectFit: 'contain' }}
                  src={IconEye}
                  alt={'product'}
                />
              ) : (
                <Image
                  width={15}
                  height={15}
                  style={{ objectFit: 'contain' }}
                  src={IconEyeSlash}
                  alt={'product'}
                />
              )}
            </button>
          </div>
          <div className="mb-2">Contraseña nueva</div>
          <div className="mb-2 relative w-full h-[45px] ">
            <input
              className="w-full h-[36px] border border-[#CCCCCC] px-6"
              placeholder={'Escriba su nueva contraseña'}
              type={eye1 ? 'text' : 'password'}
            />
            <button
              className="absolute top-[10px] right-[15px]"
              onClick={() => setEye1(!eye)}
            >
              {eye ? (
                <Image
                  width={15}
                  height={15}
                  style={{ objectFit: 'contain' }}
                  src={IconEye}
                  alt={'product'}
                />
              ) : (
                <Image
                  width={15}
                  height={15}
                  style={{ objectFit: 'contain' }}
                  src={IconEyeSlash}
                  alt={'product'}
                />
              )}
            </button>
          </div>
          <div className="mb-2">Confirmar contraseña</div>
          <div className="mb-2 relative w-full h-[45px] ">
            <input
              className="w-full h-[36px] border border-[#CCCCCC] px-6"
              placeholder={'Repita su nueva contraseña'}
              type={eye2 ? 'text' : 'password'}
            />
            <button
              className="absolute top-[10px] right-[15px]"
              onClick={() => setEye2(!eye)}
            >
              {eye ? (
                <Image
                  width={15}
                  height={15}
                  style={{ objectFit: 'contain' }}
                  src={IconEye}
                  alt={'product'}
                />
              ) : (
                <Image
                  width={15}
                  height={15}
                  style={{ objectFit: 'contain' }}
                  src={IconEyeSlash}
                  alt={'product'}
                />
              )}
            </button>
          </div>
          <div className="mb-4">
            <button className="mt-8 text-white w-full h-[32px] bg-[#1C355E]">
              Guardas cambios
            </button>
          </div>
          <Link
            href={'/auth/password-recover'}
            className="hover:cursor-pointer text-center text-[12px] text-[#FF0000]"
          >
            Olvidé mi contraseña
          </Link>
        </div>
      </Container>
    </RootLayout>
  );
};

export default UserData;
