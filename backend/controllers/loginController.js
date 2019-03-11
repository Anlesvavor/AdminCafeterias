const User = require('../models/user');

function login(req, res) {
  User.findOne({ _email : req.body.email }, (err, user) => {
    if (req.body.password == user.password) {
      res.status(200).json({
          errors:[],
          data: user
      });
    } else {
      res.status(500).json({
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
