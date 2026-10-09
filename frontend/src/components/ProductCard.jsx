import { ShoppingCart, Star } from "lucide-react";

export default function ProductCard({ product }) {
    return (
        <div className="group relative overflow-hidden rounded-lg bg-white transition duration-300 hover:shadow-lg shadow-md">
            <div className="relative flex h-64 items-center justify-center overflow-hidden">

                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain p-6 transition duration-300 group-hover:scale-105"
                />

            </div>
            <div className="p-4">

                <p className="mb-1 text-xs text-gray-400">
                    {product.category}
                </p>

                <h3 className="line-clamp-1 text-sm font-semibold text-[#005078]">
                    {product.name}
                </h3>
                <div className="mt-2 flex items-center gap-1">

                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={14}
                                className={
                                    star <= product.rating
                                        ? "fill-[#f5a800] text-[#f5a800]"
                                        : "text-gray-300"
                                }
                            />
                        ))}
                    </div>

                    <span className="ml-1 text-xs text-gray-400">
                        ({product.rating})
                    </span>

                </div>

                <div className="mt-3">
                    <span className="text-lg font-bold text-[#005078]">
                        ${product.price.toFixed(2)}
                    </span>
                </div>
                <div className="mt-4 flex gap-2">

                    <button
                        className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#f5a800] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#d99000]"
                    >
                        <ShoppingCart size={15} />
                        Add to Cart
                    </button>

                    {/* <button
                        className="flex h-9 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:border-[#005078] hover:text-[#005078]"
                    >
                        <Eye size={17} />
                    </button> */}

                </div>

            </div>
        </div>
    );
}