import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from '@/data/practiceProblems';
import { TrackId, TRACK_LIST, getLanguagesForTrack, getTrackCourse } from '@/data/practice/tracks';
import { useCustomSets, usePublicCustomSets } from '@/hooks/customSets';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/profiles';
import { Plus, BookOpen, Users, Search, X, ChevronDown, ArrowLeft, Terminal, Cpu, Boxes, Sparkles, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
};

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons';

const allLanguages = [
  { id: 'cpp', label: 'C++', icon: `${CDN_BASE}/cpp.svg` },
  { id: 'c', label: 'C', icon: `${CDN_BASE}/c.svg` },
  { id: 'csharp', label: 'C#', icon: `${CDN_BASE}/csharp.svg` },
  { id: 'python', label: 'Python', icon: `${CDN_BASE}/python.svg` },
  { id: 'java', label: 'Java', icon: `${CDN_BASE}/java.svg` },
  { id: 'javascript', label: 'JavaScript', icon: `${CDN_BASE}/javascript.svg` },
  { id: 'typescript', label: 'TypeScript', icon: `${CDN_BASE}/typescript.svg` },
];

const languageFilterOptions = [
  { value: '', label: 'All Languages' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'csharp', label: 'C#' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'problems_desc', label: 'Most Problems' },
  { value: 'problems_asc', label: 'Fewest Problems' },
];

interface PracticeLandingProps {
  courses: Course[];
  onSelectCourse: (course: Course, trackId?: TrackId) => void;
  selectedTrack?: TrackId | null;
  onSelectTrack?: (track: TrackId | null) => void;
}

