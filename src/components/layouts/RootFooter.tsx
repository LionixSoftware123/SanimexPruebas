import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Facebook from '@/images/Facebook.svg';
import Instagram from '@/images/Instagram.svg';
import Email from '@/images/Email.svg';
import IconCheck from '@/images/icon-check.svg';
import Pinterest from '@/images/pinterest.svg';
import LogoFooter from '@/images/logo-footer.png';
import LogoFooterMob from '@/images/logo-footer-mobile.svg';
import Phone from '@/images/phone.svg';
import Whatsapp from '@/images/whatsapp.svg';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { Post, useFetchPostsLazyQuery } from '@/utils/types/generated';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Container = dynamic(() => import('@/components/utils/Container'));
const InspirationCard = dynamic(
  () => import('@/components/layouts/components/InspirationCard'),
);
const conocenos = [
  { name: 'Nosotros', slug: 'acerca-de' },
  { name: 'Horario de tienda', slug: 'sucursales' },
  /**{ name: 'Bolsa de trabajo', slug: 'bolsa-de-trabajo' },**/
];
const politica = [
  { name: 'Términos y condiciones', slug: 'terminos-y-condiciones' },
  { name: 'FAQ', slug: 'preguntas-frecuentes' },
  { name: 'Aviso de privacidad', slug: 'aviso-de-privacidad' },
  // { name: 'Condiciones de tienda', slug: 'condiciones-en-tienda' },
];

