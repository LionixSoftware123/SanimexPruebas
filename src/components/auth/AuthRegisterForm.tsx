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

  // --- 1. FUNCIÓN PARA GUARDAR COOKIES ---
  const saveCookies = (user: any) => {
    // jwtAuthToken
    if (user?.jwtAuthToken) {
      setCookie('jwtAuthToken', user?.jwtAuthToken, {
        expires: new Date(parseInt(user?.jwtAuthExpiration as string) * 1000),
        path: '/',
        secure: true,
        sameSite: 'lax',
      });
    }

    // jwtRefreshToken
    if (user?.jwtRefreshToken) {
      setCookie('jwtRefreshToken', user?.jwtRefreshToken, {
        path: '/',
        secure: true,
        sameSite: 'lax',
      });
    }

    // wooSessionToken (Decodificamos para obtener la expiración)
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

        // refreshWooSessionToken
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

  // --- 2. FUNCIÓN DE LOGIN (Plan B) ---
  const [login, { loading: loginLoading }] = useLoginMutation({
    onCompleted: (loginData) => {
      const loginUser = loginData.login?.user;
      if (loginUser?.jwtAuthToken) {
        saveCookies(loginUser);
        onSuccess && onSuccess();
      }
    },
    onError: (error) => {
      console.error("Error en login automático:", error);
      addToast('Cuenta creada, pero por favor inicia sesión manualmente.', { appearance: 'info' });
    }
  });

  // --- 3. MUTACIÓN DE REGISTRO ---
  const [registerUser, { loading: registerLoading }] = useRegisterMutation({
    onCompleted: (res: any) => {
      // Buscamos al usuario en la respuesta (ya sea por WooCommerce o WP)
      const user = res.registerCustomer?.user || res.registerUser?.user;

      if (user) {
        // Si el registro NO nos dio tokens (común en errores de JWT Auth en registro)
        // Disparamos el login automático inmediatamente
        if (!user.jwtAuthToken) {
          console.log("Registro exitoso, iniciando login automático...");
          login({
            variables: {
              input: {
                username: data.email as string,
                password: data.password as string,
              },
            },
          });
        } else {
          // Si sí llegaron los tokens, guardamos y finalizamos
          saveCookies(user);
          onSuccess && onSuccess();
        }
      } else {
        addToast('No se recibieron datos del usuario tras el registro.', { appearance: 'error' });
      }
    },
    onError: (error) => {
      let errorMessage = error.message;
      if (error.message.includes('existing-email-address') || error.message.includes('already exists')) {
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
          firstName: data?.displayName as string, // Mapeamos el nombre a firstName de WooCommerce
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
