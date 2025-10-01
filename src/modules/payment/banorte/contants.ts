export type ThreeDSecureStatusCodeType = {
  102: string;
  201: string;
  421: string;
  422: string;
  423: string;
  425: string;
  426: string;
  430: string;
  431: string;
};

export type PayworkResultType = {
  R: string;
  D: string;
  A: string;
  T: string;
};

export const THREE_D_SECURE_STATUS_CODE: ThreeDSecureStatusCodeType = {
  102: 'Tarjeta Inválida',
  201: 'Se detecto un error general en el sistema',
  421: 'EL servicio 3D secure no esta disponible',
  422: 'Hubo un problema genérico al momento de realizar la Autenticación',
  423: 'La autenticación no fue exitosa',
  425: 'Autenticación invalida',
  426: 'Afiliación no encontrada',
  430: 'Tarjeta de crédito nulo',
  431: 'Fecha de expiración nulo',
};

export const PAYWORK_RESULTS: PayworkResultType = {
  R: 'Transacción rechazada',
  D: 'Transacción declinada',
  A: 'Transacción aprobada',
  T: 'Transacción sin respuesta',
};
