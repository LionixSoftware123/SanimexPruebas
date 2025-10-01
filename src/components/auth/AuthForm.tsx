import React, { useState } from 'react';
import IconEmailLogin from '@/images/icon-email-login.svg';
import dynamic from 'next/dynamic';
import Link from 'next/link';
// import FacebookButton from '@/components/auth/components/FacebookButton';
const GoogleButton = dynamic(
  () => import('@/components/auth/components/GoogleButton'),
);

type AuthFormProps = {
  onRegisterStep: () => void;
  onLoginStep: () => void;
  onRedirect: () => void;
};
const AuthForm: React.FC<AuthFormProps> = ({
  onRegisterStep,
  onLoginStep,
  onRedirect,
}) => {
  const [isRegister] = useState<boolean>(true);
  const [changePassword] = useState(false);

  const [newPassword] = useState('');
  const [confirmPassword] = useState('');

  type UserDataPassword = {
    newPassword: string;
    repeatNewPassword: string;
    users: any;
  };

  const [data, setData] = useState<UserDataPassword>({
    newPassword: '',
    repeatNewPassword: '',
    users: null,
  });

  return (
    <div>
      {changePassword ? (
        <div className="flex flex-col space-y-4 mb-4">
          <div className="text-[20px] text-[#1C355E] inline-flex mx-auto pb-4 ">
            Cambiar contraseña
          </div>
          <div className="mx-auto pb-4">
            <input
              className="w-[287px] h-[45px] border border-[#CCCCCC] px-6"
              placeholder="Ingresa una contraseña nueva"
              name="newpassword"
              onChange={(event) =>
                setData({ ...data, [event.target.name]: event.target.value })
              }
            />
          </div>
          <div className="mx-auto pb-4">
            <input
              className="w-[287px] h-[45px] border border-[#CCCCCC] px-6"
              placeholder="Confirma tu contraseña nueva"
              name="confirmpassword"
              onChange={(event) =>
                setData({ ...data, [event.target.name]: event.target.value })
              }
            />
          </div>
          <div className="mx-auto">
            <button
              className={`flex justify-center w-[290px] h-[47px]  ${
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword
                  ? 'bg-[#6285a1]'
                  : 'bg-[#1C355E] cursor-pointer'
              }`}
            >
              <div className="uppercase flex self-center text-[11px] font-Century-Gothic-Bold text-white">
                Cambiar contraseña
              </div>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex  text-[#1C355E]"></div>
          <div className="text-[16px] place-items-center flex flex-col text-[#999999] px-5  space-y-[15px]">
            <GoogleButton onSuccess={onRedirect} />
            {/*<FacebookButton onSuccess={onRedirect} />*/}
            <button
              onClick={() => (isRegister ? onLoginStep() : onRegisterStep())}
              className="flex w-full items-center h-[45px] border border-[#CCCCCC]"
            >
              <div className=" flex space-x-[10px] text-start  w-[230px] mx-auto justify-center">
                <div className="flex self-center w-[17px] h-[17px]">
                  <IconEmailLogin />
                </div>
                <span className="font-bold font-sans uppercase text-[0.7rem] lg:text-[1rem]">
                  Continua con tu Email
                </span>
              </div>
            </button>
          </div>
          <div className="text-center pt-2 text-black font-sans">
            {isRegister ? '¿No tienes cuenta?' : '¿Ya tienes una cuenta?'}
          </div>

          <div className="text-center py-4 text-black font-sans">
            {isRegister ? (
              <Link
                href={'auth'}
                color="inherit"
                className="font-bold text-[#1c355e]"
              >
                Regístrate
              </Link>
            ) : (
              '¿Ya tienes una cuenta?'
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AuthForm;
