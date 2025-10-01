import React, { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { useWpTaxonomyFilter } from '@/modules/product/product-hook';
import { useRouter } from 'next/router';

type ProductTaxonomyFilterCollapseListProps = {
  onFilter?: (item: string) => void;
  taxonomyField?: string;
  taxonomyProductCategory?: string;
  onSale?: boolean;
  onTotalSales?: boolean;
  title?: string;
  search?: string;
};

const ProductTaxonomyFilterCollapseList: React.FC<
  ProductTaxonomyFilterCollapseListProps
> = ({
  onFilter,
  taxonomyField = '',
  taxonomyProductCategory = '',
  onSale = false,
  onTotalSales = false,
  title = 'Marcas',
  search = '',
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');

  const { taxonomy, loading } = useWpTaxonomyFilter(
    taxonomyField,
    taxonomyProductCategory,
    onSale,
    onTotalSales,
    search,
  );
  const nameQuery = title.toLowerCase();
  const router = useRouter();
  const routerquery = router.query ? (router.query[nameQuery] as string) : '';
  const existsInTaxonomy = taxonomy?.some((item) => item.slug === routerquery);
  const hasRun = useRef(false);

  useEffect(() => {
    if (existsInTaxonomy && !hasRun.current) {
      if (onFilter && routerquery) {
        onFilter(routerquery);
      }
      setSelected(routerquery);
      hasRun.current = true;
      if (routerquery) {
        router.push(router.pathname);
      }
    }
  }, [existsInTaxonomy, onFilter, routerquery, router]);

  const handleSelection = (slug: string) => {
    if (selected === slug && selected === routerquery) {
      setSelected('');
      onFilter && onFilter('');
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, [nameQuery]: '' },
        },
        undefined,
        { shallow: true },
      );
    } else {
      setSelected(slug);
      onFilter && onFilter(slug);
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, [nameQuery]: slug },
        },
        undefined,
        { shallow: true },
      );
    }
  };

  return (
    <div className="w-full rounded-[5px] border-b-[#0071CE] border-b-[3px]">
      <div className="font-Century-Gothic">
        <div
          onClick={() => setOpen(!open)}
          className="bg-[#F5F5F5] cursor-pointer w-full flex h-[40px] items-center p-[20px] justify-between"
        >
          <div className="font-Century-Gothic text-[#555555]">{title}</div>
          <div className="cursor-pointer">
            {open ? (
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
        {open && (
          <div className="p-[20px] max-h-[350px] overflow-auto">
            {loading ? (
              <>
                <div className="w-full h-[10px] bg-gray-200 dark:bg-gray-700 mb-2" />
                <div className="w-full h-[10px] bg-gray-200 dark:bg-gray-700 mb-2" />
                <div className="w-full h-[10px] bg-gray-200 dark:bg-gray-700 mb-2" />
              </>
            ) : (
              <>
                {taxonomy?.length ? (
                  taxonomy.map((listItem, i) => (
                    <div
                      className={`cursor-pointer ${
                        selected === listItem?.slug &&
                        'text-[#0071CE] font-Century-Gothic-Bold'
                      } text-[14px]`}
                      key={i}
                      onClick={() => handleSelection(listItem?.slug as string)}
                    >
                      <div className="cursor-pointer text-[14px] flex items-center mb-2">
                        {listItem?.color ? (
                          <div
                            key={i}
                            className={`border border-[#707070] h-[20px] w-[20px] rounded-full cursor-pointer mr-2`}
                            style={{ background: listItem?.color as string }}
                          />
                        ) : null}
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              (((listItem?.name as string) +
                                ' ' +
                                '(' +
                                listItem?.total) as string) + ')',
                          }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No hay datos disponibles.</div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTaxonomyFilterCollapseList;
