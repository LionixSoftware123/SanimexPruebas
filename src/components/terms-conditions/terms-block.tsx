import React from 'react';

interface TermsBlockProps {
  title: string;
  promotion: string;
  terms: {
    validity: string;
    stores: string;
    conditions: string;
    additionalPromotion: string;
  };
}

const TermsBlock: React.FC<TermsBlockProps> = ({ title, promotion, terms }) => {
  return (
    <div className="grid grid-cols-12 lg:gap-12 text-[#777777] mt-12 text-justify">
      <div className="col-span-12">
        <h3 className="font-bold text-black text-[22px]">
          <strong>{title}</strong>
        </h3>
        <p className="py-4 text-[22px]">
          <br />
          <strong className="text-[#1e73be]">Promoción: </strong>
          <span className="font-bold text-black">{promotion}</span>
        </p>

        <ul className="mb-4 list-disc list-inside flex flex-col space-y-4">
          <li>
            <strong>Vigencia:</strong> {terms.validity}
          </li>
          <li>
            <strong>Comercios:</strong> {terms.stores}
          </li>
          <li>
            <strong>Términos y Condiciones: {terms.conditions}</strong>
          </li>
          <li>
            <strong>{terms.additionalPromotion}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TermsBlock;
