const jwt = require("jsonwebtoken")
function authmiddleware(req, res,next){
    try{
    const authHeader = req.headers['authorization']
    if(!authHeader){
       return res.status(401).json({
        message:"token not available"
       })
    }
    const token = authHeader && authHeader.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.user = decoded

      next()
    }catch(err){
        res.status(401).json({
            message: "Invalid token or token expired"
        })
    }
}

module.exports = authmiddleware