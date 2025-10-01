import React, { useState } from 'react';

import {
  fetchBannersHome,
  getBannerByType,
} from '@/modules/banner/banner-actions';

import dynamic from 'next/dynamic';
import { fetchPosts } from '@/modules/blog/blog-actions';
import {
  Post,
  useFetchPostsLazyQuery,
  BannerHome,
  BannerHomeType,
} from '@/utils/types/generated';

import Link from 'next/link';
import { useRouter } from 'next/router';
const StaticMeta = dynamic(() => import('@/components/utils/StaticMeta'));
const RootLayout = dynamic(() => import('@/components/layouts/RootLayout'));
const BlogOne = dynamic(() => import('@/components/blog/BlogOne'));
const Container = dynamic(() => import('@/components/utils/Container'));
const ImageWithFallback = dynamic(() => import('@/utils/ImageWithFallback'));
const CollapseListSimple = dynamic(
  () => import('@/components/utils/CollapseListSimple'),
);

const Paginate = dynamic(() => import('@/components/utils/Paginate'));

const BlogList: string[] = ['Abril 2023', 'Marzo 2023', 'Febrero 2023'];

const PER_PAGE = 6;
const INITIAL_PAGE = 0;

type BlogPageProps = {
  posts?: Post[];
  total?: number;
  bannersInHome?: BannerHome[];
};

const BlogPage: React.FC<BlogPageProps> = ({
  posts = [],
  total = 0,
  bannersInHome,
}) => {
  const [_posts, _setPosts] = useState<Post[]>(posts);
  const [_total, _setTotal] = useState(total);
  const [actualDate, setActualDate] = useState(BlogList[0]);
  const [, setPage] = useState<number>(INITIAL_PAGE);

  const [FetchPosts] = useFetchPostsLazyQuery({
    onCompleted: ({ posts }) => {
      _setPosts(posts?.nodes.map((node) => node) as Post[]);
      _setTotal(posts?.pageInfo.offsetPagination?.total as number);
    },
  });
  const BigSavings = getBannerByType(
    bannersInHome,
    BannerHomeType.Horizontal_1,
  );
  const router = useRouter();
  return (
    <RootLayout>
      <StaticMeta
        title={'Sanimex - Novedades'}
        description={'Sanimex - Novedades'}
        asPath={router.asPath}
        image="/src/images/logo-sanimex.svg"
      />
      <div className="flex items-end h-[200px] md:h-[340px] bg-[url('../images/banner.png')] bg-cover bg-center">
        <Container>
          <div className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] uppercase flex text-[30px] leading-[30px] md:leading-[54px] md:text-[54px] font-Century-Gothic font-bold text-white">
            Novedades
          </div>
        </Container>
      </div>
      <Container>
        <div className="grid grid-cols-12 gap-[30px] my-[50px]">
          <div className="col-span-full md:col-span-3">
            <div className="rounded-[10px] pb-[15px] shadow-md border-b-[2px] border-[#0033A1]">
              <div className="px-[20px] h-[42px] flex place-items-center text-[14px] font-Century-Gothic bg-[#F5F5F5]">
                Fecha
              </div>
              <div className="px-[20px]">
                <div className="py-[20px]">
                  <CollapseListSimple
                    name={actualDate}
                    extraComponent={
                      <div className=" flex flex-col space-y-4">
                        {BlogList.map((item, index) => (
                          <button
                            className="text-start text-[14px]"
                            key={index}
                            onClick={() => setActualDate(item)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full md:col-span-9">
            <div className="grid md:grid-cols-2 gap-8">
              {_posts.map((post, key) => (
                <div key={key}>
                  <BlogOne post={post} />
                </div>
              ))}
            </div>
            <div>
              {_posts.length ? (
                <div className="flex justify-center mt-4">
                  <Paginate
                    page={0}
                    initialPage={INITIAL_PAGE}
                    pageCount={Math.ceil(_total / PER_PAGE)}
                    onPageChange={(data) => {
                      setPage(data.selected);
                      FetchPosts({
                        variables: {
                          where: {
                            offsetPagination: {
                              size: PER_PAGE,
                              offset: PER_PAGE * data.selected,
                            },
                          },
                        },
                      });
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
      <Container classes={'my-10'}>
        <Link href={BigSavings?.redirect as string}>
          <div className="w-full h-[100px] md:h-[185px] relative">
            <ImageWithFallback
              src={BigSavings?.url as string}
              alt="horizontal 1 banner"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </Link>
      </Container>
    </RootLayout>
  );
};

export const getStaticProps = async () => {
  const { posts, total } = await fetchPosts({
    where: {
      offsetPagination: {
        size: PER_PAGE,
        offset: 0,
      },
    },
  });
  const bannersInHome = await fetchBannersHome();
  return {
    props: {
      posts,
      total,
      bannersInHome,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME) || 60,
  };
};

export default BlogPage;
