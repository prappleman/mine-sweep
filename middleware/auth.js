// middleware/auth.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  console.log('Token received:', token);

  if (token == null) {
    console.log('No token provided');
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Invalid token');
      return res.sendStatus(403);
    }
    console.log('Token verified, user authenticated');
    req.user = user;
    next();
  });
}


module.exports = authenticateToken;
