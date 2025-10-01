import React, { useState } from 'react';
import Image from 'next/image';
import {
  Product as ProductType,
  GlobalProductAttribute,
} from '@/utils/types/generated';

type ProductDescriptionProps = {
  product?: ProductType;
};
const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  const [option, setOption] = useState(2);
  let content = <></>;

  switch (option) {
    case 3:
      content = (
        <div
          key={'Fichas Técnicas'}
          className="grid grid-cols-3 lg:grid-cols-6 font-Century-Gothic gap-4 my-4"
        >
          {product?.dataSheet?.map((pdf, index) => (
            <a
              key={index}
              href={pdf?.url ?? ''}
              download
              target="_blank"
              className="flex items-center  flex-col justify-center mx-auto h-40 w-40 border  bg-gray-50 rounded hover:border-[#1c355e]"
            >
              <Image src="/pdf.png" alt="PDF Icon" height={30} width={50} />

              <span
                className="text-sm font-bold font-Century-Gothic-Bold mt-2"
                style={{
                  display: 'inline-block',
                  maxWidth: '130px', // Ajusta este valor según tus necesidades
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {pdf && pdf.name}
              </span>

              <button className="bg-[#1c355e] h-8 w-24 rounded mt-2">
                <p className="text-sm font-bold text-white  font-Century-Gothic-Bold ">
                  Descargar
                </p>
              </button>
            </a>
          ))}
        </div>
      );
      break;
    case 2:
      content = (
        <div
          key={'Información adicional'}
          className="grid grid-cols-3 lg:grid-cols-5 font-Century-Gothic"
        >
          {product?.attributes?.nodes.map(
            (node: GlobalProductAttribute, key: any) => {
              const num = node.terms?.nodes.length ?? 0;
              let text = '';
              if (node?.terms?.nodes.length ?? 0 > 1) {
                for (let i = 0; i < num; i++) {
                  if (i < num - 1) {
                    text += node.terms?.nodes[i].name + ', ';
                  } else {
                    text += node.terms?.nodes[i].name;
                  }
                }
              }
              const termName = node.terms?.nodes.length
                ? num >= 2
                  ? text
                  : node.terms.nodes[0].name
                : '';

              return (
                <div
                  className="col-span-3 flex justify-between px-2 py-[0.6rem] border-b border-[#B2B2B2]"
                  key={key}
                >
                  <div>{node.label}:</div>
                  <div className="text-[#B2B2B2] first-letter:uppercase text-end">
                    {termName}
                  </div>
                </div>
              );
            },
          )}
        </div>
      );
      break;
    case 1:
      content = (
        <div
          key={'descripcion'}
          className="grid grid-cols-3 lg:grid-cols-5 font-Century-Gothic"
        >
          <div className="col-span-3 flex justify-between px-2 py-[0.6rem] border-b border-[#B2B2B2] text-[#B2B2B2] first-letter:uppercase">
            <div
              className="post-details first-letter:uppercase"
              dangerouslySetInnerHTML={{ __html: product?.description || '' }}
            ></div>
          </div>
        </div>
      );
      break;
  }
  return (
    <div className=" my-auto">
      <div className="grid grid-cols-3 lg:grid-cols-6  font-Century-Gothic">
        <button
          onClick={() => setOption(2)}
          className={`flex items-center  ${
            option === 2
              ? 'border-[#B2B2B2] border-l border-r border-t  text-[#0033A1]'
              : ' text-[#000] border-b border-[#B2B2B2]'
          } p-2 justify-center `}
        >
          Información Adicional
        </button>
        {product?.description ? (
          <button
            onClick={() => setOption(1)}
            className={`flex items-center  ${
              option === 1
                ? 'border-[#B2B2B2] border-l border-r border-t text-[#0033A1]'
                : ' text-[#000] border-b border-[#B2B2B2]'
            } p-2 justify-center `}
          >
            Descripción del producto
          </button>
        ) : (
          ''
        )}
        {product?.dataSheet?.length ? (
          <button
            onClick={() => setOption(3)}
            className={`flex items-center  ${
              option === 3
                ? 'border-[#B2B2B2] border-l border-r border-t text-[#0033A1]'
                : ' text-[#000] border-b border-[#B2B2B2]'
            } p-2 justify-center `}
          >
            Fichas Técnicas
          </button>
        ) : (
          ''
        )}
        <div
          className={`${
            product?.dataSheet ? 'lg:col-span-3 ' : 'lg:col-span-4 col-span-2'
          }  border-b border-[#B2B2B2]`}
        ></div>
      </div>
      {content}
    </div>
  );
};

export default ProductDescription;
