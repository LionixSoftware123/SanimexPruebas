import React, { ChangeEvent } from 'react';

type FormatCheckInputProps = {
  name?: string | React.ReactElement;
  id?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FormatCheckInput: React.FC<FormatCheckInputProps> = ({
  name,
  id,
  onChange,
}) => {
  return (
    <div className="flex items-center">
      <input
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange && onChange(event)
        }
        id={`checkout-${id}`}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
      <label
        htmlFor={`checkout-${id}`}
        className="ml-2 block text-sm text-[#555555]"
      >
        {name}
      </label>
    </div>
  );
};

export default FormatCheckInput;
