
import {  useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";



export default function Products() {
    const [products, setProducts]= useState([])
    const [loading, setLoading]=useState(true)
    const [error, setError]= useState("")

    useEffect(()=>{
        const fetchProduct = async ()=>{
            try{
             const data = await getProducts()
             console.log("this is the product",data)
             setProducts(data)
            }catch(error){
                setError("Failed to load product")
            }finally {
                setLoading(false)
            }
        }
        fetchProduct()
    },[])
    if(loading){
        return <p>Loading products....</p>
    }
    if(error){
        return <p>{error}</p>
    }
  return (
    <>
      <div>
         <h1>Producs</h1>
         {
            products.map(product =>(
                <ProductCard 
                key={product._id}
                product={product}
                />
            ))
         }
      </div>
    </>
  )
}
