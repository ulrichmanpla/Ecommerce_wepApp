
const dotenv = require("dotenv")
dotenv.config()
const express = require('express')
const cors = require("cors");


const connectDB = require("./config/db")
const ProductRoutes = require('./routes/productRoutes')
const UserRoutes = require('./routes/authRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require("./routes/orderRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/products", ProductRoutes)
app.use("/auth", UserRoutes)
app.use("/cart",cartRoutes)
app.use("/order",orderRoutes)
app.use("/upload", uploadRoutes)
const PORT= process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});