export const PracticeLanding: React.FC<PracticeLandingProps> = ({
  courses,
  onSelectCourse,
  selectedTrack: propSelectedTrack,
  onSelectTrack: propOnSelectTrack,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);
  const { data: customSets } = useCustomSets();
  const { data: publicSets } = usePublicCustomSets();

  const [localTrack, setLocalTrack] = useState<TrackId | null>(() => {
    return propSelectedTrack || null;
  });

  const activeTrackId = propSelectedTrack !== undefined ? propSelectedTrack : localTrack;

  const handleSelectTrack = (trackId: TrackId | null) => {
    if (trackId) {
      localStorage.setItem('syntaxable_active_track', trackId);
      sessionStorage.setItem('practice-active-track', trackId);
    } else {
      localStorage.removeItem('syntaxable_active_track');
      sessionStorage.removeItem('practice-active-track');
    }
    if (propOnSelectTrack) {
      propOnSelectTrack(trackId);
    } else {
      setLocalTrack(trackId);
    }
  };

  const activeTrack = useMemo(() => {
    if (!activeTrackId) return null;
    return TRACK_LIST.find(t => t.id === activeTrackId) || null;
  }, [activeTrackId]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  const isPro = profile?.tier === 'pro' || profile?.tier === 'admin';

  const handleCreateSet = () => {
    if (isPro) {
      navigate('/practice/custom/create');
    } else {
      toast.error("Pro Feature", {
        description: "Creating custom practice sets is only available for Pro members. Upgrade your account to create your own sets!",
        action: {
          label: "Upgrade",
          onClick: () => navigate("/pricing")
        },
      });
    }
  };

  const handleViewMySets = () => {
    if (isPro) {
      navigate('/practice/custom');
    } else {
      toast.error("Pro Feature", {
        description: "Managing custom practice sets is only available for Pro members.",
        action: {
          label: "Upgrade",
          onClick: () => navigate("/pricing")
        },
      });
    }
  };

  const filteredAndSortedPublicSets = useMemo(() => {
    if (!publicSets) return [];

    let filtered = publicSets.filter(set => {
      const matchesSearch = searchQuery === '' ||
        set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (set.description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (set.owner_username?.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLanguage = !selectedLanguage || set.language === selectedLanguage;

      return matchesSearch && matchesLanguage;
    });

    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'problems_desc':
          return b.problem_count - a.problem_count;
        case 'problems_asc':
          return a.problem_count - b.problem_count;
        default:
          return 0;
      }
    });

    return filtered;
  }, [publicSets, searchQuery, selectedLanguage, sortBy]);

  // Languages available for the selected track
  const availableTrackLanguages = useMemo(() => {
    if (!activeTrackId) return allLanguages;
    const allowed = getLanguagesForTrack(activeTrackId);
    return allLanguages.filter(lang => allowed.includes(lang.id));
  }, [activeTrackId]);

  const languageCards = useMemo(() => {
    return availableTrackLanguages.map(lang => {
      const trackCourse = activeTrackId
        ? getTrackCourse(activeTrackId, lang.id)
        : courses.find(c => c.language === lang.id);

      const problemCount = trackCourse?.lessons.reduce((sum, l) => sum + l.problems.length, 0) || 0;
      return {
        ...lang,
        course: trackCourse,
        problemCount,
        isAvailable: !!trackCourse && trackCourse.lessons.length > 0,
      };
    });
  }, [courses, availableTrackLanguages, activeTrackId]);

  const hasCustomSets = customSets && customSets.length > 0;
  const hasPublicSets = publicSets && publicSets.length > 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <motion.div variants={itemVariants}>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                {activeTrack ? activeTrack.title : 'Practice Coding'}
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                {activeTrack
                  ? 'Choose a programming language to start practicing.'
                  : 'Choose a learning track to start practicing, or explore custom problem sets.'}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {/* LEVEL 1: Track Selection View (when no track is selected) */}
          {!activeTrackId ? (
            <div className="space-y-12">
              {/* Category 1: Learning Tracks */}
              <div>
                <motion.div variants={itemVariants} className="mb-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    Learning Tracks
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Structured paths from programming basics to advanced data structures.
                  </p>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-3 gap-5"
                >
                  {TRACK_LIST.map((track) => {
                    const langs = getLanguagesForTrack(track.id);
                    return (
                      <motion.button
                        variants={itemVariants}
                        key={track.id}
                        onClick={() => handleSelectTrack(track.id)}
                        className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 text-left transition-all hover:border-primary/50 hover:shadow-md cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                              {track.icon === 'terminal' && <Terminal className="w-6 h-6" />}
                              {track.icon === 'cpu' && <Cpu className="w-6 h-6" />}
                              {track.icon === 'boxes' && <Boxes className="w-6 h-6" />}
                            </div>
                            <div className="flex items-center gap-1.5">
                              {track.isPro && (
                                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-md flex items-center gap-1">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  Pro
                                </span>
                              )}
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-secondary text-muted-foreground rounded-md">
                                {track.level}
                              </span>
                            </div>
                          </div>
                          <h3 className="font-semibold text-base mb-2 text-foreground group-hover:text-primary transition-colors">
                            {track.title}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                            {track.description}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">
                            {langs.length} {langs.length === 1 ? 'Language' : 'Languages'}
                          </span>
                          <span className="text-primary font-medium group-hover:translate-x-0.5 transition-transform">
                            Start Track &rarr;
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>

              {/* Category 2: Custom Sets (placed cleanly UNDER learning tracks) */}
              <div className="pt-8 border-t border-border">
                <motion.div variants={itemVariants} className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      Custom Practice Sets
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Create your own targeted problem sets or solve sets shared by the community.
                    </p>
                  </div>
                </motion.div>

                {/* Custom Sets Action Cards */}
                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
                >
                  {/* Create Custom Set Card */}
                  <motion.button
                    variants={itemVariants}
                    onClick={handleCreateSet}
                    className="group relative overflow-hidden rounded-lg border border-dashed border-primary/50 bg-card/50 p-6 text-left transition-colors hover:border-primary hover:bg-primary/5 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Plus className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm mb-1 text-foreground group-hover:text-primary transition-colors">
                          Create Custom Set
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Design custom problems and test cases for your study group or class.
                        </p>
                        <span className="inline-block mt-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-primary/10 text-primary rounded">
                          Pro Feature
                        </span>
                      </div>
                    </div>
                  </motion.button>

                  {/* My Sets Card */}
                  {hasCustomSets && (
                    <motion.button
                      variants={itemVariants}
                      onClick={handleViewMySets}
                      className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 text-left transition-colors hover:border-primary/50 hover:shadow-sm cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                          <BookOpen className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm mb-1 text-foreground group-hover:text-primary transition-colors">
                            My Sets
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Manage and review your created problem collections.
                          </p>
                          <span className="inline-block mt-3 text-[10px] font-semibold px-2 py-0.5 bg-secondary text-muted-foreground rounded">
                            {customSets?.length || 0} {customSets?.length === 1 ? 'set' : 'sets'}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  )}
                </motion.div>

                {/* Community / Public Sets */}
                {hasPublicSets && (
                  <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Community Sets
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-2">
                        {/* Search */}
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search community sets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 w-full sm:w-48 h-8 text-xs bg-secondary/30"
                          />
                          {searchQuery && (
                            <button
                              onClick={() => setSearchQuery('')}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </div>

                        {/* Language Filter Dropdown */}
                        <div className="relative">
                          <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="appearance-none bg-secondary/30 border border-input rounded-md px-3 pr-8 h-8 text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary w-full"
                          >
                            {languageFilterOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none bg-secondary/30 border border-input rounded-md px-3 pr-8 h-8 text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary w-full"
                          >
                            {sortOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {filteredAndSortedPublicSets.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground text-xs">
                        {searchQuery || selectedLanguage ? 'No sets match your search criteria.' : 'No public sets available.'}
                      </div>
                    ) : (
                      <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                      >
                        {filteredAndSortedPublicSets.map((set) => (
                          <motion.button
                            variants={itemVariants}
                            key={set.id}
                            onClick={() => navigate(`/practice/custom/${set.id}`)}
                            className="group relative overflow-hidden rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/50 hover:shadow-sm cursor-pointer"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                                <img
                                  src={`${CDN_BASE}/${set.language === 'c' ? 'c' : set.language === 'csharp' ? 'csharp' : set.language === 'cpp' ? 'cpp' : set.language === 'java' ? 'java' : set.language === 'javascript' ? 'javascript' : set.language === 'typescript' ? 'typescript' : 'python'}.svg`}
                                  alt=""
                                  className="w-5 h-5"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                  {set.title}
                                </h4>
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                  {set.description || 'No description'}
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="h-3 w-3" />
                                    {set.problem_count} problems
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {set.owner_username || 'Unknown'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          ) : (
            /* LEVEL 2: Language Selection for Selected Track (ONLY languages for this track!) */
            <div>
              <div className="flex items-center justify-between mb-5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSelectTrack(null)}
                  className="gap-1.5 px-2.5 hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="font-medium text-xs">Back to Tracks</span>
                </Button>
                <span className="text-xs px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20 font-medium">
                  {activeTrack?.title}
                </span>
              </div>

              <motion.h2 variants={itemVariants} className="text-lg font-semibold mb-4">
                Available Languages
              </motion.h2>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
              >
                {languageCards.map((card) => (
                  <motion.button
                    variants={itemVariants}
                    key={card.id}
                    onClick={() => card.isAvailable && card.course && onSelectCourse(card.course, activeTrackId)}
                    disabled={!card.isAvailable}
                    className={`group relative overflow-hidden rounded-lg border border-border bg-card p-7 text-left transition-colors ${card.isAvailable
                        ? 'hover:border-primary/50 hover:shadow-sm cursor-pointer'
                        : 'opacity-50 cursor-not-allowed'
                      }`}
                  >
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="mb-3 w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                        <img src={card.icon} alt={card.label} className="w-8 h-8" />
                      </div>
                      <h3 className="font-medium text-base mb-2">{card.label}</h3>
                      <div className="mt-auto">
                        <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary/70 rounded">
                          {card.problemCount} {card.problemCount === 1 ? 'problem' : 'problems'}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PracticeLanding;