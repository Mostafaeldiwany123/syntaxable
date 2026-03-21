import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "@/context/SidebarContext";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

export const AppLayout = () => {
  const isMobile = useIsMobile();
  const { isCollapsed, toggleCollapse, setCollapsed } = useSidebar();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="h-dvh w-screen flex flex-col bg-background">
        <header className="flex items-center justify-between px-4 py-3 border-b border-border h-14 shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img src="/syntaxable.png" alt="Syntaxable" className="h-7 w-7 object-contain" />
            <h1 className="text-lg font-bold text-foreground">Syntaxable</h1>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </header>
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="left" className="p-0 w-[280px] bg-card border-0">
            <Sidebar onNavigate={() => setIsSidebarOpen(false)} isMobile={true} />
          </SheetContent>
        </Sheet>
        <main className="flex-1 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-dvh bg-background">
      <Sidebar 
        isCollapsed={isCollapsed} 
        onToggleCollapse={toggleCollapse}
        isMobile={false}
      />
      <main className="flex-1 overflow-y-auto bg-background border-l border-border">
        <Outlet />
      </main>
    </div>
  );
};