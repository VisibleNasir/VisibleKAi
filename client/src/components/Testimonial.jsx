import { assets } from "../assets/assets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const Testimonial = () => {
  const dummyTestimonialData = [
    {
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "John Doe",
      title: "Marketing Director, TechCorp",
      content:
        "ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.",
      rating: 4,
    },
    {
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Jane Smith",
      title: "Content Creator, TechCorp",
      content:
        "ContentAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.",
      rating: 5,
    },
    {
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
      name: "David Lee",
      title: "Content Writer, TechCorp",
      content:
        "ContentAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.",
      rating: 4,
    },
  ];

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
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-100">Loved by Creators</h2>
        <p className="text-zinc-400 text-lg mt-4 max-w-lg mx-auto">
          Don’t just take our word for it. Here’s what our users are saying.
        </p>
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        variants={containerVariants}
      >
        {dummyTestimonialData.map((testimonial, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <img
                        key={i}
                        src={i < testimonial.rating ? assets.star_icon : assets.star_dull_icon}
                        className="w-5 h-5"
                        alt="star"
                      />
                    ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-400 mb-4">“{testimonial.content}”</p>
                <hr className="border-zinc-800 mb-4" />
                <div className="flex items-center gap-4">
                  <img src={testimonial.image} className="w-12 h-12 rounded-full object-cover" alt={testimonial.name} />
                  <div>
                    <CardTitle className="text-sm font-medium text-zinc-100">{testimonial.name}</CardTitle>
                    <p className="text-xs text-zinc-500">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonial;