import React, { useState } from 'react';
import { useLoginMutation } from '@/utils/types/generated';
import { useToasts } from 'react-toast-notifications';
import { useCookies } from 'react-cookie';
import moment from 'moment/moment';
import { DOMAIN_SITE } from '@/utils/constants';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Box } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

type AuthLoginFormData = {
  email?: string;
  password?: string;
};

type AuthLoginFormProps = {
  onSuccess?: () => void;
};

const AuthLoginForm: React.FC<AuthLoginFormProps> = ({ onSuccess }) => {
  const [eye, setEye] = useState(false);
  const [, setCookie] = useCookies([
    'jwtAuthToken',
    'jwtRefreshToken',
    'wooSessionToken',
    'refreshWooSessionToken',
  ]);

  const { addToast } = useToasts();
  const [data, setData] = useState<AuthLoginFormData>({
    password: '',
    email: '',
  });
  const router = useRouter();

  const [loginUser, { loading }] = useLoginMutation({
    onCompleted: (data) => {
      setCookie('jwtAuthToken', data.login?.user?.jwtAuthToken, {
        expires: new Date(
          parseInt(data.login?.user?.jwtAuthExpiration as string) * 1000,
        ),
        path: '/',
        domain: DOMAIN_SITE,
      });

      setCookie('jwtRefreshToken', data.login?.user?.jwtRefreshToken, {
        expires: moment().add(1, 'year').toDate(),
        path: '/',
        domain: DOMAIN_SITE,
      });

      onSuccess && onSuccess();
    },
    onError: (data) => {
      let errorMessage = data.message;
      if (data.message === 'incorrect_password') {
        errorMessage = 'La contraseña es incorrecta';
      } else if (data.message === 'invalid_email') {
        errorMessage = 'El correo no está registrado';
      } else if (
        data.message.includes('El usuario o contraseña es incorrecto')
      ) {
        errorMessage = 'El usuario o contraseña es incorrecto';
      }

      addToast(
        <div>
          <div dangerouslySetInnerHTML={{ __html: errorMessage }}></div>
        </div>,
        {
          appearance: 'error',
        },
      );
    },
  });

  const handleRegister = () => {
    const checkField = Object.keys(data).find(
      (_data) => data[_data as keyof AuthLoginFormData] === '',
    );

    if (checkField) {
      addToast('Todos los campos son requeridos', {
        appearance: 'error',
      });
    }
    loginUser({
      variables: {
        input: {
          username: data?.email as string,
          password: data?.password as string,
        },
      },
    });
  };

  const [showRecover, setShowRecover] = useState(false);

  const [showInputCode, setShowInputCode] = useState(false);

  const [codeRestore, setCodeRestore] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailRestore, setEmailRestore] = useState('');
  const [showEmailRestore, setshowEmailRestore] = useState(false);

  const handleRecoverClick = () => {
    setShowRecover(!showRecover);
    setshowEmailRestore(!showEmailRestore);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailRestore(event.target.value);
  };

  const handleCodeRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 4) {
      setCodeRestore(event.target.value);
    }
  };

  const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleRecoverPassword = async (emailRestore: string) => {
    try {
      const response = await axios.post('/api/reset-password-user', {
        email: emailRestore,
      });

      console.log(response.data);

      setShowInputCode(true);
      setshowEmailRestore(false);

      addToast(
        response.data.message ||
          'Se ha enviado un correo electrónico de recuperación de contraseña. Por favor, revisa tu correo electrónico.',
        {
          appearance: 'success',
        },
      );
    } catch (error) {
      addToast(
        'No se pudo enviar el correo electrónico para restablecer la contraseña',
        {
          appearance: 'error',
        },
      );
    }
  };

  const handleChangeNewPassword = async (
    emailRestore: string,
    codeRestore: string,
    newPassword: string,
  ) => {
    try {
      console.log('email new password', emailRestore);

      const response = await axios.post('/api/reset-password-new', {
        email: emailRestore,
        code: codeRestore,
        password: newPassword,
      });

      if (response.data && response.data.message) {
        addToast(
          response.data.message ||
            'Contraseña cambiada correctamente, por favor inicia sesión',
          {
            appearance: 'success',
          },
        );
      } else {
        throw new Error('No se recibió una respuesta válida de la API');
      }

      router.push('/');
    } catch (error) {
      addToast('Error al cambiar la contraseña, por favor intenta de nuevo', {
        appearance: 'error',
      });
      console.error('Error:', error);
    }
  };

  return (
    //  <div>
    //   <div className="flex  text-[#1C355E]">
    //     {!showRecover ? (
    //       <div className="text-[20px] text-[#1C355E] inline-flex mx-auto pb-8 ">
    //         {showInputCode ? 'Tu nuevo título' : ''}
    //       </div>
    //     ) : (
    //       <div className="text-[20px] text-[#1C355E] inline-flex mx-auto pb-8 ">
    //         {showInputCode ? 'Inserta el Código' : 'Recuperar contraseña'}
    //       </div>
    //     )}
    //   </div>
    //   <div className="text-[16px] place-items-center flex flex-col text-[#999999] px-5  space-y-[15px]">
    //     {showInputCode ? (
    //       <>
    //         <div>
    //           <input
    //             className="w-[287px] h-[45px] border border-[#CCCCCC] px-6"
    //             placeholder={'Insertar codigo'}
    //             name="codeRestore"
    //             value={codeRestore}
    //             onChange={handleCodeRestore}
    //             type="number"
    //           />
    //         </div>

    //         <div>
    //           <input
    //             className="w-[287px] h-[45px] border border-[#CCCCCC] px-6 bg-gray-100"
    //             placeholder={'Ingresa tu email'}
    //             name="newEmailRecover"
    //             value={emailRestore}
    //             type="disabled"
    //           />
    //         </div>

    //         <div>
    //           <input
    //             className="w-[287px] h-[45px] border border-[#CCCCCC] px-6"
    //             placeholder={'Insertar nueva contraseña'}
    //             name="newPassword"
    //             value={newPassword}
    //             onChange={handleNewPassword}
    //           />
    //         </div>
    //       </>
    //     ) : (
    //       <></>
    //     )}

    //     {!showRecover ? (
    //       <>
    //         <div className="flex">
    //           <input
    //             className="w-[287px] h-[45px] border border-[#CCCCCC] px-6"
    //             placeholder={'Email'}
    //             name="email"
    //             onChange={(event) => {
    //               setData({
    //                 ...data,
    //                 [event.target.name]: event.target.value,
    //               });
    //             }}
    //           />
    //         </div>
    //         <div className="relative w-[287px] h-[45px]">
    //           <input
    //             className="w-[287px] h-[45px] border border-[#CCCCCC] px-6"
    //             placeholder={'Contraseña'}
    //             type={eye ? 'text' : 'password'}
    //             name="password"
    //             onChange={(event) => {
    //               setData({
    //                 ...data,
    //                 [event.target.name]: event.target.value,
    //               });
    //             }}
    //           />
    //           <button
    //             className="absolute top-[15px] left-[250px]"
    //             onClick={() => setEye(!eye)}
    //           >
    //             {eye ? <IconEye /> : <IconEyeSlash />}
    //           </button>
    //         </div>
    //       </>
    //     ) : (
    //       <div></div>
    //     )}

    //     {showRecover && showEmailRestore ? (
    //       <>
    //         <div>
    //           <input
    //             className="w-[287px] h-[45px] border border-[#CCCCCC] px-6"
    //             placeholder={'Email a recuperar'}
    //             name="emailRestore"
    //             value={emailRestore}
    //             onChange={handleEmailChange}
    //           />
    //         </div>
    //       </>
    //     ) : (
    //       <></>
    //     )}

    //     {!showRecover ? (
    //       <div
    //         className="flex items-center cursor-pointer py-2"
    //         onClick={handleRecoverClick}
    //       >
    //         <span>¿Olvidaste tu contraseña?</span>
    //       </div>
    //     ) : (
    //       <div
    //         className="flex items-center cursor-pointer py-2"
    //         onClick={handleRecoverClick}
    //       >
    //         <span>Iniciar Sesion</span>
    //       </div>
    //     )}
    //     <div
    //       className="flex items-center cursor-pointer"
    //       onClick={() => onBack && onBack()}
    //     >

    //     </div>
    //     <div>
    //       {!showRecover ? (
    //         <button
    //           disabled={loading}
    //           onClick={() => handleRegister()}
    //           className="flex justify-center w-[210px] h-[47px] bg-[#1C355E] cursor-pointer"
    //         >
    //           {loading ? (
    //             <div className="flex items-center justify-center w-full">
    //               <span className="my-3">
    //                 <svg
    //                   aria-hidden="true"
    //                   className="inline w- h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
    //                   viewBox="0 0 100 101"
    //                   fill="none"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
    //                     fill="currentColor"
    //                   />
    //                   <path
    //                     d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
    //                     fill="currentFill"
    //                   />
    //                 </svg>
    //               </span>
    //             </div>
    //           ) : (
    //             <div className="uppercase flex self-center text-[11px] font-Century-Gothic-Bold text-white">
    //               SIGUIENTE
    //             </div>
    //           )}
    //         </button>
    //       ) : showInputCode ? (
    //         <button
    //           disabled={loading}
    //           onClick={() =>
    //             handleChangeNewPassword(emailRestore, codeRestore, newPassword)
    //           }
    //           className="flex justify-center w-[210px] h-[47px] bg-[#1C355E] cursor-pointer"
    //         >
    //           <div className="uppercase flex self-center text-[11px] font-Century-Gothic-Bold text-white">
    //             Cambiar contraseña
    //           </div>
    //         </button>
    //       ) : (
    //         <button
    //           disabled={loading}
    //           onClick={() => handleRecoverPassword(emailRestore)}
    //           className="flex justify-center w-[210px] h-[47px] bg-[#1C355E] cursor-pointer"
    //         >
    //           {loading ? (
    //             <div className="flex items-center justify-center w-full">
    //               <span className="my-3">
    //                 <svg
    //                   aria-hidden="true"
    //                   className="inline w- h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
    //                   viewBox="0 0 100 101"
    //                   fill="none"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
    //                     fill="currentColor"
    //                   />
    //                   <path
    //                     d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
    //                     fill="currentFill"
    //                   />
    //                 </svg>
    //               </span>
    //             </div>
    //           ) : (
    //             <div className="uppercase flex self-center text-[11px] font-Century-Gothic-Bold text-white">
    //               Recuperar contraseña
    //             </div>
    //           )}
    //         </button>
    //       )}
    //     </div>
    //     {!showRecover ? (
    //       <div className="font-sans text-center text-[#999999]">
    //         Al registrarte estás aceptando nuestros
    //       </div>
    //     ) : (
    //       <div></div>
    //     )}
    //   </div>
    // </div>

    <>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          {showInputCode ? (
            <>
              <Box my={2}>
                <TextField
                  variant="outlined"
                  placeholder={'Insertar codigo'}
                  name="codeRestore"
                  value={codeRestore}
                  onChange={handleCodeRestore}
                  type="number"
                  fullWidth
                />
              </Box>

              <Box my={2}>
                <TextField
                  variant="outlined"
                  placeholder={'Ingresa tu email'}
                  name="newEmailRecover"
                  value={emailRestore}
                  type="disabled"
                  fullWidth
                />
              </Box>
              <Box my={2}>
                <TextField
                  variant="outlined"
                  placeholder={'Insertar nueva contraseña'}
                  name="newPassword"
                  value={newPassword}
                  onChange={handleNewPassword}
                  fullWidth
                />
              </Box>
            </>
          ) : (
            <></>
          )}
          {!showRecover ? (
            <>
              <Box my={2}>
                <TextField
                  variant="outlined"
                  placeholder={'Email'}
                  name="email"
                  onChange={(event) => {
                    setData({
                      ...data,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box my={2}>
                <TextField
                  variant="outlined"
                  placeholder={'Contraseña'}
                  type={eye ? 'text' : 'password'}
                  name="password"
                  onChange={(event) => {
                    setData({
                      ...data,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faKey} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setEye(!eye)}
                        >
                          {eye ? (
                            <FontAwesomeIcon
                              icon={faEye}
                              height={18}
                              width={18}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faEyeSlash}
                              height={18}
                              width={18}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </>
          ) : (
            <div></div>
          )}
        </Grid>
        {showRecover && showEmailRestore ? (
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              placeholder={'Email a recuperar'}
              name="emailRestore"
              value={emailRestore}
              onChange={handleEmailChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        ) : (
          <></>
        )}

        <Grid item xs={12}>
          <Box textAlign="center">
            {!showRecover ? (
              <Button
                disabled={loading}
                onClick={() => handleRegister()}
                variant="contained"
                size="large"
                color="secondary"
                fullWidth
                style={{
                  background: '#1C355E',
                  boxShadow: 'none',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                {loading ? 'Cargando...' : 'SIGUIENTE'}
              </Button>
            ) : showInputCode ? (
              <Button
                disabled={loading}
                onClick={() =>
                  handleChangeNewPassword(
                    emailRestore,
                    codeRestore,
                    newPassword,
                  )
                }
                variant="contained"
                size="large"
                color="secondary"
                fullWidth
              >
                Cambiar contraseña
              </Button>
            ) : (
              <Button
                disabled={loading}
                onClick={() => handleRecoverPassword(emailRestore)}
                variant="contained"
                size="large"
                color="secondary"
                fullWidth
                style={{
                  background: '#1C355E',
                  boxShadow: 'none',
                  fontWeight: 700,
                }}
              >
                {loading ? 'Cargando...' : 'Recuperar contraseña'}
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          {!showRecover ? (
            <Box
              className="flex items-center cursor-pointer py-2 justify-center"
              onClick={handleRecoverClick}
            >
              <span className="font-sans font-bold text-[#1c355e]">
                ¿Olvidaste tu contraseña?
              </span>
            </Box>
          ) : (
            <Box
              className="flex items-center cursor-pointer py-2 justify-center flex-col"
              onClick={handleRecoverClick}
            >
              <span className="font-sans  pb-4 text-[#999999]">
                ¿Recuerdas tu cuenta?
              </span>

              <span className="font-sans font-bold text-[#1c355e]">
                INICIAR SESIÓN
              </span>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} mb={1}>
          {!showRecover ? (
            <>
              <Box className="font-sans text-center text-[#999999]">
                Al registrarte estás aceptando nuestros
              </Box>
              <Box className="font-sans text-center text-[#999999]">
                <Link
                  href={'terminos-y-condiciones'}
                  color="inherit"
                  className="font-bold text-[#1c355e] no-underline"
                >
                  Términos y Condiciones
                </Link>
              </Box>
            </>
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default AuthLoginForm;
