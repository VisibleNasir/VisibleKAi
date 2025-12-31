import { useEffect, useState } from "react";
import axios from "axios";
import { Gem, Sparkles } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "@/components/CreationItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const token = await getToken();
      const res = await axios.get("/api/ai/creations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setCreations(res.data.creations);
    } catch (err) {
      console.error("Error fetching creations:", err);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 px-4 sm:px-6 lg:px-10 py-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Overview of your activity and creations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="bg-zinc-100 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md transition-colors hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-700 dark:text-zinc-400">
                Total Creations
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">{creations.length}</h2>
              <div className="w-11 h-11 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-100 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md transition-colors hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-700 dark:text-zinc-400">
                Active Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                <Protect plan="premium" fallback="Free">
                  Premium
                </Protect>
              </h2>
              <div className="w-11 h-11 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <Gem className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Creations */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Creations</h2>

          <div className="bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto scrollbar-hide transition-colors">
            {creations.length > 0 ? (
              <div className="space-y-3">
                {creations.map((item) => (
                  <CreationItem key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-zinc-500 dark:text-zinc-400">
                No creations yet
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
