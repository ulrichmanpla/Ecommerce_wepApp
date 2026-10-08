




// export default function ProductCard({product}) {
//   return (
//     <div className="group overflow-hidden rounded-xl border border-gray-200  bg-white shadow-sm transition hover:shadow-md">
//        <div className="h-64 overflow-hidden bg-gray-100">
//            <img 
//            src={product.image} 
//            alt={product.name}
//             className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
//            />
//        </div>
//     </div>
//   )
// }


export default function ProductCard({ product }) {
    return (
        <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">

            {/* Product image */}
            <div className="h-64 overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
            </div>

            {/* Product information */}
            <div className="p-4">

                <h2 className="text-lg font-semibold text-gray-900">
                    {product.name}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    {product.category}
                </p>

                <div className="mt-3 flex items-center justify-between">

                    <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                    </span>

                    <span className="text-sm text-yellow-500">
                        ⭐ {product.rating}
                    </span>

                </div>

                {/* Availability */}
                <p className="mt-2 text-sm">
                    {product.stock > 0 ? (
                        <span className="text-green-600">
                            In stock
                        </span>
                    ) : (
                        <span className="text-red-600">
                            Out of stock
                        </span>
                    )}
                </p>

                <button
                    className="mt-4 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    View Details
                </button>

            </div>
        </div>
    );
}