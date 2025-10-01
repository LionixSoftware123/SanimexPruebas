import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface Term {
  title: string;
  content: string;
}

interface TermsBlockProps {
  title: string;
  promotion?: string;
  terms: Term[];
  img: StaticImageData;
}

const TermsBlockWithImage: React.FC<TermsBlockProps> = ({
  title,
  promotion,
  terms,
  img,
}) => {
  return (
    <div className="grid grid-cols-12 lg:gap-12 text-[#777777] mt-12 text-justify">
      <div className="lg:col-span-8 col-span-12">
        <h3 className="font-bold text-white text-[22px] bg-blue-800 p-2">
          <strong>{title}</strong>
        </h3>
        <p className="py-4 text-[22px]">
          <br />
          <span className="font-bold text-black">{promotion}</span>
        </p>

        <ul className="mb-4 list-disc list-inside flex flex-col space-y-4">
          {terms.map((term, index) => (
            <li key={index}>
              <strong>{term.title}</strong> {term.content}
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:col-span-4 col-span-12">
        <Image src={img} alt="Terms and Conditions" width={400} height={400} />
      </div>
    </div>
  );
};

export default TermsBlockWithImage;
