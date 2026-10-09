import { useState } from "react";
import popularProducts from "../data/PopularProduct.js";
import ProductCard from "./ProductCard";

export default function PopularProducts() {

    const [activeCategory, setActiveCategory] = useState("All");

    const categories = [
        "All",
        "Cameras",
        "Laptops",
        "Tablets",
        "Mouse"
    ];

    const filteredProducts =
        activeCategory === "All"
            ? popularProducts
            : popularProducts.filter(
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

                <div className="flex gap-2 overflow-x-auto">

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
                        key={product.id}
                        product={product}
                    />
                ))}

            </div>

        </section>
    );
}