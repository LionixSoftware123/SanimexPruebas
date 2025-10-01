import { useCookies } from 'react-cookie';
import moment from 'moment';
import { DOMAIN_SITE } from '@/utils/constants';
import { UTMProducts } from './utm-campaign-types';
import {
  SaveSellerCampaignUrlutmMutationVariables,
  useSaveSellerCampaignUrlutmMutation,
} from '@/utils/types/generated';

export const useUTMCampaignHooks = () => {
  const [cookie, setCookie] = useCookies();
  const [apolloHook] = useSaveSellerCampaignUrlutmMutation();

  let utmProducts = cookie.utm_products;

  const saveURL = async (
    orderId: number,
    products: number[],
    resultProductWithOrdersUTM: UTMProducts[],
  ) => {
    const variables: SaveSellerCampaignUrlutmMutationVariables = {
      input: {
        orderId,
        items: resultProductWithOrdersUTM,
      },
    };

    await apolloHook({ variables });

    products.forEach((productId: number) => {
      delete utmProducts[productId];
    });

    setCookie('utm_products', utmProducts, {
      expires: moment().add(15, 'days').toDate(),
      path: '/',
      domain: DOMAIN_SITE,
    });
  };

  const processUTMURLs = async (orderId: number, products: number[]) => {
    if (!orderId || !utmProducts) return;

    let resultProductWithOrdersUTM: UTMProducts[] = [];
    products.forEach((productId: number) => {
      if (utmProducts[productId]) {
        const urls = utmProducts[productId];
        const urlUTMSeller = urls[urls.length - 1];

        const urlUTMProduct_Set = new Set([...urls]);
        urlUTMProduct_Set.delete(urlUTMSeller);
        const urlUTMProduct = Array.from(urlUTMProduct_Set);

        resultProductWithOrdersUTM.push({
          productId,
          urlUTMSeller,
          urlUTMCampaign: urlUTMProduct.slice(0, -1),
        });
      }
    });

    if (resultProductWithOrdersUTM.length <= 0) return;

    await saveURL(orderId, products, resultProductWithOrdersUTM);
  };

  return { processUTMURLs };
};
