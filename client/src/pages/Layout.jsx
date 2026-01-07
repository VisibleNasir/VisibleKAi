import { Outlet } from "react-router-dom";
import { SignIn, useUser } from "@clerk/clerk-react";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/context/ThemeContext";

const Layout = () => {
  const { user, isLoaded } = useUser();
  const { theme } = useTheme();

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center h-screen ${
        theme === "dark" ? "bg-zinc-950 text-zinc-400" : "bg-white text-zinc-600"
      }`}>
        Loading...
      </div>
    );
  }

  return user ? (
    <div className={`min-h-screen selection:bg-zinc-400 ${theme === "dark" ? "bg-zinc-950 text-zinc-100" : "bg-gray-50 text-zinc-900"}`}>
      <Navbar />

      {/* offset for fixed navbar */}
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  ) : (
    <div className={`flex items-center justify-center h-screen ${
      theme === "dark" ? "bg-zinc-950" : "bg-gray-50"
    }`}>
      <SignIn 
        appearance={{
          elements: {
            rootBox: theme === "dark" ? "bg-zinc-900" : "bg-white",
            card: theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200",
          }
        }}
      />
    </div>
  );
};

export default Layout;
