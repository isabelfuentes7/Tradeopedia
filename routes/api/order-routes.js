const router = require('express').Router();
const orderControls = require('../../controllers/api-order-controller');

////////////////////////////////////////////////////////////

router.get('/', orderControls.getAllOrders);
router.get('/:id', orderControls.getOneOrder);
// router.post('/', orderControls.createOneProduct);
// router.put('/:id', orderControls.putOneProduct);
// router.delete('/:id', orderControls.deleteOneProduct);

////////////////////////////////////////////////////////////

module.exports = router;
