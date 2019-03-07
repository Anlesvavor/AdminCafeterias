const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');


router.get('/', ordersController.listAll);

router.post('/new', ordersController.create);

router.get('/show/:id', ordersController.listOne);

router.put('/edit/:id', ordersController.update);

router.delete('/delete/:id', ordersController.drop);

module.exports = router;
