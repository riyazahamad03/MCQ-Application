const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt_token;

    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = decoded;
    console.log(decoded);
    next();
  } catch (err) {
    console.error('Error in checkAuth middleware:', err);
    return res.status(401).json({
      message: "Auth Failed",
      error: err.message,
    });
  }
};
