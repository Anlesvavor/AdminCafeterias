const express = require('express');
const router = express.Router();
const deliveryTrucksController = require('../controllers/deliveryTrucksController');


router.get('/', deliveryTrucksController.listAll);

router.post('/new', deliveryTrucksController.create);

router.get('/show/:id', deliveryTrucksController.listOne);

router.put('/edit/:id', deliveryTrucksController.update);

router.delete('/delete/:id', deliveryTrucksController.drop);

module.exports = router;
