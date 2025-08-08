import { useEffect, useState } from "react";
import { dummyCreationData } from "../assets/assets";
import { Gem, Sparkles } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  const getDashboardData = async () => {
    setCreations(dummyCreationData);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <section className="p-4 sm:p-6 lg:p-8 xl:p-10 bg-zinc-950 text-zinc-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
          <CardHeader className="py-2">
            <CardTitle className="text-base font-semibold text-zinc-100">Total Creations</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center py-2">
            <h2 className="text-xl font-bold text-zinc-100">{creations.length}</h2>
            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex justify-center items-center">
              <Sparkles className="w-4 h-4 text-zinc-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
          <CardHeader className="py-2">
            <CardTitle className="text-base font-semibold text-zinc-100">Active Plan</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center py-2">
            <h2 className="text-xl font-bold text-zinc-100">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex justify-center items-center">
              <Gem className="w-4 h-4 text-zinc-400" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-100">Recent Creations</h2>
        <div className="space-y-2">
          {creations.map((item) => (
            <CreationItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;