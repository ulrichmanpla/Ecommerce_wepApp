

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import headphonesImage from "../assets/Frame3.png";
import laptopImage from "../assets/51.png";

export default function LatestNews() {
    const articles = [
        {
            id: 1,
            date: "22 Oct, 2021",
            title: "Who avoids a pain that produces?",
            description:
                "Lorem ipsum dolor sit amet consectetur. Facit sit bibendum ullamcorper. Praesent tristique pretium elementum.",
            author: "By spacing tech",
            image: headphonesImage,
        },
        {
            id: 2,
            date: "22 Oct, 2021",
            title: "Who avoids a pain that produces?",
            description:
                "Lorem ipsum dolor sit amet consectetur. Facit sit bibendum ullamcorper. Praesent tristique pretium elementum.",
            author: "By spacing tech",
            image: laptopImage,
        },
        {
            id: 3,
            date: "18 Oct, 2021",
            title: "Discover the latest technology",
            description:
                "Explore new technology, useful accessories, and products designed for everyday life.",
            author: "By spacing tech",
            image: laptopImage,
        },
        {
            id: 4,
            date: "12 Oct, 2021",
            title: "Choosing the right accessories",
            description:
                "Learn how to choose accessories that suit your devices and your daily needs.",
            author: "By spacing tech",
            image: headphonesImage,
        },
        {
            id: 5,
            date: "05 Oct, 2021",
            title: "Technology for everyday life",
            description:
                "Discover practical electronics and simple ways to get more from your devices.",
            author: "By spacing tech",
            image: laptopImage,
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Display two articles at a time.
    const visibleArticles = [
        articles[currentSlide],
        articles[(currentSlide + 1) % articles.length],
    ];

    const nextSlide = () => {
        setCurrentSlide((previous) => (previous + 1) % articles.length);
    };

    return (
        <section className="mx-auto max-w-7xl px-4 py-10">
            {/* Section heading */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-base font-bold text-[#005078]">
                    Latest news
                </h2>

                <button
                    type="button"
                    className="flex items-center gap-1 text-xs font-semibold text-[#005078] hover:text-[#f5a800]"
                    onClick={() =>
                        window.location.assign("/news")
                    }
                >
                    View all
                    <ArrowRight size={14} />
                </button>
            </div>

            {/* Article cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {visibleArticles.map((article) => (
                    <article
                        key={article.id}
                        className="flex min-w-0 gap-3 rounded-xl border border-gray-200 bg-white p-3"
                    >
                        {/* Article image */}
                        <div className="w-[45%] shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="h-full min-h-37.5 w-full object-cover transition duration-300 hover:scale-105"
                            />
                        </div>

                        {/* Article content */}
                        <div className="min-w-0 flex-1 py-1">
                            <span className="inline-block rounded-full border border-gray-200 px-2 py-1 text-[9px] text-[#005078]">
                                {article.date}
                            </span>

                            <h3 className="mt-2 text-xs font-bold leading-5 text-[#005078]">
                                {article.title}
                            </h3>

                            <p className="mt-2 line-clamp-4 text-[10px] leading-4 text-gray-500">
                                {article.description}
                            </p>

                            <p className="mt-3 text-[9px] text-[#005078]">
                                {article.author}
                            </p>
                        </div>
                    </article>
                ))}
            </div>

            {/* Carousel dots */}
            <div className="mt-5 flex justify-center gap-2">
                {articles.map((article, index) => (
                    <button
                        key={article.id}
                        type="button"
                        aria-label={`Show news slide ${index + 1}`}
                        aria-pressed={currentSlide === index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 w-2 rounded-full border transition ${
                            currentSlide === index
                                ? "border-[#f5a800] bg-[#f5a800]"
                                : "border-gray-300 bg-white"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}

