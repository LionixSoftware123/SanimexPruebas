import React, { useState } from 'react';
import { useRegisterMutation, useLoginMutation } from '@/utils/types/generated';
import { useToasts } from 'react-toast-notifications';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faKey,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

type AuthRegisterFormData = {
  email?: string;
  displayName?: string;
  password?: string;
};

type AuthRegisterFormProps = {
  onSuccess?: () => void;
};

const AuthRegisterForm: React.FC<AuthRegisterFormProps> = ({ onSuccess }) => {
  const [eye, setEye] = useState(false);
  const { addToast } = useToasts();
  const [, setCookie] = useCookies([
    'jwtAuthToken',
    'jwtRefreshToken',
    'wooSessionToken',
    'refreshWooSessionToken',
  ]);

  const [data, setData] = useState<AuthRegisterFormData>({
    displayName: '',
    password: '',
    email: '',
  });

  const saveCookies = (user: any) => {
    if (user?.jwtAuthToken) {
      setCookie('jwtAuthToken', user?.jwtAuthToken, {
        expires: new Date(parseInt(user?.jwtAuthExpiration as string) * 1000),
        path: '/',
        secure: true,
        sameSite: 'lax',
      });
    }

    if (user?.jwtRefreshToken) {
      setCookie('jwtRefreshToken', user?.jwtRefreshToken, {
        path: '/',
        secure: true,
        sameSite: 'lax',
      });
    }

    if (user?.wooSessionToken) {
      try {
        const decodeToken = jwtDecode<{
          data: { user: { id: string } };
          exp?: number;
        }>(user?.wooSessionToken as string);

        setCookie('wooSessionToken', user?.wooSessionToken, {
          expires: new Date((decodeToken.exp as number) * 1000),
          path: '/',
          secure: true,
          sameSite: 'lax',
        });

        setCookie('refreshWooSessionToken', user?.wooSessionToken, {
          expires: moment().add(1, 'year').toDate(),
          path: '/',
          secure: true,
          sameSite: 'lax',
        });
      } catch (e) {
        console.error("Error decoding wooSessionToken", e);
      }
    }
  };

  const [login, { loading: loginLoading }] = useLoginMutation({
    onCompleted: (loginData) => {
      const loginUser = loginData.login?.user;
      if (loginUser?.jwtAuthToken) {
        saveCookies(loginUser);
        onSuccess && onSuccess();
      }
    },
    onError: (error) => {
      console.error("Error final en login:", error.message);
      addToast('Usuario listo. Por favor, intenta el ingreso manual.', { appearance: 'info' });
    }
  });

  // --- LÓGICA DE REGISTRO CON RECORTE DE USERNAME ---
  const [registerUser, { loading: registerLoading }] = useRegisterMutation({
    onCompleted: () => {
      // Sacamos el username (lo anterior al @) porque WP así lo guarda
      const generatedUsername = data.email?.split('@')[0] || (data.email as string);
      
      console.log(`Registro OK. Intentando login con user: ${generatedUsername}`);
      
      setTimeout(() => {
        login({
          variables: {
            input: {
              username: generatedUsername,
              password: data.password as string,
            },
          },
        });
      }, 1500);
    },
    onError: (error) => {
      const isRecoverable = 
        error.message.includes('400') || 
        error.message.includes('token') || 
        error.message.includes('already exists') ||
        error.message.includes('registered');

      if (isRecoverable) {
        const generatedUsername = data.email?.split('@')[0] || (data.email as string);
        console.log(`Error recuperable. Reintentando login con: ${generatedUsername}`);
        
        setTimeout(() => {
          login({
            variables: {
              input: {
                username: generatedUsername,
                password: data.password as string,
              },
            },
          });
        }, 1500);
      } else {
        addToast(<div dangerouslySetInnerHTML={{ __html: error.message }} />, { appearance: 'error' });
      }
    },
  });

  const handleRegister = () => {
    if (!data.email || !data.password || !data.displayName) {
      addToast('Todos los campos son requeridos', { appearance: 'warning' });
      return;
    }

    registerUser({
      variables: {
        input: {
          username: data.email as string,
          password: data.password as string,
          email: data.email as string,
          firstName: data.displayName as string,
        },
      },
    });
  };

  const isLoading = registerLoading || loginLoading;

  return (
    <div className="text-[16px] place-items-center flex flex-col text-[#999999] px-5 space-y-[15px]">
      <TextField
        className="w-full h-[45px]"
        variant="outlined"
        placeholder={'Email'}
        name="email"
        value={data.email}
        onChange={(event) => setData({ ...data, email: event.target.value })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faEnvelope} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className="w-full h-[45px]"
        variant="outlined"
        placeholder={'Nombre'}
        name="displayName"
        value={data.displayName}
        onChange={(event) => setData({ ...data, displayName: event.target.value })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faUser} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className="w-full h-[45px]"
        variant="outlined"
        placeholder={'Contraseña'}
        type={eye ? 'text' : 'password'}
        name="password"
        value={data.password}
        onChange={(event) => setData({ ...data, password: event.target.value })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faKey} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setEye(!eye)}>
                <FontAwesomeIcon icon={eye ? faEye : faEyeSlash} height={18} width={18} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <div style={{ width: '100%' }}>
        <Button
          disabled={isLoading}
          onClick={handleRegister}
          variant="contained"
          className="mt-4 flex justify-center h-[47px] bg-[#1C355E] text-white font-bold w-full"
          style={{ background: '#1C355E', color: 'white', fontWeight: 700 }}
        >
          {isLoading ? 'PROCESANDO...' : 'SIGUIENTE'}
        </Button>
      </div>
      
      <div className="font-sans text-center text-[#999999] mt-4 text-[12px]">
        Al registrarte aceptas nuestros términos y condiciones.
      </div>
    </div>
  );
};

export default AuthRegisterForm;
