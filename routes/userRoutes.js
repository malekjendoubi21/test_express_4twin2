const express = require('express');
const userService = require('../controller/userService');
const router = express.Router();

router.post('/add', userService.add);

router.get('/list', userService.list);
router.delete('/delete/:id', userService.supprimer);
router.put('/update/:id', userService.update);

module.exports = router;