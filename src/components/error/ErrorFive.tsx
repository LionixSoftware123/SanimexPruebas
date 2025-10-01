import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const Container = dynamic(() => import('@/components/utils/Container'));

const ErrorFivePage: React.FC = () => {
  return (
    <Container classes="mt-8">
      <div className="mx-auto grid grid-cols-12 h-[400px] max-w-[720px]">
        <div className="col-span-12  align-self-center ">
          <h1 className="text-[80px] font-bold text-center">500</h1>
          <h2 className="text-[30px] font-bold text-center">
            OH OH! Hubo un error.
          </h2>
          <p className="mb-[40px] text-[18px] text-center">
            La pagina que buscas tuvo un error. Como paso esto es un misterio.
            Pero puedes dar click en el botòn de abajo para volver al inicio.
          </p>
          <div className=" flex self-center justify-center">
            <Link
              href={'/'}
              className="hover:bg-[#1C355E] hover:text-white font-bold px-[50px] py-[10px] border rounded-[5px] border-[1px] border-[#1C355E]"
            >
              INICIO
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ErrorFivePage;
