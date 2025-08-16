import { assets, dummyTestimonialData } from "../assets/assets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Testimonial = () => {
  

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 xl:px-16 py-24 text-zinc-100">
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-100">Loved by Creators</h2>
        <p className="text-zinc-400 text-lg mt-4 max-w-lg mx-auto">
          Don’t just take our word for it. Here’s what our users are saying.
        </p>
      </div>
      <div className="flex flex-wrap justify-center">
        {dummyTestimonialData.map((testimonial, index) => (
            <Card key={ index} className="bg-zinc-700 border-zinc-800 hover:bg-zinc-800 transition-all m-2 duration-300 w-xl flex justify-evenly">
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
        ))}
      </div>
        
    </section>
  );
};

export default Testimonial;