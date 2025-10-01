import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body: { url: string } = await req.body;
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const url = body.url;
  try {
    await res.revalidate(url);

    return res.json({ revalidated: true });
  } catch (err) {
    return res.json({ revalidated: false });
  }
}
