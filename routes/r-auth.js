const { signIn, signUp, signOut } = require('../controller/AuthController');
const router = require('router').Router();

router.post("/signUp", signUp)
router.post('/signIn', signIn);
router.get('/signOut', signOut);

module.exports = router;