import type { NextApiRequest, NextApiResponse } from 'next';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import shippingZoneJson from './shippingZone.json';
import fs from 'fs';
import { WP_ENDPOINT } from '@/utils/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const wooCommerce = new WooCommerceRestApi({
    url: WP_ENDPOINT,
    consumerKey: 'ck_21786779617fbcd71ac5823cb20b69861df425fe',
    consumerSecret: 'cs_ec680ac56ed1bd51ac20be6018fd3e396aed135a',
    version: 'wc/v3',
  });

  const shippingZones: { data: { id: number; name: string }[] } =
    await wooCommerce.get('shipping/zones');
  const shippingZonesData = shippingZones.data.map((node) => ({
    name: node.name,
    id: node.id,
  }));

  const data: {
    id: number;
    name: string;
    postalCode: string[];
    address?: string;
  }[] = shippingZoneJson;

  for (let i = 0; i < shippingZonesData.length; i++) {
    const zone: { id: number; name: string } = shippingZonesData[i];

    const findZoneInJson = data.find((node) => node.id === zone.id);

    if (findZoneInJson) {
      continue;
    }

    const location: { data: { code: string }[] } = await wooCommerce.get(
      `shipping/zones/${zone.id}/locations`,
    );
    const locationData = location.data.map((node) => node.code);
    const shippingMethodsResponse: {
      data: { method_id: string; title: string }[];
    } = await wooCommerce.get(`shipping/zones/${zone.id}/methods`);
    const shippingMethod = shippingMethodsResponse.data.find(
      (node) => node.method_id === 'local_pickup',
    );

    data.push({
      ...zone,
      postalCode: locationData,
      address: shippingMethod?.title,
    });
    fs.writeFile(
      './shippingZone.json',
      JSON.stringify(data, null, 2),
      'utf8',
      function (err) {
        if (err) {
          return console.log(err);
        }
      },
    );
  }
  return res.status(200).json(data);
}
