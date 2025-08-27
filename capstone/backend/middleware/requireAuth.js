import checkJwt from '../services/auth.service.js';

const requireAuth = (req, res, next) => {
  checkJwt(req, res, (err) => {
    if (err) {
      return res.status(401).json({
        message: 'Please enter a valid JWT token to access this page',
      });
    }
    next();
  });
};

export default requireAuth;
