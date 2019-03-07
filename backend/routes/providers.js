const express = require('express');
const router = express.Router();
const providersController = require('../controllers/providersController');


router.post('/', providersController.create);

router.get('/', providersController.listAll);

router.get('/:id', providersController.listOne);

router.put('/:id', providersController.update);

router.delete('/:id', providersController.drop);

module.exports = router;
