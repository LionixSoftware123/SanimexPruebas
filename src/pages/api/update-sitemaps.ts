// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fillSitemaps } from '@/modules/sitemaps/sitemaps-utils';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'node:fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { SITEMAPS_ENV } from '@/utils/constants';
//import { fetchAllMenusWithCache } from "@/modules/menu/menu-actions";

type Data = {
  resp: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  //const response = await fetch(FRONTEND_ENDPOINT+'/all-menu.json',{cache:'no-store'});
  const filePath = path.join(process.cwd(), 'public', 'sitemaps-control.json');
  const jsonData = await fsPromises.readFile(filePath, 'utf-8');
  const actual = JSON.parse(jsonData);
  //const actual = await response.json();
  if (SITEMAPS_ENV !== 'production') {
    res.status(200).json({
      resp: `Ambiente de desarrollo, se omite... caso contrario revise las variables de entorno.`,
    });
    return;
  }
  if (!(moment(actual?.['lastUpdate']).add(12, 'hour') < moment())) {
    res.status(200).json({
      resp: `Se actualizo: ${moment(
        actual?.['lastUpdate'],
      ).toString()} se actualiza ${moment(actual?.['lastUpdate'])
        .add(12, 'hour')
        .toString()}`,
    });
    return;
  } else {
    //const allMenus = await fetchAllMenusWithCache({});
    const date = moment().utcOffset(0);
    date.toISOString();
    date.format();
    fs.writeFile(
      'public/sitemaps-control.json',
      JSON.stringify({
        lastUpdate: date,
      }),
      (err) => {
        // Checking for errors
        if (err) throw err;

        // Success
        console.log('Done writingcontrol sitemaps');
      },
    );
    await fillSitemaps();
    res.status(200).json({ resp: 'Se actualizó el control de sitemaps' });
    return;
  }
}
