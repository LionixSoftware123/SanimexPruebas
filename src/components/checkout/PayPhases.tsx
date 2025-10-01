import React, { useEffect } from 'react';
import Image from 'next/image';
import Hand from '@/images/income.png';

type PhaseType = {
  step: number;
  loading?: boolean;
};
type OnePhase = {
  step: number;
  text: string;
};
const PayOnePhase: React.FC<OnePhase> = ({ step, text }) => {
  return (
    <div className="left-0 top-0 fixed bg-white bg-opacity-20 flex justify-center items-center w-full h-screen z-50 backdrop-blur-sm ">
      <div className="flex flex-col justify-center space-y-4 items-center mx-10 sm:mx-0 w-full sm:w-[400px] h-[400px]">
        <div className="w-[150px] h-[150px] relative">
          <Image
            src={Hand}
            alt={'image'}
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        <div className="flex justify-center space-x-2">
          <div
            className={`w-4 h-4 border-[3px] border-black ${
              step === 1 ? 'bg-[#1C355E]' : ''
            } rounded-full`}
          ></div>
          <div
            className={`w-4 h-4 border-[3px] border-black ${
              step === 2 ? 'bg-[#1C355E]' : ''
            } rounded-full`}
          ></div>
          <div
            className={`w-4 h-4 border-[3px] border-black ${
              step === 3 ? 'bg-[#1C355E]' : ''
            } rounded-full`}
          ></div>
        </div>
        <div className="text-black text-[16px] font-Century-Gothic-Bold">
          {text}
        </div>
      </div>
    </div>
  );
};

const PayPhases: React.FC<PhaseType> = ({ step, loading }) => {
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading]);

  let content = <></>;

  switch (step) {
    case 1:
      content = <PayOnePhase step={1} text="Procesando pago" />;
      break;
    case 2:
      content = <PayOnePhase step={2} text="Autorizando pago" />;
      break;
    case 3:
      content = <PayOnePhase step={3} text="Pago completado" />;
      break;
  }

  return loading ? content : null;
};

export default PayPhases;
