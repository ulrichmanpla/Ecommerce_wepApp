import { useState, useEffect } from "react";
import api from '../services/api';

export default function Hero() {
  const [slidesCarousel, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true); 

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

  return (
      <section className="mx-auto max-w-7xl px-4 py-8 mt-6">

          <div className="relative flex min-h-82.5 items-center overflow-hidden rounded-2xl bg-gray-50 px-8 md:px-14">

              <div className="z-10 max-w-sm">
                  <p className="mb-3 text-sm font-medium text-[#f5a800]">
                      New collection
                  </p>

                  <h1 className="text-4xl font-bold leading-tight text-[#005078] md:text-5xl">
                      {slide.name || slide.title} 
                  </h1>

                  <div className="mt-6 flex gap-3">
                      <button className="rounded-lg bg-[#f5a800] px-6 py-3 text-sm font-semibold text-white">
                          Shop now
                      </button>
                      <button className="rounded-lg border border-[#005078] px-6 py-3 text-sm font-semibold text-[#005078]">
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

      </section>
  );
}
