
const Cart = require("../models/Cart")
const Product = require("../models/products")
const Order = require("../models/Order")
const mongoose = require("mongoose")

const createOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const cart = await Cart.findOne({
      user: req.user.userId,
    })
      .populate("items.product")
      .session(session);

    if (!cart || cart.items.length === 0) {
      await session.abortTransaction();

      return res.status(400).json({
        message: "Your cart is empty",
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    // STEP 1: Validate every cart item and prepare the order
    for (const item of cart.items) {
      const product = item.product;

      if (!product) {
        throw new Error("A product in your cart no longer exists");
      }

      if (item.quantity > product.stock) {
        throw new Error(
          `${product.name} does not have enough stock`
        );
      }

      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
      });
    }

    // STEP 2: Create ONE order containing ALL cart items
    const [order] = await Order.create(
      [
        {
          user: req.user.userId,
          items: orderItems,
          totalAmount,
          status: "pending",
        },
      ],
      { session }
    );

    // STEP 3: Reduce stock for every purchased product
    for (const item of cart.items) {
      const product = await Product.findById(
        item.product._id
      ).session(session);

      if (!product) {
        throw new Error("A product in your cart no longer exists");
      }

      // Recheck stock inside the transaction
      if (item.quantity > product.stock) {
        throw new Error(
          `${product.name} does not have enough stock`
        );
      }

      product.stock -= item.quantity;
      await product.save({ session });
    }

    // STEP 4: Clear the cart only after preparing the order
    cart.items = [];
    await cart.save({ session });

    // STEP 5: Commit everything together
    await session.commitTransaction();

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    return res.status(500).json({
      message: err.message,
    });
  } finally {
    await session.endSession();
  }
};
const getOrders = async (req,res)=>{
    try{
        const userID = req.user.userId
    const objectIdUser = new mongoose.Types.ObjectId(userID)
    const data = await Order.find({user:objectIdUser})
    res.status(200).json({
        message:  "Got Orders successfully",
        order: data
    })
}catch(err){
    res.status(500).json({message: err.message})
}
}
module.exports = {
    createOrder,
    getOrders
}