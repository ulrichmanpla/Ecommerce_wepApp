import { useState } from "react";
import { Eye, ShoppingCart, Star } from "lucide-react";

import speakerImage from "../assets/51.png";
import controllerImage from "../assets/box1.png";
import laptopImage from "../assets/81.png";

export default function FeaturedProducts() {
    const featuredProducts = [
        {
            id: 1,
            name: "JBL bar 2.1 deep bass",
            image: speakerImage,
            price: 11.70,
            rating: 4,
            options: ["57", "11", "33", "59"],
        },
        {
            id: 2,
            name: "Gaming speaker",
            image: speakerImage,
            price: 15.70,
            rating: 5,
            options: ["45", "20", "30", "50"],
        },
        {
            id: 3,
            name: "Premium sound system",
            image: speakerImage,
            price: 25.70,
            rating: 4,
            options: ["60", "15", "40", "80"],
        },
    ];

    const [currentProduct, setCurrentProduct] = useState(0);

    const product = featuredProducts[currentProduct];

    const nextProduct = () => {
        setCurrentProduct((prev) =>
            prev === featuredProducts.length - 1 ? 0 : prev + 1
        );
    };

    const previousProduct = () => {
        setCurrentProduct((prev) =>
            prev === 0 ? featuredProducts.length - 1 : prev - 1
        );
    };

    return (
        <section className="mx-auto max-w-7xl px-4 py-10">

            <div className="grid gap-4 md:grid-cols-2">

                <div className="relative min-h-70 overflow-hidden rounded-xl border border-gray-200 bg-white">

                    <div className="grid h-full grid-cols-2 items-center gap-4 p-6">

                     
                        <div className="flex h-full items-center justify-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="max-h-47.5 w-full object-contain"
                            />
                        </div>

                        <div className="flex flex-col justify-center">

                            <h3 className="text-sm font-semibold text-[#005078]">
                                {product.name}
                            </h3>

                            <p className="mt-3 text-sm font-semibold text-gray-700">
                                ${product.price.toFixed(2)}
                            </p>

                          
                            <div className="mt-2 flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={12}
                                        className={
                                            star <= product.rating
                                                ? "fill-gray-400 text-gray-400"
                                                : "text-gray-300"
                                        }
                                    />
                                ))}
                            </div>

                           
                            <div className="mt-4 flex gap-2">
                                {product.options.map((option) => (
                                    <div
                                        key={option}
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e0f3fc] text-[10px] font-semibold text-[#005078]"
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 flex gap-2">

                                <button
                                    className="flex items-center gap-2 rounded-lg bg-[#8fc5df] px-4 py-2 text-[10px] font-semibold text-[#005078] transition hover:bg-[#005078] hover:text-white"
                                >
                                    Add to cart
                                    <ShoppingCart size={13} />
                                </button>
{/* 
                                <button
                                    className="flex h-9 w-10 items-center justify-center rounded-lg bg-[#8fc5df] text-[#005078] transition hover:bg-[#005078] hover:text-white"
                                >
                                    <Eye size={14} />
                                </button> */}

                            </div>
                        </div>
                    </div>

                   
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                        {featuredProducts.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentProduct(index)}
                                className={`h-2 w-2 rounded-full border ${
                                    currentProduct === index
                                        ? "border-[#f5a800] bg-[#f5a800]"
                                        : "border-gray-300 bg-white"
                                }`}
                            />
                        ))}
                    </div>

                    
                    <button
                        onClick={previousProduct}
                        className="absolute left-2 top-1/2 hidden -translate-y-1/2 text-gray-400 hover:text-[#005078] md:block"
                    >
                        ‹
                    </button>

                    <button
                        onClick={nextProduct}
                        className="absolute right-2 top-1/2 hidden -translate-y-1/2 text-gray-400 hover:text-[#005078] md:block"
                    >
                        ›
                    </button>
                </div>



                <div className="grid grid-rows-2 gap-4">

               
                    <div className="flex items-center rounded-xl border border-gray-200 bg-white px-5 py-4">

                        <div className="flex w-1/2 items-center justify-center">
                            <img
                                src={controllerImage}
                                alt="Play game"
                                className="h-28 w-full object-contain"
                            />
                        </div>

                        <div className="w-1/2">

                            <h3 className="text-xs font-semibold text-[#005078]">
                                Play game
                            </h3>

                            <p className="mt-2 text-xs font-semibold text-gray-700">
                                $11.70
                            </p>

                            <div className="mt-2 flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={10}
                                        className="fill-gray-400 text-gray-400"
                                    />
                                ))}
                            </div>

                        </div>
                    </div>

                    <div className="flex items-center rounded-xl border border-gray-200 bg-white px-5 py-4">

                        <div className="flex w-1/2 items-center justify-center">
                            <img
                                src={laptopImage}
                                alt="Tablet as a laptop"
                                className="h-28 w-full object-contain"
                            />
                        </div>

                        <div className="w-1/2">

                            <h3 className="text-xs font-semibold text-[#005078]">
                                Tablet as a laptop
                            </h3>

                            <p className="mt-2 text-xs font-semibold text-gray-700">
                                $11.70
                            </p>

                            <div className="mt-2 flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={10}
                                        className="fill-gray-400 text-gray-400"
                                    />
                                ))}
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}