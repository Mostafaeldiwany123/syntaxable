import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, FolderKanban, LogOut, Users, Mail, UserCheck, Dumbbell, ChevronLeft, ChevronRight, CreditCard, Paintbrush, Lock, Trophy, Award, Github, Instagram, Linkedin, GraduationCap, ArrowLeft, CheckCircle2, Circle, ChevronDown, Swords } from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "@/context/SidebarContext";
import { Course, Lesson, Problem } from "@/data/practiceProblems";

interface SidebarProps {
  onNavigate?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobile?: boolean;
}

export const Sidebar = ({ onNavigate, isCollapsed: propCollapsed = false, onToggleCollapse: propToggleCollapse, isMobile = false }: SidebarProps) => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: profile, isLoading: profileLoading } = useProfile(user?.id);
  const { data: inboxItems } = useInbox();
  const { openModal } = useAuthModal();

  const {
    isCollapsed: contextCollapsed,
    toggleCollapse: contextToggleCollapse,
    setCollapsed,
    practiceData,
    showPracticeSidebar,
    setShowPracticeSidebar,
  } = useSidebar();

  const isCollapsed = isMobile ? false : contextCollapsed;
  const onToggleCollapse = propToggleCollapse || contextToggleCollapse;

  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());

  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark');

  const isPro = profile?.tier === 'pro' || profile?.tier === 'admin';
  const proThemes: string[] = [];

  useEffect(() => {
    if (profileLoading) return;
    const savedTheme = localStorage.getItem('app-theme') || 'dark';
    setCurrentTheme(savedTheme);
  }, [profileLoading]);

  // Auto-expand the lesson containing the selected problem
  useEffect(() => {
    if (practiceData && practiceData.currentProblemId) {
      const currentLesson = practiceData.lessons.find(l =>
        l.problems.some(p => p.id === practiceData.currentProblemId)
      );
      if (currentLesson) {
        setExpandedLessons(new Set([currentLesson.id]));
      }
    }
  }, [practiceData?.currentProblemId, practiceData?.lessons]);

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

  const showPractice = practiceData && showPracticeSidebar;

  return (
    <>
      <aside
        className={`flex flex-col bg-card h-full overflow-hidden transition-all duration-300 ease-in-out ${isMobile
          ? 'w-full border-r-0'
          : isCollapsed
            ? 'w-16 border-r border-border/40'
            : 'w-60 border-r border-border/40'
          }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {showPractice ? (
            <motion.div
              key="practice"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex flex-col h-full overflow-hidden w-full"
            >
              {isCollapsed && !isMobile ? (
                /* Collapsed Practice View */
                <>
                  {/* Header */}
                  <div className="border-b border-border flex items-center justify-center p-3 shrink-0 h-14 bg-card">
                    <button
                      onClick={() => setShowPracticeSidebar(false)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors"
                      title="Back to Main Menu"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Lesson Circular Progress Stack */}
                  <div className="flex-grow overflow-y-auto py-4 flex flex-col items-center gap-4 select-none">
                    {practiceData.lessons.map((lesson, index) => {
                      const completedCount = lesson.problems.filter(p => practiceData.completedProblems.has(p.id)).length;
                      const totalCount = lesson.problems.length;
                      const percent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

                      // SVG Circular progress configs
                      const radius = 13;
                      const strokeWidth = 2.5;
                      const circumference = 2 * Math.PI * radius;
                      const strokeDashoffset = circumference - (percent / 100) * circumference;

                      return (
                        <div key={lesson.id} className="relative group flex flex-col items-center justify-center">
                          <button
                            onClick={() => {
                              setExpandedLessons(new Set([lesson.id]));
                              setCollapsed(false);
                            }}
                            className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary/30 transition-colors"
                          >
                            <svg className="absolute inset-0 w-9 h-9 transform -rotate-90">
                              <circle
                                className="text-muted-foreground/10"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="transparent"
                                r={radius}
                                cx="18"
                                cy="18"
                              />
                              <circle
                                className="text-primary transition-all duration-500 ease-out"
                                strokeWidth={strokeWidth}
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r={radius}
                                cx="18"
                                cy="18"
                              />
                            </svg>
                            <span className="text-[10px] font-bold text-foreground z-10">
                              {index + 1}
                            </span>
                          </button>

                          {/* Tooltip */}
                          <div className="absolute left-14 top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-popover border border-border text-[11px] text-popover-foreground rounded-lg shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none whitespace-nowrap z-50 flex flex-col gap-0.5">
                            <div className="font-semibold text-foreground">{lesson.title}</div>
                            <div className="text-[10px] text-muted-foreground font-medium">
                              {completedCount}/{totalCount} Completed ({Math.round(percent)}%)
                            </div>
                            <div className="text-[9px] text-primary/80 font-medium italic mt-0.5">
                              Click to expand & view questions
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer Collapse Button */}
                  <div className="shrink-0 p-3 border-t border-border/50 flex items-center justify-center">
                    {showCollapseButton && (
                      <button
                        onClick={onToggleCollapse}
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/80 rounded-md transition-all"
                        title="Expand"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* Expanded Practice View */
                <>
                  {/* Header */}
                  <div className="border-b border-border flex items-center justify-between px-3 py-3 shrink-0 bg-card h-14">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPracticeSidebar(false)}
                      className="gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/40 shrink-0"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back to Menu</span>
                    </Button>
                    <div className="flex items-center gap-1.5 shrink-0 bg-secondary/50 px-2 py-0.5 rounded border border-border/50">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wide">
                        {practiceData.course.language}
                      </span>
                    </div>
                  </div>

                  {/* Lessons Accordion */}
                  <div className="flex-grow overflow-y-auto px-2 py-3 space-y-1 select-none">
                    {practiceData.lessons.map((lesson) => {
                      const completedCount = lesson.problems.filter(p => practiceData.completedProblems.has(p.id)).length;
                      const totalCount = lesson.problems.length;
                      const isExpanded = expandedLessons.has(lesson.id);

                      // Sort problems by difficulty
                      const sortedProblems = [...lesson.problems].sort((a, b) => {
                        const difficultyPriority = { easy: 1, medium: 2, hard: 3 };
                        return (difficultyPriority[a.difficulty] || 0) - (difficultyPriority[b.difficulty] || 0);
                      });

                      return (
                        <div key={lesson.id} className="border border-border/30 rounded-lg overflow-hidden bg-secondary/5">
                          <button
                            onClick={() => {
                              setExpandedLessons(prev => {
                                const next = new Set(prev);
                                if (next.has(lesson.id)) {
                                  next.delete(lesson.id);
                                } else {
                                  next.clear();
                                  next.add(lesson.id);
                                }
                                return next;
                              });
                            }}
                            className="w-full text-left px-3 py-2.5 hover:bg-secondary/20 transition-colors group flex flex-col gap-1.5"
                          >
                            <div className="w-full flex items-center gap-2">
                              {isExpanded ? (
                                <ChevronDown size={12} className="text-muted-foreground shrink-0" />
                              ) : (
                                <ChevronRight size={12} className="text-muted-foreground shrink-0" />
                              )}
                              <span className="text-xs font-semibold truncate flex-1 text-foreground group-hover:text-primary transition-colors">
                                {lesson.title}
                              </span>
                              <span className="text-[10px] text-muted-foreground font-mono font-medium">
                                {completedCount}/{totalCount}
                              </span>
                            </div>
                            {/* Thin Lesson Progress Bar */}
                            <div className="h-1.5 w-full bg-secondary/30 border border-border/40 rounded-full overflow-hidden mt-0.5">
                              <div
                                className="h-full bg-primary transition-all duration-500 ease-out"
                                style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                              />
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="px-2 pb-2 pt-0.5 space-y-0.5 border-t border-border/5 bg-card/30">
                                  {sortedProblems.map(problem => {
                                    const isCompleted = practiceData.completedProblems.has(problem.id);
                                    const isSelected = practiceData.currentProblemId === problem.id;

                                    return (
                                      <button
                                        key={problem.id}
                                        onClick={() => {
                                          practiceData.onSelectProblem(problem);
                                          onNavigate?.(); // Close mobile drawer
                                        }}
                                        className={`w-full text-left px-2.5 py-1.5 rounded transition-colors group/item flex items-center gap-2 ${isSelected
                                            ? 'bg-primary/10 text-primary'
                                            : 'hover:bg-secondary/40 text-muted-foreground hover:text-foreground'
                                          }`}
                                      >
                                        {isCompleted ? (
                                          <CheckCircle2 size={13} className="text-green-500 shrink-0" />
                                        ) : (
                                          <Circle size={13} className="text-muted-foreground/30 group-hover/item:text-muted-foreground/50 shrink-0" />
                                        )}
                                        <span className="text-xs truncate flex-1 font-medium">{problem.title}</span>
                                        {/* Status dots or mini difficulty badges */}
                                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider shrink-0 select-none border ${problem.difficulty === 'easy'
                                            ? 'bg-green-500/10 text-green-500 border-green-500/10'
                                            : problem.difficulty === 'medium'
                                              ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/10'
                                              : 'bg-red-500/10 text-red-500 border-red-500/10'
                                          }`}>
                                          {problem.difficulty}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer Controls */}
                  <div className="shrink-0 p-3 border-t border-border/50 flex items-center justify-between">
                    <button
                      onClick={() => setShowPracticeSidebar(false)}
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-1.5 px-2 rounded hover:bg-secondary/35"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Main Menu</span>
                    </button>
                    {showCollapseButton && (
                      <button
                        onClick={onToggleCollapse}
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/80 rounded-md transition-all"
                        title="Collapse"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="standard"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex flex-col h-full overflow-hidden w-full"
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
                      `relative flex items-center text-sm font-medium transition-colors duration-200 rounded-lg ${isCollapsed && !isMobile
                        ? "justify-center p-2.5"
                        : "px-3 py-2"
                      } ${isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/35"
                      }`
                    }
                    title={isCollapsed && !isMobile ? item.label : undefined}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            layoutId="activeTabIndicator"
                            className="absolute inset-0 bg-primary/10 rounded-lg"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className={`relative z-10 flex items-center w-full ${isCollapsed && !isMobile ? 'justify-center' : ''}`}>
                          <item.icon className={`${isCollapsed && !isMobile ? '' : 'mr-3'} h-4 w-4 shrink-0`} />
                          {(!isCollapsed || isMobile) && <span className="whitespace-nowrap">{item.label}</span>}
                        </span>
                      </>
                    )}
                  </NavLink>
                ))}

                {/* Practice — navigates to last visited practice page */}
                {(() => {
                  const isPracticeActive = location.pathname.startsWith('/practice');
                  return (
                    <button
                      onClick={handlePracticeClick}
                      title={isCollapsed && !isMobile ? "Practice" : undefined}
                      className={`relative flex items-center text-sm font-medium transition-colors duration-200 rounded-lg w-full ${isCollapsed && !isMobile
                        ? "justify-center p-2.5"
                        : "px-3 py-2"
                        } ${isPracticeActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/35"
                        }`}
                    >
                      {isPracticeActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute inset-0 bg-primary/10 rounded-lg"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className={`relative z-10 flex items-center w-full ${isCollapsed && !isMobile ? 'justify-center' : ''}`}>
                        <Dumbbell className={`${isCollapsed && !isMobile ? '' : 'mr-3'} h-4 w-4 shrink-0`} />
                        {(!isCollapsed || isMobile) && <span className="whitespace-nowrap">Practice</span>}
                      </span>
                    </button>
                  );
                })()}

                {/* Duels */}
                <NavLink
                  to="/duel"
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `relative flex items-center text-sm font-medium transition-colors duration-200 rounded-lg ${isCollapsed && !isMobile
                      ? "justify-center p-2.5"
                      : "px-3 py-2"
                    } ${isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/35"
                    }`
                  }
                  title={isCollapsed && !isMobile ? "Duels" : undefined}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute inset-0 bg-primary/10 rounded-lg"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className={`relative z-10 flex items-center w-full ${isCollapsed && !isMobile ? 'justify-center' : ''}`}>
                        <Swords className={`${isCollapsed && !isMobile ? '' : 'mr-3'} h-4 w-4 shrink-0`} />
                        {(!isCollapsed || isMobile) && <span className="whitespace-nowrap">Duels</span>}
                      </span>
                    </>
                  )}
                </NavLink>

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
                      `relative flex items-center text-sm font-medium transition-colors duration-200 rounded-lg ${isCollapsed && !isMobile
                        ? "justify-center p-2.5"
                        : "px-3 py-2"
                      } ${isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/35"
                      }`
                    }
                    title={isCollapsed && !isMobile ? item.label : undefined}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            layoutId="activeTabIndicator"
                            className="absolute inset-0 bg-primary/10 rounded-lg"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className={`relative z-10 flex items-center w-full ${isCollapsed && !isMobile ? 'justify-center' : ''}`}>
                          <item.icon className={`${isCollapsed && !isMobile ? '' : 'mr-3'} h-4 w-4 shrink-0`} />
                          {(!isCollapsed || isMobile) && <span className="whitespace-nowrap">{item.label}</span>}
                        </span>
                      </>
                    )}
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

              {/* Social Links & Collapse Toggle */}
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
            </motion.div>
          )}
        </AnimatePresence>
      </aside>
      {user && <InboxSheet isOpen={isInboxOpen} onOpenChange={setIsInboxOpen} />}
    </>
  );
};