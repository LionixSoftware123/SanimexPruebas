import dynamic from 'next/dynamic';
import React from 'react';
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
const BankList: React.FC = () => {
  return (
    <div className="mx-2 flex space-x-2 flex-wrap">
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/Afirme.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/banco-azteca.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/banbajio.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/banjercito.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/banregio.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/banorte.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/falabella.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/hsbc.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/inbursa.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/invex.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/konfio.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/liverpool.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/mifel.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/multiva.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/nanopay.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/rappicard.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/santander.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-[60px] h-[40px] relative">
        <ImageWithFallback
          src={'/scotiabank.png'}
          alt="banco"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
};

export default BankList;
