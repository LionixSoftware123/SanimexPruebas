import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const Container = dynamic(() => import('@/components/utils/Container'));

const ErrorPage: React.FC = () => {
  return (
    <Container classes="mt-4">
      <div className="mx-auto grid grid-cols-12 h-screen  max-w-[720px]">
        <div className="col-span-12  align-self-center flex flex-col items-center justify-center">
          <h1 className="text-[80px] font-bold text-center">404</h1>
          <h2 className="text-[30px] font-bold text-center">
            OH OH! Estas perdido.
          </h2>
          <p className="mb-[40px] text-[18px] text-center">
            La página que buscas no existe. ¿Cómo llegaste aquí? Es un misterio.
            Pero puedes dar clic en el botón de abajo para regresar a la página
            de inicio.
          </p>
          <div className="flex self-center justify-center">
            <Link
              href={'/'}
              className="hover:bg-[#1C355E] hover:text-white font-bold px-[50px] py-[10px] border rounded-[5px]  border-[#1C355E]"
            >
              INICIO
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ErrorPage;
