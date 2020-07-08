const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
// @route    GET api/auth
// @desc     Test Route
// @acess    public
router.get('/',auth,async (req, res) => {
    try {
        // const profile = await
        const user = await User.findById(req.user.id).select('name');// ignore passoword
        res.json(user);
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
});



router.post('/', [check('email', "email is required").not().isEmpty(),
    check('password', 'password is required').exists()],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(402).json({ errors: errors.array()})
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ errors:[{msg:'Invalid Credentials '}]})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
        }


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
              res.json({ token,user });
        }
      );
        

    }
)
module.exports = router;
