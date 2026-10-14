
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
  CalendarDays,
  CircleCheck,
  Clock,
  XCircle,
} from "lucide-react";

import { getOrders } from "../services/orderService";
import Footer from "../components/Footer";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders from the backend
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOrders();
      const data = response?.data ?? response;

      const orderList = data?.order ?? data?.orders ?? [];

      setOrders(Array.isArray(orderList) ? orderList : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We couldn't load your orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Get the correct status icon and color
  const getStatusStyle = (status) => {
    const value = String(status || "pending").toLowerCase();

    if (["delivered", "completed", "paid"].includes(value)) {
      return {
        label: value,
        className: "bg-green-100 text-green-700",
        Icon: CircleCheck,
      };
    }

    if (["cancelled", "canceled", "failed"].includes(value)) {
      return {
        label: value,
        className: "bg-red-100 text-red-700",
        Icon: XCircle,
      };
    }

    if (value === "shipped") {
      return {
        label: value,
        className: "bg-blue-100 text-blue-700",
        Icon: Package,
      };
    }

    return {
      label: value,
      className: "bg-amber-100 text-amber-800",
      Icon: Clock,
    };
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          {/* PAGE HEADING */}
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="transition hover:text-[#005078]">
                Home
              </Link>
              <span>/</span>
              <span className="font-medium text-[#005078]">
                My Orders
              </span>
            </div>

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-3xl font-bold text-[#005078]">
                  My Orders
                </h1>
                <p className="mt-2 text-gray-500">
                  Track your purchases and view your order details.
                </p>
              </div>

              <button
                type="button"
                onClick={fetchOrders}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 font-medium text-[#005078] transition hover:bg-[#E0F3FC] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  size={17}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
              <RefreshCw
                className="mx-auto mb-4 animate-spin text-[#005078]"
                size={34}
              />
              <p className="text-gray-500">Loading your orders...</p>
            </div>
          )}

          {/* ERROR STATE */}
          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <p className="font-medium text-red-700">{error}</p>
              <button
                type="button"
                onClick={fetchOrders}
                className="mt-3 font-semibold text-[#005078] underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && orders.length === 0 && (
            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#E0F3FC]">
                <ShoppingBag size={36} className="text-[#005078]" />
              </div>

              <h2 className="text-xl font-bold text-gray-800">
                No orders yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-gray-500">
                Your purchases will appear here once you place your first order.
              </p>

              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#005078] px-6 py-3 font-semibold text-white transition hover:bg-[#003e5d]"
              >
                Start shopping
                <ArrowRight size={18} />
              </Link>
            </div>
          )}

          {/* ORDERS LIST */}
          {!loading && !error && orders.length > 0 && (
            <div className="space-y-6">
              {orders.map((order, index) => {
                const orderId = order._id || order.id || order.orderId || "N/A";
                const items = order.items || order.products || [];
                const status = getStatusStyle(order.status);
                const StatusIcon = status.Icon;

                return (
                  <article
                    key={orderId === "N/A" ? `order-${index}` : orderId}
                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                  >
                    {/* ORDER HEADER */}
                    <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:px-6">
                      <div className="flex flex-wrap gap-x-8 gap-y-4">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Order number
                          </p>
                          <p className="mt-1 font-bold text-[#005078]">
                            #{String(orderId).slice(-8)}
                          </p>
                        </div>

                        <div>
                          <p className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                            <CalendarDays size={13} />
                            Order date
                          </p>
                          <p className="mt-1 font-medium text-gray-700">
                            {order.createdAt &&
                            !Number.isNaN(new Date(order.createdAt).getTime())
                              ? new Date(order.createdAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "Date unavailable"}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${status.className}`}
                      >
                        <StatusIcon size={15} />
                        {status.label.charAt(0).toUpperCase() +
                          status.label.slice(1)}
                      </span>
                    </div>

                    {/* PRODUCTS */}
                    <div className="divide-y divide-gray-100 px-5 sm:px-6">
                      {items.length === 0 && (
                        <p className="py-6 text-sm text-gray-500">
                          No product details were returned for this order.
                        </p>
                      )}

                      {items.map((item, itemIndex) => {
                        const product =
                          item.product || item.productId || item;

                        const productId =
                          typeof product === "string"
                            ? product
                            : product?._id || product?.id;

                        const productName =
                          (typeof product === "object" ? product?.name : null) ||
                          item.productName ||
                          item.name ||
                          "Product";

                        const image =
                          (typeof product === "object" ? product?.image : null) ||
                          item.image ||
                          "";

                        const quantity = Number(item.quantity) || 1;

                        const price = Number(
                          item.price ??
                            item.unitPrice ??
                            (typeof product === "object"
                              ? product?.price
                              : null) ??
                            0
                        );

                        return (
                          <div
                            key={item._id || productId || itemIndex}
                            className="flex items-center gap-4 py-5"
                          >
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                              {image ? (
                                <img
                                  src={image}
                                  alt={productName}
                                  className="h-full w-full object-contain p-2"
                                />
                              ) : (
                                <Package
                                  size={28}
                                  className="text-[#005078]"
                                />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              {productId ? (
                                <Link
                                  to={`/product/${productId}`}
                                  className="font-semibold text-gray-800 hover:text-[#005078]"
                                >
                                  {productName}
                                </Link>
                              ) : (
                                <p className="font-semibold text-gray-800">
                                  {productName}
                                </p>
                              )}

                              <p className="mt-1 text-sm text-gray-500">
                                Quantity: {quantity}
                              </p>

                              <p className="mt-1 text-sm font-medium text-[#005078]">
                                {new Intl.NumberFormat("en-CM", {
                                  style: "currency",
                                  currency: "XAF",
                                  maximumFractionDigits: 0,
                                }).format(price)}{" "}
                                each
                              </p>
                            </div>

                            <p className="shrink-0 text-right font-bold text-gray-800">
                              {new Intl.NumberFormat("en-CM", {
                                style: "currency",
                                currency: "XAF",
                                maximumFractionDigits: 0,
                              }).format(price * quantity)}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* ORDER TOTAL */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 bg-gray-50 px-5 py-5 sm:px-6">
                      <p className="text-sm text-gray-500">
                        {items.reduce(
                          (sum, item) =>
                            sum + (Number(item.quantity) || 1),
                          0
                        )}{" "}
                        item(s) in this order
                      </p>

                      <div className="text-right">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                          Order total
                        </p>
                        <p className="mt-1 text-xl font-bold text-[#005078]">
                          {new Intl.NumberFormat("en-CM", {
                            style: "currency",
                            currency: "XAF",
                            maximumFractionDigits: 0,
                          }).format(
                            Number(
                              order.totalAmount ??
                                order.totalPrice ??
                                order.total ??
                                order.grandTotal ??
                                0
                            )
                          )}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* CONTINUE SHOPPING */}
          {!loading && !error && orders.length > 0 && (
            <div className="mt-8 text-center">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 font-semibold text-[#005078] transition hover:text-[#F5A800]"
              >
                Continue shopping
                <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}