
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    <section className="relative flex flex-col items-center justify-center min-h-screen  text-zinc-100 px-4 sm:px-6 lg:px-8">
      <motion.div
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        variants={bgVariants}
      />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl  md:text-5xl font-bold  leading-tight tracking-tight mb-6">
          Coffee in One Hand , <span className="text-yellow-300">Creations</span> in the Other
        </h1>
        <p className="text-zinc-200 text-lg sm:text-xl max-w-4xl mx-auto mb-7">
          Blog titles, long-form articles, image generation, background removal — all in one sleek platform. VisiblekAi makes creativity as easy as sipping your latte.
        </p>  
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => navigate("/ai")}
            className="bg-zinc-600 text-zinc-1-0 px-8 py-6 text-base font-semibold rounded-lg hover:bg-zinc-500 active:bg-zinc-700 transition-transform transform hover:scale-101 cursor-pointer active:scale-95"
          >
            Start Creating Now
          </Button>
          <Button
            variant="outline"
            onClick={() => {}}
            className="border-zinc-700 bg-zinc-800 text-zinc-100 px-8 py-6 text-base font-semibold rounded-lg hover:bg-zinc-700 hover:text-zinc-50 active:bg-zinc-600 transition-transform transform hover:scale-101 active:scale-95"
          >
            Watch Demo
          </Button>
        </div>
        <div className="flex items-center justify-center gap-3 mt-10 text-zinc-400">
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
          <span className="text-sm font-medium">Trusted by over 2 creators</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;