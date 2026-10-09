import { useState } from "react";

import heroCamera from "../assets/81.png";
import heroLaptop from "../assets/51.png";
import heroController from "../assets/Frame2.png";

export default function Hero() {

    const slides = [
        {
            title: "Canon",
            subtitle: "camera",
            image: heroCamera,
            price: "$89"
        },
        {
            title: "Laptop",
            subtitle: "collection",
            image: heroLaptop,
            price: "$599"
        },
        {
            title: "Gaming",
            subtitle: "console",
            image: heroController,
            price: "$199"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const slide = slides[currentSlide];

    return (
        <section className="mx-auto max-w-7xl px-4 py-8">

            <div className="relative flex min-h-82.5 items-center overflow-hidden rounded-2xl px-8 md:px-14">

            
                <div className="z-10 max-w-sm">

                    <p className="mb-3 text-sm font-medium text-[#f5a800]">
                        New collection
                    </p>

                    <h1 className="text-4xl font-bold leading-tight text-[#005078] md:text-5xl">
                        {slide.title}
                        <br />
                        {slide.subtitle}
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
                        alt={slide.title}
                        className="h-full w-full object-contain"
                    />

                </div>


                <div className="absolute bottom-10 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5a800] text-center text-xs font-bold text-white md:right-20">

                    only
                    <br />
                    {slide.price}

                </div>

            </div>


           
            <div className="mt-4 flex justify-center gap-2">

                {slides.map((_, index) => (

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