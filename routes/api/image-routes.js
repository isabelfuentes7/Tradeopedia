const router = require('express').Router();
const imageControls = require('../../controllers/image-controller');

////////////////////////////////////////////////////////////

router.get('/', imageControls.getAllImages);

////////////////////////////////////////////////////////////

module.exports = router;
