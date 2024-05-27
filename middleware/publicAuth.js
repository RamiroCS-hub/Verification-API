import auth from './auth.js';

export const authPublicEndpoint = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log('El token es:', token);
  if(token) {
    console.log('El token es:', token);
    auth(req, res, next);
  }
  req.token = undefined;
  req.id = 0;
  next();
}

export default authPublicEndpoint;