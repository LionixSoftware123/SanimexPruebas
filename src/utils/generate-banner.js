import fs from 'fs';
import path from 'path';

const BACKEND_ENDPOINT = 'https://admin.sanimex.com.mx/admin-graphql-sanimex';

const fetchTopBannerData = async () => {
  const query = `
    query {
      topBanner {
        text
        url
        color
        active
      }
    }
  `;

  try {
    const response = await fetch(BACKEND_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) throw new Error(`GraphQL error: ${response.statusText}`);

    const { data } = await response.json();
    return data.topBanner;
  } catch (error) {
    console.error('Error fetching top banner data:', error);
    return [];
  }
};

const generateJsonFile = async () => {
  const banners = await fetchTopBannerData();

  if (!banners) {
    console.error('No banner data found.');
    return;
  }

  const filePath = path.resolve('public', 'internalbanner.json');

  try {
    fs.writeFileSync(filePath, JSON.stringify(banners, null, 2), 'utf-8');
    console.log('JSON file generated successfully at:', filePath);
  } catch (error) {
    console.error('Error writing JSON file:', error);
  }
};

generateJsonFile();
