
const Cart = require("../models/Cart")
const Product = require("../models/products")
const Order = require("../models/Order")
const mongoose = require("mongoose")
const createOrder = async(req, res)=>{
    const session = await mongoose.startSession()
     session.startTransaction()
    try{

      const cart = await Cart.findOne({
        user:req.user.userId
      }).populate("items.product").session(session)

      if(!cart || cart.items.length === 0){
         await session.abortTransaction()
          session.endSession()
         return res.status(400).json({
            message: "Your cart is empty"
         })
      }
      let totalAmount = 0
      const orderItems = []
      for(const item of cart.items){
        const product = item.product
        if(!product){
            await session.abortTransaction()
            session.endSession()
            return res.status(400).json({
                message: " A product in your cart no longer exists"
            })
        }
        if(item.quantity > product.stock){
             await session.abortTransaction()
             session.endSession()
             return res.status(400).json({
                message: `${product.name} does not have enough stock`
             })
        }
        totalAmount += product.price * item.quantity

        orderItems.push({ 
            product: product._id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            image: product.image
          
        })

        const order = await Order.create(
            [{
            user:req.user.userId,
            items: orderItems,
            totalAmount
        }],
        {session}
    )
         for(const item of cart.items){
            const product = await Product.findById(
                item.product._id
            )

            product.stock -= item.quantity
            await product.save({session})
         }
        cart.items = []
        await cart.save({session})
        await session.commitTransaction()

        session.endSession()
        res.status(201).json({
            message:"Order Created successfully",
            order
        })
      }
    }catch(err){
         await session.abortTransaction()
         session.endSession()
        res.status(500).json({
            message: err.message
        })
    }
}


module.exports = {
    createOrder
}