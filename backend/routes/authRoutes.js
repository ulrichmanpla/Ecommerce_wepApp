const express = require("express")
const router = express.Router()
const authmiddleware = require('../middleware/authmiddleware')
const {registerUser,login,getUser,getAllUser}=require("../contorllers/authController")

router.post('/register',registerUser)
router.post('/login',login)
router.get('/',authmiddleware,getUser)
router.get('/allusers',getAllUser)
router.get("/me",authmiddleware, (req,res)=>{
    res.status(200).json({
        message:"You are authenticated",
        user: req.user
    })
} )
module.exports = router