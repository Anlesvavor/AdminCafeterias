const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');


router.get('/', productsController.listAll);

router.post('/new', productsController.create);

router.get('/show/:id', productsController.listOne);

router.put('/edit/:id', productsController.update);

router.delete('/delete/:id', productsController.drop);

module.exports = router;
