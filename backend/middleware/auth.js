import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const token = authHeader.split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ msg: 'Authorization format: Bearer <token>' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('JWT Auth Error:', err.message);
    res.status(401).json({ msg: 'Token is not valid or has expired' });
  }
};

export default auth;

