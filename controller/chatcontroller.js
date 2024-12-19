const express = require("express");
const chatController = require("../controller/chatcontroller");
const router = express.Router();

// Routes CRUD
router.post("/add", chatController.add);
router.get("/list", chatController.list);
router.delete("/delete/:id", chatController.supprimer);
router.put("/update/:id", chatController.update);
const { showChats } = require('../services/chatService')
router.get('/', showChats)

module.exports = router;