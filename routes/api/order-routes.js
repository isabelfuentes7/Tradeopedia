const router = require('express').Router();
const orderControls = require('../../controllers/order-controller');

////////////////////////////////////////////////////////////

router.get('/', orderControls.getAllProducts);
router.get('/:id', orderControls.getOneProduct);
router.post('/', orderControls.createOneProduct);
router.put('/:id', orderControls.putOneProduct);
router.delete('/:id', orderControls.deleteOneProduct);

////////////////////////////////////////////////////////////

module.exports = router;