const RootFooter: React.FC = () => {
  const [meetUs, setMeetUs] = useState(false);
  const [politics, setPolitics] = useState(false);
  const [contactUs, setContactUs] = useState(false);
  const [inspiration, setImspiration] = useState(false);

  const [_posts, _setPosts] = useState<Post[]>([]);
  const [FetchPosts] = useFetchPostsLazyQuery({
    onCompleted: ({ posts }) => {
      _setPosts(posts?.nodes.map((node) => node) as Post[]);
    },
  });

  useEffect(() => {
    FetchPosts({
      variables: {
        where: {
          offsetPagination: {
            size: 2,
            offset: 0,
          },
        },
      },
    });
  }, [FetchPosts]);

  return (
    <footer className="bg-[#1C355E] flex justify-center pt-20">
      <Container>
        <div className="hidden font-Century-Gothic xl:grid grid-cols-12 gap-1 w-full text-[14px]">
          <div className="col-span-2 ">
            <div className="mb-2">
              <Link   href="/">
                <div className="w-[192px] h-[54px]">
                  <Image src={LogoFooter} alt="logo" width={192} height={54} />
                </div>
              </Link>
            </div>
          </div>
          <div className=" px-[10px] col-span-2 text-white ">
            <div className="text-white uppercase underline mb-4">Conócenos</div>
            {conocenos.map((content, index) => (
              <Link
                href={'/' + content.slug}
                className="mb-2 flex items-center"
                key={index}
              >
                <span className="mr-4">
                  <IconCheck />
                </span>
                {content.name}
              </Link>
            ))}
          </div>

          <div className="text-white col-span-2">
            <div className="underline mb-4">POLÍTICAS</div>
            {politica.map((item, index) => (
              <Link
                href={'/' + item.slug}
                className=" mb-2 flex items-center"
                key={index}
              >
                <span className="mr-4">
                  <IconCheck />
                </span>
                {item.name}
              </Link>
            ))}
          </div>
          <div className="text-white col-span-3">
            <div className="underline mb-4 uppercase">
              <Link   href={'/contactanos'}>Contáctanos</Link>
            </div>
            <a
              target="_blank"
              href="tel:+528005604746"
              className="mb-2  flex items-center"
            >
              <span className="mr-4 ">
                <Phone />
              </span>
              800 560 47 46
            </a>
            <a
              target="_blank"
              href="https://api.whatsapp.com/send?phone=5215581353955&text=%C2%A1Hola!%20%C2%BFMe%20podr%C3%ADan%20ayudar%3F%20Necesito%20m%C3%A1s%20informaci%C3%B3n"
              className="mb-2  flex items-center"
            >
              <span className="mr-4">
                <Whatsapp />
              </span>
              55 8135 3955
            </a>
            <a
              target="_blank"
              href="mailto:atencionaclientes@sanimex.com.mx"
              className=" flex items-center"
            >
              <span className="mr-4">
                <Email />
              </span>
              atencionaclientes@sanimex.com.mx
            </a>
            <div className="grid grid-cols-4">
              <div className="pt-5 col-span-3">
                <div className="space-x-4 flex w-full">
                  <a
                    href="https://www.facebook.com/SanimexOficial/"
                    target="_blank"
                  >
                    <Facebook />
                  </a>
                  <a
                    href="https://www.instagram.com/sanimex.oficial/"
                    target="_blank"
                  >
                    <Instagram />
                  </a>
                  <a
                    href="https://www.pinterest.com.mx/SanimexMX/"
                    target="_blank"
                  >
                    <Pinterest />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 text-white">
            <div className="underline mb-4 uppercase">
              <Link   href={'/blog'}>Inspiración</Link>
            </div>
            {_posts.map((post, key) => (
              <div className="mb-2  flex items-center" key={key}>
                <InspirationCard post={post} />
              </div>
            ))}
          </div>
          <div className="mt-[80px] col-span-full border-t-[#0071CE] h-[50px] border-t flex justify-center items-center text-[#B5CCFF]">
            <div>
              Copyright © 2024 Sanimex Inc. Todos los derechos reservados.{' '}
              <a
                className="underline"
                href="https://digitalroom.tech/#nosotros"
                target="_blank"
              >
                Developed by DigitalRoom.
              </a>
            </div>
          </div>
        </div>
        <div className="xl:hidden font-Century-Gothic text-white">
          <div className="mb-4">
            <Link   href="/">
              <div className="w-[192px] h-[54px]">
                <LogoFooterMob />
              </div>
            </Link>
          </div>
          <div className="w-[335px] mb-4">
            Somos líderes en distribución de pisos, recubrimientos, sanitarios y
            todo lo necesario para construir y remodelar tu espacio. Te ayudamos
            a darle vida a tu hogar.
          </div>
          {/**<div>
            <div className="underline uppercase mb-2">Informacion</div>
            <div className=" mb-2">Tu estas comprando en:</div>
            <div className="mb-2">
              <div>Zacatecas</div>
            </div>
            <div className="flex">
              <ul className=" mb-4 list-disc text-[#0071CE]">
                <li>&#8226; Abierto hasta las 8pm</li>
              </ul>
            </div>
          </div>**/}
          <div className="flex flex-col space-y-4 w-full md:w-[720px] items-start">
            <button
              onClick={() => {
                setMeetUs(!meetUs);
              }}
              className="uppercase underline w-full flex justify-between"
            >
              <div>Conócenos</div>
              {!meetUs ? (
                <ChevronDownIcon
                  className="h-[17px] w-[17px]"
                  aria-hidden="true"
                />
              ) : (
                <ChevronUpIcon
                  className="h-[17px] w-[17px]"
                  aria-hidden="true"
                />
              )}
            </button>
            <div className={`${meetUs ? '' : 'hidden'}`}>
              {conocenos.map((content, index) => (
                <Link
                  href={'/' + content.slug}
                  className="mb-2 flex items-center"
                  key={index}
                >
                  <span className="mr-4">
                    <IconCheck />
                  </span>
                  {content.name}
                </Link>
              ))}
            </div>
            <button
              onClick={() => {
                setPolitics(!politics);
              }}
              className="uppercase underline w-full flex justify-between"
            >
              <div>Políticas</div>

              {!politics ? (
                <ChevronDownIcon
                  className="h-[17px] w-[17px]"
                  aria-hidden="true"
                />
              ) : (
                <ChevronUpIcon
                  className="h-[17px] w-[17px]"
                  aria-hidden="true"
                />
              )}
            </button>
            <div className={`${politics ? '' : 'hidden'}`}>
              {politica.map((item, index) => (
                <Link
                  href={'/' + item.slug}
                  className=" mb-2 flex items-center"
                  key={index}
                >
                  <span className="mr-4">
                    <IconCheck />
                  </span>
                  {item.name}
                </Link>
              ))}
            </div>
            <div
              onClick={() => {
                setContactUs(!contactUs);
              }}
              className="uppercase underline w-full flex justify-between"
            >
              <div>
                <Link   href={'/contactanos'}>Contáctanos</Link>
              </div>
              {!contactUs ? (
                <ChevronDownIcon
                  className="h-[17px] w-[17px]"
                  aria-hidden="true"
                />
              ) : (
                <ChevronUpIcon
                  className="h-[17px] w-[17px]"
                  aria-hidden="true"
                />
              )}
            </div>
            <div className={`${contactUs ? '' : 'hidden'}`}>
              <a
                target="_blank"
                href="tel:+528005604746"
                className="mb-2  flex items-center"
              >
                <span className="mr-4 ">
                  <Phone />
                </span>
                800 560 47 46
              </a>
              <a
                target="_blank"
                href="https://api.whatsapp.com/send?phone=5215581353955&text=%C2%A1Hola!%20%C2%BFMe%20podr%C3%ADan%20ayudar%3F%20Necesito%20m%C3%A1s%20informaci%C3%B3n"
                className="mb-2  flex items-center"
              >
                <span className="mr-4">
                  <Whatsapp />
                </span>
                55 8135 3955
              </a>
              <a
                target="_blank"
                href="mailto:atencionaclientes@sanimex.com.mx"
                className=" flex items-center"
              >
                <span className="mr-4">
                  <Email />
                </span>
                atencionaclientes@sanimex.com.mx
              </a>
            </div>
            <button
              onClick={() => {
                setImspiration(!inspiration);
              }}
              className="uppercase underline w-full flex justify-between"
            >
              <div>
                <Link href={'/blog'}>Inspiración</Link>
              </div>
              {!inspiration ? (
                <ChevronDownIcon
                  className="h-[17px] w-[17px]"
                  aria-hidden="true"
                />
              ) : (
                <ChevronUpIcon
                  className="h-[17px] w-[17px]"
                  aria-hidden="true"
                />
              )}
            </button>
            <div className={`${inspiration ? '' : 'hidden'}`}>
              {_posts.map((post, key) => (
                <div className="mb-2  flex items-center" key={key}>
                  <InspirationCard post={post} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="my-4 space-x-4 flex w-full">
              <a
                target="_blank"
                href="https://www.facebook.com/SanimexOficial/"
              >
                <Facebook />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/sanimex.oficial/"
              >
                <Instagram />
              </a>
              <a href="https://www.pinterest.com.mx/SanimexMX/" target="_blank">
                <Pinterest />
              </a>
            </div>
          </div>
          <div className="mt-[40px] text-center col-span-full border-t-[#0071CE] h-[50px] border-t flex justify-center items-center text-[#B5CCFF] text-[10px]">
            <div>
              Copyright © 2024 Sanimex Inc. Todos los derechos reservados.{' '}
              <a
                className="underline"
                href="https://digitalroom.tech/#nosotros"
                target="_blank"
              >
                Developed by DigitalRoom.
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default RootFooter;
