// Sidebar.jsx
import { NavLink } from "react-router-dom";
import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import { Eraser, FileText, Gem, Hash, House, ImageIcon, LogOut, Scissors, SquarePen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House, premium: false },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen, premium: false },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash, premium: false },
  { to: "/ai/generate-images", label: "Generate Images", Icon: ImageIcon, premium: true },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser, premium: true },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors, premium: true },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText, premium: true },
  { to: "/ai/community", label: "Community", Icon: Users, premium: false },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <aside
      className={`w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col text-zinc-100 fixed top-12 bottom-0 h-[calc(100vh-3rem)] sm:static sm:h-auto sm:top-0 sm:bottom-0 z-50 ${
        sidebar ? "translate-x-0" : "translate-x-full sm:translate-x-0"
      } transition-transform duration-300 ease-in-out overflow-hidden`}
    >
      <div className="flex flex-col flex-1 p-4">
        <div className="flex-shrink-0">
          <img src={user?.imageUrl} alt="User avatar" className="w-12 h-12 rounded-full mx-auto" />
          <h1 className="mt-2 text-center text-base font-semibold text-zinc-100">{user?.fullName}</h1>
        </div>
        <nav className="mt-6 space-y-2 flex-1 overflow-y-auto">
          {navItems.map(({ to, label, Icon, premium }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors touch-manipulation ${
                  isActive ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 ${isActive ? "text-zinc-100" : "text-zinc-400"}`} />
                  <span className="flex-1">{label}</span>
                  {premium && (
                    <Protect plan="premium" fallback={
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-300 leading-none">
                        PRO
                      </span>
                    }>
                      {/* Premium users see no badge */}
                      {null}
                    </Protect>
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Manage Plan link */}
          <NavLink
            to="/ai/manage-plan"
            onClick={() => setSidebar(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors touch-manipulation ${
                isActive ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Gem className={`w-5 h-5 ${isActive ? "text-zinc-100" : "text-zinc-400"}`} />
                Manage Plan
              </>
            )}
          </NavLink>
        </nav>
      </div>
      <div className="flex-shrink-0 border-t border-zinc-800 p-4 flex items-center justify-between">
        <div onClick={openUserProfile} className="flex gap-3 items-center cursor-pointer">
          <img src={user?.imageUrl} alt="User avatar" className="w-10 h-10 rounded-full" />
          <div>
            <h1 className="text-sm font-medium text-zinc-100">{user?.fullName}</h1>
            <p className="text-xs text-zinc-500">
              <Protect plan="premium" fallback="Free">Premium</Protect> Plan
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={signOut}
          className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 p-2 rounded-full"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;