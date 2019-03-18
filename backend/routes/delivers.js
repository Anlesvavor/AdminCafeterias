const express = require('express');
const router = express.Router();
const deliverController = require('../controllers/deliverController');


router.get('/', deliverController.listAll);

router.post('/new', deliverController.create);

router.get('/show/:id', deliverController.listOne);

router.put('/edit/:id', deliverController.update);

router.delete('/delete/:id', deliverController.drop);

module.exports = router;
