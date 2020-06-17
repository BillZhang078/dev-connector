const express = require('express');
const router = express.Router();

// @route    GET api/auth
// @desc     Test Route
// @acess    public
router.get('/', async (req, res) => {
    try {
        // const profile = await 
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
});

module.exports = router;
