import { assets, dummyTestimonialData } from "../assets/assets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Testimonial = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <section
      className={`relative px-4 sm:px-6 lg:px-8 xl:px-16 py-28 ${
        isDark ? "bg-zinc-950 text-zinc-100" : "bg-white text-zinc-900"
      }`}
    >
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
          Loved by Creators
        </h2>
        <p className={isDark ? "text-zinc-400" : "text-zinc-600"} text-base sm:text-lg max-w-xl mx-auto>
          Don’t just take our word for it. Here’s what our users are saying.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {dummyTestimonialData.map((testimonial, index) => (
          <Card
            key={index}
            className={`border rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              isDark
                ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                : "bg-gray-100 border-gray-200 hover:border-gray-300"
            }`}
          >
            <CardHeader className="pb-3 space-y-3">
              {/* Rating */}
              <div className="flex items-center gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <img
                      key={i}
                      src={i < testimonial.rating ? assets.star_icon : assets.star_dull_icon}
                      className="w-4 h-4"
                      alt="star"
                    />
                  ))}
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Content */}
              <p className={isDark ? "text-sm leading-relaxed text-zinc-400" : "text-sm leading-relaxed text-zinc-600"}>
                “{testimonial.content}”
              </p>

              <div className={isDark ? "h-px w-full bg-zinc-800" : "h-px w-full bg-gray-300"} />

              {/* User */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  className={`w-12 h-12 rounded-full object-cover border ${
                    isDark ? "border-zinc-700" : "border-gray-300"
                  }`}
                  alt={testimonial.name}
                />
                <div>
                  <CardTitle className={isDark ? "text-sm font-medium text-zinc-100" : "text-sm font-medium text-zinc-900"}>
                    {testimonial.name}
                  </CardTitle>
                  <p className={isDark ? "text-xs text-zinc-500" : "text-xs text-zinc-600"}>
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
