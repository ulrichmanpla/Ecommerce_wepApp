
const express = require("express")
const router = express.Router()
const authmiddleware = require("../middleware/authmiddleware")
const {createOrder,getOrders,getAllOrder}=require('../contorllers/orderController')

router.post("/",authmiddleware,createOrder)
router.get("/",authmiddleware,getOrders)
router.get("/allorders",getAllOrder)

module.exports= router