import React, { useEffect, useState } from 'react';
import SearchIcon from '@/images/search.svg';
import { useRouter } from 'next/router';

type ProductSearchBoxProps = {
  search: string;
  setQuery: (newQuery: string) => void;
};

const EasySearchProductSearchBox: React.FC<ProductSearchBoxProps> = ({
  search,
  setQuery,
}) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(search);

  const replacements: Record<string, string> = {
    banos: 'baños',
  };

  const slug = `en ${
    router.asPath
      .split('?')[0] // Eliminar parámetros de consulta
      .split('/')
      .pop()
      ?.replace(/-/g, ' ')
      .replace(/\b\w+\b/g, (word) => replacements[word.toLowerCase()] || word)
      .split(' ')
      .filter((word, index, self) => self.indexOf(word) === index)
      .join(' ') || ''
  }`;

  const handleSubmit = () => {
    setQuery(inputValue);
  };

  useEffect(() => {
    if (search) {
      setInputValue(search);
    }
  }, [search]);

  return (
    <div className="relative flex justify-end w-full items-center">
      <input
        className="w-full rounded-md h-[50px] text-black pl-[10px] border border-black"
        value={inputValue}
        placeholder={`Buscar productos ${slug !== 'en productos' ? slug : ''}`}
        onChange={(event) => {
          setInputValue(event.currentTarget.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <div className="absolute mr-2 cursor-pointer">
        <SearchIcon
          onClick={() => {
            handleSubmit();
          }}
        />
      </div>
    </div>
  );
};

export default EasySearchProductSearchBox;
