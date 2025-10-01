import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import CrossClose from '@/images/crossClose.svg';
import { useRouter } from 'next/router';
import EasySearchProductTotal from '@/lib/easysearch/components/EasySearchProductTotal';
import EasySearchAttributeList from '@/lib/easysearch/components/EasySearchAttributeList';
import SkeletonTime from '@/components/skeleton/SkeletonTime';
import ProductPaginate from '@/lib/easysearch/components/EasySearchProductPaginate';
import EasySearchProductSearchBox from '@/lib/easysearch/components/EasySearchProductSearchBox';
import EasySearchProductSortBy from '@/lib/easysearch/components/EasySearchProductSortBy';
import ProductLayout from '@/components/layouts/ProductLayout';
import BasicSearchProducts from '@/lib/basicsearch/BasicSearchProducts';

const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const Container = dynamic(() => import('@/components/utils/Container'));

const NUMBER_PRODUCTS_FOR_PAGE = 12;

const ProductsPage: React.FC = () => {
  const [mobileFilter, setMobileFilter] = useState<boolean>(false);
  const router = useRouter();
  const [sortBy, setSortBy] = useState<string>('');
  const [materials, setMaterials] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [loadingAttributes, setLoadingAttributes] = useState<boolean>(true);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
  };

  const handleQuery = (object: { [key: string]: string | number }) => {
    const query = { ...router.query, ...object };
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true },
    );
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const page = parseInt(router.query.page as string) || 1;
    const skip = (page - 1) * NUMBER_PRODUCTS_FOR_PAGE;

    const params = new URLSearchParams({
      search: (router.query.q as string) || '',
      color: (router.query.color as string) || '',
      brand: (router.query.brand as string) || '',
      material: (router.query.material as string) || '',
      sort: (router.query.sort as string) || 'desc',
      skip: skip.toString(),
      take: NUMBER_PRODUCTS_FOR_PAGE.toString(),
      parent_category: 'sanitarios',
    });

    try {
      const response = await fetch(
        `/api/basicsearch/search?${params.toString()}`,
      );
      console.log('params.toString()', params.toString());
      const data = await response.json();
      setProducts(data.items || []);
      setTotal(data.count || 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  }, [router.query]);

  const fetchColors = useCallback(async () => {
    setLoadingAttributes(true);

    try {
      const response = await fetch(`/api/basicsearch/colors`);
      const data = await response.json();
      const dataItem = data.items;
      const sorteddataItem = dataItem.sort((a: { name: string }, b: { name: string }) => { if (a.name < b.name) { return -1; } if (a.name > b.name) { return 1; } return 0; });      
      setColors(sorteddataItem || []);
      setLoadingAttributes(false);
    } catch (error) {
      console.error('Error fetching colors:', error);
      setLoadingAttributes(false);
    }
  }, []);

  const fetchBrands = useCallback(async () => {
    setLoadingAttributes(true);

    try {
      const response = await fetch(`/api/basicsearch/brands`);
      const data = await response.json();
      const dataItem = data.items;
      const sorteddataItem = dataItem.sort((a: { name: string }, b: { name: string }) => { if (a.name < b.name) { return -1; } if (a.name > b.name) { return 1; } return 0; });      
      setBrands(sorteddataItem || []);
      setLoadingAttributes(false);
    } catch (error) {
      console.error('Error fetching colors:', error);
      setLoadingAttributes(false);
    }
  }, []);

  const fetchMaterials = useCallback(async () => {
    setLoadingAttributes(true);

    try {
      const response = await fetch(`/api/basicsearch/materials`);
      const data = await response.json();
      const dataItem = data.items;
      const sorteddataItem = dataItem.sort((a: { name: string }, b: { name: string }) => { if (a.name < b.name) { return -1; } if (a.name > b.name) { return 1; } return 0; });      
      setMaterials(sorteddataItem || []);
      setLoadingAttributes(false);
    } catch (error) {
      console.error('Error fetching colors:', error);
      setLoadingAttributes(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return (
    <ProductLayout>
      <StaticMeta
        title={'Sanimex - Productos'}
        description={'Sanimex - Productos'}
        asPath={router.asPath}
        image="/favicon.ico"
      />

      <Container>
        <div className="mb-14 py-4">
          <Container>
            <div className="grid lg:grid-cols-4 gap-4 ">
              <div className="mb-6 lg:col-span-2 lg:col-start-2">
                <EasySearchProductSearchBox
                  search={router.query.q as string}
                  setQuery={(s) => handleQuery({ q: s })}
                />
              </div>
            </div>
            <div className={`grid lg:grid-cols-4 gap-4 relative`}>
              <div
                className={`${
                  mobileFilter
                    ? 'w-[320px] lg:w-full overflow-y-auto z-20 bg-white left-[-4px] top-0 pb-4 pl-4 pr-8 pt-[150px] lg:pt-0 h-screen fixed'
                    : 'hidden'
                } lg:block lg:static`}
              >
                {mobileFilter ? (
                  <div className="w-full flex justify-end pb-4">
                    <div className="pr-4 pt-4">
                      <button
                        onClick={() => {
                          setMobileFilter(false);
                        }}
                        className="relative w-[20px] h-[20px] lg:hidden"
                      >
                        <CrossClose />
                      </button>
                    </div>
                  </div>
                ) : null}
                <EasySearchAttributeList
                  selected={router.query.color as string}
                  items={colors}
                  title="Color"
                  onSelected={(value) => handleQuery({ color: value, page: 1 })}
                  loading={loadingAttributes}
                />

                <EasySearchAttributeList
                  selected={router.query.brand as string}
                  items={brands}
                  title="Marcas"
                  onSelected={(value) => handleQuery({ brand: value, page: 1 })}
                  loading={loadingAttributes}
                />

                <EasySearchAttributeList
                  selected={router.query.material as string}
                  items={materials}
                  title="Materiales"
                  onSelected={(value) =>
                    handleQuery({ material: value, page: 1 })
                  }
                  loading={loadingAttributes}
                />
              </div>
              <div className="lg:col-span-3 ">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 mb-[20px]">
                  <div className="col-span-full lg:col-span-3">
                    <div className="lg:flex justify-start lg:flex-row lg:justify-between relative mb-6 items-center ">
                      <EasySearchProductTotal total={total} loading={loading} />
                      <div className="flex max-w-auto justify-between items-center">
                        {mobileFilter && (
                          <div
                            className="fixed inset-0 bg-black bg-opacity-50 !z-[12]"
                            onClick={() => setMobileFilter(false)}
                          ></div>
                        )}
                        <div className="lg:order-1 order-2  flex flex-col lg:flex-row lg:absolute lg:right-0 z-10">
                          <span className="hidden lg:flex lg:self-center text-[16px] mt-1 montserrat-thin text-black pr-3 ">
                            Ordenar por:
                          </span>
                          <EasySearchProductSortBy
                            options={[
                              {
                                label: 'Seleccionar',
                                value: 'desc',
                              },
                              {
                                label: 'Menor Precio',
                                value: 'asc',
                              },
                              {
                                label: 'Mayor Precio',
                                value: 'desc',
                              },
                            ]}
                            currentRefinement={sortBy as string}
                            onSortChange={handleSortChange}
                          />
                        </div>
                        <div className="lg:order-2 order-1"></div>
                        <button
                          onClick={() => {
                            setMobileFilter(true);
                          }}
                          className="lg:hidden font-Century-Gothic flex text-[12px] text-black"
                        >
                          <div className="w-[20px] h-[20px] ml-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              className="pt-1"
                            >
                              <path
                                fill="#000"
                                d="M11.333 3.333a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM1.333 4h8a.667.667 0 0 0 0-1.333h-8a.667.667 0 0 0 0 1.333Zm4 2a2 2 0 0 0-1.88 1.333h-2.12a.667.667 0 0 0 0 1.334h2.12A2 2 0 1 0 5.333 6Zm9.334 1.333H9.333a.667.667 0 0 0 0 1.334h5.334a.667.667 0 1 0 0-1.334Zm-8 4.667H1.333a.666.666 0 1 0 0 1.333h5.334a.667.667 0 1 0 0-1.333Zm8 0h-2.12a2 2 0 1 0 0 1.333h2.12a.667.667 0 1 0 0-1.333Z"
                              ></path>
                            </svg>
                          </div>
                          <div className="montserrat-regular pl-2 text-[16px]">
                            Filtrar
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 mb-[20px]">
                    <div className="col-span-full">
                      <SkeletonTime />
                    </div>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 mb-[20px] gap-y-8 gap-x-4">
                    {products?.map((product, index) => (
                      <div key={index}>
                        <BasicSearchProducts product={product} />
                      </div>
                    ))}
                  </div>
                )}
                <ProductPaginate
                  currentPage={parseInt(router.query.page as string) || 1}
                  totalPages={Math.ceil(total / NUMBER_PRODUCTS_FOR_PAGE)}
                  onPageChange={(p) => handleQuery({ page: p })}
                />
              </div>
            </div>
          </Container>
        </div>
      </Container>
    </ProductLayout>
  );
};

export default ProductsPage;
