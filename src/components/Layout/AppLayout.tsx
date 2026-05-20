import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "@/context/SidebarContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { DemoPopup } from "@/components/landing-page";

export const AppLayout = () => {
  const isMobile = useIsMobile();
  const { isCollapsed, toggleCollapse, setCollapsed, isMobileOpen, setMobileOpen } = useSidebar();

  if (isMobile) {
    return (
      <div className="h-dvh w-screen flex flex-col bg-background">
        <DemoPopup />
        <header className="flex items-center justify-between px-4 py-3 border-b border-border h-14 shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img src="/syntaxable.png" alt="Syntaxable" className="h-7 w-7 object-contain" />
            <h1 className="text-lg font-bold text-foreground">Syntaxable</h1>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </header>
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="fixed inset-0 z-50 bg-background flex flex-col"
            >
              <header className="flex items-center justify-between px-4 py-3 border-b border-border h-14 shrink-0">
                <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <img src="/syntaxable.png" alt="Syntaxable" className="h-7 w-7 object-contain" />
                  <h1 className="text-lg font-bold text-foreground">Syntaxable</h1>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </header>
              <div className="flex-1 overflow-hidden">
                <Sidebar onNavigate={() => setMobileOpen(false)} isMobile={true} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <main className="flex-1 overflow-y-auto bg-background relative overflow-x-hidden">
          {/* Decorative background grid and glows */}
          <div className="absolute inset-0 dot-bg mask-grid pointer-events-none opacity-45 z-0" />
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0" />
          <div className="absolute top-60 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />
          <div className="relative z-10 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-dvh bg-background">
      <DemoPopup />
      <Sidebar 
        isCollapsed={isCollapsed} 
        onToggleCollapse={toggleCollapse}
        isMobile={false}
      />
      <main className="flex-1 overflow-y-auto bg-background relative overflow-x-hidden">
        {/* Decorative background grid and glows */}
        <div className="absolute inset-0 dot-bg mask-grid pointer-events-none opacity-45 z-0" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute top-60 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="relative z-10 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};