const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
// @route    GET api/users
// @desc     Test Route
// @acess    public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('password', 'Password should be 6 or more characters').isLength({
      min: 5
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    const {name, email, password} = req.body;
    // See if user exists
    try {
      let user = await User.findOne({
        email
      });
      if (user) {
        res.status(500).json({errors: [{msg: 'User already exists'}]});
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
    //Get users avatar

    //Encypt passowrd

    //Return jsonwebtoken
    res.send('user route');
  }
);

module.exports = router;
