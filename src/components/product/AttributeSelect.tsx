import useAttributeSelect from '@/modules/product/useAttributeSelect-hook';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import React from 'react';

const AttributeSelect = ({
  onFilter,
  attributes,
  title,
}: {
  onFilter: (selected: string[], attribute: string) => void;
  attributes: any[];
  title: string;
}) => {
  const {
    isVisible,
    toggleVisibility,
    handleOptionClick,
    sortedOptions,
    selectedValues,
  } = useAttributeSelect(attributes, title);

  return (
    <div className="mb-6">
      <div
        className="w-full bg-[#f5f5f5] px-4 flex items-center justify-between h-[40px] rounded-t-lg rounded-b-lg border-b-[3px] border-b-blue-500 cursor-pointer"
        onClick={toggleVisibility}
      >
        <span className="font-Century-Gothic text-[#555555]">{title}</span>
        <div className="cursor-pointer">
          {isVisible ? (
            <ChevronUpIcon
              className={'h-[20px] w-[20px] flex-shrink-0 text-[#555555]'}
              aria-hidden="true"
            />
          ) : (
            <ChevronDownIcon
              className={'h-[20px] w-[20px] flex-shrink-0 text-[#555555]'}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      {isVisible && (
        <ul
          id={title.replace(/\s+/g, '-').toLowerCase()}
          className="w-full bg-[#fff] rounded-b-lg border-b-[3px] h-[300px] border-b-blue-500 px-4 min-h-[40px] overflow-auto py-4"
        >
          {sortedOptions.map((option: any, index: any) => (
            <li
              key={index}
              value={option.id}
              className={`cursor-pointer text-[14px] text-black font-Century-Gothic py-[7px] ${
                selectedValues.includes(option.id) ? 'font-bold' : ''
              }`}
              onClick={() => handleOptionClick(option.id, onFilter)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttributeSelect;
