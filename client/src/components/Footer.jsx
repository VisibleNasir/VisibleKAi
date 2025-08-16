import { assets } from "../assets/assets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import nasir from "@/assets/nasir.jpg"

function Footer() {
  return (
    <section className="relative bg-zinc-950 text-zinc-400 px-6 sm:px-8 lg:px-12 xl:px-16 pt-12 pb-8 w-full">
      <div className="relative z-10 max-w-7xl mx-auto border-b border-zinc-800 pb-8">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-md">
            <img className="h-19" src={assets.logo} alt="VisibleAI Logo" />
            <p className="text-sm leading-relaxed">
              Unleash your creativity with VisibleAI. Our premium AI tools
              empower you to craft compelling articles, generate stunning
              visuals, and optimize your creative workflow.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-12 md:gap-20">
            <div>
              <h2 className="font-semibold text-zinc-100 mb-4">Company</h2>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-zinc-200 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-zinc-200 transition-colors">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-zinc-200 transition-colors">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-zinc-200 transition-colors">
                    Privacy policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="max-w-sm flex flex-col items-center">
              <h2 className="font-semibold text-zinc-100 mb-4">
                Be Part of the VisiblekAi Community
              </h2>
              <p className="text-sm mb-4">
                Subscribe to our YouTube for Tech videos, updates, and vlogs.
              </p>
              <div className="flex items-center gap-2">
                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 ">
                  <Avatar>
                    <AvatarImage
                      src={nasir}
                      alt="@shadcn"
                    />
                    <AvatarFallback>NS</AvatarFallback>
                  </Avatar>
                </div>

                <Link
                  to="https://www.youtube.com/@VisibleNasir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-700 cursor-pointer text-zinc-100 h-10 p-2  rounded-lg hover:bg-zinc-600 active:bg-zinc-400"
                >
                  Subscribe
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-end text-xs text-zinc-500 mt-6">
        Copyright 2025 ©{" "}
        <a
          href="https://www.youtube.com/@VisibleNasir"
          className="hover:text-zinc-200 transition-colors"
        >
          VisiblekAi
        </a>
        . All Rights Reserved.
      </p>
    </section>
  );
}

export default Footer;
