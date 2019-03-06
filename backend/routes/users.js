const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


router.post('/', usersController.create);

router.get('/', usersController.listAll);

router.get('/:id', usersController.listOne);

router.put('/:id', usersController.update);

router.delete('/:id', usersController.drop);

module.exports = router;