import { useState, useEffect } from "react";
import { ShowcaseCursor } from "./components/ui/ShowcaseCursor";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams, useNavigate, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { PresenceProvider } from "./hooks/usePresence";
import { AuthModalProvider } from "./context/AuthModalContext";
import { SidebarProvider } from "./context/SidebarContext";
import { AuthModal } from "./components/auth/AuthModal";
import { PremiumGuard } from "./components/auth/PremiumGuard";

import { AppLayout } from "./components/Layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import EditorPage from "./pages/EditorPage";
import NotFound from "./pages/NotFound";
import ProjectsPage from "./pages/ProjectsPage";
import RoomPage from "./pages/RoomPage";
import CommunityPage from "./pages/CommunityPage";
import FriendsPage from "./pages/FriendsPage";
import ProfilePage from "./pages/ProfilePage";
import PracticePage from "./pages/PracticePage";
import AuthPage from "./pages/AuthPage";
import CustomSetsPage from "./pages/CustomSetsPage";
import CreateCustomSetPage from "./pages/CreateCustomSetPage";
import CustomSetViewPage from "./pages/CustomSetViewPage";
import CustomSetSharePage from "./pages/CustomSetSharePage";
import CustomSetParticipantsPage from "./pages/CustomSetParticipantsPage";
import PricingPage from "./pages/PricingPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import AchievementsPage from "./pages/AchievementsPage";
import { RewardPopup } from "./components/achievements/RewardPopup";
import { cppCourse, csharpCourse, pythonCourse, javaCourse } from './data/practiceProblems';

const PracticeRoutes = () => {
  const { language, problemId } = useParams();
  const navigate = useNavigate();

  const course = language === 'cpp' ? cppCourse : language === 'csharp' ? csharpCourse : language === 'python' ? pythonCourse : language === 'java' ? javaCourse : null;
  const problem = course ? course.lessons.flatMap(l => l.problems).find(p => p.id === problemId) : null;

  useEffect(() => {
    if (language && !course) {
      navigate('/practice');
    } else if (language && problemId && !problem) {
      navigate(`/practice/${language}`);
    }
  }, [language, problemId, course, problem, navigate]);

  return <PracticePage initialLanguage={language} initialProblemId={problemId} />;
};

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <>
      <AuthModal />
      {user && <RewardPopup />}
      <Routes>
        <Route path="/" element={!user ? <AuthPage /> : <Navigate to="/dashboard" replace />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/" replace />} />
          <Route path="/projects" element={user ? <ProjectsPage /> : <Navigate to="/" replace />} />
          <Route path="/practice" element={user ? <PracticeRoutes /> : <Navigate to="/" replace />} />
          <Route path="/practice/:language" element={user ? <PracticeRoutes /> : <Navigate to="/" replace />} />
          <Route path="/practice/:language/problem/:problemId" element={user ? <PracticeRoutes /> : <Navigate to="/" replace />} />

          {/* Custom sets routes - Creating is a Pro feature, joining is free */}
          <Route path="/practice/custom/create" element={
            <PremiumGuard>
              <CreateCustomSetPage />
            </PremiumGuard>
          } />
          <Route path="/practice/custom/:setId/share" element={
            <PremiumGuard>
              <CustomSetSharePage />
            </PremiumGuard>
          } />
          <Route path="/practice/custom/:setId/participants" element={
            <PremiumGuard>
              <CustomSetParticipantsPage />
            </PremiumGuard>
          } />
          {/* Viewing/practicing custom sets is free for all users */}
          <Route path="/practice/custom/:setId" element={user ? <CustomSetViewPage /> : <Navigate to="/" replace />} />
          <Route path="/practice/custom" element={
            <PremiumGuard>
              <CustomSetsPage />
            </PremiumGuard>
          } />

          <Route path="/community" element={user ? <CommunityPage /> : <Navigate to="/" replace />} />
          <Route path="/friends" element={user ? <FriendsPage /> : <Navigate to="/" replace />} />
          <Route path="/leaderboard" element={user ? <LeaderboardPage /> : <Navigate to="/" replace />} />
          <Route path="/achievements" element={user ? <AchievementsPage /> : <Navigate to="/" replace />} />
          <Route path="/room/:roomId" element={user ? <RoomPage /> : <Navigate to="/" replace />} />
          <Route path="/profile/:userId" element={user ? <ProfilePage /> : <Navigate to="/" replace />} />
          <Route path="/pricing" element={user ? <PricingPage /> : <Navigate to="/" replace />} />
        </Route>

        <Route path="/editor/:roomId" element={user ? <EditorPage /> : <Navigate to="/" replace />} />

        {/* Public routes - accessible without authentication */}
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [showcaseCursor, setShowcaseCursor] = useState(false);

  // Press Alt+C to toggle the showcase cursor on/off during recordings
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'c') {
        setShowcaseCursor(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showcaseCursor && <ShowcaseCursor />}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AuthModalProvider>
              <PresenceProvider>
                <SidebarProvider>
                  <AppRoutes />
                </SidebarProvider>
              </PresenceProvider>
            </AuthModalProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;