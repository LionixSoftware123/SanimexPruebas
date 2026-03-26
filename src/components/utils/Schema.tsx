import React from 'react';
import { Product } from '@/utils/types/generated';

type SchemaProps = {
  product: Product;
  url?: string;
};

const Schema: React.FC<SchemaProps> = () => {
  // Ya no procesamos nada aquí para evitar errores de variables no usadas.
  // La lógica real ahora vive en _document.tsx
  return null;
};

export default Schema;
