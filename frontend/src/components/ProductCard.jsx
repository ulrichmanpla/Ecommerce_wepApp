import { Eye, ShoppingCart, Star, X } from "lucide-react"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../services/cartService";

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const [adding, setAdding] = useState(false);
    const [error, setError] = useState("");

    const [showAuthModal, setShowAuthModal] = useState(false);

    const token = localStorage.getItem("token");

    const handleAddToCart = async () => {
        // Si le token n'existe pas, on ouvre le popup au lieu de l'alert()
        if (!token) {
            setShowAuthModal(true);
            return;
        }
        try {
            setAdding(true);
            setError("");
            await addToCart(product._id);
            navigate("/cart");
        } catch (err) {
            setError(err.response?.data?.message || "Unable to add this product to your cart ");
        } finally {
            setAdding(false);
        }
    };
  const handleDetails = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        setShowAuthModal(true);
    } else {
        
        navigate(`/products/${product._id}`);
    }
};

    return (
        <div className="relative">
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
                            {product.price}Franc
                        </span>
                    </div>
                    
                    {error && (
                        <p className="mt-2 text-xs text-red-500 font-medium">{error}</p>
                    )}

                    <div className="mt-4 flex gap-2">
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            disabled={adding || product.stock < 1}
                            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#f5a800] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#d99000] cursor-pointer"
                        >
                            <ShoppingCart size={15} />
                            {adding ? "Adding..." : product.stock < 1 ? "Out of Stock" : "Add to Cart"}
                        </button>
                        
                        <button
                          onClick={handleDetails}
                            to={`/products/${product._id}`}
                            aria-label={`View details for ${product.name}`}
                            className="flex h-9 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:border-[#005078] hover:text-[#005078]"
                        >
                            <Eye size={17} />
                        </button>
                    </div>
                </div>
            </div>

            {showAuthModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                 
                    <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        
                        
                        <button 
                            onClick={() => setShowAuthModal(false)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
                        >
                            <X size={18} />
                        </button>

                        <div className="text-center mt-2">
                            <h4 className="text-base font-bold text-[#005078] mb-2">
                                Authentication Required
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                User must login or create an account before adding to cart.
                            </p>
                        </div>

                        <div className="mt-6 flex flex-col gap-2">
                            <button
                                onClick={() => {
                                    setShowAuthModal(false);
                                    navigate("/login");
                                }}
                                className="w-full rounded-md bg-[#005078] py-2.5 text-sm font-semibold text-white transition hover:bg-[#003b59] cursor-pointer"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => {
                                    setShowAuthModal(false);
                                    navigate("/register"); // Remplacez par "/register" si votre route a un autre nom
                                }}
                                className="w-full rounded-md border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 cursor-pointer"
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
