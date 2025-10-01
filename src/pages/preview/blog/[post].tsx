import React from 'react';

import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

import { fetchAxiosBlog } from '@/modules/blog/blog-actions';
import dynamic from 'next/dynamic';
import {
  fetchBannersHome,
  getBannerByType,
} from '@/modules/banner/banner-actions';
import {
  Post,
  BannerHome,
  BannerHomeType,
  PostIdType,
} from '@/utils/types/generated';
import moment from 'moment';
import 'moment/locale/es';
import { useRouter } from 'next/router';
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));
const Container = dynamic(() => import('@/components/utils/Container'));
type OneBlogProps = {
  post?: Post;
  bannersInHome?: BannerHome[];
};

const PreviewBlog: React.FC<OneBlogProps> = ({ post, bannersInHome }) => {
  const horizontal1 = getBannerByType(
    bannersInHome,
    BannerHomeType.Horizontal_1,
  );
  const vertical1 = getBannerByType(bannersInHome, BannerHomeType.Vertical_1);
  const router = useRouter();
  return (
    <RootLayout>
      <StaticMeta
        title={post?.title as string}
        description={post?.title as string}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <div className="flex items-end  h-[200px] md:h-[340px] bg-[url('../images/banner.png')] bg-cover bg-center">
        <Container>
          <div className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] uppercase flex text-[30px] leading-[30px] md:leading-[54px] md:text-[54px] font-Century-Gothic font-bold text-white">
            Novedades
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-12 md:gap-4 my-[50px]">
          <div className="md:h-[380px] col-span-full grid grid-cols-11 gap-4 md:gap-8">
            <div className="col-span-full md:col-span-6 flex flex-col ">
              <div className="w-[149px] h-[50px] bg-[#93278F] text-white font-Poppins text-[24px] rounded-[5px] flex justify-center">
                <p className="flex self-center ">TIPS</p>
              </div>
              <div className="text-[#0071CE] font-Century-Gothic-Bold text-[28px] md:text-[45px]">
                {post?.title}
              </div>
            </div>
            <div className="relative w-full h-[280px] md:h-full col-span-full md:col-span-5">
              <ImageWithFallback
                fill
                style={{ objectFit: 'cover' }}
                src={post?.featuredImage?.node.sourceUrl as string}
                alt={post?.title as string}
              />
            </div>
          </div>
        </div>
        <p className="text-[#999999]  font-Century-Gothic">
          Publicado el {moment(post?.date).format('DD [de] MMMM, YYYY')}
        </p>
      </Container>
      <Container classes="text-justify sm:text-start">
        <div className="md:py-[40px] text-[#707070] font-Century-Gothic text-[20px]">
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: post?.excerpt as string }}
          ></div>
        </div>
        <div className="grid grid-cols-12 py-8 md:py-0 md:gap-8">
          <div className="post-details col-span-full lg:col-span-9 text-[20px] text-[#555555] font-Poppins">
            <div
              className="post-details"
              dangerouslySetInnerHTML={{ __html: post?.content as string }}
            ></div>
          </div>
          <div className="relative col-span-full lg:col-span-3 h-[939px]">
            {vertical1 ? (
              <Link   href={vertical1.redirect as string}>
                <div className="relative w-full h-[800px] md:h-full">
                  <ImageWithFallback
                    src={vertical1?.url as string}
                    alt="vertical 1 banner"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
      {horizontal1 ? (
        <Container classes={'my-10'}>
          <Link   href={horizontal1.redirect as string}>
            <div className="w-full h-[100px] md:h-[185px] relative">
              <ImageWithFallback
                src={horizontal1?.url as string}
                alt="horizontal 1 banner"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>
        </Container>
      ) : null}
    </RootLayout>
  );
};

type ParamsType = {
  post: string;
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext<ParamsType>) => {
  console.log('post', params?.post);

  const post =
    (await fetchAxiosBlog({
      id: params?.post as string,
      idType: PostIdType.DatabaseId,
    })) ?? undefined;
  const bannersInHome = await fetchBannersHome();

  if (!post) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      post,
      bannersInHome,
    },
  };
};

export default PreviewBlog;
