import React, { Fragment, useState } from 'react';
import CrossClose from '@/images/crossClose.svg';
import { Menu, Transition } from '@headlessui/react';
import Profile from '@/images/profile-1.svg';
import { AuthSteps } from '@/modules/auth/auth-constants';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUserHook } from '@/modules/auth/user-hooks';
import { useToasts } from 'react-toast-notifications';

const AuthForm = dynamic(() => import('@/components/auth/AuthForm'));
const AuthRegisterForm = dynamic(
  () => import('@/components/auth/AuthRegisterForm'),
);
const AuthLoginForm = dynamic(() => import('@/components/auth/AuthLoginForm'));

const QuickLogin: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AuthSteps>();
  const {
    state: { user },
  } = useUserHook();
  let content = <></>;
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  let preLoginUrl = '';
  if (typeof window !== 'undefined') {
    preLoginUrl = localStorage.getItem('preLoginUrl') || '/';
  }

  const handleCloseModal = () => {
    setOpen(false);
    router.push(preLoginUrl);
  };

  const { addToast } = useToasts();

  const HandleLoginCloseModal = () => {
    setOpen(false);
    router.push(preLoginUrl);
    addToast('Bienvenido a Sanimex, gracias por iniciar sesión', {
      appearance: 'success',
    });
  };

  switch (currentStep) {
    case AuthSteps.AuthRegister:
      content = <AuthRegisterForm onSuccess={handleCloseModal} />;
      break;
    case AuthSteps.AuthLogin:
      content = <AuthLoginForm onSuccess={HandleLoginCloseModal} />;
      break;

    default:
      content = (
        <AuthForm
          onRedirect={() => router.reload()}
          onRegisterStep={() => setCurrentStep(AuthSteps.AuthRegister)}
          onLoginStep={() => setCurrentStep(AuthSteps.AuthLogin)}
        />
      );
      break;
  }

  return (
    <Menu as="div" className="relative flex">
      {user ? (
        <Link href={'/usuario'} prefetch>
          <Profile />
        </Link>
      ) : (
        <Menu.Button onClick={() => setOpen(!open)}>
          <Profile />
        </Menu.Button>
      )}
      <Transition
        show={open}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-[-48px] top-[20px] md:right-0 z-10 mt-2 w-[350px] origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-[#005FC5]">
          <div className=" flex justify-end px-4 py-4 text-[14px] font-Century-Gothic border-b border-b-[#C1C1C1]">
            <div className=" relative flex  h-[9px] w-[9px]">
              <Menu.Button
                onClick={() => {
                  setOpen(!open);
                  setCurrentStep(AuthSteps.Auth);
                }}
              >
                <div className="w-[12px] h-[12px] text-black flex self-center">
                  <CrossClose />
                </div>
              </Menu.Button>
            </div>
          </div>
          <div className="py-[20px] text-[14px] font-Century-Gothic px-4">
            {content}
            {currentStep === AuthSteps.AuthRegister ? (
              <div
                onClick={() => {
                  setCurrentStep(AuthSteps.AuthLogin);
                }}
                color="inherit"
                className="font-bold text-[#1c355e] text-center font-sans py-2 cursor-pointer"
              >
                Iniciar sesión
              </div>
            ) : currentStep === AuthSteps.AuthLogin ? (
              <div
                onClick={() => {
                  setCurrentStep(AuthSteps.AuthRegister);
                }}
                color="inherit"
                className="font-bold text-[#1c355e] text-center font-sans py-2 cursor-pointer"
              >
                No tienes una cuenta?
              </div>
            ) : (
              <></>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default QuickLogin;
