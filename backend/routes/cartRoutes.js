

const express = require('express')
const router = express.Router()
const authmiddleware = require("../middleware/authmiddleware")
const {addToCart,getCart,updateCartItem,removeFromCart}= require('../contorllers/cartController')

router.post('/',authmiddleware, addToCart)
router.get('/',authmiddleware,getCart)
router.put('/',authmiddleware, updateCartItem)
router.delete("/:productId",authmiddleware,removeFromCart)

module.exports = router