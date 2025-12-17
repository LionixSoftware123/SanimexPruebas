import { createState } from '@cobuildlab/react-simple-state';
import { EstadosType } from '@/utils/estados-types';

export const selectedState = createState<{ estado: EstadosType | undefined }>({
  initialValue: {
    estado: undefined,
  },
});
