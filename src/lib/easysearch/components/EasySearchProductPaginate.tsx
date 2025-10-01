import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type ProductPaginateProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const EasySearchProductPaginate: React.FC<ProductPaginateProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [maxPagesToShow, setMaxPagesToShow] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMaxPagesToShow(6);
      } else {
        setMaxPagesToShow(10);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (totalPages <= 1) return null;

  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="flex justify-center">
      <ul className="inline-flex text-[14px] md:text-[16px] font-Inter-Regular">
        {currentPage > 1 && (
          <li>
            <div
              onClick={() => onPageChange(currentPage - 1)}
              className="h-[32px] w-[32px] md:h-[40px] md:w-[40px] lg:h-[48px] lg:w-[48px] bg-[#0033A1] rounded-[5px] flex justify-center items-center text-white cursor-pointer"
            >
              <ChevronLeftIcon className="h-[16px] w-[16px] md:h-[20px] md:w-[20px] lg:h-[30px] lg:w-[30px] text-white" />
            </div>
          </li>
        )}
        {pages.map((page) => (
          <li key={page} className="mx-1">
            <div
              onClick={() => onPageChange(page)}
              className={`h-[32px] w-[32px] md:h-[40px] md:w-[40px] lg:h-[48px] lg:w-[48px] rounded-[5px] flex justify-center items-center cursor-pointer border border-[#0033A1] ${
                page === currentPage ? 'bg-[#0033A1] text-white' : 'bg-white'
              }`}
            >
              {page}
            </div>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <div
              onClick={() => onPageChange(currentPage + 1)}
              className="h-[32px] w-[32px] md:h-[40px] md:w-[40px] lg:h-[48px] lg:w-[48px] bg-[#0033A1] rounded-[5px] flex justify-center items-center text-white cursor-pointer"
            >
              <ChevronRightIcon className="h-[16px] w-[16px] md:h-[20px] md:w-[20px] lg:h-[30px] lg:w-[30px] text-white" />
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default EasySearchProductPaginate;
