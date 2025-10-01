import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { dataStates, stateMapping } from '@/utils/states';
import SearchBar from '@/components/shops/SearchBar';
import LocationSelector from '@/components/shops/LocationSelector';
import BranchList from '@/components/shops/BranchList';

const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));
const Container = dynamic(() => import('@/components/utils/Container'));
const ShareBox = dynamic(() => import('@/components/utils/ShareBox'));

// Agrupar las sucursales por estado y ciudad
const groupedByStateAndCity = dataStates.reduce((acc: any, sucursal) => {
  const { state, city } = sucursal;
  const cityValue = (city as any).value;
  if (!acc[state]) {
    acc[state] = {};
  }
  if (!acc[state][cityValue]) {
    acc[state][cityValue] = [];
  }
  acc[state][cityValue].push(sucursal);
  acc[state][cityValue].sort((a: any, b: any) => a.name.localeCompare(b.name));
  return acc;
}, {});

// Crear el objeto states con el formato adecuado
const states = Object.entries(groupedByStateAndCity).map(([state, cities]) => {
  const typedState = state as keyof typeof stateMapping;
  return {
    name: stateMapping[typedState] || state,
    slug: state,
    cities: Object.entries(cities as Record<string, any[]>)
      .map(([city, sucursales]) => {
        const cityLabel = sucursales[0]?.city?.label || city;
        return {
          name: cityLabel,
          slug: city,
          number: sucursales.length,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name)), // Ordenar por nombre de ciudad
  };
});

const Locations: React.FC = () => {
  const [actualLocation, setActualLocation] = useState({
    name: 'Todos',
    slug: 'todos',
    number: 0,
    state: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const router = useRouter();

  // const synonyms: { [key: string]: string } = {
  //   santa: 'sta',
  //   avenida: 'av',
  //   colonia: 'col',
  //   estado: 'edo',
  //   postal: 'cp',
  //   numero: 'no.',
  // };

  useEffect(() => {
    const getFilteredData = () => {
      let newData: any[] = [];
      const { slug, state }: any = actualLocation;

      if (slug !== 'todos' && searchTerm === '') {
        newData =
          groupedByStateAndCity[state][slug]?.sort((a: any, b: any) =>
            a.name.localeCompare(b.name),
          ) || [];
      } else if (slug !== 'todos' && searchTerm !== '') {
        newData =
          groupedByStateAndCity[state][slug]
            ?.filter((item: any) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .sort((a: any, b: any) => a.name.localeCompare(b.name)) || [];
      } else if (slug === 'todos' && searchTerm !== '') {
        newData = Object.values(groupedByStateAndCity)
          .flatMap((state: any) => Object.values(state).flat())
          .filter((item: any) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .sort((a: any, b: any) => a.name.localeCompare(b.name));
      } else {
        newData = Object.values(groupedByStateAndCity)
          .flatMap((state: any) => Object.values(state).flat())
          .sort((a: any, b: any) => a.name.localeCompare(b.name));
      }

      setFilteredData(newData as any);
    };

    getFilteredData();
  }, [actualLocation, searchTerm]);

  return (
    <RootLayout>
      <StaticMeta
        title="Sanimex - Sucursales"
        description="Sanimex - Sucursales"
        asPath={router.asPath}
        image="/src/images/logo-gam.svg"
      />
      <div className="relative h-[200px] md:h-[340px] bg-cover bg-no-repeat bg-center bg-[url('../images/banner-tiendas.png')]">
        <Container classes="w-full h-full flex items-end">
          <div className="uppercase font-Skia font-[700] text-[30px] md:text-[54px] text-white">
            Sucursales
          </div>
        </Container>
      </div>
      <Container>
        <div className="grid grid-cols-12 gap-4 my-[50px]">
          <div className="col-span-full lg:col-span-3">
            <SearchBar
              title="Buscador"
              subtitle="Busca sucursales segun su nombre en tu estado "
              searchTerm={searchTerm}
              onSearch={setSearchTerm}
            />
            <LocationSelector
              title="Estado"
              subtitle="Encuentra sucursales en tu estado"
              states={states}
              actualLocation={actualLocation}
              onLocationChange={(location) => {
                setActualLocation(location);
                setSearchTerm('');
              }}
            />
          </div>
          <div className="col-span-full lg:col-span-9">
            <div className="pb-4 text-[25px] text-[#333E48] font-Century-Gothic-Bold">
              {searchTerm ? 'Buscar por: ' + searchTerm : actualLocation.name}
            </div>

            <div className="col-span-full py-[20px]">
              <BranchList filteredData={filteredData} />
            </div>
          </div>
        </div>
        <ShareBox />
      </Container>
    </RootLayout>
  );
};

export default Locations;
