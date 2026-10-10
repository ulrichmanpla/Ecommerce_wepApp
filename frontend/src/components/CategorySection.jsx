import { useRef, useEffect,useState } from "react";
import CategoryCard from "./CategoryCard";

import api from '../services/api'
export default function CategorySection() {
     const [products, setProducts]=useState([])
    const carouselRef = useRef(null);
    useEffect(()=>{
      async function getProducts() {
        const response = await api.get("/products")
        setProducts(response.data)
      }
      getProducts()
    },[])
    console.log("this is the category",products)
    const scrollLeft = () => {
        carouselRef.current.scrollBy({
            left: -300,
            behavior: "smooth"
        });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({
            left: 300,
            behavior: "smooth"
        });
    };

    return (
        <section className="mx-auto max-w-7xl px-4  py-4 ">

            <div className="relative">

               
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:bg-gray-100"
                >
                    ←
                </button>


                <div
                    ref={carouselRef}
                    className="flex justify-start  gap-4 overflow-x-auto scroll-smooth px-2 scroll-hide"
                >

                    {products.map((category) => (
                        <CategoryCard
                            key={category._id}
                            category={category}
                        />
                    ))}

                </div>


                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 z-10 flex h-8 w-8 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:bg-gray-100"
                >
                    →
                </button>

            </div>

        </section>
    );
}