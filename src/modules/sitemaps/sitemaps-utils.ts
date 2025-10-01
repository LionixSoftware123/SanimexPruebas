import { createApolloClient } from '@/apollo/client';
import {
  FRONTEND_ENDPOINT,
  FRONTEND_ENDPOINT_SITEMAPS,
} from '@/utils/constants';
import {
  OrderEnum,
  ProductsCountDocument,
  ProductsCountQuery,
  ProductsCountQueryVariables,
  ProductsOrderByEnum,
  SimpleProduct,
  SitemapsProductsDocument,
  SitemapsProductsQuery,
  SitemapsProductsQueryVariables,
} from '@/utils/types/generated';
import axios from 'axios';
import moment from 'moment/moment';
//import { generatePathName } from '../post/post-utils';
import * as fs from 'node:fs';
import { fetchPosts } from '../blog/blog-actions';

export const sitemapfetchPosts = async (skip: number, take: number) => {
  const posts = await axios.get(`${FRONTEND_ENDPOINT}/api/get-post-sitemap`, {
    params: {
      skip,
      take,
    },
  });

  return posts.data;
};
export const sitemapGetPosts = async (skip: number, take: number) => {
  const page = take / 100;

  let data: {
    loc: string;
    priority: number;
    changeFreq: string;
    lastMod: string;
  }[] = [];

  const client = createApolloClient();

  for (let i = 0; i < page; i++) {
    const offset = skip + 100 * i;
    const response = await client.query<
      SitemapsProductsQuery,
      SitemapsProductsQueryVariables
    >({
      query: SitemapsProductsDocument,
      variables: {
        where: {
          offsetPagination: {
            size: 100,
            offset,
          },
          orderby: [
            {
              field: ProductsOrderByEnum.Date,
              order: OrderEnum.Asc,
            },
          ],
        },
      },
    });

    const products =
      response &&
      response.data &&
      response.data.products &&
      response.data.products.edges &&
      response.data.products.edges.length
        ? response.data.products?.edges.map((edge) => edge.node)
        : [];
    data = [
      ...data,
      ...products.map((product) => ({
        loc: `${FRONTEND_ENDPOINT_SITEMAPS}/productos/${
          (product as SimpleProduct)?.slug
        }`,
        priority: 0.7,
        changeFreq: 'daily',
        lastMod: moment(product.date as string).format('YYYY-MM-DD HH:mm:ss'),
      })),
    ];
  }
  return data;
};

export const checkFilename = (filename: string) => {
  const regex = /^products-sitemap\d+\.xml$/;
  if (filename) {
    return regex?.test(filename);
  }
  return false;
};

export const getPostCountSitemap = async () => {
  const client = createApolloClient();

  const response = await client.query<
    ProductsCountQuery,
    ProductsCountQueryVariables
  >({
    query: ProductsCountDocument,
  });

  const totalPosts =
    response &&
    response.data &&
    response.data.products &&
    response.data.products?.pageInfo.offsetPagination?.total;

  return { total: totalPosts ?? 0 };
};

export const fillSitemaps = async () => {
  const poststotal = await getPostCountSitemap();
  const pages = Math.ceil(poststotal.total / 500);
  let currentPage = 0;
  for (let j = 0; j < pages; j++) {
    const path = `public/sitemap/sitemap-page${j + 1}.json`;
    if (!fs.existsSync(path)) break;
    currentPage++;
  }
  currentPage = currentPage === 0 ? 0 : currentPage - 1;
  for (let i = currentPage; i < pages; i++) {
    const urls = [];
    const items = 500 * i;
    const posts = await sitemapGetPosts(items, 500);

    for (const post of posts) {
      8;
      const priority = 0.8; //((i+1) / pages < 0.1 ? 0.1 : (i+1) / pages).toPrecision(1);
      urls.push({
        loc: post?.loc,
        lastmod: post?.lastMod,
        priority: priority,
        changefreq: post?.changeFreq, // Puedes agregar otros campos si es necesario
      });
    }
    fs.writeFile(
      `public/sitemap/sitemap-page${i + 1}.json`,
      JSON.stringify({
        urls: urls,
      }),
      (err) => {
        // Checking for errors
        if (err) throw err;

        // Success
        console.log('Done writing sitemap', `page #${i + 1}`);
      },
    );
  }
  const posts = await fetchPosts({
    where: {
      offsetPagination: {
        size: 100,
      },
    },
  });
  const urlsNews = [];
  if (posts?.posts.length) {
    for (const post of posts.posts) {
      urlsNews.push({
        loc: `${FRONTEND_ENDPOINT_SITEMAPS}/blog/${post?.slug}`,
        priority: 0.6,
        changefreq: 'daily',
        lastmod: (post.date as string) + '-06:00',
      });
    }
  }
  fs.writeFile(
    `public/sitemapsblogs/blogs-sitemaps.json`,
    JSON.stringify({
      urls: urlsNews,
    }),
    (err) => {
      // Checking for errors
      if (err) throw err;

      // Success
      console.log('Done writing sitemap', `blogs sitemaps json`);
    },
  );
  return true;
};

export const generateSiteMap = (urls: { loc: string }[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${urls
       .map(({ loc }) => {
         return `
       <sitemap>
           <loc>${`${loc}`}</loc>
       </sitemap>
     `;
       })
       .join('')}
   </sitemapindex>
  
 `;
};
