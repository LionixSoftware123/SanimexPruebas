import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.resolve('public', 'internalbanner.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error reading banner data:', error);
    res.status(500).json({ error: 'Failed to read banner data' });
  }
}
