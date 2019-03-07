const express = require('express');
const router = express.Router();
const diningRoomsController = require('../controllers/diningRoomsController');


router.get('/', diningRoomsController.listAll);

router.post('/new', diningRoomsController.create);

router.get('/show/:id', diningRoomsController.listOne);

router.put('/edit/:id', diningRoomsController.update);

router.delete('/delete/:id', diningRoomsController.drop);

module.exports = router;
