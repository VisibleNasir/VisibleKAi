import { assets } from "../assets/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

function Footer() {
  // Background animation
  const bgVariants = {
    hidden: { opacity: 0, background: "linear-gradient(to bottom, rgba(24, 24, 27, 0.5), rgba(24, 24, 27, 0.8))" },
    visible: {
      opacity: 1,
      background: "linear-gradient(to bottom, rgba(39, 39, 42, 0.4), rgba(39, 39, 42, 0.7))",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative bg-zinc-950 text-zinc-400 px-6 sm:px-8 lg:px-12 xl:px-16 pt-12 pb-8 w-full">
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        variants={bgVariants}
      />
      <div className="relative z-10 max-w-7xl mx-auto border-b border-zinc-800 pb-8">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-md">
            <img className="h-8 mb-6" src={assets.logo} alt="VisibleAI Logo" />
            <p className="text-sm leading-relaxed">
              Unleash your creativity with VisibleAI. Our premium AI tools empower you to craft compelling articles, generate stunning visuals, and optimize your creative workflow.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-12 md:gap-20">
            <div>
              <h2 className="font-semibold text-zinc-100 mb-4">Company</h2>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-zinc-200 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-zinc-200 transition-colors">About us</a></li>
                <li><a href="#" className="hover:text-zinc-200 transition-colors">Contact us</a></li>
                <li><a href="#" className="hover:text-zinc-200 transition-colors">Privacy policy</a></li>
              </ul>
            </div>
            <div className="max-w-sm">
              <h2 className="font-semibold text-zinc-100 mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-sm mb-4">Receive the latest news, articles, and resources directly in your inbox weekly.</p>
              <div className="flex items-center gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-zinc-600 rounded-lg h-10"
                />
                <Button className="bg-zinc-200 text-zinc-950 h-10 px-6 rounded-lg hover:bg-zinc-300 active:bg-zinc-400">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-zinc-500 mt-6">
        Copyright 2025 © <a href="https://www.youtube.com/@VisibleNasir" className="hover:text-zinc-200 transition-colors">Visible Nasir</a>. All Rights Reserved.
      </p>
    </section>
  );
}

export default Footer;