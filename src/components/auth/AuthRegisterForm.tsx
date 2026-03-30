import React, { useState } from 'react';
// Importamos también useLoginMutation para el login automático
import { useRegisterMutation, useLoginMutation } from '@/utils/types/generated';
import { useToasts } from 'react-toast-notifications';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
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

  // --- FUNCIÓN DE LOGIN (Plan B) ---
  // Esta función se activará si el registro no nos da tokens automáticamente
  const [login, { loading: loginLoading }] = useLoginMutation({
    onCompleted: (loginData) => {
      const loginUser = loginData.login?.user;
      if (loginUser?.jwtAuthToken) {
        saveCookies(loginUser);
        onSuccess && onSuccess();
      }
    },
    onError: () => {
      addToast('Usuario creado, pero hubo un error al iniciar sesión automáticamente. Por favor intenta hacer Login.', { appearance: 'info' });
    }
  });

  // --- FUNCIÓN PARA GUARDAR COOKIES ---
  const saveCookies = (user: any) => {
    // 1. jwtAuthToken
    setCookie('jwtAuthToken', user?.jwtAuthToken, {
      expires: new Date(parseInt(user?.jwtAuthExpiration as string) * 1000),
      path: '/',
      secure: true,
      sameSite: 'lax',
    });

    // 2. jwtRefreshToken
    setCookie('jwtRefreshToken', user?.jwtRefreshToken, {
      path: '/',
      secure: true,
      sameSite: 'lax',
    });

    // 3. wooSessionToken (Decodificamos el token de sesión de WooCommerce)
    if (user?.wooSessionToken) {
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

      // 4. refreshWooSessionToken
      setCookie('refreshWooSessionToken', user?.wooSessionToken, {
        expires: moment().add(1, 'year').toDate(),
        path: '/',
        secure: true,
        sameSite: 'lax',
      });
    }
  };

  // --- MUTACIÓN DE REGISTRO ---
  const [registerUser, { loading: registerLoading }] = useRegisterMutation({
    onCompleted: (res: any) => {
      const user = res.registerCustomer?.user || res.registerUser?.user;

      if (!user) {
        addToast('Error al procesar el registro', { appearance: 'error' });
        return;
      }

      // SI EL REGISTRO NO NOS DIO TOKENS (Tu caso actual), HACEMOS LOGIN AUTOMÁTICO
      if (!user.jwtAuthToken) {
        console.log("Registro OK, pero sin tokens. Iniciando Login automático...");
        login({
          variables: {
            input: { // <--- Faltaba envolver esto aquí
              username: data.email as string,
              password: data.password as string,
            },
          },
        });
      } else {
        // SI SÍ NOS DIO TOKENS, GUARDAMOS Y LISTO
        saveCookies(user);
        onSuccess && onSuccess();
      }
    },
    onError: (error) => {
      let errorMessage = error.message;
      if (error.message.includes('existing-email-address')) {
        errorMessage = 'Este correo ya está registrado';
      } else if (error.message.includes('invalid_email')) {
        errorMessage = 'El correo no es válido';
      }
      addToast(<div dangerouslySetInnerHTML={{ __html: errorMessage }} />, { appearance: 'error' });
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
          username: data?.email as string,
          password: data?.password as string,
          email: data?.email as string,
          // Si necesitas enviar el nombre a WooCommerce, usualmente es firstName
          firstName: data?.displayName as string,
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
          {isLoading ? 'Procesando...' : 'SIGUIENTE'}
        </Button>
      </div>
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
    </div>
  );
};

export default AuthRegisterForm;
