import React, { ReactNode } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useCookies } from 'react-cookie';
import { PowerIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/outline';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import { DOMAIN_SITE } from '@/utils/constants';
import { Box, ListItem, ListItemText, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Container = dynamic(() => import('@/components/utils/Container'));

const USER_ROUTES = [
  {
    path: '/usuario',
    label: 'Datos',
    icon: <UserIcon className="h-[15px] w-[15px] text-[#0071CE] mr-[10px]" />,
  },
  {
    path: '/usuario/ordenes',
    label: 'Ordenes',
    icon: (
      <ListBulletIcon className="h-[15px] w-[15px] text-[#0071CE] mr-[10px]" />
    ),
  },
  {
    path: '/usuario/favoritos',
    label: 'Favoritos',
    icon: <HeartIcon className="h-[15px] w-[15px] text-[#0071CE] mr-[10px]" />,
  },
];

type LayoutUserProp = {
  children?: ReactNode;
};
const LayoutUser: React.FC<LayoutUserProp> = ({ children }) => {
  const [, , removeCookie] = useCookies(['jwtAuthToken', 'jwtRefreshToken']);
  const redirect = () => {
    return (window.location.href = '/');
  };

  return (
    <Container>
      <div className="font-Century-Gothic grid grid-cols-12 gap-x-4 my-[130px]">
        <div className="col-span-full md:col-span-3 ">
          <div className=" bg-white rounded-[10px] border-b-[3px] border-[#0033A1] drop-shadow-lg ">
            <Box sx={{ minWidth: 150 }}>
              <ListItem divider>
                <Typography color="primary" className="font-bold">
                  MI CUENTA
                </Typography>
              </ListItem>
              {USER_ROUTES.map((route) => {
                return (
                  <ListItem
                    key={route.path}
                    divider
                    style={{ cursor: 'pointer' }}
                  >
                    <Link
                      href={route.path}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <ListItemText primary={route.label} />
                      <ArrowForwardIosIcon fontSize="small" />
                    </Link>
                  </ListItem>
                );
              })}

              {/* <List component="nav" aria-label="mailbox folders">
                <ListItem>
                  <Typography fontWeight="bold">SOPORTE</Typography>
                </ListItem>
                <Divider />
                <a
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                  href="https://ac.noroeste.com.mx/autoayuda"
                >
                  <ListItem divider>
                    <ListItemText
                      style={{ fontSize: '16px' }}
                      primary="Centro de ayuda"
                    />
                  </ListItem>
                </a>
              </List> */}
            </Box>

            <div className="px-4 py-[20px]">
              <div className="flex items-center font-bold">
                <PowerIcon className="h-[15px] w-[15px] text-[#0071CE] mr-[10px]" />
                <button
                  onClick={() => {
                    removeCookie('jwtRefreshToken', {
                      path: '/',
                      domain: DOMAIN_SITE,
                    });
                    removeCookie('jwtAuthToken', {
                      path: '/',
                      domain: DOMAIN_SITE,
                    });
                    setTimeout(async () => {
                      await redirect();
                    }, 1000);
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-full mt-8 md:mt-0 md:col-span-9">
          {children}
        </div>
      </div>
    </Container>
  );
};

export default LayoutUser;
