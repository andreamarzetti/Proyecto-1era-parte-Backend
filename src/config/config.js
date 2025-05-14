require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  emailUser: process.env.EMAIL_SERVICE_USER,
  emailPass: process.env.EMAIL_SERVICE_PASS,
  port: process.env.PORT || 8080,
};