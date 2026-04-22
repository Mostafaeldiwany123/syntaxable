import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from '@/data/practiceProblems';
import { useCustomSets, usePublicCustomSets } from '@/hooks/customSets';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/profiles';
import { Plus, BookOpen, Users, Search, X, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons';

const allLanguages = [
  { id: 'cpp', label: 'C++', icon: `${CDN_BASE}/cpp.svg` },
  { id: 'csharp', label: 'C#', icon: `${CDN_BASE}/csharp.svg` },
  { id: 'python', label: 'Python', icon: `${CDN_BASE}/python.svg` },
  { id: 'java', label: 'Java', icon: `${CDN_BASE}/java.svg` },
  { id: 'javascript', label: 'JavaScript', icon: `${CDN_BASE}/javascript.svg` },
  { id: 'typescript', label: 'TypeScript', icon: `${CDN_BASE}/typescript.svg` },
];

const languageFilterOptions = [
  { value: '', label: 'All Languages' },
  { value: 'cpp', label: 'C++' },
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
  onSelectCourse: (course: Course) => void;
}

export const PracticeLanding: React.FC<PracticeLandingProps> = ({ courses, onSelectCourse }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);
  const { data: customSets } = useCustomSets();
  const { data: publicSets } = usePublicCustomSets();

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

    // Filter
    let filtered = publicSets.filter(set => {
      const matchesSearch = searchQuery === '' ||
        set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (set.description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (set.owner_username?.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLanguage = !selectedLanguage || set.language === selectedLanguage;

      return matchesSearch && matchesLanguage;
    });

    // Sort
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

  const languageCards = useMemo(() => {
    return allLanguages.map(lang => {
      const course = courses.find(c => c.language === lang.id);
      const problemCount = course?.lessons.reduce((sum, l) => sum + l.problems.length, 0) || 0;
      return {
        ...lang,
        course,
        problemCount,
        isAvailable: !!course,
      };
    });
  }, [courses]);

  const hasCustomSets = customSets && customSets.length > 0;
  const hasPublicSets = publicSets && publicSets.length > 0;

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Practice Coding</h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Choose a programming language to start practicing.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Languages</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {languageCards.map((card) => (
              <button
                key={card.id}
                onClick={() => card.isAvailable && card.course && onSelectCourse(card.course)}
                disabled={!card.isAvailable}
                className={`group relative overflow-hidden rounded-lg border border-border bg-card p-7 text-left transition-all ${card.isAvailable
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
              </button>
            ))}

            {/* Create Custom Set Card */}
            <button
              onClick={handleCreateSet}
              className="group relative overflow-hidden rounded-lg border border-dashed border-primary/50 bg-card/50 p-7 text-left transition-all hover:border-primary hover:bg-primary/5 cursor-pointer"
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="mb-3 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium text-base mb-2">Create Set</h3>
                <div className="mt-auto">
                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary/70 rounded">
                    Pro Feature
                  </span>
                </div>
              </div>
            </button>

            {/* My Sets Card */}
            {hasCustomSets && (
              <button
                onClick={handleViewMySets}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-7 text-left transition-all hover:border-primary/50 hover:shadow-sm cursor-pointer"
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className="mb-3 w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-base mb-2">My Sets</h3>
                  <div className="mt-auto">
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary/70 rounded">
                      {customSets?.length || 0} {customSets?.length === 1 ? 'set' : 'sets'}
                    </span>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Public Sets Section */}
        {hasPublicSets && (
          <div className="mt-8 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-lg font-semibold">Public Sets</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search sets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full sm:w-48 h-8 text-sm"
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
                    className="appearance-none bg-background border border-input rounded-md px-3 pr-8 h-8 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary w-full"
                  >
                    {languageFilterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-background border border-input rounded-md px-3 pr-8 h-8 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary w-full"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {filteredAndSortedPublicSets.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                {searchQuery || selectedLanguage ? 'No sets match your search criteria.' : 'No public sets available.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAndSortedPublicSets.map((set) => (
                  <button
                    key={set.id}
                    onClick={() => navigate(`/practice/custom/${set.id}`)}
                    className="group relative overflow-hidden rounded-lg border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:shadow-sm cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        <img
                          src={`${CDN_BASE}/${set.language === 'csharp' ? 'csharp' : set.language === 'cpp' ? 'cpp' : set.language === 'java' ? 'java' : set.language === 'javascript' ? 'javascript' : set.language === 'typescript' ? 'typescript' : 'python'}.svg`}
                          alt=""
                          className="w-5 h-5"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                          {set.title}
                        </h3>
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
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeLanding;