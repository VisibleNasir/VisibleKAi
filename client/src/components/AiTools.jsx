import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  // Card animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

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
    <section className="relative px-4 sm:px-6 lg:px-8 xl:px-16 py-24 bg-zinc-950 text-zinc-100">
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        variants={bgVariants}
      />
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-100">Powerful AI Tools</h2>
        <p className="text-zinc-400 text-lg mt-4 max-w-lg mx-auto">
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
        </p>
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        variants={containerVariants}
      >
        {AiToolsData.map((tool, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card
              className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
              onClick={() => user && navigate(tool.path)}
            >
              <CardHeader>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})` }}
                >
                  <tool.Icon className="w-6 h-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-semibold text-zinc-100 mb-2">{tool.title}</CardTitle>
                <p className="text-sm text-zinc-400">{tool.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AiTools;