const express = require('express');
const hotelService = require('../services/hotelService');
const router = express.Router();

router.post('/add', hotelService.add);

router.get('/list', hotelService.list);
router.get('/search', hotelService.search);

router.delete('/delete/:id', hotelService.supprimer);
router.put('/update/:id', hotelService.update);

module.exports = router;