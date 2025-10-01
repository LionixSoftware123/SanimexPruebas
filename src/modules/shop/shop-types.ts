export type ShopType = {
  ID: number;
  TIENDA: string;
  CALLE: string;
  COLONIA: string;
  CP: number;
  CIUDAD: string;
  ESTADO: string;
  TELÉFONOS: { key: string; value: string }[];
  LOCATION: {
    lng: number;
    lat: number;
  };
};
