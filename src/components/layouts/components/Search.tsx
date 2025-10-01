import React, { useState } from 'react';
import SearchIcon from '@/images/search.svg';
import { useRouter } from 'next/router';
import algoliasearch from 'algoliasearch/lite';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@/utils/constants';
import dynamic from 'next/dynamic';

const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
const Search: React.FC = () => {
  interface Hit {
    brand: string;
    objectID: string;
    on_sale: boolean;
    product_image: string;
    product_name: string;
    product_slug: string;
    regular_price: string;
    sale_price: string;
    short_description: string;
    sku: string;
    _highlightResult: {
      product_name: object;
      product_image: object;
      short_description: object;
      regular_price: object;
      sale_price: object;
    };
  }

  const router = useRouter();
  const q = router.query.q;
  const [search, setSearch] = useState<string>(q as string);
  const [results, setResults] = React.useState<Hit[]>([]);
  const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
  const index = searchClient.initIndex('woo_date_desc');
  const loading = false;
  const isProducts = router.pathname === '/productos';

  const onSearch = async () => {
    return router.replace({
      pathname: '/productos',
      query: {
        q: search,
      },
    });
  };

  if (isProducts) return null;

  return (
    <div className="relative flex justify-end">
      <input
        style={{ fontSize: '13px' }}
        className="w-full  xl:w-[264px] rounded-md h-[29px] text-black pl-[10px]"
        value={search}
        placeholder="Busca por producto, marca o SKU"
        onChange={async (e) => {
          try {
            setSearch(e.target.value);
            const algoliaResults = await index.search(e.target.value, {
              hitsPerPage: 5,
            });
            console.log(algoliaResults.hits);
            if (algoliaResults && algoliaResults.hits) {
              setResults(algoliaResults.hits as any[]);
            } else {
              setResults([]);
            }
          } catch (error) {
            console.error('Error searching with Algolia:', error);
          }
        }}
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            await onSearch();
            setSearch('');
          }
        }}
      />
      <div className=" absolute mr-1 top-[3px] cursor-pointer">
        <SearchIcon
          onClick={async () => {
            await onSearch();
            setSearch('');
          }}
        />{' '}
      </div>

      {search && (
        <div className="max-h-[600px] overflow-y-auto absolute bg-white w-full top-[32px] border border-[#7b8186] rounded-lg overflow-hidden">
          {!loading ? (
            <div className="flex flex-col space-y-2 p-1 text-black">
              {results.length > 0 ? (
                results.map((result, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      router.push(`/productos/${result.product_slug}`);
                      setSearch('');
                    }}
                    className="flex space-x-3 p-1 rounded-md items-center  cursor-pointer  text-[14px]   hover:bg-[#0071CE] hover:text-white"
                  >
                    <div className="w-[50px] flex justify-center items-center h-full ">
                      <div className="relative w-[40px]  h-[40px]">
                        <ImageWithFallback
                          fill
                          style={{
                            objectFit: 'cover',
                          }}
                          src={result.product_image}
                          alt={result.product_name}
                          className=" w-full h-full rounded-md overflow-hidden"
                        />
                      </div>
                    </div>
                    <div className="w-full h-full leading-[15px]">
                      {result.product_name}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-2">
                  <p>No se encontraron resultados</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="h-[35px] animate-pulse cursor-pointer text-[14px]  p-2 bg-white hover:text-white text-black">
                Cargando...{' '}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
