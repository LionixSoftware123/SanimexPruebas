import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

type PaginateProps = {
  pageCount: number;
  pageRangeDisplayed?: number;
  initialPage?: number;
  onPageChange?: (selectedItem: { selected: number }) => void;
  page: number;
};

const Paginate: React.FC<PaginateProps> = ({
  pageCount,
  pageRangeDisplayed = 1,
  onPageChange,
  initialPage = 0,
  page,
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(initialPage);
  console.log(page);
  useEffect(() => {
    const pageFromQuery = parseInt(router.query.page as string, 10);
    if (!isNaN(pageFromQuery)) {
      setCurrentPage(pageFromQuery - 1);
    }
  }, [router.query.page, page]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    if (onPageChange) onPageChange(selectedItem);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: selectedItem.selected + 1 },
    });
    window.scrollTo({ top: 180 });
  };

  return (
    <ReactPaginate
      breakLabel="..."
      forcePage={currentPage}
      nextLabel={
        <div
          className="h-[40px] w-[40px] md:h-[48px] md:w-[48px] bg-[#0033A1] rounded-[5px] flex justify-center items-center text-white"
          style={{ display: currentPage !== pageCount - 1 ? 'flex' : 'none' }}
        >
          <ChevronRightIcon className="h-[20px] w-[20px] md:h-[30px] md:w-[30px] text-white" />
        </div>
      }
      onPageChange={handlePageChange}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={pageRangeDisplayed}
      pageCount={pageCount}
      className="inline-flex text-[16px] font-Inter-Regular"
      pageClassName="mx-1"
      pageLinkClassName="h-[40px] w-[40px]  md:h-[48px] md:w-[48px]  rounded-[5px] flex justify-center items-center bg-white border border-[#0033A1]"
      breakClassName="h-[40px] w-[40px]  md:h-[48px] md:w-[48px]  rounded-[5px] flex justify-center items-center mx-1 bg-white border border-[#0033A1]"
      activeLinkClassName="bg-[#0033A1!important] rounded-[5px] text-white"
      disableInitialCallback
      previousLabel={
        <div
          className="h-[40px] w-[40px]  md:h-[48px] md:w-[48px] bg-[#0033A1] rounded-[5px] justify-center items-center "
          style={{ display: currentPage ? 'flex' : 'none' }}
        >
          <ChevronLeftIcon className="h-[20px] w-[20px] md:h-[30px] md:w-[30px] text-white " />
        </div>
      }
    />
  );
};

export default Paginate;
