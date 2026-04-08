import { PricingTable, Protect } from "@clerk/clerk-react";
import { Gem } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const ManagePlan = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-10 py-8 transition-colors ${
        isDark ? "bg-zinc-950 text-zinc-100" : "bg-gray-50 text-zinc-900"
      }`}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
            <Gem className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Manage Plan</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Current plan:{" "}
              <span className="font-medium">
                <Protect plan="premium" fallback="Free">Premium</Protect>
              </span>
            </p>
          </div>
        </div>

        {/* Pricing Table */}
        <div>
          <PricingTable
            className={`shadow-xl rounded-2xl border ${
              isDark ? "border-zinc-800" : "border-gray-200"
            }`}
          />
        </div>
      </div>
    </section>
  );
};

export default ManagePlan;
