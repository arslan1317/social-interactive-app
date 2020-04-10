const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('../models/user');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then( hash => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
      });
      user.save( function (error, result) {
        if(error) return res.status(500).json({message: error});
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'arslan.ali1396@gmail.com',
            pass: 'acdkdlssatowsunh'
          }
        });

        var mailOptions = {
          from: 'arslan.ali1396@gmail.com',
          to: 'arslan.ali1396@gmail.com',
          subject: 'Sending Email using Node.js',
          text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log('email error', error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.status(200).json({
          message: 'User Created',
          result: result
        });
      });
    });

});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email})
    .then(user => {
      fetchedUser = user;
      if (!user) {
        return res.status(401).json({
          message: 'Auth Failed'
        })
      }
      return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Auth Failed'
      });
    }
    const token = jwt.sign(
      { email: fetchedUser.email, userId: fetchedUser._id},
      'secret_longer_what_the_hell_are_you_talking_about',
      {expiresIn: '1h' }
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Auth Failed'
    })
  })
});
module.exports = router
