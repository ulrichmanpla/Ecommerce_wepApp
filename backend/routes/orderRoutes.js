
const express = require("express")
const router = express.Router()
const authmiddleware = require("../middleware/authmiddleware")
const {createOrder,getOrders}=require('../contorllers/orderController')

router.post("/",authmiddleware,createOrder)
router.get("/",authmiddleware,getOrders)

module.exports= router