import React from 'react';
import Link from 'next/link';
const DownloadPdF: React.FC = () => {
  return (
    <div className="p-4 hidden  m-2 bg-[#F0F0F0] border-b-[5px] border border-[#808080] rounded-[10px]">
      <div className=" font-Century-Gothic flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center">
        <div>
          <Link
            target="_Blank"
            href={
              'https://admin.sanimex.com.mx/wp-content/uploads/2023/10/50-GSA-2F.pdf'
            }
          >
            <div className="bg-[#1C355E] text-white rounded-[5px] flex items-center justify-center px-2 text-center max-w-[250px] h-[50px]">
              <div className="">Descargar el Catálogo</div>
            </div>
          </Link>
        </div>
        <div>
          <div className="pb-4 text-[24px] text-[#143087] text-center md:text-start">
            Descarga el catálogo en PDF
          </div>
          <div className="pb-4 text-center md:text-start">
            Conoce nuestras promociones y descuentos
          </div>
          <div className="text-[14px]">
            <div>
              ¡Grandes promociones para estrenar tu casa! Meses sin intereses y
              descuentos en tienda
            </div>
            <div>1. Haz click en el botón para abrir el catálogo PDF.</div>
            <div>
              2. En cualquier momento haz click en el producto que te interese
              para ver mas información en nuestro sitio web.
            </div>
            <div className="pt-4">
              Fe de erratas:{' '}
              <Link
                target="blank"
                className="underline"
                href={
                  'https://admin.sanimex.com.mx/wp-content/uploads/2023/10/50_GSA_CATALOGO.pdf'
                }
              >
                Click aquí {'>>'}
              </Link>
            </div>
            <div>
              Lamentamos los inconvenientes con la información errónea del
              catálogo impreso, favor de tomar el contenido de éste como válido.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPdF;
