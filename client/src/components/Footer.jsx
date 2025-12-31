import { assets } from "../assets/assets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import nasir from "@/assets/nasir.jpg";

const Footer = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <footer
      className={`relative px-6 sm:px-8 lg:px-12 xl:px-16 pt-12 pb-8 w-full ${
        isDark ? "bg-zinc-900 text-zinc-400" : "bg-white text-zinc-700"
      }`}
    >
      <div
        className={`relative z-10 max-w-7xl mx-auto border-b pb-8 ${
          isDark ? "border-zinc-800" : "border-gray-300"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Logo & Description */}
          <div className="max-w-md space-y-4">
            <img className="h-20" src={assets.logo} alt="VisibleAI Logo" />
            <p className={`text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-700"}`}>
              Unleash your creativity with VisibleAI. Our premium AI tools empower you to craft compelling articles, generate stunning visuals, and optimize your creative workflow.
            </p>
          </div>

          {/* Links & Community */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-20">
            {/* Company Links */}
            <div>
              <h2 className={`font-semibold mb-4 ${isDark ? "text-zinc-100" : "text-zinc-900"}`}>Company</h2>
              <ul className="text-sm space-y-2">
                {["Home", "About us", "Contact us", "Privacy policy"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className={`transition-colors hover:${
                        isDark ? "text-zinc-200" : "text-zinc-900"
                      }`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community & Subscribe */}
            <div className="max-w-sm flex flex-col items-center md:items-start">
              <h2 className={`font-semibold mb-4 ${isDark ? "text-zinc-100" : "text-zinc-900"}`}>
                Be Part of the VisiblekAi Community
              </h2>
              <p className={`text-sm mb-4 text-center md:text-left ${isDark ? "text-zinc-400" : "text-zinc-700"}`}>
                Subscribe to our YouTube for Tech videos, updates, and vlogs.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 items-center">
                  <Avatar>
                    <AvatarImage src={nasir} alt="Nasir" />
                    <AvatarFallback>NS</AvatarFallback>
                  </Avatar>
                </div>
                <Link
                  to="https://www.youtube.com/@VisibleNasir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDark
                      ? "bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-500 text-zinc-100"
                      : "bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 text-zinc-900"
                  }`}
                >
                  Subscribe
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className={`text-center md:text-end text-xs mt-6 ${
        isDark ? "text-zinc-500" : "text-zinc-500"
      }`}>
        Copyright 2025 ©{" "}
        <a
          href="https://www.youtube.com/@VisibleNasir"
          className={`transition-colors hover:${isDark ? "text-zinc-200" : "text-zinc-900"}`}
        >
          VisiblekAi
        </a>
        . All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
