import logo1 from "../assets/logo1.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  X,
  UserRound,
  ChevronDown,
} from "lucide-react";

import { getCart } from "../services/cartService";
import { getUser } from "../services/user";

export default function Navbar() {
  const navigate = useNavigate();

  const [cartItems, setCart] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const token = localStorage.getItem("token");
  const cartQuantity = cartItems?.cart?.items?.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  ) || 0;

  useEffect(() => {
    let active = true;

    async function loadCart() {
      if (!token) {
        setCart(null);
        return;
      }

      try {
        const data = await getCart();

        if (active) {
          setCart(data);
        }
      } catch (error) {
        console.error("Unable to load cart:", error);
      }
    }

    loadCart();

    return () => {
      active = false;
    };
  }, [token]);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      if (!token) {
        setUserInfo(null);
        return;
      }

      try {
        const data = await getUser();

        if (active) {
          setUserInfo(data);
        }
      } catch (error) {
        console.error("Unable to load user:", error);
      }
    }

    loadUser();

    return () => {
      active = false;
    };
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUserInfo(null);
    setCart(null);
    setIsOpen(false);
    setProfileOpen(false);

    navigate("/");
  };

  const closeMenu = () => {
    setIsOpen(false);
    setProfileOpen(false);
  };

  const navLinkClass =
    "block rounded-lg px-3 py-2 font-semibold text-white transition hover:bg-white/10 hover:text-[#F5A800]";

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="bg-[#005078] px-4 py-3 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="shrink-0">
            <img
              src={logo1}
              alt="Electon logo"
              className="h-10 w-auto object-contain sm:h-12"
            />
          </Link>

  
          <div className="hidden items-center gap-1 lg:flex">
            <Link to="/" className={navLinkClass}>
              Home
            </Link>

            <Link to="/products" className={navLinkClass}>
              Products
            </Link>

            {token && (
              <Link to="/orders" className={navLinkClass}>
                Orders
              </Link>
            )}
          </div>

       
          <div className="flex items-center gap-3">

            <Link
              to="/cart"
              onClick={closeMenu}
              aria-label={`Shopping cart, ${cartQuantity} items`}
              className="relative flex items-center rounded-lg p-2 text-white transition hover:bg-white/10"
            >
              <ShoppingCart size={25} />

              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F5A800] px-1 text-xs font-bold text-[#005078]">
                {cartQuantity}
              </span>
            </Link>

       
            {!token ? (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  to="/register"
                  className="rounded-lg border border-white px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[#005078]"
                >
                  Sign up
                </Link>

                <Link
                  to="/login"
                  className="rounded-lg bg-[#F5A800] px-4 py-2 text-sm font-bold text-[#005078] transition hover:bg-amber-400"
                >
                  Login
                </Link>
              </div>
            ) : (
        
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => setProfileOpen((previous) => !previous)}
                  aria-expanded={profileOpen}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-white hover:bg-white/10"
                >
                  <UserRound size={22} />
                  <span className="max-w-28 truncate text-sm font-semibold">
                    {userInfo?.user?.name || "My account"}
                  </span>
                  <ChevronDown size={16} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white p-4 text-gray-800 shadow-xl">
                    <p className="truncate font-bold">
                      {userInfo?.user?.name || "My account"}
                    </p>

                    <p className="mt-1 break-all text-sm text-gray-500">
                      {userInfo?.user?.email || ""}
                    </p>

                    {userInfo?.user?.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={closeMenu}
                        className="mt-3 block rounded-lg px-3 py-2 font-semibold text-[#005078] hover:bg-[#E0F3FC]"
                      >
                        Admin dashboard
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-2 w-full rounded-lg px-3 py-2 text-left font-semibold text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsOpen((previous) => !previous)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
            >
              {isOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>

       
        {isOpen && (
          <div className="mx-auto mt-3 max-w-7xl border-t border-white/20 pb-2 pt-3 lg:hidden">
            <div className="flex flex-col gap-1">
              <Link to="/" onClick={closeMenu} className={navLinkClass}>
                Home
              </Link>

              <Link
                to="/products"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Products
              </Link>

              {token ? (
                <>
                  <Link
                    to="/orders"
                    onClick={closeMenu}
                    className={navLinkClass}
                  >
                    Orders
                  </Link>

                  {userInfo?.user?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={closeMenu}
                      className={navLinkClass}
                    >
                      Admin dashboard
                    </Link>
                  )}

                  <div className="mx-3 my-2 rounded-lg bg-white/10 p-3 text-sm text-white">
                    <p className="font-bold">
                      {userInfo?.user?.name || "My account"}
                    </p>
                    <p className="mt-1 break-all text-blue-100">
                      {userInfo?.user?.email || ""}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-lg px-3 py-2 text-left font-semibold text-amber-300 hover:bg-white/10"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 px-3 pt-2 sm:hidden">
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="rounded-lg border border-white px-3 py-2 text-center font-semibold text-white"
                  >
                    Sign up
                  </Link>

                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="rounded-lg bg-[#F5A800] px-3 py-2 text-center font-bold text-[#005078]"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}