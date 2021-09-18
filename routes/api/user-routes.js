const router = require('express').Router();
const userControls = require('../../controllers/user-controller');

////////////////////////////////////////////////////////////

router.get('/', userControls.getAllUsers);
router.get('/:id', userControls.getOneUser);
router.post('/', userControls.postOneUser);

// TODO for updating password & deleting user
// router.put('/:id', userControls.putOneTag);
// router.delete('/:id', userControls.deleteOneTag);
////////////////////////////////////////////////////////////

module.exports = router;
