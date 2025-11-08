import type { NextApiRequest, NextApiResponse } from 'next';
import { globby } from 'globby';
import fs from 'fs';
import moment from 'moment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader('Content-Type', 'application/json');

  let pages = await globby([
    'src/pages/**/*.tsx',
    '!src/pages/**/[video].tsx',
    '!src/pages/**/[...post].tsx',
    '!src/pages/**/[post].tsx',
    '!src/pages/**/[ramon].tsx',
    '!src/pages/productos/[product].tsx',
    '!src/pages/productos/**/[category].tsx',
    '!src/pages/usuario/**/*.tsx',
    '!src/pages/analisis/organizaciones/[organization]',
    '!src/pages/analisis/autores/[author]',
    '!src/pages/404.tsx',
    '!src/pages/500.tsx',
    '!src/pages/500.tsx',
    '!src/pages/_app.tsx',
    '!src/pages/_document.tsx',
  ]);

  const pageObj = pages
    .filter(
      (page) =>
        !(
          page.includes('[...post]') ||
          page.includes('[id]') ||
          page.includes('[item')
        ),
    )
    .map((page) => {
      const loc = page
        .replace('src/pages', '')
        .replace('/index', '/')
        .replace('.tsx', '');

      const stats = fs.statSync(page);
      const lastMod = moment(stats.mtime.toISOString()).format('YYYY-MM-DD');
      const changeFreq = 'daily';
      const priority = 0.7;
      return { loc, lastMod, changeFreq, priority };
    });

  res.status(200).json(pageObj);
}
