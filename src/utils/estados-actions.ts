import { createStateAction } from '@cobuildlab/react-simple-state';
import { selectedState } from '@/utils/estados-events';
import { EstadosType } from '@/utils/estados-types';

export const selectedStateAction = createStateAction(
  selectedState,
  (prev, estado: EstadosType) => ({
    ...prev,
    estado,
  }),
);
