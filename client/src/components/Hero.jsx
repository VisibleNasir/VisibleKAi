import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Hero = ({ theme }) => {
  const navigate = useNavigate();

  const bgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden ${
      theme === "dark" ? "bg-zinc-950 text-zinc-100" : "bg-white text-zinc-900"
    }`}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={bgVariants}
        className={`absolute inset-0 ${
          theme === "dark" ? "bg-gradient-to-b from-zinc-900/60 via-zinc-950 to-zinc-950" : "bg-gradient-to-b from-gray-100/60 via-gray-200 to-gray-50"
        }`}
      />
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-tight">
          Build Content Faster.<br />
          <span className={theme === "dark" ? "text-zinc-400" : "text-zinc-600"}>
            Create Smarter with VisiblekAI
          </span>
        </h1>
        <p className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} text-base sm:text-lg max-w-3xl mx-auto`}>
          Generate blog titles, long-form articles, AI images, and remove backgrounds — all from one powerful platform designed for creators.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button
            onClick={() => navigate("/ai")}
            className={`px-8 py-6 text-base font-medium rounded-xl transition-all ${
              theme === "dark" ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200" : "bg-zinc-900 text-white hover:bg-zinc-800"
            }`}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open("https://www.youtube.com/@VisibleNasir", "_blank")}
            className={`px-8 py-6 text-base font-medium rounded-xl border transition-all ${
              theme === "dark" ? "border-zinc-700 bg-zinc-900 hover:bg-zinc-800" : "border-zinc-400 bg-white hover:bg-gray-100"
            }`}
          >
            Watch Demo
          </Button>
        </div>
        <div className="flex items-center justify-center gap-4 pt-8">
          <Avatar className="border border-zinc-800"><AvatarImage src="https://github.com/shadcn.png"/><AvatarFallback>NN</AvatarFallback></Avatar>
          <span className={theme === "dark" ? "text-zinc-500" : "text-zinc-600"}>Trusted by creators building every day</span>
        </div>
      </div>
    </section>
  )
}

export default Hero;
