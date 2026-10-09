

import {
    MessageCircle,
} from "lucide-react";
import {InstagramIcon, FacebookIcon} from '../data/LogoSvgCode'
import { Link } from "react-router-dom";
import logo2 from '../assets/logo2.png'
export default function Footer() {
    const productLinks = [
        "Browse Arnold",
        "Chronograph blue",
        "Smart phones",
        "Automatic watch",
        "Hair straighteners",
    ];

    const helpLinks = [
        "About us",
        "Contact us",
        "Return policy",
        "Privacy policy",
        "Payment policy",
    ];

    const aboutLinks = [
        "News",
        "Service",
        "Our policy",
        "Customer care",
        "Faq's",
    ];

    const renderLinks = (links) =>
        links.map((label) => (
            <li key={label}>
                <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-xs text-[#477b94] transition hover:text-[#f5a800]"
                >
                    <span className="mr-2 text-gray-300">•</span>
                    {label}
                </a>
            </li>
        ));

    return (
        <footer className="bg-[#e0f3fc] px-4 pb-6 pt-5">
            <div className="mx-auto max-w-7xl">

                <div className="grid gap-8 md:grid-cols-[1.2fr_1.5fr_1.5fr_1fr]">

                    {/* Brand and address */}
                    <div>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-1 text-lg font-extrabold text-[#005078]"
                        >
                            <img src={logo2} alt="logo2" />
                        </Link>

                        <p className="mt-4 text-xs leading-5 text-[#477b94]">
                            64 st james boulevard
                            <br />
                            hoswick, ze2 7zj
                        </p>

                        <div className="my-4 h-px w-full bg-[#b8d9e8]" />

                        {/* Social icons */}
                        <div className="flex gap-4">
                            <a
                                href="#"
                                aria-label="Facebook"
                                onClick={(e) => e.preventDefault()}
                                className="text-[#477b94] hover:text-[#f5a800]"
                            >
                                <FacebookIcon className = "w-6 h-6" />
                            </a>

                            <a
                                href="#"
                                aria-label="Instagram"
                                onClick={(e) => e.preventDefault()}
                                className="text-[#477b94] hover:text-[#f5a800]"
                            >
                                <InstagramIcon className = "w-6 h-6" />
                            </a>

                            <a
                                href="#"
                                aria-label="WhatsApp"
                                onClick={(e) => e.preventDefault()}
                                className="text-[#477b94] hover:text-[#f5a800]"
                            >
                                <MessageCircle size={15} />
                            </a>
                        </div>
                    </div>

                    {/* Product links */}
                    <div>
                        <h3 className="mb-3 text-xs font-bold text-[#005078]">
                            Find product
                        </h3>

                        <ul className="space-y-2">
                            {renderLinks(productLinks)}
                        </ul>
                    </div>

                    {/* Help links */}
                    <div>
                        <h3 className="mb-3 text-xs font-bold text-[#005078]">
                            Get help
                        </h3>

                        <ul className="space-y-2">
                            {renderLinks(helpLinks)}
                        </ul>
                    </div>

                    {/* About links */}
                    <div>
                        <h3 className="mb-3 text-xs font-bold text-[#005078]">
                            About us
                        </h3>

                        <ul className="space-y-2">
                            {renderLinks(aboutLinks)}
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    );
}

