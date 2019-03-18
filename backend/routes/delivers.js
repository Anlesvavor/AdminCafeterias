const express = require('express');
const router = express.Router();
const deliversController = require('../controllers/deliversController');


router.get('/', deliversController.listAll);

router.post('/new', deliversController.create);

router.get('/show/:id', deliversController.listOne);

router.put('/edit/:id', deliversController.update);

router.delete('/delete/:id', deliversController.drop);

module.exports = router;
