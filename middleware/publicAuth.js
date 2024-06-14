import auth from './auth.js';

export const authPublicEndpoint = (req, res, next) => {
  var token = req.query.code;
  console.log('El token es:', token);
  if(token) {
    auth(req, res, next);
    return
  } 

  req.token = undefined;
  req.id = 0;
  next();
}

export default authPublicEndpoint;