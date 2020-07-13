const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
// @route    GET api/profile
// @desc     Test Route
// @acess    private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      res.status(400).json({ msg: 'There is no profile find for this user' });
    } else {
      res.json(profile);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'server error' }); //Note
  }
});

// @route    POST api/profile
// @desc     Save and update Route
// @acess    private

router.post(
  '/',
  [
    auth,
    [
      check('skills', 'skills cannot be empty').not().isEmpty(),
      check('status', 'status cannot be empty').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log('good');
    const {
      company,
      status,
      location,
      skills,
      website,
      bio,
      githubusername,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build Profile Object
    const profileField = {};

    profileField.user = req.user.id;
    if (company) profileField.company = company;
    if (location) profileField.location = location;
    if (status) profileField.status = status;
    if (skills)
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim());
    if (website) profileField.company = company;
    if (bio) profileField.bio = bio;
    if (githubusername) profileField.githubusername = githubusername;
    // if (experience) profileField.experience = experience;

    profileField.social = {};
    if (youtube) profileField.social.youtube = youtube;
    if (facebook) profileField.social.facebook = facebook;
    if (twitter) profileField.social.twitter = twitter;
    if (instagram) profileField.social.instagram = instagram;
    if (linkedin) profileField.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      console.log('bad');
      if (profile) {
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileField },
          { new: true, upsert: true }
        );
        return res.json(profile);
      } else {
        profile = new Profile(profileField);

        await profile.save();
        return res.json(profile);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profiles
// @desc     Get All Profiles
// @acess    private

router.get('/profiles', auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avavtar']);
    return res.json(profiles);
  } catch (error) {
    res.status(500).send({ msg: 'server error' });
    console.log('server error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get Profile by userId
// @acess    private

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avavtar']);
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile find for this user' });
    }

    return res.json(profile);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'objectId') {
      return res.status(400).json({ msg: ' No Profile found' });
    }
    res.status(500).send({ msg: 'server error' });
  }
});

// @route    Delete api/profiles
// @desc     delete profiles and user
// @acess    private

router.delete('/', async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findByIdAndRemove({ _id: req.user.id });

    res.json({ msg: 'User Deleted' });
  } catch (error) {
    res.status(500).send({ msg: 'server error' });
    console.log(error.message);
  }
});

// @route    Delete api/profiles
// @desc     delete profiles and user
// @acess    private

// router.post('/',[],async (req,res)=>{
//     try {

//     }catch (error) {
//         res.status(500).send({ msg: 'server error' });
//         console.log(error.message);
//     }
// })

// @route    put api/profiles/experience
// @desc     Add profile experience
// @acess    private

router.post(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route    delete api/profiles/experience/:exp_id
// @desc     delete profile experience
// @acess    private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    console.log('Im here')
    const profile = await Profile.findOne({ user: req.user.id });
    const id = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(id, 1);
    await profile.save();
    console.log(profile);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route    put api/profiles/education
// @desc     add profile education
// @acess    private

router.post(
  '/experience/education',
  [auth, [check('school', 'School is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      res.status(400).json({ error: errors.array() });
    }
      console.log('body:', req.body);
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);
    await profile.save();
    res.json(profile);

    try {
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    delete api/profiles/education/:edu_id
// @desc     delete profile education
// @acess    private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeId = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeId, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
