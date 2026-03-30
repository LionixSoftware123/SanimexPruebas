import React, { useState } from 'react';
import { useRegisterMutation } from '@/utils/types/generated';
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

  const [, setCookie] = useCookies([
    'jwtAuthToken',
    'jwtRefreshToken',
    'wooSessionToken',
    'refreshWooSessionToken',
  ]);
  const { addToast } = useToasts();

  // NOTA: Asegúrate de haber actualizado RegisterDocument con el alias 'user: customer'
  // como vimos en el paso anterior para que 'data.registerCustomer?.user' funcione.
  const [registerUser, { loading }] = useRegisterMutation({
    onCompleted: (data: any) => {
      // Usamos encadenamiento opcional para buscar la data de WooCommerce
      const user = data.registerCustomer?.user || data.registerUser?.user;

      if (!user) {
        addToast('Error al obtener datos de usuario', { appearance: 'error' });
        return;
      }

      // 1. jwtAuthToken
      setCookie('jwtAuthToken', user?.jwtAuthToken, {
        expires: new Date(
          parseInt(user?.jwtAuthExpiration as string) * 1000,
        ),
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

      const decodeToken = jwtDecode<{
        data: { user: { id: string } };
        exp?: number;
      }>(user?.wooSessionToken as string);

      // 3. wooSessionToken
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

      onSuccess && onSuccess();
    },  
    onError: (error) => {
      let errorMessage = error.message;
      if (error.message.includes('incorrect_password')) {
        errorMessage = 'La contraseña es incorrecta';
      } else if (error.message.includes('invalid_email')) {
        errorMessage = 'El correo no está registrado';
      } else if (error.message.includes('existing-email-address')) {
        errorMessage = 'Este correo ya está registrado';
      }

      addToast(
        <div>
          <div dangerouslySetInnerHTML={{ __html: errorMessage }}></div>
        </div>,
        { appearance: 'error' },
      );
    },
  });

  const [data, setData] = useState<AuthRegisterFormData>({
    displayName: '',
    password: '',
    email: '',
  });

  const handleRegister = () => {
    if (!data.email || !data.password || !data.displayName) {
      addToast('Todos los campos son requeridos', {
        appearance: 'warning',
      });
      return;
    }

    registerUser({
      variables: {
        input: {
          username: data?.email as string,
          password: data?.password as string,
          email: data?.email as string,
          // Eliminamos displayName si RegisterCustomerInput no lo soporta directamente
          // o lo mapeamos a firstName/lastName si es necesario.
        },
      },
    });
  };

  return (
    <div className="text-[16px] place-items-center flex flex-col text-[#999999] px-5  space-y-[15px]">
      <TextField
        className="w-full h-[45px]"
        variant="outlined"
        placeholder={'Email'}
        name="email"
        onChange={(event) => {
          setData({ ...data, [event.target.name]: event.target.value });
        }}
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
        onChange={(event) => {
          setData({ ...data, [event.target.name]: event.target.value });
        }}
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
        onChange={(event) => {
          setData({ ...data, [event.target.name]: event.target.value });
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faKey} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setEye(!eye)}>
                {eye ? (
                  <FontAwesomeIcon icon={faEye} height={18} width={18} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} height={18} width={18} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <div style={{ width: '100%' }}>
        <Button
          disabled={loading}
          onClick={() => handleRegister()}
          variant="contained"
          className="mt-4 flex justify-center h-[47px] bg-[#1C355E] text-white font-bold w-full"
          style={{ background: '#1C355E', color: 'white', fontWeight: 700 }}
        >
          {loading ? 'Cargando...' : 'SIGUIENTE'}
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
