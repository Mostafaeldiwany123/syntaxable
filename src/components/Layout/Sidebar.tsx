import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, FolderKanban, LogOut, Users, Mail, UserCheck, Dumbbell, ChevronLeft, ChevronRight, CreditCard, Paintbrush, Lock, Trophy, Award, Github, Instagram, Linkedin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useProfile } from "@/hooks/profiles";
import { useInbox } from "@/hooks/inbox";
import { InboxSheet } from "../inbox/InboxSheet";
import { useAuthModal } from "@/context/AuthModalContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface SidebarProps {
  onNavigate?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobile?: boolean;
}

export const Sidebar = ({ onNavigate, isCollapsed = false, onToggleCollapse, isMobile = false }: SidebarProps) => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: profile, isLoading: profileLoading } = useProfile(user?.id);
  const { data: inboxItems } = useInbox();
  const { openModal } = useAuthModal();

  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark');

  const isPro = profile?.tier === 'pro' || profile?.tier === 'admin';
  const proThemes: string[] = [];

  useEffect(() => {
    if (profileLoading) return;
    const savedTheme = localStorage.getItem('app-theme') || 'dark';
    setCurrentTheme(savedTheme);
  }, [profileLoading]);

  const handleThemeChange = (theme: string) => {
    // All themes are now free
    setCurrentTheme(theme);
    localStorage.setItem('app-theme', theme);
    if (theme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    setTimeout(() => {
      window.dispatchEvent(new Event('themeChanged'));
    }, 10);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getInitials = () => {
    if (profile?.username) return profile.username.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  const isLoading = authLoading || (profileLoading && !!user);
  const notificationCount = inboxItems?.length || 0;

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/projects", icon: FolderKanban, label: "Projects" },
    { to: "/learn", icon: GraduationCap, label: "Learn (Beta)" },
  ];

  const PRACTICE_URL_KEY = 'practice-last-url';

  const handlePracticeClick = () => {
    onNavigate?.();
    const saved = sessionStorage.getItem(PRACTICE_URL_KEY);
    navigate(saved && saved !== '/practice' ? saved : '/practice');
  };

  // Whenever the user is on a practice sub-route, keep the saved URL updated
  useEffect(() => {
    if (location.pathname.startsWith('/practice') && location.pathname !== '/practice') {
      sessionStorage.setItem(PRACTICE_URL_KEY, location.pathname);
    }
  }, [location.pathname]);

  const socialItems = [
    { to: "/leaderboard", icon: Trophy, label: "Leaderboard" },
    { to: "/achievements", icon: Award, label: "Achievements" },
    { to: "/community", icon: Users, label: "Community" },
    { to: "/friends", icon: UserCheck, label: "Friends" },
  ];

  const handleNavClick = () => {
    onNavigate?.();
  };

  // Don't show collapse button on mobile
  const showCollapseButton = onToggleCollapse && !isMobile;

  return (
    <>
      <aside
        className={`flex flex-col bg-card h-full overflow-hidden transition-all duration-300 ease-in-out ${isMobile
          ? 'w-60 border-r-0'
          : isCollapsed
            ? 'w-16 border-r border-border'
            : 'w-60 border-r border-border'
          }`}
      >
        {/* Logo */}
        <div className={`border-b border-border flex items-center shrink-0 ${isCollapsed && !isMobile ? 'justify-center p-3' : 'px-5 py-5 gap-3'}`}>
          <img src="/syntaxable.png" alt="Syntaxable" className="h-8 w-8 object-contain shrink-0" />
          {(!isCollapsed || isMobile) && (
            <h1 className="text-lg font-semibold text-foreground tracking-tight whitespace-nowrap">
              Syntaxable
            </h1>
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex-grow px-2 py-4 ${(!isCollapsed || isMobile) ? 'space-y-0.5' : 'space-y-1'}`}>
          {/* Platform Section */}
          {(!isCollapsed || isMobile) && (
            <p className="px-3 text-[10px] font-medium text-muted-foreground/50 uppercase tracking-wider mb-2">
              Platform
            </p>
          )}

          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center text-sm font-medium transition-all duration-200 rounded-lg ${isCollapsed && !isMobile
                  ? `justify-center p-2.5 ${isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`
                  : `px-3 py-2 ${isActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary -ml-[2px] px-[calc(0.75rem+2px)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`
                }`
              }
              title={isCollapsed && !isMobile ? item.label : undefined}
            >
              <item.icon className={`${isCollapsed && !isMobile ? '' : 'mr-3'} h-4 w-4 shrink-0`} />
              {(!isCollapsed || isMobile) && <span className="whitespace-nowrap">{item.label}</span>}
            </NavLink>
          ))}

          {/* Practice — navigates to last visited practice page */}
          {(() => {
            const isPracticeActive = location.pathname.startsWith('/practice');
            return (
              <button
                onClick={handlePracticeClick}
                title={isCollapsed && !isMobile ? "Practice" : undefined}
                className={`flex items-center text-sm font-medium transition-all duration-200 rounded-lg w-full ${isCollapsed && !isMobile
                  ? `justify-center p-2.5 ${isPracticeActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`
                  : `px-3 py-2 ${isPracticeActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary -ml-[2px] px-[calc(0.75rem+2px)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`
                }`}
              >
                <Dumbbell className={`${isCollapsed && !isMobile ? '' : 'mr-3'} h-4 w-4 shrink-0`} />
                {(!isCollapsed || isMobile) && <span className="whitespace-nowrap">Practice</span>}
              </button>
            );
          })()}

          {/* Social Section Spacer */}
          {(!isCollapsed || isMobile) && (
            <div className="px-3">
              <div className="border-t border-border/50 my-2" />
            </div>
          )}

          {/* Social Section */}
          {(!isCollapsed || isMobile) && (
            <p className="px-3 text-[10px] font-medium text-muted-foreground/50 uppercase tracking-wider mb-2">
              Social
            </p>
          )}

          {isCollapsed && !isMobile && (
            <div className="px-3">
              <div className="border-t border-border/50 my-4" />
            </div>
          )}

          {socialItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center text-sm font-medium transition-all duration-200 rounded-lg ${isCollapsed && !isMobile
                  ? `justify-center p-2.5 ${isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`
                  : `px-3 py-2 ${isActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary -ml-[2px] px-[calc(0.75rem+2px)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`
                }`
              }
              title={isCollapsed && !isMobile ? item.label : undefined}
            >
              <item.icon className={`${isCollapsed && !isMobile ? '' : 'mr-3'} h-4 w-4 shrink-0`} />
              {(!isCollapsed || isMobile) && <span className="whitespace-nowrap">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer / User Profile */}
        <div className={`shrink-0 ${isCollapsed && !isMobile ? 'px-2 py-3' : 'px-3 py-4'} border-t border-border`}>
          {isLoading ? (
            <div className={`flex items-center space-x-3 ${isCollapsed && !isMobile ? 'justify-center' : 'px-2'}`}>
              <Skeleton className="h-9 w-9 shrink-0" />
              {(!isCollapsed || isMobile) && (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                </div>
              )}
            </div>
          ) : user ? (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  navigate(`/profile/${user.id}`);
                  handleNavClick();
                }}
                className={`flex items-center gap-2.5 hover:bg-secondary/50 transition-colors w-full rounded-lg ${isCollapsed && !isMobile ? 'justify-center p-2.5' : 'px-2 py-1.5'
                  }`}
              >
                <Avatar className="h-8 w-8 border border-border shrink-0">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.username} />
                  <AvatarFallback seed={profile?.username} className="text-xs">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                {(!isCollapsed || isMobile) && (
                  <div className="flex-grow overflow-hidden text-left">
                    <p className="text-sm font-medium text-foreground truncate">
                      {profile?.username || user.email?.split('@')[0]}
                    </p>
                  </div>
                )}
              </button>

              {(!isCollapsed || isMobile) && (
                <div className="border-t border-border pt-2 mt-1">
                  <button
                    onClick={() => navigate('/pricing')}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors rounded-lg"
                  >
                    <CreditCard className="mr-3 h-4 w-4 shrink-0" />
                    Pricing
                  </button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors rounded-lg">
                        <Paintbrush className="mr-3 h-4 w-4 shrink-0" />
                        Theme
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48 ml-2">
                      <DropdownMenuItem onClick={() => handleThemeChange('dark')} className="flex justify-between w-full">
                        <span>Dark (Default)</span> {currentTheme === 'dark' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('light')} className="flex justify-between w-full">
                        <span>Light</span> {currentTheme === 'light' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('neon')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Hacker Green</span>
                        </div>
                        {currentTheme === 'neon' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('ocean')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Ocean Deep</span>
                        </div>
                        {currentTheme === 'ocean' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('sunset')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Sunset Orange</span>
                        </div>
                        {currentTheme === 'sunset' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('midnight')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Midnight Purple</span>
                        </div>
                        {currentTheme === 'midnight' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('solar')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Solar Gold</span>
                        </div>
                        {currentTheme === 'solar' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('frost')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Frost Blue</span>
                        </div>
                        {currentTheme === 'frost' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('aurora')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Aurora Borealis</span>
                        </div>
                        {currentTheme === 'aurora' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('ember')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Ember Glow</span>
                        </div>
                        {currentTheme === 'ember' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('sakura')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Sakura Bloom</span>
                        </div>
                        {currentTheme === 'sakura' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('void')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Void</span>
                        </div>
                        {currentTheme === 'void' && <span>✓</span>}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <button
                    onClick={() => setIsInboxOpen(true)}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors rounded-lg"
                  >
                    <Mail className="mr-3 h-4 w-4 shrink-0" />
                    Inbox
                    {notificationCount > 0 && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center bg-primary text-[10px] font-bold text-primary-foreground rounded-full">
                        {notificationCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors rounded-lg"
                  >
                    <LogOut className="mr-3 h-4 w-4 shrink-0" />
                    Sign Out
                  </button>
                </div>
              )}

              {isCollapsed && !isMobile && (
                <div className="flex flex-col items-center gap-1 pt-2 border-t border-border mt-1">
                  <button
                    onClick={() => navigate('/pricing')}
                    className="w-full flex items-center justify-center p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors rounded-lg"
                    title="Pricing"
                  >
                    <CreditCard className="h-4 w-4" />
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="w-full flex items-center justify-center p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors rounded-lg"
                        title="Theme"
                      >
                        <Paintbrush className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="end" className="w-48 ml-2">
                      <DropdownMenuItem onClick={() => handleThemeChange('dark')} className="flex justify-between w-full">
                        <span>Dark (Default)</span> {currentTheme === 'dark' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('light')} className="flex justify-between w-full">
                        <span>Light</span> {currentTheme === 'light' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('neon')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Hacker Green</span>
                        </div>
                        {currentTheme === 'neon' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('ocean')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Ocean Deep</span>
                        </div>
                        {currentTheme === 'ocean' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('sunset')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Sunset Orange</span>
                        </div>
                        {currentTheme === 'sunset' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('midnight')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Midnight Purple</span>
                        </div>
                        {currentTheme === 'midnight' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('solar')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Solar Gold</span>
                        </div>
                        {currentTheme === 'solar' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('frost')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Frost Blue</span>
                        </div>
                        {currentTheme === 'frost' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('aurora')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Aurora Borealis</span>
                        </div>
                        {currentTheme === 'aurora' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('ember')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Ember Glow</span>
                        </div>
                        {currentTheme === 'ember' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('sakura')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Sakura Bloom</span>
                        </div>
                        {currentTheme === 'sakura' && <span>✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeChange('void')} className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span>Void</span>
                        </div>
                        {currentTheme === 'void' && <span>✓</span>}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <button
                    onClick={() => setIsInboxOpen(true)}
                    className="w-full flex items-center justify-center p-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors rounded-lg relative"
                    title="Inbox"
                  >
                    <Mail className="h-4 w-4" />
                    {notificationCount > 0 && (
                      <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center bg-primary text-[10px] font-bold text-primary-foreground rounded-full">
                        {notificationCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center p-2.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors rounded-lg"
                    title="Sign Out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={`space-y-2 ${isCollapsed && !isMobile ? 'px-0' : ''}`}>
              {isCollapsed && !isMobile ? (
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => openModal('signin')}
                    className="w-full flex items-center justify-center p-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    title="Sign In"
                  >
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Button
                    onClick={() => openModal('signin')}
                    className="w-full"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => openModal('signup')}
                    variant="outline"
                    className="w-full"
                  >
                    Create Account
                  </Button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer: Social Links & Collapse Toggle */}
        <div className={`px-2 py-2 border-t border-border shrink-0 flex items-center ${isCollapsed && !isMobile ? 'justify-center' : 'justify-between px-3'}`}>
          {(!isCollapsed || isMobile) && (
            <div className="flex items-center gap-1.5">
              <a
                href="https://github.com/Mostafaeldiwany123/syntaxable"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/80 rounded-md transition-all"
                title="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/mostafa_eldiwany123/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/80 rounded-md transition-all"
                title="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/mostafa-eldiwany-91b9a9319/?skipRedirect=true"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/80 rounded-md transition-all"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          )}

          {showCollapseButton && (
            <button
              onClick={onToggleCollapse}
              className={`p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/80 rounded-md transition-all`}
              title={isCollapsed ? "Expand" : "Collapse"}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          )}
        </div>
      </aside>
      {user && <InboxSheet isOpen={isInboxOpen} onOpenChange={setIsInboxOpen} />}
    </>
  );
};