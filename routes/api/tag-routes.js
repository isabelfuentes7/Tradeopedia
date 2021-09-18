const router = require('express').Router();
const tagControls = require('../../controllers/tag-controller');

////////////////////////////////////////////////////////////

router.get('/', tagControls.getAllTags);
router.get('/:id', tagControls.getOneTag);
router.post('/', tagControls.postOneTag);
router.put('/:id', tagControls.putOneTag);
router.delete('/:id', tagControls.deleteOneTag);

////////////////////////////////////////////////////////////

module.exports = router;
