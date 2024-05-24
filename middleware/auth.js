import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

const auth = (req, res, next) => {
  var code = req.query.code;
  if(!code) res.status(401).send('Missing authorization code');

  axios.post(process.env.TOKEN_ENDPOINT, {
    'grant_type': 'authorization_code',
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET,
    'code': code,
    'redirect_uri': process.env.REDIRECT_URL,
    'audience': 'htpps://RS-256-api'
  }).then(res => {
    console.log('Todo fue bien')
    req.oauth = res.data
    next()
  }).catch(err => {
    console.log(err);
    res.status(403).send('Something went wrong')
  })
}

export default auth;