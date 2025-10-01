import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';
import fs from 'fs';
import path from 'path';
import { FRONTEND_ENDPOINT } from '@/utils/constants';

export const getServerSideProps = async (ctx: any) => {
  try {
    const urls = [];
    const pagesDirectory = path.join(process.cwd(), 'src', 'pages');

    if (fs.existsSync(pagesDirectory)) {
      const files = fs.readdirSync(pagesDirectory);
      for (const file of files) {
        if (
          file !== 'sitemap.xml.js' &&
          !file.startsWith('_') &&
          file !== 'sitemap'
        ) {
          // Excluir este archivo y los archivos ocultos
          const slug = file.replace(/\.jsx?$/, '');
          urls.push({
            loc: `${FRONTEND_ENDPOINT}/${slug}`,
            lastmod: new Date().toISOString(), // Puedes agregar otros campos si es necesario
          });
        }
      }
    }

    return getServerSideSitemapLegacy(ctx, urls as ISitemapField[]); // Esto genera el sitemap XML
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Maneja los errores (por ejemplo, devuelve un sitemap vacío o registra el error)
    return getServerSideSitemapLegacy(ctx, []);
  }
};

export default function Sitemap() {
  // Este componente no necesita contenido, solo maneja la generación del sitemap
}
