
const Cart = require("../models/Cart")

const Product = require("../models/products")

const addToCart = async (req, res)=>{
    try{
        const {productId,  quantity = 1} = req.body
        if(!productId){
            return res.status(400).json({
                message:"Product ID is required"
            })
        }
       const product = await Product.findById(productId)
       if(!product){
         return res.status(404).json({
            message: "Product not found"
         })
       } 
       if(quantity < 1){
        return res.status(400).json({
            message: "Quatity must be at least 1"
        })
       }
       if(quantity > product.stock){
        return res.status(400).json({
            message:"Not enough stock available"
        })
       }
     let cart = await Cart.findOne({
        user: req.user.userId
     })
     if(!cart){
        cart = await Cart.create({
            user: req.user.userId,
            items:[
                {
                    product: productId,
                    quantity
                }
            ]
        })
        return res.status(201).json(cart)
     }
     const existingItem = cart.items.find(item => item.product.toString()=== productId)
     if(existingItem){
        const newQuantity = existingItem.quantity + quantity;

        if(newQuantity > product.stock){
            return res.status(400).json({
                message:"Requested quantity exceeds available stock"
            })
        }
        existingItem.quantity = newQuantity
     }else{
        cart.items.push({
            product: productId,
            quantity
        })
     }

     await cart.save()
     res.status(200).json(cart)
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}



const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.userId
        }).populate("items.product");

        if (!cart) {
            return res.status(200).json({
                items: [],
                subtotal: 0,
                total: 0
            });
        }

        let subtotal = 0;
        
        // 1. Filtrer les articles pour ne garder que ceux dont le produit existe encore
        const validItems = cart.items.filter(item => item.product !== null);

        // 2. Calculer le sous-total uniquement sur les articles valides
        validItems.forEach(item => {
            subtotal += item.product.price * item.quantity;
        });

        // 3. Optionnel : Mettre à jour le panier en BDD pour supprimer définitivement les articles fantômes
        if (validItems.length !== cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }

        res.status(200).json({
            // On renvoie le panier mis à jour ou converti en objet avec les items valides
            cart: {
                ...cart.toObject(),
                items: validItems
            },
            subtotal,
            total: subtotal
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


const updateCartItem = async (req,res)=>{
    try{
      const {productId, quantity} = req.body
      if(!productId || quantity === undefined){
        return res.status(400).json({
            message:"product ID and quantity are required"
        })
      }
      if(quantity<1){
        return res.status(400).json({
            message:"Qunatity must be at least 1"
        })
      }

      const cart = await Cart.findOne({
        user:req.user.userId
      })
      if(!cart){
        return res.status(404).json({
            message:"Cart not found"
        })
      }
      const product = await Product.findById(productId)
      if(!product){
        return res.status(404).json({
            message:"Product not found"
        })
      }

      if(quantity > product.stock){
        return res.status(400).json({
            message:"Requested quantity exceeds available stock"
        })
      }
      const item = cart.items.find(
        item => item.product.toString() === productId
      )
      if(!item){
        return res.status(404).json({
            message:"Product not found  in cart"
        })
      }
      item.quantity = quantity
      await cart.save()
      res.status(200).json({
        message:"Cart updated successfully",
        cart
      })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const removeFromCart = async (req,res)=>{
    try{
          const {productId}= req.params
          const cart = await Cart.findOne({
            user: req.user.userId
          })
          if(!cart){
            return res.status(404).json({
                message:"Cart not found"
            })
          }
          const itemExists = cart.items.some(item => item.product.toString() === productId)
          if(!itemExists){
             return res.status(404).json({
                message:"Product not found in cart"
             })
          }
          cart.items = cart.items.filter(
            item => item.product.toString() !== productId
          )
          await cart.save()
          res.status(200).json({
            message:"Product removed from cart",
            cart
          })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}
module.exports= {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart
}