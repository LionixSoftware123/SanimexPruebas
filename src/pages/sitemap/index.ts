import { getServerSideSitemap } from 'next-sitemap';
import fs from 'fs';
import path from 'path';
import { FRONTEND_ENDPOINT } from '@/utils/constants';
import { generateSiteMap } from '@/modules/sitemaps/sitemaps-utils';

export const getServerSideProps = async (ctx: any) => {
  try {
    const urls = [
      {
        loc: `${FRONTEND_ENDPOINT}/sitemap/page-sitemap.xml`,
        //lastmod: new Date().toISOString(), // Puedes agregar otros campos si es necesario
      },
      {
        loc: `${FRONTEND_ENDPOINT}/sitemap/blogs-sitemap.xml`,
        //lastmod: new Date().toISOString(), // Puedes agregar otros campos si es necesario
      },
    ];

    //const poststotal = await getPostCountSitemap();
    //const pages= Math.ceil(poststotal.total/1000);
    const pagesDirectory = path.join(process.cwd(), 'public', 'sitemap');
    const files = fs.readdirSync(pagesDirectory);
    const pages = files.length;
    for (let i = 0; i < pages; i++) {
      urls.push({
        loc: `${FRONTEND_ENDPOINT}/sitemap/products-sitemap${i + 1}.xml`,
        //lastmod: new Date().toISOString(), // Puedes agregar otros campos si es necesario
      });
    }
    const sitemap = generateSiteMap(urls);

    ctx.res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    ctx.res.write(sitemap);
    ctx.res.end();

    return {
      props: {},
    };
    //return getServerSideSitemapLegacy(ctx,urls as ISitemapField[]); // Esto genera el sitemap XML
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Maneja los errores (por ejemplo, devuelve un sitemap vacío o registra el error)
    return getServerSideSitemap(ctx, []);
  }
};

export default function Sitemap() {
  // Este componente no necesita contenido, solo maneja la generación del sitemap
}
