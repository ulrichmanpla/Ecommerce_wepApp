import { useState, useEffect } from "react";
import api from '../services/api';
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../services/cartService";
import { X } from "lucide-react"; 
export default function Hero() {
  const navigate = useNavigate();
  const [slidesCarousel, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true); 
  
  const [isAdding, setAdding] = useState(false);
  const [error, setError] = useState("");
  

  const [showAuthModal, setShowAuthModal] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
     async function getProducts() {
         try {
             const response = await api.get("/products");
             setSlides(response.data);
         } catch (error) {
             console.error("Erreur lors de la récupération des carrousels", error);
         } finally {
             setIsLoading(false); 
         }
     }
     getProducts();
  }, []);

  if (isLoading) {
      return (
          <div className="mx-auto max-w-7xl px-4 py-8 mt-6 h-64 flex items-center justify-center bg-gray-100 rounded-2xl animate-pulse">
              <p className="text-[#005078] font-medium">Chargement des offres...</p>
          </div>
      );
  }

  if (slidesCarousel.length === 0) {
      return null; 
  }

  const slide = slidesCarousel[currentSlide];
  const slide_id = slide._id;

  const handleAddToCart = async (productId)=>{

      if (!token) {
          setShowAuthModal(true);
          return;
      }

      try{
            setAdding(true);
            setError("");
            await addToCart(productId);
            navigate("/cart");
      }catch(err){
          setError(err.response?.data?.message || "Unable to add this product to your cart ");
      }finally{
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
      <section className="mx-auto max-w-7xl px-4 py-8 mt-6 relative">
          {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
              </div>
          )}

          <div className="relative flex  md:min-h-82.5 items-center overflow-hidden rounded-2xl bg-gray-50 px-8 md:px-14">

              <div className="z-10 max-w-sm">
                  <p className="mb-3 text-sm font-medium text-[#f5a800]">
                      New collection
                  </p>

                  <h1 className="text-4xl font-bold leading-tight text-[#005078] md:text-5xl">
                      {slide.name || slide.title} 
                  </h1>

                  <div className="mt-6 flex gap-3 ">
                      <button 
                          onClick={() => handleAddToCart(slide_id)} 
                          disabled={isAdding}
                          className="rounded-lg bg-[#f5a800] px-6 py-3 text-sm font-semibold text-white cursor-pointer hover:bg-bg2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          {isAdding ? "Adding..." : "Shop now"}
                      </button>
                      <button onClick={handleDetails}  className="rounded-lg border border-[#005078] px-6 py-3 text-sm font-semibold text-[#005078]">
                          View more
                      </button>
                  </div>
              </div>

              <div className="absolute bottom-0 right-4 h-[90%] w-[55%] md:right-12 md:w-[48%]">
                  <img
                      src={slide.image}
                      alt={slide.name}
                      className="h-full w-full object-contain"
                  />
              </div>

              <div className="absolute bottom-10 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5a800] text-center text-xs font-bold text-white md:right-20">
                  only
                  <br />
                  {slide.price} FRANC
              </div>

          </div>

          <div className="mt-4 flex justify-center gap-2">
              {slidesCarousel.map((_, index) => (
                  <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 w-2 rounded-full transition ${
                          currentSlide === index
                              ? "bg-[#f5a800]"
                              : "border border-gray-300"
                      }`}
                  />
              ))}
          </div>

        
          {showAuthModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                  <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                    
                      <button 
                          onClick={() => setShowAuthModal(false)}
                          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
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
                                  navigate("/signup");
                              }}
                              className="w-full rounded-md border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 cursor-pointer"
                          >
                              Sign up
                          </button>
                      </div>
                  </div>
              </div>
          )}
      </section>
  );
}
