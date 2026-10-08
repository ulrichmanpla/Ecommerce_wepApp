
const express = require("express")
const router = express.Router()
const authmiddleware = require("../middleware/authmiddleware")
const {createOrder}=require('../contorllers/orderController')

router.post("/",authmiddleware,createOrder)

module.exports= router