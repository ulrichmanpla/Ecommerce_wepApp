import { useRef } from "react";
import CategoryCard from "./CategoryCard";

import speakerImage from "../assets/81.png";
import laptopImage from "../assets/51.png";
import cameraImage from "../assets/Frame2.png";

export default function CategorySection() {

    const carouselRef = useRef(null);

    const categories = [
        {
            name: "Speaker",
            items: 6,
            image: speakerImage
        },
        {
            name: "Desktop & laptop",
            items: 6,
            image: laptopImage
        },
        {
            name: "DSLR camera",
            items: 6,
            image: cameraImage
        },
        {
            name: "Wireless headphones",
            items: 6,
            image: speakerImage
        },
        {
            name: "Game controller",
            items: 6,
            image: cameraImage
        }
    ];

    const scrollLeft = () => {
        carouselRef.current.scrollBy({
            left: -300,
            behavior: "smooth"
        });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({
            left: 300,
            behavior: "smooth"
        });
    };

    return (
        <section className="mx-auto max-w-7xl px-10  py-4 ">

            <div className="relative">

               
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:bg-gray-100"
                >
                    ←
                </button>


                <div
                    ref={carouselRef}
                    className="flex justify-center  gap-4 overflow-x-auto scroll-smooth px-2 scrollbar-hide"
                >

                    {categories.map((category) => (
                        <CategoryCard
                            key={category.name}
                            category={category}
                        />
                    ))}

                </div>


                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 z-10 flex h-8 w-8 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:bg-gray-100"
                >
                    →
                </button>

            </div>

        </section>
    );
}