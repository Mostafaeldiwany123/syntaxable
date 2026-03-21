import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FolderKanban, LogOut, Code } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "../ui/button";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/projects", label: "Projects", icon: FolderKanban },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-card border-r border-border flex flex-col">
      <div className="p-4 h-16 border-b border-border flex items-center gap-2">
        <Code className="h-7 w-7 text-primary" />
        <h1 className="text-xl font-bold text-foreground">Syntaxable</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="flex items-center justify-start gap-3 w-full text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;