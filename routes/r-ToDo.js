const router = require('router').Router();

router.get('/getUserTodos', getUserTodos);
router.post('/addUserTodos', getUserTodos);
router.put('/updateUserTodos', getUserTodos);
router.delete('/deleteUserTodos', getUserTodos);

module.exports = router;