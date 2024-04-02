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
    { email, password }
  )

  res.send(result.data);
});

app.post('/api/data', async (req, res) => {

});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
