import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight, House, SquarePen, Hash, ImageIcon, Eraser, Scissors, FileText, Users } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/magicui/dock";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: ImageIcon },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <nav className="fixed top-0 z-50 w-full bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-800/60 shadow-md">
      <div className="flex justify-between items-center py-2 px-4 sm:px-6 lg:px-8 xl:px-16 max-w-7xl mx-auto">
        <div className="flex items-center">
          <img
            src={assets.logo}
            alt="VisibleAI Logo"
            className="h-12 w-auto cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => navigate("/")}
            aria-label="Navigate to homepage"
          />
        </div>
        {user ? (
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10 ring-2 ring-zinc-700/50 rounded-full",
                userButtonPopoverCard: "bg-zinc-900 text-zinc-100 border-zinc-800 shadow-lg",
                userButtonPopoverItem: "text-zinc-200 hover:bg-zinc-800",
              },
            }}
            aria-label="User profile"
          />
        ) : (
          <Button
            onClick={openSignIn}
            className="bg-zinc-200 text-zinc-950 px-6 py-2 text-xs font-semibold rounded-lg hover:bg-zinc-300 active:bg-zinc-400 transition-transform duration-300 transform hover:scale-105 active:scale-95 shadow-sm"
            aria-label="Sign in or get started"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        )}
      </div>
      <div className="fixed bottom-1 left-1/2 transform -translate-x-1/2 z-50">
        <Dock className="bg-zinc-900/95 border-zinc-800/60 rounded-full px-2 py-0.5 shadow-lg">
          {navItems.map(({ to, label, Icon }) => (
            <DockIcon
              key={to}
              className="text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/90 transition-all duration-300 p-1.5 rounded-full"
              onClick={() => navigate(to)}
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </DockIcon>
          ))}
        </Dock>
      </div>
    </nav>
  );
};

export default Navbar;