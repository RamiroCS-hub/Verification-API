import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

const auth = (req, res, next) => {
  var {code, verifier} = req.query;

  if(!code) return res.status(401).send('Missing authorization code');
  console.log('The code is: ' + code);

  axios.post(process.env.TOKEN_ENDPOINT, {
    'grant_type': 'authorization_code',
    'client_id': process.env.CLIENT_ID,
    'code': code,
    'redirect_uri': process.env.REDIRECT_URL,
    'code_verifier': verifier,
    'audience': 'htpps://RS-256-api'
  },{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  .then(response => {
    console.log('Todo fue bien');
    const { access_token, token_type } = response.data;
    req.oauth = access_token;
    console.log(response.data.access_token)
    axios.defaults.headers.get['Authorization'] = `${token_type} ${access_token}`;
    axios.defaults.headers.post['Authorization'] = `${token_type} ${access_token}`;
    next();
  })
  .catch(err => {
    console.log(err.message, err);
    console.log('The code is: ' + code);
    return res.status(403).send('Something went wrong');
  })
}

export default auth;