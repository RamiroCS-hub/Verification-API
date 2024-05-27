import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import authPublicEndpoint from './middleware/publicAuth.js';
const app = express();
dotenv.config();

app.use(authPublicEndpoint)
app.use(express.json())
app.get('/auth', (req, res) => {

  axios.get(`${process.env.API_URL}/auth`).then(response => {
    console.log(response);
    if(response == '') return res.send('The user no has information');
    res.send(response);
  }).catch( err => {
    console.log(err);
    res.status(500).send(err);
  })
})

app.post('/api', (req, res) => {
  console.log(req.body)
  axios.post(`${process.env.API_URL}/api/shorturl`, { url: req.body.url }).then(response => {
    res.status(200).send(response.data.data)
  }).catch(err => {
    res.status(500).send(err)
  });
})

app.get('/:id', (req, res) =>{
  axios.get(`${process.env.API_URL}/api/${req.params.id}`).then(response => {
    console.log(response);
    if(response == '') return res.send('The user no has information');
    res.redirect(response.data);
  }).catch( err => {
    console.log(err);
    res.status(400).send(err);
  })
})

app.listen((process.env.PORT || 3001), (req, res) => {
  console.log(`Listenig on: http://localhost:${process.env.PORT}`);
})