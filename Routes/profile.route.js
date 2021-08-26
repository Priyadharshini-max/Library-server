const express = require("express");
const router = express.Router();
const profileService = require("../Services/profile.service");


router.get("/", async (req, res) => {
    const loginUser = await profileService.displayLoginUser(req.user);
    res.send(loginUser);
})

module.exports = router;