import React from 'react';
import CollapseListSimple from '@/components/utils/CollapseListSimple';

interface Location {
  name: string;
  slug: string;
  number: number;
  state: string;
}

interface City {
  name: string;
  slug: string;
  number: number;
}

interface State {
  name: string;
  slug: string;
  cities: City[];
}

interface LocationSelectorProps {
  states: State[];
  actualLocation: Location;
  onLocationChange: (location: Location) => void;
  title: string;
  subtitle: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  states,
  actualLocation,
  onLocationChange,
  title,
  subtitle,
}) => {
  return (
    <div className="rounded-[10px] pb-[15px] shadow-md">
      <div className="px-[20px] h-[42px] flex place-items-center text-[14px] font-Century-Gothic bg-[#F5F5F5]">
        {title}
      </div>
      <div className="px-[20px] flex flex-col space-y-4">
        <div className="text-[#B2B2B2] text-[10px] py-2">{subtitle}</div>

        <button
          className={`text-start text-[14px] ${
            actualLocation.slug === 'todos' ? 'font-bold' : ''
          }`}
          onClick={() =>
            onLocationChange({
              name: 'Todos',
              slug: 'todos',
              number: 0,
              state: '',
            })
          }
        >
          Todas las sucursales
        </button>
        {states.map((state) => (
          <CollapseListSimple
            key={state.slug}
            name={`${state.name} (${state.cities.reduce(
              (acc, city) => acc + city.number,
              0,
            )})`}
            extraComponent={
              <div className="flex flex-col space-y-4">
                {state.cities.map((city) => (
                  <button
                    key={city.slug}
                    className={`text-start text-[14px] ${
                      actualLocation.slug === city.slug ? 'font-bold' : ''
                    }`}
                    onClick={() =>
                      onLocationChange({ ...city, state: state.slug })
                    }
                  >
                    {`${city.name} (${city.number})`}
                  </button>
                ))}
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default LocationSelector;
