
const express = require('express')
const router = express.Router()
const authmiddleware = require("../middleware/authmiddleware")
const adminOnly = require("../middleware/adminMiddleware")
const upload = require("../middleware/uploadMiddleware")
const { createProduct, getProducts,getProduct,updateProduct,deleteProduct} = require("../contorllers/productController")

router.post('/',authmiddleware,upload.single("image"),createProduct)
router.get('/',getProducts)
router.get('/:id',getProduct)
router.put('/:id',authmiddleware,updateProduct)
router.delete('/:id',authmiddleware,adminOnly,deleteProduct)

module.exports = router