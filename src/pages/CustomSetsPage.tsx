import { useState, useMemo, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, BookOpen, CheckCircle2, Circle, Trash2, Users, Search, X, ChevronDown, Clock, ArrowRight, ListChecks, Share2, BarChart3 } from "lucide-react";
import { useCustomSets, useDeleteCustomSet, useRecentPracticeRooms, usePublicCustomSets } from "@/hooks/customSets";
import { getFileIconUrl } from "@/lib/project-utils";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const languageLabels: Record<string, string> = {
  cpp: 'C++',
  csharp: 'C#',
  python: 'Python',
};

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

const CustomSetsPage = () => {
  const navigate = useNavigate();
  const { data: customSets, isLoading: isLoadingOwned } = useCustomSets();
  const { data: recentRooms, isLoading: isLoadingRecent } = useRecentPracticeRooms(50);
  const { data: publicSets } = usePublicCustomSets();
  const { mutate: deleteSet, isPending: isDeleting } = useDeleteCustomSet();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [setToDelete, setSetToDelete] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [joinCode, setJoinCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const isLoading = isLoadingOwned || isLoadingRecent;
  const joinedSets = recentRooms || [];
  const ownedSets = customSets?.filter(s => s.is_owner) || [];
  const hasPublicSets = publicSets && publicSets.length > 0;

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

  const handleDelete = () => {
    if (setToDelete) {
      deleteSet(setToDelete);
      setDeleteDialogOpen(false);
      setSetToDelete(null);
    }
  };

  const handleJoinByCode = async (e: FormEvent) => {
    e.preventDefault();
    const raw = joinCode.trim();
    if (!raw || isJoining) return;

    const candidate = raw.includes('/')
      ? (raw.split('?')[0].replace(/\/+$/, '').split('/').pop() || '')
      : raw;

    if (candidate.length === 8) {
      setIsJoining(true);
      const { data, error } = await supabase.rpc('get_custom_set_by_short_code', {
        p_short_code: candidate.toLowerCase(),
      });
      setIsJoining(false);
      if (!error && data?.[0]?.id) {
        navigate(`/practice/custom/${data[0].id}`);
      } else {
        toast.error('No set found with that code.');
      }
      return;
    }

    if (candidate.length > 8) {
      navigate(`/practice/custom/${candidate}`);
      return;
    }

    toast.error('Enter the 8-character code or paste a share link.');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center md:min-h-dvh">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col md:min-h-dvh">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Custom Sets</h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Create your own problem sets, or solve sets shared with you.
              </p>
            </div>
            <Button onClick={() => navigate('/practice/custom/create')} className="rounded-lg shrink-0">
              <Plus className="mr-2 h-4 w-4" />
              Create New Set
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-8 sm:py-8">
      {(ownedSets.length > 0 || joinedSets.length > 0) ? (
        <div className="space-y-6">
          {/* Created Sets Section */}
          {ownedSets.length > 0 && (
            <div className="border border-border rounded-xl bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-secondary/20">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-semibold">My Sets</h2>
                  <Badge variant="secondary" className="font-normal text-xs">
                    {ownedSets.length}
                  </Badge>
                </div>
              </div>
              <div className="divide-y divide-border/50">
                {ownedSets.map((set) => (
                  <div
                    key={set.id}
                    className="flex items-center gap-4 p-4 hover:bg-secondary/20 transition-colors cursor-pointer group"
                    onClick={() => navigate(`/practice/custom/${set.id}`)}
                  >
                    <div className="p-2 bg-secondary/50 border border-border rounded-lg shrink-0">
                      <img
                        src={getFileIconUrl(`file.${set.language === 'csharp' ? 'cs' : set.language === 'cpp' ? 'cpp' : set.language === 'java' ? 'java' : set.language === 'javascript' ? 'js' : set.language === 'typescript' ? 'ts' : set.language === 'python' ? 'py' : 'py'}`)}
                        alt=""
                        className="w-5 h-5"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base truncate group-hover:text-primary transition-colors">
                        {set.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {set.problem_count} {set.problem_count === 1 ? 'problem' : 'problems'} · {languageLabels[set.language]}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/practice/custom/${set.id}/participants`);
                        }}
                        className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        title="View Participants"
                      >
                        <Users className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSetToDelete(set.id);
                          setDeleteDialogOpen(true);
                        }}
                        className="p-2 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        title="Delete Set"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Joined Sets Section */}
          {joinedSets.length > 0 && (
            <div className="border border-border rounded-xl bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-secondary/20">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <h2 className="text-sm font-semibold">Joined Sets</h2>
                  <Badge variant="secondary" className="font-normal text-xs">
                    {joinedSets.length}
                  </Badge>
                </div>
              </div>
              <div className="divide-y divide-border/50">
                {joinedSets.map((set) => (
                  <div
                    key={set.id}
                    className="flex items-center gap-4 p-4 hover:bg-secondary/20 transition-colors cursor-pointer group"
                    onClick={() => navigate(`/practice/custom/${set.id}`)}
                  >
                    <div className="p-2 bg-secondary/50 border border-border rounded-lg shrink-0">
                      <img
                        src={getFileIconUrl(`file.${set.language === 'csharp' ? 'cs' : set.language === 'cpp' ? 'cpp' : set.language === 'java' ? 'java' : set.language === 'javascript' ? 'js' : set.language === 'typescript' ? 'ts' : set.language === 'python' ? 'py' : 'py'}`)}
                        alt=""
                        className="w-5 h-5"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base truncate group-hover:text-blue-400 transition-colors">
                        {set.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {set.problem_count} {set.problem_count === 1 ? 'problem' : 'problems'} · {set.owner_username ? `By ${set.owner_username}` : 'Shared with you'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-foreground">
                        {set.completed_count}/{set.problem_count}
                      </span>
                      {set.completed_count === set.problem_count && set.problem_count > 0 ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground/30" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center py-6">
          <div className="w-full overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid lg:grid-cols-[1.15fr_1fr]">
              {/* Start here */}
              <div className="border-b border-border p-6 sm:p-10 lg:border-b-0 lg:border-r">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  Start your first custom set
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Bundle the exact problems you want, share one code, and track who solved what — built for study groups and classrooms.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button onClick={() => navigate('/practice/custom/create')} className="rounded-lg">
                    <Plus className="mr-2 h-4 w-4" />
                    Create a set
                  </Button>
                  {hasPublicSets && (
                    <Button
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => document.getElementById('community-sets')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Browse community sets
                    </Button>
                  )}
                </div>

                <form onSubmit={handleJoinByCode} className="mt-8 max-w-sm">
                  <label htmlFor="join-code" className="text-xs font-medium text-muted-foreground">
                    Have a share code?
                  </label>
                  <div className="mt-2 flex gap-2">
                    <Input
                      id="join-code"
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value)}
                      placeholder="A1B2C3D4 or paste a link"
                      className="h-9 bg-secondary/30 font-mono text-sm"
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      className="h-9 shrink-0"
                      disabled={!joinCode.trim() || isJoining}
                    >
                      {isJoining ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Open'}
                    </Button>
                  </div>
                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    The 8-character code is on the set's share page.
                  </p>
                </form>

                <button
                  onClick={() => navigate('/practice')}
                  className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Looking for the core curriculum? Go to Practice
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* How it works */}
              <div className="bg-secondary/10 p-6 sm:p-10">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  How it works
                </h3>
                <ol className="mt-5 space-y-5">
                  {[
                    { icon: ListChecks, title: 'Build the set', description: 'Write custom problems with starter code and test cases in any supported language.' },
                    { icon: Share2, title: 'Share a code', description: 'Send one 8-character code or link. Anyone can join without setup.' },
                    { icon: BarChart3, title: 'Track progress', description: 'See who joined and exactly which problems each person has solved.' },
                  ].map((step, index) => (
                    <li key={step.title} className="flex gap-3.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground">
                        <step.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold tabular-nums text-muted-foreground/60">
                            {index + 1}
                          </span>
                          <p className="text-sm font-medium text-foreground">{step.title}</p>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Community Sets Section */}
      {hasPublicSets && (
        <div id="community-sets" className={`scroll-mt-6 ${ownedSets.length > 0 || joinedSets.length > 0 ? "mt-6" : "mt-2"}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground">Community Sets</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search sets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-40 h-8 text-xs bg-secondary/30 rounded-lg"
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
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="appearance-none bg-secondary/30 border border-input rounded-lg px-2.5 pr-7 h-8 text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {languageFilterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-secondary/30 border border-input rounded-lg px-2.5 pr-7 h-8 text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="border border-border rounded-xl bg-card overflow-hidden divide-y divide-border/50">
            {filteredAndSortedPublicSets.length === 0 ? (
              <div className="px-4 py-8 text-center text-xs text-muted-foreground">
                No sets match your filters.
              </div>
            ) : (
              filteredAndSortedPublicSets.map((set) => (
                <button
                  key={set.id}
                  onClick={() => navigate(`/practice/custom/${set.id}`)}
                  className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-secondary/30 transition-colors text-left cursor-pointer group"
                >
                  <div className="p-2 bg-secondary/50 border border-border rounded-lg shrink-0">
                    <img
                      src={getFileIconUrl(`file.${set.language === 'csharp' ? 'cs' : set.language === 'cpp' ? 'cpp' : set.language === 'java' ? 'java' : set.language === 'javascript' ? 'js' : set.language === 'typescript' ? 'ts' : set.language === 'python' ? 'py' : 'py'}`)}
                      alt=""
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                      {set.title}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {set.problem_count} {set.problem_count === 1 ? 'problem' : 'problems'} · by {set.owner_username || 'Unknown'}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Custom Set?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the custom set
              and all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
};

export default CustomSetsPage;
