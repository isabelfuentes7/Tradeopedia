const router = require('express').Router();
const productControls = require('../../controllers/api-product-controller');

////////////////////////////////////////////////////////////

router.get('/', productControls.getAllProducts);
router.get('/:id', productControls.getOneProduct);
router.post('/', productControls.createOneProduct);
router.put('/:id', productControls.putOneProduct);
router.delete('/:id', productControls.deleteOneProduct);

////////////////////////////////////////////////////////////

module.exports = router;
