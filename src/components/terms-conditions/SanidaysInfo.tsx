import React from 'react';

interface SanidaysInfoProps {
  title: string;
  validity: string;
  conditions: string[];
}

const SanidaysInfo: React.FC<SanidaysInfoProps> = ({
  title,
  validity,
  conditions,
}) => {
  return (
    <>
      <p className="py-4  text-[22px]">
        <br />
        <strong className="text-[#1e73be]">{title}</strong>
      </p>

      <ul className="mb-4 list-disc list-inside flex flex-col space-y-4">
        <li>
          <strong>Vigencia:</strong> {validity}
        </li>
        {conditions.map((condition, index) => (
          <li key={index}>{condition}</li>
        ))}
      </ul>
    </>
  );
};

export default SanidaysInfo;
