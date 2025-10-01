import React, { useState, useEffect } from 'react';
import BranchInfo from '@/components/branches/Branch';
import Paginate from '@/components/utils/Paginate';

interface Sucursal {
  image: string;
  name: string;
  address: string;
  link: string;
  state: string;
}

interface BranchListProps {
  filteredData: Sucursal[];
}

const BranchList: React.FC<BranchListProps> = ({ filteredData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [dataPage, setDataPage] = useState<Sucursal[]>([]);

  const itemsPerPage = 6;

  useEffect(() => {
    const sortedData = [...filteredData].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    setDataPage(sortedData.slice(0, itemsPerPage));
  }, [filteredData]);

  const handlePageChange = (data: { selected: number }) => {
    setCurrentPage(data.selected);
    const start = data.selected * itemsPerPage;
    const end = start + itemsPerPage;
    const sortedData = [...filteredData].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    setDataPage(sortedData.slice(start, end));
  };

  return (
    <div>
      <div className="font-Century-Gothic-Bold text-[14px] grid grid-cols-11 text-white bg-[#0033A1] px-[20px]">
        <div className="col-span-8 lg:col-span-5">Tienda</div>
        <div className="hidden lg:block col-span-3">Dirección</div>
        <div className="hidden lg:block col-span-2">Horario</div>
        <div className="col-span-3 lg:hidden">Dirección y Horario</div>
      </div>
      <div className="col-span-full py-[20px]">
        {dataPage.map((sucursal) => (
          <BranchInfo key={sucursal.name} {...sucursal} />
        ))}
      </div>
      <div className="mx-auto flex justify-center">
        <Paginate
          page={currentPage}
          initialPage={0}
          pageCount={Math.ceil(filteredData.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BranchList;
