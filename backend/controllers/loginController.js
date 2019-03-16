const User = require('../models/user');
const jwt = require('jsonwebtoken');

function login(req, res) {
  User.findOne({ _email : req.body.email }, (err, user) => {
    if (req.body.password == user.password) {
      let payload = { user : user.id }
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).json({
          errors:[],
          data: user,
          token: token
      });
    } else {
      res.status(401).json({
          errors:[{message:'Invalid credentials'}],
          data: []
      });
    }
  }).catch((err) => {
      res.status(500).json({
          errors:[{message:'Invalid credentials'}],
          data: []
      });
  });
}

module.exports = {
    login
}
