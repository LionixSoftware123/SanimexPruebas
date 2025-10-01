import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import SearchIcon from '@/images/search.svg';
import {
  IProduct,
  useProductsLazyQuery,
} from '@/lib/easysearch/types/generated';
import { easySearchApolloClient } from '@/lib/easysearch/apollo/client';
import { productFilters } from '@/lib/easysearch/utils';

const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));

const EasySearchInput: React.FC = () => {
  const router = useRouter();
  const q = (router.query.q as string) || '';
  const [search, setSearch] = useState<string>(q);

  const [showResults, setShowResults] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const onSearch = async () => {
    return router.replace({
      pathname: '/productos',
      query: {
        q: search,
      },
    });
  };

  const [callAction, { loading: queryLoading }] = useProductsLazyQuery({
    client: easySearchApolloClient,
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      setProducts((data.products?.items || []) as IProduct[]);
    },
  });

  const callbackFilters = useCallback(productFilters, []);

  useEffect(() => {
    if (search.length > 2) {
      callAction({
        variables: {
          where: callbackFilters(search),
          skip: 0,
          take: 10,
          orderBy: { created_at: 1 },
        },
      });
    }
  }, [callAction, callbackFilters, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);



  return (
    <div className="relative flex justify-end" ref={searchRef}>
      <input
        style={{ fontSize: '13px' }}
        className="w-full xl:w-[264px] rounded-md h-[29px] text-black pl-[10px]"
        value={search}
        placeholder="Busca por producto, marca o SKU"
        onChange={(e) => {
          setSearch(e.target.value);
          setShowResults(true);
        }}
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            await onSearch();
            setSearch('');
            setShowResults(false);
          }
        }}
      />
      <div className="absolute mr-1 top-[3px] cursor-pointer">
        <SearchIcon
          onClick={async () => {
            await onSearch();
            setSearch('');
            setShowResults(false);
          }}
        />
      </div>

      {showResults && (
        <div className="max-h-[600px] overflow-y-auto absolute bg-white w-full top-[32px] border border-[#7b8186] rounded-lg overflow-hidden">
          {queryLoading ? (
            <div>
              <div className="h-[35px] animate-pulse cursor-pointer text-[14px] p-2 bg-white hover:text-white text-black">
                Buscando...
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 p-1 text-black">
              {products.length ? (
                products.map((product, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      router.push(`/productos/${product?.slug}`);
                      setSearch('');
                      setShowResults(false);
                    }}
                    className="flex space-x-3 p-1 rounded-md items-center cursor-pointer text-[14px] hover:bg-[#0071CE] hover:text-white"
                  >
                    <div className="w-[50px] flex justify-center items-center h-full">
                      <div className="relative w-[40px] h-[40px]">
                        <ImageWithFallback
                          height={40}
                          width={40}
                          style={{ objectFit: 'cover' }}
                          src={(product as any)?.image_url}
                          alt={(product as any).name}
                          className="w-full h-full rounded-md overflow-hidden"
                        />
                      </div>
                    </div>
                    <div className="w-full h-full leading-[15px]">
                      {product?.name}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-2">
                  <p>No se encontraron resultados</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EasySearchInput;
