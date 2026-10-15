
import laptopImage from "../assets/laptop1.png";

export default function PromoBanner() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-8">
            <div className="relative">
                 <div>
                    <img src={laptopImage} alt="laptopImage" />
                 </div>
                 <div className=" text-center absolute right-40 top-1/4 ">
                     <button className="bg-bg2 text-white rounded-full p-2 mb-5 ">New laptop</button>
                     <p className="text-cl1 font-bold text-[30px] ">Sale up to 50% off</p>
                     <p className="text-white text-xs mt-3 mb-5">12 inCh hd display</p>
                 </div>
            </div>
        </section>
    );
}
