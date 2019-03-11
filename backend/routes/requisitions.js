const express = require('express');
const router = express.Router();
const requisitionsController = require('../controllers/requisitionsController');


router.get('/', requisitionsController.listAll);

router.post('/new', requisitionsController.create);

router.get('/show/:id', requisitionsController.listOne);

router.put('/edit/:id', requisitionsController.update);

router.delete('/delete/:id', requisitionsController.drop);

module.exports = router;
