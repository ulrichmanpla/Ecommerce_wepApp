
import { useState } from "react";

import customer1 from "../assets/Rectangle2.png";
import customer2 from "../assets/Rectangle3.png";
import customer3 from "../assets/Rectangle4.png";

export default function PeopleTestimonials() {
    const testimonials = [
        {
            id: 1,
            name: "Savannah Nguyen",
            image: customer1,
            review:
                "Lorem ipsum dolor sit amet consectetur. Facit sit enim tellus faucibus bibendum ullamcorper. Praesent tristique pretium elementum."
        },
        {
            id: 2,
            name: "Esther Howard",
            image: customer2,
            review:
                "Lorem ipsum dolor sit amet consectetur. Facit sit enim tellus faucibus bibendum ullamcorper. Praesent tristique pretium elementum."
        },
        {
            id: 3,
            name: "Esther Howard",
            image: customer3,
            review:
                "Lorem ipsum dolor sit amet consectetur. Facit sit enim tellus faucibus bibendum ullamcorper. Praesent tristique pretium elementum."
        },
        {
            id: 4,
            name: "Savannah Nguyen",
            image: customer1,
            review:
                "Great products, excellent service, and a smooth shopping experience. I would definitely recommend this store."
        },
        {
            id: 5,
            name: "Esther Howard",
            image: customer2,
            review:
                "The product quality was excellent, and my shopping experience was simple and convenient."
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const visibleTestimonials = Array.from(
        { length: 3 },
        (_, index) =>
            testimonials[
                (currentSlide + index) % testimonials.length
            ]
    );

    return (
        <section className="mx-auto max-w-7xl px-4 py-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleTestimonials.map((testimonial) => (
                    <article
                        key={`${currentSlide}-${testimonial.id}`}
                        className="rounded-xl border border-gray-200 bg-white p-3"
                    >
                      
                        <div className="mb-3 flex items-center gap-3">
                            <div className="h-12 w-12 shrink-0 rounded-full border-2 border-dashed border-[#f5a800] p-1">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="h-full w-full rounded-full object-cover"
                                />
                            </div>

                            <h3 className="text-xs font-semibold text-[#005078]">
                                {testimonial.name}
                            </h3>
                        </div>

                      
                        <p className="rounded-lg bg-[#e0f3fc] p-3 text-[10px] leading-5 text-[#005078]">
                            {testimonial.review}
                        </p>
                    </article>
                ))}
            </div>

           
            <div className="mt-5 flex justify-center gap-2">
                {testimonials.map((testimonial, index) => (
                    <button
                        key={testimonial.id}
                        type="button"
                        aria-label={`Show testimonial slide ${index + 1}`}
                        aria-pressed={currentSlide === index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 w-2 rounded-full transition ${
                            currentSlide === index
                                ? "bg-[#f5a800]"
                                : "border border-gray-300 bg-white"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}

