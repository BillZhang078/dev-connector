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
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
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
      profileField.skills = skills.split(',').map((skill) => skill.trim());
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
    console.log('bad');
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileField },
          { new: true }
        );
        return res.json(profile);
      }
      profile = new Profile(profileField);

      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }

    return res.json(profileField);
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

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty,
      check('from', 'From is required').not().isEmpty(),
      check('company', 'company is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, from, to, current, description } = req.body;
    const newExp = {
      title,
      company,
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
      res.status(500).send('server error');
    }
  }
);

// @route    delete api/profiles/experience/:exp_id
// @desc     delete profile experience
// @acess    private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const id = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(id, 1);
    await pofile.save();
    res.json(profile);
  } catch (err) {
    console.error(eerr.message);
    res.status(500).send('server error');
  }
});

// @route    put api/profiles/education
// @desc     add profile education
// @acess    private

router.put(
  '/experience/education',
  [auth, [check('school', 'School is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      res.status(400).json({ error: errors.array() });
    }

    const {
      school,
      degree,
      filedofstudy,
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

    const pofile = await Profile.findOne({ user: req.user.id });
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
