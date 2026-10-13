
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
;
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import {getProducts} from '../services/productService'

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        // Your API returns products inside data.products.
        setProducts(data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get the categories that actually exist in the database.
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Search by product name and filter by category.
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  console.log("this is the user product", products)
  return (
    <>

      <main className="min-h-screen bg-[#f7f7f7] px-4 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Page heading */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#F5A800]">
              Discover our collection
            </p>

            <h1 className="text-3xl font-bold text-[#005078] md:text-4xl">
              All Products
            </h1>

            <p className="mt-3 text-gray-600">
              Find the products you need at great prices.
            </p>
          </div>

          {/* Search and category filters */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div className="relative w-full md:max-w-md">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-[#005078]"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#005078]"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Product count */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-gray-600">
              {filteredProducts.length} product(s) found
            </p>

            <Link
              to="/"
              className="text-sm font-semibold text-[#005078] hover:underline"
            >
              Back to Home
            </Link>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="py-16 text-center text-gray-600">
              Loading products...
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="rounded-lg bg-red-50 p-5 text-center text-red-600">
              <p>{error}</p>

              <button
                onClick={() => window.location.reload()}
                className="mt-3 font-semibold underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Product grid */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="rounded-xl bg-white px-5 py-16 text-center">
              <h2 className="text-xl font-semibold text-[#005078]">
                No products found
              </h2>

              <p className="mt-2 text-gray-500">
                Try another search term or select a different category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-5 rounded-lg bg-[#005078] px-5 py-3 font-semibold text-white hover:bg-[#003d5c]"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

