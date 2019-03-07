const express = require('express');
const router = express.Router();
const providersController = require('../controllers/providersController');


router.get('/', providersController.listAll);

router.post('/new', providersController.create);

router.get('/show/:id', providersController.listOne);

router.put('/edit/:id', providersController.update);

router.delete('/delete/:id', providersController.drop);

module.exports = router;
