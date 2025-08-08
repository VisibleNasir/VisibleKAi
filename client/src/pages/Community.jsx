import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { dummyPublishedCreationData } from "../assets/assets";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData);
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <section className="p-4 sm:p-6 lg:p-8 xl:p-10 bg-zinc-950 text-zinc-100">
      <h2 className="text-lg font-semibold text-zinc-100 mb-4">Community Creations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {creations.slice(0, 3).map((creation, index) => (
          <Card key={index} className="relative bg-zinc-900 border-zinc-800 group overflow-hidden">
            <CardContent className="p-0">
              <img
                src={creation.content}
                alt={creation.prompt}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-end justify-between p-3 bg-gradient-to-b from-transparent to-zinc-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-zinc-100">{creation.prompt}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-zinc-100">{creation.likes.length}</span>
                  <Heart
                    className={`w-4 h-4 cursor-pointer transition-transform hover:scale-110 ${
                      creation.likes.includes(user?.id) ? "fill-red-500 text-red-500" : "text-zinc-100"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Community;