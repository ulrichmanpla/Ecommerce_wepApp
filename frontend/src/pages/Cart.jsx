
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, X, Minus, Plus } from "lucide-react";


import Footer from "../components/Footer";

import {
    getCart,
    updateCartItem,
} from "../services/cartService";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Fetch the authenticated user's cart from the backend.
    const fetchCart = async () => {
        try {
            setError("");

            const data = await getCart();

            setCart(data.cart?.items || data.items || []);
            setSubtotal(Number(data.subtotal ?? 0));
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load your cart. Please sign in and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const formatPrice = (price) =>
        `$ ${Number(price || 0).toFixed(2)}`;

    // Increase or decrease quantity using the backend.
    const handleQuantityChange = async (item, change) => {
        const product = item.product;

        if (!product?._id) {
            setError("Product information is unavailable.");
            return;
        }

        const nextQuantity = item.quantity + change;

        if (nextQuantity < 1) {
            return;
        }

        if (nextQuantity > product.stock) {
            setError(
                `Only ${product.stock} units of ${product.name} are available.`
            );
            return;
        }

        setUpdatingId(product._id);
        setError("");
        setMessage("");

        try {
            await updateCartItem(product._id, nextQuantity);

            // Reload the cart so the UI reflects MongoDB's saved values.
            const data = await getCart();

            setCart(data.cart?.items || data.items || []);
            setSubtotal(Number(data.subtotal ?? 0));
            setMessage("Cart updated successfully.");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to update the quantity. Please try again."
            );
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-white">
        
            {/* Breadcrumb */}
            <div className="bg-[#fafafa]">
                <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-5 text-sm text-gray-600">
                    <Link
                        to="/"
                        className="transition hover:text-[#005078]"
                    >
                        Home
                    </Link>

                    <ChevronRight size={16} />

                    <span>All category</span>

                    <ChevronRight size={16} />

                    <span className="font-medium text-[#005078]">
                        Cart
                    </span>
                </div>
            </div>

            <main className="mx-auto min-h-100 max-w-7xl px-4 py-10">
                {loading ? (
                    <p className="py-16 text-center text-gray-500">
                        Loading your cart...
                    </p>
                ) : error && cart.length === 0 ? (
                    <div className="py-16 text-center">
                        <p role="alert" className="text-red-600">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setLoading(true);
                                fetchCart();
                            }}
                            className="mt-5 rounded-full bg-[#005078] px-6 py-3 text-white hover:bg-[#003b59]"
                        >
                            Try again
                        </button>
                    </div>
                ) : cart.length === 0 ? (
                    <div className="py-16 text-center">
                        <h1 className="text-2xl font-bold text-[#005078]">
                            Your cart is empty
                        </h1>

                        <p className="mt-3 text-gray-500">
                            Browse our products and add something you like.
                        </p>

                        <Link
                            to="/"
                            className="mt-6 inline-block rounded-full bg-[#F5A800] px-8 py-3 font-semibold text-white transition hover:bg-[#d99000]"
                        >
                            Continue shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        {error && (
                            <p
                                role="alert"
                                className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600"
                            >
                                {error}
                            </p>
                        )}

                        {message && (
                            <p
                                role="status"
                                className="mb-4 rounded-lg bg-[#E0F3FC] p-3 text-sm text-[#005078]"
                            >
                                {message}
                            </p>
                        )}

                        <div className="grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
                            {/* Cart products */}
                            <section className="min-w-0">
                                {/* Table header */}
                                <div className="grid grid-cols-[minmax(0,2fr)_0.8fr_1fr_0.9fr_24px] items-center gap-2 bg-[#E0F3FC] px-2 py-4 text-[11px] font-semibold text-gray-800 sm:px-5 sm:text-sm">
                                    <span>Product</span>
                                    <span className="text-center">
                                        Price
                                    </span>
                                    <span className="text-center">
                                        Quantity
                                    </span>
                                    <span className="text-center">
                                        Subtotal
                                    </span>
                                    <span />
                                </div>

                                {/* Cart rows */}
                                {cart.map((item) => {
                                    const product = item.product;

                                    if (!product) {
                                        return null;
                                    }

                                    const isUpdating =
                                        updatingId === product._id;

                                    return (
                                        <div
                                            key={product._id}
                                            className="grid grid-cols-[minmax(0,2fr)_0.8fr_1fr_0.9fr_24px] items-center gap-2 border-b border-gray-300 px-2 py-5 sm:px-4"
                                        >
                                            {/* Product image and name */}
                                            <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-12 w-12 shrink-0 object-contain sm:h-20 sm:w-20"
                                                />

                                                <div className="min-w-0">
                                                    <Link
                                                        to={`/product/${product._id}`}
                                                        className="line-clamp-2 text-xs font-bold text-[#005078] hover:text-[#F5A800] sm:text-sm"
                                                    >
                                                        {product.name}
                                                    </Link>

                                                    <p className="mt-1 hidden text-xs text-gray-500 sm:block">
                                                        Category:{" "}
                                                        {product.category}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Unit price */}
                                            <span className="text-center text-[11px] sm:text-sm">
                                                {formatPrice(product.price)}
                                            </span>

                                            {/* Quantity controls */}
                                            <div className="flex justify-center">
                                                <div className="flex items-center border border-gray-300">
                                                    <button
                                                        type="button"
                                                        aria-label={`Decrease ${product.name} quantity`}
                                                        disabled={
                                                            isUpdating ||
                                                            item.quantity <= 1
                                                        }
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item,
                                                                -1
                                                            )
                                                        }
                                                        className="px-1 py-2 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 sm:px-2"
                                                    >
                                                        <Minus size={12} />
                                                    </button>

                                                    <span className="min-w-6 border-x border-gray-300 px-1 py-2 text-center text-xs sm:min-w-9 sm:px-2">
                                                        {isUpdating
                                                            ? "…"
                                                            : item.quantity}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        aria-label={`Increase ${product.name} quantity`}
                                                        disabled={
                                                            isUpdating ||
                                                            item.quantity >=
                                                                product.stock
                                                        }
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item,
                                                                1
                                                            )
                                                        }
                                                        className="px-1 py-2 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 sm:px-2"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Line subtotal */}
                                            <span className="text-center text-[11px] font-semibold sm:text-sm">
                                                {formatPrice(
                                                    product.price *
                                                        item.quantity
                                                )}
                                            </span>

                                            {/* Remove button: requires a backend remove endpoint */}
                                            <button
                                                type="button"
                                                title="Remove product"
                                                aria-label={`Remove ${product.name}`}
                                                disabled
                                                className="flex justify-center text-gray-400"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    );
                                })}

                                {/* Continue shopping */}
                                <div className="mt-6">
                                    <Link
                                        to="/"
                                        className="inline-block rounded-full bg-[#F5A800] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#d99000] sm:px-8 sm:text-sm"
                                    >
                                        Continue shopping
                                    </Link>
                                </div>
                            </section>

                            {/* Cart total */}
                            <aside className="border border-gray-300">
                                <h2 className="bg-[#E0F3FC] px-4 py-4 text-center text-lg font-semibold text-gray-800">
                                    Cart total
                                </h2>

                                <div className="space-y-6 p-5 sm:p-7">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-sm">
                                            Subtotal
                                        </span>

                                        <span className="text-sm font-semibold">
                                            {formatPrice(subtotal)}
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-300 pt-5">
                                        <label
                                            htmlFor="country"
                                            className="sr-only"
                                        >
                                            Country
                                        </label>

                                        <select
                                            id="country"
                                            defaultValue=""
                                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#005078]"
                                        >
                                            <option value="" disabled>
                                                Country
                                            </option>
                                            <option value="Cameroon">
                                                Cameroon
                                            </option>
                                            <option value="Nigeria">
                                                Nigeria
                                            </option>
                                            <option value="France">
                                                France
                                            </option>
                                        </select>
                                    </div>

                                    <div className="flex items-center justify-between gap-3 border-t border-gray-300 pt-5">
                                        <span className="text-sm font-semibold">
                                            Total amount
                                        </span>

                                        <span className="text-sm font-bold text-[#005078]">
                                            {formatPrice(subtotal)}
                                        </span>
                                    </div>

                                    <Link
                                        to="/checkout"
                                        className="block w-full rounded-full bg-[#F5A800] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#d99000]"
                                    >
                                        Proceed to checkout
                                    </Link>
                                </div>
                            </aside>
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}