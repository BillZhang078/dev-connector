const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile')
const User = require("../../models/User")
const { check, validationResult } = require('express-validator/check')
// @route    GET api/profile
// @desc     Test Route
// @acess    private
router.get('/me', async (req, res) => {
    try {
        const profile = await (await Profile.findOne({ user: req.user.id })).populated('user', ['name', 'avatar']);
        if (!profile) {
            res.status(400).json({msg:'There is no profile find for this user'})
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
});

// @route    GET api/profile
// @desc     Save and update Route
// @acess    private

router.post('/', [check('status', 'status cannot be empty').not().isEmpty(),
    check('skills', 'skills cannot be empty').not().isEmpty()], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array()})
        }
        const { company, location, status, skills, website, bio, githubusername, experience } = req.body;
        
        // Build Profile Object
        const profileField = {};

        



})
module.exports = router;
