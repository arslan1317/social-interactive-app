const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret_longer_what_the_hell_are_you_talking_about');
    next();
  } catch(error) {
    res.status(401).json({
      message: 'Auth Failed'
    });
  }
}
