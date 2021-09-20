const router = require('express').Router();
const userControls = require('../../controllers/user-controller');

////////////////////////////////////////////////////////////

router.get('/', userControls.getAllUsers);
router.get('/:id', userControls.getOneUsers);
router.post('/', userControls.postOneUser);

// LOGIN USERS
router.post('/login', userControls.loginUser);
// LOGOUT USERS
router.post('/logout', userControls.logoutUser);

// TODO for updating password & deleting user
// router.put('/:id', userControls.putOneTag);
// router.delete('/:id', userControls.deleteOneTag);
////////////////////////////////////////////////////////////

module.exports = router;
