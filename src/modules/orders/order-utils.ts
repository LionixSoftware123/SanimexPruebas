import { OrderStatusEnum } from '@/utils/types/generated';
export const getOrderStatus = (order: OrderStatusEnum | null) => {
  let status = 'Completado';

  switch (order) {
    case OrderStatusEnum.Failed:
      status = 'Fallido';
      break;
    case OrderStatusEnum.Completed:
      status = 'Completado';
      break;
    default:
      status = 'Pendiente';
  }

  return status;
};
