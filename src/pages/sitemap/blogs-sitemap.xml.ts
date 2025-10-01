import { getServerSideSitemapLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import fsPromises from 'fs/promises';
import path from 'path';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //console.log(postpage);
  try {
    //console.log(page);
    const filePath = path.join(
      process.cwd(),
      'public',
      'sitemapsblogs',
      `blogs-sitemaps.json`,
    );
    const jsonData = await fsPromises.readFile(filePath, 'utf-8');
    const urls = JSON.parse(jsonData);
    //console.log({urls});
    ctx.res.setHeader('Content-Type', 'application/xml');
    const xml = await getServerSideSitemapLegacy(ctx, urls?.['urls']);

    // Establecemos los encabezados para que se entregue un archivo XML

    ctx.res.write(xml); // Escribimos el XML generado
    ctx.res.end(); // Finalizamos la respuesta

    return { props: {} };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Maneja los errores (por ejemplo, devuelve un sitemap vacío o registra el error)
    return { props: {} };
  }
};

export default function Sitemap() {
  // Este componente no necesita contenido, solo maneja la generación del sitemap
}
