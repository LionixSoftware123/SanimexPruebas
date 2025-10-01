import React, { useEffect, useState } from 'react';
import { fetchGeolocationInfo, LocationType } from '@/utils/utils';
import Location from '@/images/location.svg';
import {
  setPostalCode,
  setCity,
} from '@/modules/geolocation/use-store-location';

const LocationDropdown: React.FC = () => {
  const [geolocation, setGeolocation] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<LocationType | undefined>(undefined);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      navigator.geolocation.getCurrentPosition((data: LocationType) => {
        setLocation(data);
        setCity(data);
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (location) {
        fetchGeolocationInfo(location).then((_geolocation) => {
          const address = _geolocation.results.find((result) =>
            result.address_components.find(
              (addressComponent) =>
                addressComponent.types.includes('locality') &&
                addressComponent.types.includes('political'),
            ),
          );

          if (address) {
            const city = address.address_components.find(
              (addressComponent) =>
                addressComponent.types.includes('locality') &&
                addressComponent.types.includes('political'),
            );
            const postalCode = address.address_components.find(
              (addressComponent) =>
                addressComponent.types.includes('postal_code'),
            );
            setGeolocation(city?.long_name);
            setPostalCode((postalCode as any)?.long_name);
          }
        });
      }
    }, 2000);
  }, [location]);

  useEffect(() => {
    setTimeout(() => {
      if (location) {
        fetchGeolocationInfo(location).then((_geolocation) => {
          const address = _geolocation.results.find((result) =>
            result.address_components.find((addressComponent) =>
              addressComponent.types.includes('postal_code'),
            ),
          );

          if (address) {
            const postalCode = address.address_components.find(
              (addressComponent) =>
                addressComponent.types.includes('postal_code'),
            );
            setPostalCode((postalCode as any)?.long_name);
          }
        });
      }
    }, 2000);
  }, [location]);

  return geolocation ? (
    <div className="z-10 relative inline-block text-left ">
      <div className="flex">
        <Location className="mr-2" />
        <div>
          <div>Estas comprando en:</div>
          <div className="font-Century-Gothic-Bold text-[10px]">
            {geolocation}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default LocationDropdown;
