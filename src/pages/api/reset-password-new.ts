import axios from 'axios';

const resetPasswordNew = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const response = await axios.post(
        `https://admin.sanimex.com.mx/wp-json/bdpwr/v1/set-password`,
        req.body,
        {
          auth: {
            username: 'webmaster',
            password: 'cualquierwebmaster1%',
          },
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      res.status(200).json(response.data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default resetPasswordNew;
