import { useNavigate, useLocation } from "react-router-dom";
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
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Images", Icon: ImageIcon },
  { to: "/ai/remove-background", label: "Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Navbar = ({ theme: propTheme, setTheme: propSetTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Theme from context or props
  const contextTheme = useTheme();
  const theme = propTheme || contextTheme.theme;
  const setTheme = propSetTheme || contextTheme.setTheme;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? theme === "dark"
            ? "bg-zinc-600 backdrop-blur border-b border-zinc-800 shadow-lg"
            : "bg-zinc-300  backdrop-blur border-b border-zinc-400 shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto h-14 px-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <span
            className={`text-2xl font-bold tracking-wide ${
              theme === "dark" ? "text-zinc-100" : "text-zinc-900"
            }`}
          >
            Visiblekai
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <button
                key={to}
                onClick={() => navigate(to)}
                className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                  active
                    ? theme === "dark"
                      ? "bg-zinc-800 text-zinc-100"
                      : "bg-gray-200 text-zinc-900"
                    : theme === "dark"
                    ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-gray-100"
                }`}
              >
                {label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-md transition ${
              theme === "dark"
                ? "text-zinc-300 hover:bg-zinc-800"
                : "text-zinc-700 hover:bg-gray-200"
            }`}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-md transition-colors ${
              theme === "dark"
                ? "hover:bg-zinc-800/50 text-zinc-300"
                : "hover:bg-gray-200 text-zinc-700"
            }`}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-zinc-700" />
            )}
          </button>

          {/* Auth */}
          {user ? (
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    theme === "dark"
                      ? "w-8 h-8 ring-2 ring-zinc-700 rounded-full"
                      : "w-8 h-8 ring-2 ring-gray-300 rounded-full",
                  userButtonPopoverCard:
                    theme === "dark"
                      ? "bg-zinc-900 border border-zinc-800 shadow-xl"
                      : "bg-white border border-gray-200 shadow-xl",
                  userButtonPopoverItem:
                    theme === "dark"
                      ? "text-zinc-300 hover:bg-zinc-800"
                      : "text-zinc-700 hover:bg-gray-100",
                },
              }}
            />
          ) : (
            <button
              onClick={openSignIn}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition ${
                theme === "dark"
                  ? "text-zinc-300 hover:text-white hover:bg-zinc-800"
                  : "text-zinc-700 hover:text-zinc-900 hover:bg-gray-200"
              }`}
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div
          className={`lg:hidden border-t ${
            theme === "dark"
              ? "bg-zinc-900 border-zinc-800"
              : "bg-zinc-400 border-zinc-400"
          }`}
        >
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navItems.map(({ to, label, Icon }) => {
              const active = location.pathname === to;
              return (
                <button
                  key={to}
                  onClick={() => {
                    navigate(to);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                    active
                      ? theme === "dark"
                        ? "bg-zinc-800 text-zinc-100"
                        : "bg-gray-200 text-zinc-900"
                      : theme === "dark"
                      ? "text-zinc-400 hover:bg-zinc-800/60"
                      : "text-zinc-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
