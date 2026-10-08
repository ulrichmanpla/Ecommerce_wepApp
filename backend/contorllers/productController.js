
const Product = require("../models/products")
const uploadToCloudinary = require("../utils/cloudinaryUpload")
const createProduct = async (req, res)=>{
    try{
        const {name, price, category, stock} = req.body
        if(!name || !price || !category || stock === undefined){
            return res.status(400).json({
                message:"Please provide name, price, category and stock"
            })
        }
        if(!req.file){
            return res.status(400).json({
                message:"Product image is required"
            })
        }
        const uploadResult = await uploadToCloudinary(
            req.file.buffer
        )

      const product = await Product.create({
        name,
        price: Number(price),
        category,
        stock: Number(stock),
        image: uploadResult.secure_url
      })
      res.status(201).json(product)
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// const getProducts = async(req,res)=>{
//   try{
//     const products = await Product.find()

//     res.status(200).json(products)
//   }catch(err){
//     res.status(500).json({
//         message: err.message
//     })
//   }  
// }

const getProducts = async (req,res)=>{
    try{
       const {search, category, minPrice, maxPrice}=req.query
       
       let filter ={}

       if(search){
         filter.name = {
            $regex: search,
            $options: "i"
         }
       }

       if(category){
        filter.category= category
       }
       if(minPrice || maxPrice){
        filter.price = {}
        if(minPrice){
            filter.price.$gte = Number(minPrice)
        }
        if(maxPrice){
            filter.price.$lte=Number(maxPrice)
        }
       }
       const products = await Product.find(filter)
       res.status(200).json(products)
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const getProduct = async(req, res)=>{
    try{
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        res.status(200).json(product)
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const updateProduct = async (req, res)=>{
    try{
       const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
       )
       if(!product){
        return res.status(404).json({
            message:"Product not found"
        })
       }

    res.status(200).json(product)
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const deleteProduct = async(req, res)=>{
    try{
        const product = await Product.findByIdAndDelete(
            req.params.id
        )
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        res.status(200).json({
            message:"Product deleted successfully"
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}