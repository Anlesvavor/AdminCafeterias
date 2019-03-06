const express = require('express');
const router = express.Router();
const unitsController = require('../controllers/unitsController');


router.get('/', unitsController.listAll);

router.post('/new', unitsController.create);

router.get('/show/:id', unitsController.listOne);

router.put('/edit/:id', unitsController.update);

router.delete('/delete/:id', unitsController.drop);

module.exports = router;
