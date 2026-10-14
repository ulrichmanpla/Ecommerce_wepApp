
const Product = require("../models/products")
const uploadToCloudinary = require("../utils/cloudinaryUpload")
const createProduct = async (req, res)=>{
     console.log("requrest content type: ",req.headers["content-type"])
     console.log("request body: ", req.body)
     console.log("uploaded file:",req.file)
    try{
        const {name, price, category, stock, rating} = req.body
        if(!name || price === undefined || !category || stock === undefined){
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
        rating:Number(rating),
        image: uploadResult.secure_url
      })
      res.status(201).json(product)
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

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

const updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Convert numeric fields received through FormData.
    if (updates.price !== undefined) {
      updates.price = Number(updates.price);
    }

    if (updates.stock !== undefined) {
      updates.stock = Number(updates.stock);
    }

    if (updates.rating !== undefined) {
      updates.rating = Number(updates.rating);
    }

    // Upload a new image only if the admin selected one.
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      updates.image = uploadResult.secure_url;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
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