
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ProductDetails from './pages/ProductDetails'
import Cart from "./pages/Cart"
import Products from './pages/Products'
import Orders from "./pages/Orders"
export default function App() {
  return (
    <>
     <BrowserRouter>
       <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/products/:id" element={<ProductDetails/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/orders" element={<Orders/>}/>
            
        </Routes>
     </BrowserRouter>
    </>
  )
}
