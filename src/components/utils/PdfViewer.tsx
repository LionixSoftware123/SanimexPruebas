import React from 'react';

const PdfViewer = () => {
  return (
    <div className=" my-6 h-[100vh] flex flex-col">
      <h2 className="mt-[90px] lg:mt-[110px] uppercase mb-[20px] text-[18px]   lg:text-[28px] font-Century-Gothic-Bold text-center">
        Catálogo de productos en promoción
      </h2>

      <iframe
        src="https://publuu.com/flip-book/445362/2011105"
        style={{ width: '100%', border: 'none' }}
        className="h-full"
        allowFullScreen
        title="Catálogo de Productos"
      ></iframe>
    </div>
  );
};

export default PdfViewer;
