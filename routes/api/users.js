const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
// @route    GET api/users
// @desc     Test Route
// @acess    public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password should be 6 or more characters').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    // See if user exists
    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        res.status(500).json({ errors: [{ msg: 'User already exists' }] });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
    //Get users avatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    user = new User({
      name,
      email,
      avatar,
      password,
    });
    //Encypt passowrd
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save(); //this will return a promise
    console.log('Im bill')
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        console.log(token)
        res.json({ token } );
      }
    );
   
  }
);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password should be 6 or more characters').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    // See if user exists
    try {
      let user = await User.findOne({
        email,
      });
      if (!user) {
        res.status(500).json({ errors: [{ msg: 'User not exists' }] });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
    //Get users avatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    user = new User({
      name,
      email,
      avatar,
      password,
    });
    //Encypt passowrd
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save(); //this will return a promise

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
    
  }
);

module.exports = router;
