const router = require('express').Router();
const categoryControls = require('../../controllers/api-category-controller');

////////////////////////////////////////////////////////////

router.get('/', categoryControls.getAllCategories);
router.get('/:id', categoryControls.getOneCategory);
router.post('/', categoryControls.postOneCategory);
router.put('/:id', categoryControls.putOneCategory);
router.delete('/:id', categoryControls.deleteOneCategory);

////////////////////////////////////////////////////////////

module.exports = router;
