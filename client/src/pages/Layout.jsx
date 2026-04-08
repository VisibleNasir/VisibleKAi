import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SignIn, useUser } from "@clerk/clerk-react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useTheme } from "@/context/ThemeContext";

const Layout = () => {
  const { user, isLoaded } = useUser();
  const { theme } = useTheme();
  const [sidebar, setSidebar] = useState(false);

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
    <div className={`min-h-screen selection:bg-zinc-400 flex flex-col ${theme === "dark" ? "bg-zinc-950 text-zinc-100" : "bg-gray-50 text-zinc-900"}`}>
      <Navbar setSidebar={setSidebar} />

      <div className="flex flex-1 pt-14 overflow-hidden">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Overlay to close sidebar on mobile */}
      {sidebar && (
        <div
          className="fixed inset-0 z-40 bg-black/50 sm:hidden"
          onClick={() => setSidebar(false)}
        />
      )}
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
