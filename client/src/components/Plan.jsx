import { PricingTable } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const Plan = () => {
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
    <section className="relative py-24 bg-zinc-950 text-zinc-100 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        variants={bgVariants}
      />
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-100">Choose Your Plan</h2>
        <p className="text-zinc-400 text-lg mt-4 max-w-lg mx-auto">
          Start for free and scale as you grow. Find the perfect plan for your content creation needs.
        </p>
      </div>
      <div className="mt-12 max-w-4xl mx-auto">
        <PricingTable />
      </div>
    </section>
  );
};

export default Plan;