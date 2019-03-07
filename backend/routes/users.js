const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


router.get('/', usersController.listAll);

router.post('/new', usersController.create);

router.get('/show/:id', usersController.listOne);

router.put('/edit/:id', usersController.update);

router.delete('/delete/:id', usersController.drop);

module.exports = router;
