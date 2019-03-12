const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');


router.get('/', rolesController.listAll);

router.post('/new', rolesController.create);

router.get('/show/:id', rolesController.listOne);

router.put('/edit/:id', rolesController.update);

router.delete('/delete/:id', rolesController.drop);

module.exports = router;
