const express = require('express');
const chatService = require('../services/chatService');
const router = express.Router();

router.post('/add', chatService.add);

router.get('/list', chatService.list);
router.delete('/delete/:id', chatService.supprimer);
router.put('/update/:id', chatService.update);
router.get('/chatView', chatService.showChats);

module.exports = router;