
const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require('jsonwebtoken')
const registerUser = async(req,res)=>{
    try{
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                message:"Please name, email and password are required"
            })
        }
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    res.status(201).json({
        message:"User registered successfully",
        user:{
            id: user._id,
            name:user.name,
            email:user.email,
            role: user.role
        }
    })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

const login = async (req,res)=>{
    try{
       const {email, password}=req.body

       if(!email || !password){
        return res.status(400).json({
            message:"email and password are required"
        })
       }
     const user = await User.findOne({email})
      if(!user){
        return res.status(401).json({
            message:"Invalid Email or Password"
        })
      }
     const isMatch = await bcrypt.compare(password, user.password)
     if(!isMatch){
        return res.status(401).json({
            message:"Invalid email or passowrd"
        })
     }
     const token = jwt.sign({userId:user._id, role: user.role}, process.env.JWT_SECRET_KEY)
     res.status(200).json({
        message:"Login successfully",
        token,
        user:{
            id:user._id,
            name:user.name,
            emai:user.email,
            role:user.role
        }
     })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const getUser = async(req,res)=>{
    const id = req.user.userId
    const users = await User.findOne({_id: id})
    res.status(200).json({
        message:"successfully get user",
        user:{
            name: users.name,
            email: users.email,
            role: users.role
        }
    })
}

const getAllUser = async(req, res)=>{
    try{
         const data = await User.find()
         res.status(200).json({
            message:"All user",
            totalUser: data.length,
         })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
module.exports = {
    registerUser,
    login,
    getUser,
    getAllUser
}