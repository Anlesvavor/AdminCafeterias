const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');


router.get('/', categoriesController.listAll);

router.post('/new', categoriesController.create);

router.get('/show/:id', categoriesController.listOne);

router.put('/edit/:id', categoriesController.update);

router.delete('/delete/:id', categoriesController.drop);

module.exports = router;
