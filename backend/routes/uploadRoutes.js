
const express = require("express")
const cloudinary = require("../config/cloudinary")
const upload = require("../middleware/uploadMiddleware")

const router = express.Router()
 const uploadToCloudinary = (buffer)=>{
     return new Promise((resolve, reject)=>{
         const stream = cloudinary.uploader.upload_stream(
            {
                folder:"ecommerce/products"
            },
            (error, result)=>{
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            }
         )
         stream.end(buffer)
     })
 }
router.post("/",upload.single("image"), async(req, res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                message:"No image upload"
            })
        }

        const result = await uploadToCloudinary(req.file.buffer)

        res.status(200).json({
            message:"Image uploaded successfully",
            imageUrl: result.secure_url,
            publicId: result.public_id
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            message:"Image upload failed",
            error: error.message
        })
    }
})

module.exports = router