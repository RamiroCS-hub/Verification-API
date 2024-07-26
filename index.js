import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import authPublicEndpoint from './middleware/publicAuth.js';
import auth from './middleware/auth.js';
import cors from 'cors'
const app = express();

//MIDDLEWARES
dotenv.config();
app.use(cors())
app.use(authPublicEndpoint)
app.use(express.json())

//ROUTES
app.get('/auth', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/auth`)
    console.log(response.data.data);
    if(!response || response.status == 206) return res.status(206).json({token: req.oauth, data: response.data.data });
    return res.status(200).json({token: req.oauth, data: response.data.data, message: response.data.message });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
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