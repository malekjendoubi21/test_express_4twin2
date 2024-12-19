var express = require("express")
var router = express.Router()
var hotelService = require("../service/hotelService")
var { list } = require("../hotelService")
router.get("/add/:name/:pwd", hotelService.add)
router.get("/list", list)

module.exports = router