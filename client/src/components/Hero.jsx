import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

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
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-100 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        variants={bgVariants}
      />
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-6">
          Empower Your <span className="text-zinc-300">Content Creation</span> with Advanced AI Tools
        </h1>
        <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
          Elevate your workflow with our premium AI-powered suite. Craft compelling articles, generate stunning visuals, and streamline your creative process.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => navigate("/ai")}
            className="bg-zinc-200 text-zinc-950 px-8 py-6 text-base font-semibold rounded-lg hover:bg-zinc-300 active:bg-zinc-400 transition-transform transform hover:scale-105 active:scale-95"
          >
            Start Creating Now
          </Button>
          <Button
            variant="outline"
            onClick={() => {}}
            className="border-zinc-700 bg-zinc-800 text-zinc-100 px-8 py-6 text-base font-semibold rounded-lg hover:bg-zinc-700 hover:text-zinc-50 active:bg-zinc-600 transition-transform transform hover:scale-105 active:scale-95"
          >
            Watch Demo
          </Button>
        </div>
        <div className="flex items-center justify-center gap-3 mt-10 text-zinc-400">
          <Users className="h-6 w-6" />
          <span className="text-sm font-medium">Trusted by over 10,000 creators</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;