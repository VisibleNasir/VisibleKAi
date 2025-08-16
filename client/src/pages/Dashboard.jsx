import { useEffect, useState } from "react";
import axios from "axios"; // ✅ Import axios
import { Gem, Sparkles } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react"; // ✅ useAuth for token
import CreationItem from "@/components/CreationItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const { getToken } = useAuth(); // ✅ Get Clerk token

  const getDashboardData = async () => {
    try {
      const token = await getToken(); // ✅ Fetch token

      const res = await axios.get("/api/ai/creations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data; // ✅ Axios already parses JSON

      if (data.success) {
        setCreations(data.creations);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Error fetching creations:", err);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <section className="sm:p-6 md:p-8 lg:p-10 bg-zinc-950 w-screen h-screen text-zinc-100">
      <div className="grid grid-cols-1 sticky sm:grid-cols-2 gap-4 mb-2 p-3">
        <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
          <CardHeader className="py-3">
            <CardTitle className="text-base font-semibold text-zinc-100">
              Total Creations
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center py-3">
            <h2 className="text-xl font-bold text-zinc-100">{creations.length}</h2>
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex justify-center items-center">
              <Sparkles className="w-5 h-5 text-zinc-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
          <CardHeader className="py-3">
            <CardTitle className="text-base font-semibold text-zinc-100">
              Active Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center py-3">
            <h2 className="text-xl font-bold text-zinc-100">
              <Protect plan="premium" fallback="Free">Premium</Protect>
            </h2>
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex justify-center items-center">
              <Gem className="w-5 h-5 text-zinc-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2 p-1 ">
        <h2 className="text-lg font-semibold text-zinc-100">Recent Creations</h2>
        <div className="space-y-3  bg-zinc-900 rounded-b-2xl p-1 max-w-7xl h-[360px] mx-auto overflow-y-scroll scrollbar-hide">
          {creations.map((item) => (
            <CreationItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
