import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await axios.post(
    `https://dev-ar.zonesmart.com/api/user/jwt/create/`,
    { email, password },
  )

  res.send(result.data);
});

app.post('/api/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  const result = await axios.post(
    `https://dev-ar.zonesmart.com/api/user/jwt/refresh`,
    { refresh: refreshToken }
  )

  res.send(result.data);
});

app.get('/api/data', async (req, res) => {
  const { limit, offset } = req.query;
  const { authorization } = req.headers;

  let isError = false
  const result = await axios({
    method: 'GET',
    url: 'https://dev-ar.zonesmart.com/api/product',
    headers: {
      'authorization': authorization
    },
    params: { limit, offset }
  }).catch((error) => {
    isError = true
    return {
      data: error.response?.data,
      status: error.response.status,
    }
  });
  isError ? res.status(result.status).send(result.data) : res.send(result.data)
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
