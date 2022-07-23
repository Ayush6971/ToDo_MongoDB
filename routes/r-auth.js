const express = require("express");
const router = express.Router();
const { signIn, signUp, signOut } = require('../controller/AuthController');

router.post("/signUp", signUp)
router.post('/signIn', signIn);
router.get('/signOut', signOut);

module.exports = router;