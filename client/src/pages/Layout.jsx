import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SignIn, useUser } from "@clerk/clerk-react";
import Navbar from "@/components/Navbar";

const Layout = () => {
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col h-screen  w-screen">
      {/* Mobile Navbar (Dock) */}
      <Navbar />
      {/* Main Content */}
      <Outlet />
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-zinc-950">
      <SignIn />
    </div>
  );
};

export default Layout;