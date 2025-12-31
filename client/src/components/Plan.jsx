import { PricingTable } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const Plan = ({ theme }) => {
  const isDark = theme === "dark";

  // Background animation
  const bgVariants = {
    hidden: {
      opacity: 0,
      background: isDark
        ? "linear-gradient(to bottom, rgba(24, 24, 27, 0.5), rgba(24, 24, 27, 0.8))"
        : "linear-gradient(to bottom, rgba(245, 245, 245, 0.5), rgba(245, 245, 245, 0.8))",
    },
    visible: {
      opacity: 1,
      background: isDark
        ? "linear-gradient(to bottom, rgba(39, 39, 42, 0.4), rgba(39, 39, 42, 0.7))"
        : "linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(245, 245, 245, 0.7))",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      className={`relative py-28 px-4 sm:px-6 lg:px-8 ${
        isDark ? "bg-zinc-950 text-zinc-100" : "bg-white text-zinc-900"
      }`}
    >
      {/* Animated Background */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={bgVariants}
        className="absolute inset-0 -z-10"
      />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
        <h2 className={`text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight`}>
          Choose Your Plan
        </h2>
        <p className={isDark ? "text-zinc-400 text-base sm:text-lg max-w-lg mx-auto" : "text-zinc-700 text-base sm:text-lg max-w-lg mx-auto"}>
          Start for free and scale as you grow. Find the perfect plan for your
          content creation needs.
        </p>
      </div>

      {/* Pricing Table */}
      <div className="mt-16 max-w-4xl mx-auto">
        <PricingTable
          className={`shadow-xl rounded-2xl border ${
            isDark ? "border-zinc-800" : "border-gray-300"
          }`}
        />
      </div>
    </section>
  );
};

export default Plan;
