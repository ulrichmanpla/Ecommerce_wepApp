

import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
    Heart,
    Star,
    Check,
    ShoppingCart,
    Eye,
    Minus,
    Plus,
    ChevronRight,
} from "lucide-react";


import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import api from "../services/api";
export default function ProductDetails() {
    const { id } = useParams();

     const [products, setProduct]=useState([])

     useEffect(()=>{
         async function getProducts() {
            const response = await api.get('/products')
            console.log("details",response.data)
            setProduct(response.data)
         }
         getProducts()
     },[])
    const product = products.find(
        (item) => String(item._id) === id
    );

    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("Reviews");
    const [selectedImage, setSelectedImage] = useState(null);
    const [message, setMessage] = useState("");

    if (!product) {
        return (
            <div className="min-h-screen bg-white">
                <main className="mx-auto max-w-7xl px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-[#005078]">
                        Product not found
                    </h1>
                    <p className="mt-3 text-gray-500">
                        This product may have been removed or the link is invalid.
                    </p>
                    <Link
                        to="/"
                        className="mt-6 inline-block rounded-lg bg-[#F5A800] px-6 py-3 font-semibold text-white"
                    >
                        Back to home
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    const image = selectedImage || product.image;

    const relatedProducts = products
        .filter((item) => item.category == product.category)
    
    const changeQuantity = (amount) => {
        setQuantity((current) => Math.max(1, current + amount));
    };

    const handleAddToCart = () => {
        // Connect this handler to CartContext in the next step.
        setMessage(`${quantity} × ${product.name} selected.`);
    };

    const handleBuyNow = () => {
        // Checkout navigation can be connected when your cart flow is ready.
        setMessage("Buy now selected. Checkout integration is the next step.");
    };

    return (
        <div className="min-h-screen bg-white">
            <main>
                {/* Breadcrumb */}
                <div className="border-b border-gray-100 bg-[#fafafa]">
                    <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 text-xs text-gray-500">
                        <Link to="/" className="hover:text-[#005078]">
                            Home
                        </Link>
                        <ChevronRight size={14} />
                        <Link to="/products" className="hover:text-[#005078]">
                            All category
                        </Link>
                        <ChevronRight size={14} />
                        <span className="truncate text-[#005078]">
                            {product.name}
                        </span>
                    </div>
                </div>

                {/* Product overview */}
                <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-2">

                    {/* Product images */}
                    <div>
                        <div className="flex h-75 items-center justify-center overflow-hidden rounded-xl border border-gray-200 p-6 sm:h-100">
                            <img
                                src={image}
                                alt={product.name}
                                className="h-full w-full object-contain"
                            />
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            {[product.image, product.image].map((src, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setSelectedImage(src)}
                                    className={`flex h-24 items-center justify-center rounded-xl border p-3 transition hover:border-[#F5A800] ${
                                        image === src
                                            ? "border-gray-300"
                                            : "border-gray-200"
                                    }`}
                                >
                                    <img
                                        src={src}
                                        alt={`${product.name} view ${index + 1}`}
                                        className="h-full w-full object-contain"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product information */}
                    <div>
                        <h1 className="text-2xl font-semibold text-[#005078] sm:text-3xl">
                            {product.name}
                        </h1>

                        <p className="mt-3 text-2xl font-bold text-gray-700">
                            {Number(product.price)} Franc
                        </p>

                        {/* Rating */}
                        <div className="mt-4 flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={19}
                                    className={
                                        star <= (product.rating || 0)
                                            ? "fill-[#F5A800] text-[#F5A800]"
                                            : "text-[#F5A800]"
                                    }
                                />
                            ))}
                            <span className="ml-2 text-xs text-gray-500">
                                {product.rating
                                    ? `${product.rating}/5`
                                    : "No reviews"}
                            </span>
                        </div>

                        {/* Availability */}
                        <div className="mt-4 flex items-center gap-3 text-sm">
                            <span className="font-medium text-gray-700">
                                Availability:
                            </span>
                            <Check size={18} className="text-green-500" />
                            <span className="text-green-600">In stock</span>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            Discover more details about this product before ordering.
                        </p>

                        <div className="my-5 border-t border-gray-200" />

                        {/* Category */}
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                            <span className="font-semibold text-gray-700">
                                Category:
                            </span>
                            <span className="rounded bg-[#E0F3FC] px-2 py-1 text-xs text-[#005078]">
                                {product.category}
                            </span>
                        </div>

                        {/* Quantity */}
                        <div className="mt-6 flex items-center gap-3 text-sm">
                            <span className="font-medium text-gray-700">
                                Quantity:
                            </span>

                            <div className="flex items-center border border-gray-300">
                                <button
                                    type="button"
                                    onClick={() => changeQuantity(-1)}
                                    aria-label="Decrease quantity"
                                    className="px-3 py-1 hover:bg-gray-100"
                                >
                                    <Minus size={14} />
                                </button>

                                <span className="min-w-10 border-x border-gray-300 px-3 py-1 text-center">
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => changeQuantity(1)}
                                    aria-label="Increase quantity"
                                    className="px-3 py-1 hover:bg-gray-100"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-7 flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#F5A800] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#d99000]"
                            >
                                <ShoppingCart size={18} />
                                Add to cart
                            </button>

                            <button
                                type="button"
                                onClick={handleBuyNow}
                                className="flex-1 rounded-full bg-[#F5A800] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#d99000]"
                            >
                                Buy it now
                            </button>

                            <button
                                type="button"
                                aria-label="Add to wishlist"
                                onClick={() => setMessage("Wishlist integration is coming next.")}
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:text-[#F5A800]"
                            >
                                <Heart size={22} />
                            </button>
                        </div>

                        {message && (
                            <p role="status" className="mt-3 text-sm text-[#005078]">
                                {message}
                            </p>
                        )}

                        <div className="my-5 border-t border-gray-200" />

                        <p className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-800">SKU:</span>
                            <span className="ml-4">EL-{product.id}</span>
                        </p>

                        <p className="mt-4 text-sm text-gray-600">
                            <span className="font-semibold text-gray-800">Share:</span>
                            <span className="ml-4">Share this product with friends.</span>
                        </p>
                    </div>
                </section>

                {/* Description and reviews */}
                <section className="mx-auto max-w-7xl px-4 py-8">
                    <div className="flex justify-center gap-3">
                        {["Description", "Reviews"].map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={`rounded-xl border px-6 py-3 text-sm font-semibold transition ${
                                    activeTab === tab
                                        ? "border-[#005078] bg-[#005078] text-white"
                                        : "border-gray-300 text-gray-700 hover:border-[#005078]"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 rounded-xl border border-gray-300 p-6 sm:p-8">
                        {activeTab === "Description" ? (
                            <>
                                <h2 className="font-bold text-[#005078]">
                                    Product description
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-gray-600">
                                    {product.name} is listed in our{" "}
                                    {product.category} collection. Browse the
                                    product details and add it to your cart when
                                    you are ready to purchase.
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 className="font-bold text-[#005078]">
                                    Customer reviews
                                </h2>
                                <p className="mt-4 text-sm text-gray-500">
                                    No reviews yet
                                </p>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setMessage("Review submission will be implemented later.")
                                    }
                                    className="mt-4 bg-[#005078] px-5 py-2 text-sm text-white hover:bg-[#003b59]"
                                >
                                    Write a review
                                </button>
                            </>
                        )}
                    </div>
                </section>

                {/* Related products */}
                <section className="mx-auto max-w-7xl px-4 py-8">
                    <h2 className="mb-7 text-xl font-bold text-[#005078]">
                        Related product
                    </h2>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {relatedProducts.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}