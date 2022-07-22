const router = require('router').Router();

router.post('/login', login);
router.post('/logout', logout);

module.exports = router;