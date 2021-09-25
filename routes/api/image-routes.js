const router = require('express').Router();
const withAuth = require('../../utils/auth');
const imageControls = require('../../controllers/api-image-controller');

////////////////////////////////////////////////////////////

router.get('/', imageControls.getAllImages);

router.get('/:id', imageControls.getOneImage);

router.post('/upload', withAuth, imageControls.uploadProductPhotos, imageControls.postMultipleImages);

////////////////////////////////////////////////////////////

module.exports = router;
