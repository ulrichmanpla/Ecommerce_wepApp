import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import api from '../services/api.js'
export default function PopularProducts() {
      const [products, setProducts]= useState([])
      const [loading, setLoading]= useState(true)
      const [error, setError]=useState(null)
    const [activeCategory, setActiveCategory] = useState("All");

     useEffect(()=>{
         async function getProducts() {
            try{
                setLoading(true)
                setError(null)
                const response = await api.get("/products")
                setProducts(response.data)
            }catch(error){
                console.log("popularProduct error",error.message)
              setError(error.message || "Failed to upload")  
            }finally{
                setLoading(false)
            }
         }
         getProducts()
        },[])
        if(loading){
            return (
                <section className="font-bold">Product loadding....</section>
            )
        }
        if(error){
            return (
                 <section className="mx-auto max-w-7xl px-4 py-12 flex justify-center items-center">
                <div>
                    <p className="text-red-600 text-sm mb-3">{error} </p>
                    <button className="px-4 py-2 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition" onClick={()=> window.location.reload()}>Retry again </button>
                </div>
                </section>
            )
        }
        const categories = [
            "All",
            "Cameras",
            "Laptop",
            "Consoles",
            "Tablet",
            "Mouse"
        ];
        const product = products.slice(0,12)
        const filteredProducts =
        activeCategory === "All"
        ? product
        : product.filter(
            (product) =>
                product.category.toLowerCase() ===
            activeCategory.toLowerCase()
        );   
    return (
        <section className="mx-auto max-w-7xl px-4 py-10">

            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <h2 className="text-xl font-bold text-[#005078]">
                    Popular products
                </h2>

                <div className="flex gap-2 overflow-x-auto ">

                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`rounded-full border px-5 py-2 text-xs transition ${
                                activeCategory === category
                                    ? "border-[#005078] bg-[#005078] text-white"
                                    : "border-gray-200 text-gray-500 hover:border-[#005078] hover:text-[#005078]"
                            }`}
                        >
                            {category}
                        </button>
                    ))}

                </div>

            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}

            </div>
           
        </section>
    );
}