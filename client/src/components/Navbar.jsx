import { useNavigate } from "react-router-dom";
import {
  House,
  SquarePen,
  Hash,
  ImageIcon,
  Eraser,
  Scissors,
  FileText,
  Users,
  LogIn,
} from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
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
    <div
      className="
        fixed bottom-0 left-0 w-full z-50
        md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:w-auto
      "
    >
      <Dock
        className="
          bg-zinc-900/95 border border-zinc-800/60
          rounded-none md:rounded-full
          shadow-blue-50 shadow-sm
          flex justify-around md:justify-center items-center
          px-2 py-1 md:px-4 md:py-2
        "
      >
        {navItems.map(({ to, label, Icon }) => (
          <DockIcon
            key={to}
            className="
              text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/90
              transition-all duration-300 p-2 rounded-full
              flex items-center justify-center
            "
            onClick={() => navigate(to)}
            aria-label={label}
          >
            <Icon className="w-5 h-5" />
          </DockIcon>
        ))}

        {user ? (
          <UserButton
            className="
              text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/90
              transition-all duration-300 p-2 rounded-full
              flex items-center justify-center
            "
            appearance={{
              elements: {
                userButtonAvatarBox:
                  "w-10 h-10 ring-2 ring-zinc-700/50 rounded-full",
                userButtonPopoverCard:
                  "bg-zinc-900 text-zinc-100 border-zinc-800 shadow-lg",
                userButtonPopoverItem:
                  "text-zinc-200 hover:bg-zinc-800",
              },
            }}
            aria-label="User profile"
          />
        ) : (
          <DockIcon
            className="
              text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/90
              transition-all duration-300 p-2 rounded-full
              flex items-center justify-center
            "
            onClick={openSignIn}
          >
            <LogIn className="w-5 h-5" />
          </DockIcon>
        )}
      </Dock>
    </div>
  );
};

export default Navbar;
