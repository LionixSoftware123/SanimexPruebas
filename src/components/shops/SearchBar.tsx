// Components/SearchBar.tsx
import React from 'react';
import SearchIcon from '@/images/search.svg';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  title: string;
  subtitle: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearch,
  title,
  subtitle,
}) => {
  return (
    <div className="mb-4 rounded-[10px] pb-[15px] shadow-md">
      <div className="px-[20px] h-[42px] flex place-items-center text-[14px] font-Century-Gothic bg-[#F5F5F5]">
        {title}
      </div>
      <div className="text-[#B2B2B2] text-[10px] px-[20px] py-2">
        {subtitle}
      </div>
      <div className="relative text-[#B2B2B2] w-full px-5 pt-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="bg-[#F5F5F5] border h-[47px] w-full rounded-[6px] px-2"
        />
        <button className="right-[25px] top-[20px] absolute w-[25px] h-[25px]">
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
