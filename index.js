import express from 'express';
import dotenv from 'dotenv';
import auth from './middleware/auth.js';
import axios from 'axios';

const app = express();
dotenv.config();

app.use(auth)

app.get('/url', (req, res) => {
  
  const { access_token } = req.oauth;
  console.log(access_token);
  axios.defaults.headers.post['Authorization'] = `Bearer ${access_token}`;

  axios.post(process.env.API_URL).then(response => {
    console.log(response)
    res.send(response);
  }).catch( err => {
    console.log(err);
    res.status(400).send(err);
  })
})

app.listen((process.env.PORT || 3001), (req, res) => {
  console.log(`Listenig on: http://localhost:${process.env.PORT}`);
})