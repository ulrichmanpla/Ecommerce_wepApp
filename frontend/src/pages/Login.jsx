
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Mail, Lock, Eye, EyeOff } from "lucide-react";
import api from "../services/api";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formError, setFormError]=useState("")
    const [formError1, setFormError1]=useState("")
    const successMessage = location.state?.message;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

   
const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        if(!form.email.trim()){
          return  setFormError("email is required")
            setError("")
        }
        if(!form.password.trim()){
         return   setFormError1("password is required")
            setError(" ")
        }
        const response = await api.post("/auth/login", form);
        const data = response.data;

        console.log("User login data:", data);
        if (!data.token) {
            setError(
                "Login succeeded, but the server did not return a token."
            );
            return;
        }


        localStorage.setItem("token", data.token);


        const user = data.user;

        if (!user || !user.role) {
            setError(
                "Login succeeded, but the server did not return the user's role."
            );
            localStorage.removeItem("token");
            return;
        }


        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "admin") {
            navigate("/admin", { replace: true });
        } else {
            navigate("/", { replace: true });
        }

    } catch (err) {
        setError(
            err.data?.message ||
            "Login failed. Check your email and password."
        );
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="min-h-screen bg-[#E0F3FC] px-4 py-10">
            <div className="mx-auto grid min-h-150 max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">

                {/* Left design panel */}
                <div className="relative flex flex-col justify-between overflow-hidden bg-[#005078] p-8 text-white md:p-12">
                    <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold">
                        <ShoppingBag className="text-[#F5A800]" size={28} />
                        Electon
                    </Link>

                    <div className="relative z-10 py-10">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-[#F5A800]">
                            Welcome back
                        </p>
                        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                            Good products.
                            <span className="text-[#F5A800]"> Great choices.</span>
                        </h1>
                        <p className="mt-5 max-w-sm text-sm leading-6 text-blue-100">
                            Sign in to access your account, manage your cart,
                            and continue discovering products you love.
                        </p>
                    </div>

                    <div className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full border-35 border-white/5" />
                    <div className="absolute right-12 top-24 h-28 w-28 rounded-full bg-[#F5A800]/10" />

                    <p className="relative text-xs text-blue-100">
                        Your Electon shopping experience starts here.
                    </p>
                </div>

                {/* Login form */}
                <div className="flex items-center justify-center p-6 md:p-12">
                    <div className="w-full max-w-md">
                        <h2 className="text-3xl font-bold text-[#005078]">
                            Sign in
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Enter your details to access your account.
                        </p>

                        {successMessage && (
                            <p role="status" className="mt-5 rounded-lg bg-[#E0F3FC] p-3 text-sm text-[#005078]">
                                {successMessage}
                            </p>
                        )}

                        {error && (
                            <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#005078]">
                                    Email address
                                </label>
                                <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 focus-within:border-[#005078]">
                                    <Mail size={18} className="text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={(e) =>{handleChange(e)
                                            setFormError("")
                                             setError("")
                                        }
                                        }
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        className="w-full py-3 text-sm outline-none"
                                    />
                                </div>
                                <p className="text-red-500">{formError}</p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#005078]">
                                    Password
                                </label>
                                <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 focus-within:border-[#005078]">
                                    <Lock size={18} className="text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={(e)=>{handleChange(e)
                                            setError("")
                                            setFormError1("")
                                        }}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        className="w-full py-3 text-sm outline-none"
                                    />
                                    
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="text-gray-400 hover:text-[#005078]"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <p className="text-red-500">{formError1}</p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-[#F5A800] py-3.5 text-sm font-bold text-white transition hover:bg-[#d99000] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link to="/register" className="font-bold text-[#005078] hover:text-[#F5A800]">
                                Create account
                            </Link>
                        </p>

                        <Link to="/" className="mt-5 block text-center text-xs text-gray-400 hover:text-[#005078]">
                            ← Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}