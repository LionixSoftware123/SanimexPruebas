import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { color, text, url, active } = req.body;

    if (!color || !text || !url || active === undefined) {
      return res.status(400).json({ error: 'Faltan valores requeridos' });
    }

    const filePath = path.join(process.cwd(), 'public', 'internalbanner.json');
    const newData = {
      color,
      text,
      url,
      active,
    };

    try {
      fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf8');

      return res
        .status(200)
        .json({ message: 'Archivo actualizado correctamente', data: newData });
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar el archivo' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}
