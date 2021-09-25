const router = require('express').Router();
const userControls = require('../../controllers/api-user-controller');

////////////////////////////////////////////////////////////

router.get('/', userControls.getAllUsers);
router.get('/:id', userControls.getOneUsers);
router.post('/', userControls.postOneUser);

// LOGIN USERS
router.post('/login', userControls.loginUser);
// LOGOUT USERS
router.post('/logout', userControls.logoutUser);

////////////////////////////////////////////////////////////

module.exports = router;
