
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  PackagePlus,
  Pencil,
  Trash2,
  X,
  RefreshCw,
} from "lucide-react";

import { getProducts, createProduct, updateProduct,deleteProduct } from "../../services/productService";
import Footer from "../../components/Footer";

const emptyForm = {
  name: "",
  price: "",
  category: "",
  stock: "",
  rating: "0",
  image: null,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();
      const list = Array.isArray(data)
        ? data
        : data?.products || [];

      setProducts(list);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImagePreview("");
    setError("");
    setMessage("");
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name || "",
      price: String(product.price ?? ""),
      category: product.category || "",
      stock: String(product.stock ?? ""),
      rating: String(product.rating ?? 0),
      image: null,
    });

    setImagePreview(product.image || "");
    setError("");
    setMessage("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setImagePreview("");
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "image") {
      const file = files?.[0] || null;

      setForm((previous) => ({
        ...previous,
        image: file,
      }));

      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }

      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("name", form.name.trim());
      formData.append("price", form.price);
      formData.append("category", form.category.trim());
      formData.append("stock", form.stock);
      formData.append("rating", form.rating);

      // For edits, only send a new image if one was selected.
      if (form.image) {
        formData.append("image", form.image);
      }

      if (!editingId && !form.image) {
        setError("Please select a product image.");
        setSaving(false);
        return;
      }

      if (
        !form.name.trim() ||
        !form.category.trim() ||
        form.price === "" ||
        form.stock === ""
      ) {
        setError("Please fill in all required fields.");
        setSaving(false);
        return;
      }

      if (
        Number(form.price) < 0 ||
        Number(form.stock) < 0 ||
        Number(form.rating) < 0 ||
        Number(form.rating) > 5
      ) {
        setError("Check the price, stock, and rating values.");
        setSaving(false);
        return;
      }

      if (editingId) {
        await updateProduct(editingId, formData);
        setMessage("Product updated successfully.");
      } else {
        await createProduct(formData);
        setMessage("Product created successfully.");
      }

      closeForm();
      await loadProducts();
      setMessage(
        editingId
          ? "Product updated successfully."
          : "Product created successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not save the product."
      );
    } finally {
      setSaving(false);
    }
  };

  
const handleDelete = async (product) => {
  // Ask for confirmation before deleting.
  const confirmed = window.confirm(
    `Are you sure you want to delete "${product.name}"? This action cannot be undone.`
  );

  if (!confirmed) return;

  setDeletingId(product._id);
  setError("");
  setMessage("");

  try {
    await deleteProduct(product._id);

    // Remove the deleted product from the current table.
    setProducts((previousProducts) =>
      previousProducts.filter(
        (item) => item._id !== product._id
      )
    );

    setMessage(`"${product.name}" was deleted successfully.`);
  } catch (err) {
    setError(
      err.response?.data?.message ||
        "Could not delete the product."
    );
  } finally {
    setDeletingId(null);
  }
};


  return (
    <>
      <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <Link
                to="/admin"
                className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#005078] hover:text-[#F5A800]"
              >
                <ArrowLeft size={16} />
                Back to dashboard
              </Link>

              <h1 className="text-3xl font-bold text-gray-900">
                Product management
              </h1>

              <p className="mt-2 text-gray-500">
                Add products and update your store catalogue.
              </p>
            </div>

            <button
              onClick={openAddForm}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#005078] px-5 py-3 font-semibold text-white hover:bg-[#003e5d]"
            >
              <PackagePlus size={19} />
              Add product
            </button>
          </div>

          {message && (
            <div className="mb-5 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {showForm && (
            <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#005078]">
                    {editingId ? "Edit product" : "Add a new product"}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Fields marked * are required.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                  aria-label="Close form"
                >
                  <X size={21} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Product name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#005078] focus:ring-2 focus:ring-[#E0F3FC]"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Category *
                    </label>
                    <input
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#005078] focus:ring-2 focus:ring-[#E0F3FC]"
                      placeholder="e.g. Electronics"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Price (XAF) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      min="0"
                      step="any"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#005078] focus:ring-2 focus:ring-[#E0F3FC]"
                      placeholder="e.g. 150000"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Stock quantity *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={form.stock}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#005078] focus:ring-2 focus:ring-[#E0F3FC]"
                      placeholder="e.g. 10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Rating (0–5)
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={form.rating}
                      onChange={handleChange}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#005078] focus:ring-2 focus:ring-[#E0F3FC]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Product image {!editingId && "*"}
                    </label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      required={!editingId}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-[#E0F3FC] file:px-3 file:py-2 file:font-semibold file:text-[#005078]"
                    />
                  </div>
                </div>

                {imagePreview && (
                  <div className="mt-5">
                    <p className="mb-2 text-sm font-medium text-gray-700">
                      Image preview
                    </p>
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="h-32 w-32 rounded-xl border border-gray-200 bg-gray-50 object-contain p-2"
                    />
                  </div>
                )}

                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#005078] px-6 py-3 font-semibold text-white hover:bg-[#003e5d] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving && (
                      <RefreshCw size={17} className="animate-spin" />
                    )}
                    {saving
                      ? "Saving..."
                      : editingId
                      ? "Save changes"
                      : "Create product"}
                  </button>

                  <button
                    type="button"
                    onClick={closeForm}
                    disabled={saving}
                    className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          )}

          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <h2 className="font-bold text-gray-900">
                All products ({products.length})
              </h2>

              <button
                onClick={loadProducts}
                disabled={loading}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#005078] hover:text-[#F5A800]"
              >
                <RefreshCw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>

            {loading ? (
              <p className="p-10 text-center text-gray-500">
                Loading products...
              </p>
            ) : products.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No products found. Add your first product.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-175 text-left text-sm">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                    <tr>
                      <th className="px-5 py-4">Product</th>
                      <th className="px-5 py-4">Category</th>
                      <th className="px-5 py-4">Price</th>
                      <th className="px-5 py-4">Stock</th>
                      <th className="px-5 py-4">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                      <tr
                        key={product._id}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-12 w-12 rounded-lg bg-[#E0F3FC] object-contain p-1"
                            />
                            <span className="font-semibold text-gray-800">
                              {product.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-gray-600">
                          {product.category}
                        </td>

                        <td className="px-5 py-4 font-semibold text-gray-800">
                          {new Intl.NumberFormat("en-CM", {
                            style: "currency",
                            currency: "XAF",
                            maximumFractionDigits: 0,
                          }).format(Number(product.price) || 0)}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={
                              Number(product.stock) <= 5
                                ? "rounded-full bg-red-50 px-3 py-1 font-semibold text-red-600"
                                : "rounded-full bg-green-50 px-3 py-1 font-semibold text-green-700"
                            }
                          >
                            {product.stock}
                          </span>
                        </td>
                               
<td className="px-5 py-4">
  <div className="flex items-center gap-2">
    {/* Edit product */}
    <button
      type="button"
      onClick={() => openEditForm(product)}
      disabled={deletingId === product._id}
      className="inline-flex items-center gap-2 rounded-lg border border-[#005078] px-3 py-2 font-semibold text-[#005078] hover:bg-[#E0F3FC] disabled:opacity-50"
    >
      <Pencil size={15} />
      Edit
    </button>

    {/* Delete product */}
    <button
      type="button"
      onClick={() => handleDelete(product)}
      disabled={deletingId === product._id}
      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {deletingId === product._id ? (
        <RefreshCw size={15} className="animate-spin" />
      ) : (
        <Trash2 size={15} />
      )}

      {deletingId === product._id
        ? "Deleting..."
        : "Delete"}
    </button>
  </div>
</td>

                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
