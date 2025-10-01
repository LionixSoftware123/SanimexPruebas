import React, { useState } from 'react';
import { useRegisterMutation } from '@/utils/types/generated';
import { useToasts } from 'react-toast-notifications';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { DOMAIN_SITE } from '@/utils/constants';
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
  const [registerUser, { loading }] = useRegisterMutation({
    onCompleted: (data) => {
      setCookie('jwtAuthToken', data.registerUser?.user?.jwtAuthToken, {
        expires: new Date(
          parseInt(data.registerUser?.user?.jwtAuthExpiration as string) * 1000,
        ),
        path: '/',
        domain: DOMAIN_SITE,
      });
      setCookie('jwtRefreshToken', data.registerUser?.user?.jwtRefreshToken, {
        path: '/',
        domain: DOMAIN_SITE,
      });

      const decodeToken = jwtDecode<{
        data: { user: { id: string } };
        exp?: number;
      }>(data.registerUser?.user?.wooSessionToken as string);

      setCookie('wooSessionToken', data.registerUser?.user?.wooSessionToken, {
        expires: new Date((decodeToken.exp as number) * 1000),
        path: '/',
        domain: DOMAIN_SITE,
      });
      setCookie(
        'refreshWooSessionToken',
        data.registerUser?.user?.wooSessionToken,
        {
          expires: moment().add(1, 'year').toDate(),
          path: '/',
          domain: DOMAIN_SITE,
        },
      );

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

  const [data, setData] = useState<AuthRegisterFormData>({
    displayName: '',
    password: '',
    email: '',
  });

  const handleRegister = () => {
    const checkField = Object.keys(data).find(
      (_data) => data[_data as keyof AuthRegisterFormData] === '',
    );
    if (checkField) {
      addToast('Todos los campos son requeridos', {
        appearance: 'success',
      });
    }

    registerUser({
      variables: {
        input: {
          displayName: data?.displayName as string,
          username: data?.email as string,
          password: data?.password as string,
          email: data?.email as string,
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
          setData({
            ...data,
            [event.target.name]: event.target.value,
          });
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
          setData({
            ...data,
            [event.target.name]: event.target.value,
          });
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
          setData({
            ...data,
            [event.target.name]: event.target.value,
          });
        }}
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
          size="large"
          color="secondary"
          style={{
            background: '#1C355E',
            boxShadow: 'none',
            fontWeight: 700,
            color: 'white',
          }}
          className="mt-4 flex justify-center h-[47px] bg-[#1C355E] cursor-pointer w-full"
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
