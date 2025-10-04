import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return !loading ? (
    <section className="min-h-screen w-full p-6 sm:p-8 lg:p-10 bg-zinc-950 text-zinc-100 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6 text-center">
        Community Creations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {creations.map((creation, index) => (
          <Card
            key={index}
            className="relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg group"
          >
            <CardContent className="p-0">
              <img
                src={creation.content}
                alt={creation.prompt}
                className="w-full h-56 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end justify-between p-3 bg-gradient-to-b from-transparent to-zinc-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs font-medium  truncate text-zinc-100">
                  {creation.prompt}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-zinc-100">{creation.likes.length}</span>
                  <Heart
                    onClick={() => imageLikeToggle(creation.id)}
                    className={`w-5 h-5 cursor-pointer transition-transform hover:scale-110 ${
                      creation.likes.includes(user?.id)
                        ? "fill-red-500 text-red-500"
                        : "text-zinc-200"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-zinc-950">
      <span className="w-10 h-10 my-1 rounded-full border-4 border-zinc-700 border-t-transparent animate-spin"></span>
    </div>
  );
};

export default Community;
