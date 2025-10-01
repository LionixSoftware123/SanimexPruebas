/* eslint-disable no-undef */
import React, { useState } from 'react';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from 'react-google-places-autocomplete';
import { GOOGLE_MAP_API_KEY } from '@/utils/constants';
import { SingleValue } from 'react-select';

type SelectGoogleAutocompleteProps = {
  onChange: (
    geoData: google.maps.LatLng | google.maps.LatLngLiteral | undefined,
  ) => void;
  onCountry: (country: string) => void;
};

const getAddressComponent = (data: google.maps.GeocoderResult[]) => {
  if (data.length) {
    const addressComponent = data[0].address_components.find(
      (addressComponent) => addressComponent.types.includes('country'),
    );
    if (addressComponent) return addressComponent.short_name;
  }
  return '';
};

const SelectGoogleAutocomplete: React.FC<SelectGoogleAutocompleteProps> = ({
  onChange,
  onCountry,
}) => {
  const [searchLocationValue, setSearchLocationValue] =
    useState<SingleValue<any>>(null);

  return (
    <GooglePlacesAutocomplete
      apiKey={GOOGLE_MAP_API_KEY}
      selectProps={{
        value: searchLocationValue,
        placeholder: 'Escribe tu dirección exacta',
        onChange: async (data) => {
          const placeId = data?.value.place_id;
          const geoData = await geocodeByPlaceId(placeId);
          const country = getAddressComponent(geoData);
          const { lat, lng } = await getLatLng(geoData[0]);
          setSearchLocationValue(data);
          onChange({ lat, lng });
          onCountry(country);
        },
        styles: {
          menu: (provided: any) => ({
            ...provided,
            zIndex: 100,
          }),
          input: (provided: any) => ({
            ...provided,
            font: 'inherit',
            fontSize: '16px',
            height: '40px',
            border: '1px solid transparent',
            outline: 'none',
          }),
          container: (provided: any) => ({
            ...provided,
            width: '100%',
          }),
          control: (provided: any) => ({
            ...provided,
            '&:hover': {
              border: '1px solid black',
              boxShadow: 'none',
            },
            border: '1px solid black',
            boxShadow: 'none',
          }),
        },
      }}
    />
  );
};

export default SelectGoogleAutocomplete;
