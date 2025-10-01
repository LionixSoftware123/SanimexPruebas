// src/hooks/useAttributeSelect.ts
import { useState } from 'react';

const useAttributeSelect = (attributes: any[], title: string) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleOptionClick = (
    optionId: string,
    onFilter: (selected: string[], attribute: string) => void,
  ) => {
    let updatedSelected: string[];
    if (selectedValues.includes(optionId)) {
      updatedSelected = selectedValues.filter(
        (item: string) => item !== optionId,
      );
    } else {
      updatedSelected = [...selectedValues, optionId];
    }
    setSelectedValues(updatedSelected);

    onFilter(updatedSelected, attributes[0].name);
  };

  const shouldIgnoreOption = (name: string) => {
    return name.includes('Largo:') || name.includes('Ancho:');
  };

  const extractNumbers = (str: string) => {
    const matches = str.match(/\d+(\.\d+)?/g);
    return matches ? matches.map(Number) : [];
  };

  const calculateArea = (dimensions: number[]) => {
    if (dimensions.length === 2) {
      return dimensions[0] * dimensions[1];
    }
    return 0;
  };

  const sortedOptions =
    title === 'Formato'
      ? [...attributes]
          .filter((option) => !shouldIgnoreOption(option.name))
          .sort((a, b) => {
            const aDimensions = extractNumbers(a.name);
            const bDimensions = extractNumbers(b.name);
            const aArea = calculateArea(aDimensions);
            const bArea = calculateArea(bDimensions);
            return aArea - bArea; // Ordenar de menor a mayor por el área
          })
      : title === 'Diseño'
      ? [...attributes]
          .filter((option) => !shouldIgnoreOption(option.name))
          .sort((a, b) => a.name.localeCompare(b.name)) // Ordenar alfabéticamente
      : attributes;

  return {
    isVisible,
    selectedValues,
    toggleVisibility,
    handleOptionClick,
    sortedOptions,
  };
};

export default useAttributeSelect;
