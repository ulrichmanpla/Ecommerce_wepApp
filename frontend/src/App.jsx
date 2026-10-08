
import { BrowserRouter, Routes, Route } from "react-router-dom"

// import Products from "./pages/Products"
import Navbar from "./components/Navbar"
import Home from "./components/Home"

export default function App() {
  return (
    <>
     <BrowserRouter>
       <Navbar/>
       <Home/>
        {/* <Routes>
            <Route path="/" element={<Products/>}/>
        </Routes> */}
     </BrowserRouter>
    </>
  )
}
