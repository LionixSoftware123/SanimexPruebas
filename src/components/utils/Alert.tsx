import React, { useRef, Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import IconWhatsapp from '@/images/icon-whatsapp-modal.svg';
import { errorMessages } from '@/utils/errorMessages';

type Props = {
  statusCode?: string;
  message?: string;
};
const Alert: React.FC<Props> = ({ statusCode, message }) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  useEffect(() => {
    if (statusCode || message) {
      setOpen(true);
    }
  }, [statusCode, message]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999]"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-[10] overflow-y-auto">
          <div className="flex min-h-full justify-center p-2 md:p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="py-8 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[450px] ">
                <div className=" bg-white   px-4   ">
                  <Dialog.Title
                    as="h1"
                    className="text-[24px] text-[#E85E6D] pb-2 font-Century-Gothic-Bold leading-6 text-[#555555]  text-center"
                  >
                    Ups, Algo salio mal
                  </Dialog.Title>
                  <Dialog.Description>
                    <div className="bg-white   mt-2">
                      <div className="text-[16px] text-[18px] text-center pb-4">
                        No pudimos procesar tu pago
                      </div>
                      {statusCode ? (
                        <div className="text-center">
                          {' '}
                          <span className="font-bold">Codigo de Error: </span>
                          {statusCode}
                        </div>
                      ) : null}
                      {message ? (
                        <div className="text-center">
                          {' '}
                          <span className="font-bold">Mensaje de error: </span>
                          {message}
                        </div>
                      ) : null}

                      <div className="py-2 hidden">
                        <span className="font-bold">
                          Información adicional:
                        </span>
                        <div className="pt-2">
                          {errorMessages[statusCode ?? ''] || message}
                        </div>
                      </div>
                    </div>
                  </Dialog.Description>
                </div>

                <div className=" flex flex-col space-y-4 py-4 lg:space-y-0 lg:space-x-2 mx-auto lg:flex-row justify-center items-center w-[240px] lg:w-full">
                  <button
                    className="border w-[150px] border-[#1C355E] justify-center hover:bg-[#0033A1] hover:text-white  lg:mb-0  rounded-[5px] bg-white  h-[45px] flex items-center text-[#1C355E] text-[12px] px-8"
                    onClick={() => setOpen(false)}
                  >
                    Volver
                  </button>
                  <a
                    href={`https://api.whatsapp.com/send?phone=5215581353955&text=Necesito%20ayuda%2C%20mi%20pago%20no%20se%20complet%C3%B3.%20${
                      statusCode ? 'Codigo%20de%20error%3A%20' + statusCode : ''
                    }${message ? 'Mensaje%20de%20error%3A%20' + message : ''}`}
                    className={`rounded-[5px] border border-[#0033A1] w-[150px]  h-[45px]  flex justify-center items-center text-[#0033A1] text-[11px] px-4`}
                    target="_blank"
                  >
                    <div className="flex self-center w-[20px] h-[20px] mr-2">
                      <IconWhatsapp />
                    </div>
                    <div className=" flex self-center text-center">
                      Contactar
                    </div>
                  </a>
                </div>
                <div className="text-center px-4">
                  Contactate con nuestros asesores de venta, si necesita ayuda.
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Alert;
