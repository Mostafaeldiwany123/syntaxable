import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, BookOpen, CheckCircle2, Circle, Trash2, Users, ArrowLeft, UserCircle } from "lucide-react";
import { useCustomSets, useDeleteCustomSet, useRecentPracticeRooms } from "@/hooks/customSets";
import { getFileIconUrl } from "@/lib/project-utils";
import { formatDistanceToNow } from "date-fns";
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

const CustomSetsPage = () => {
  const navigate = useNavigate();
  const { data: customSets, isLoading: isLoadingOwned } = useCustomSets();
  const { data: recentRooms, isLoading: isLoadingRecent } = useRecentPracticeRooms(50);
  const { mutate: deleteSet, isPending: isDeleting } = useDeleteCustomSet();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [setToDelete, setSetToDelete] = useState<string | null>(null);

  const isLoading = isLoadingOwned || isLoadingRecent;
  const joinedSets = recentRooms || [];
  const ownedSets = customSets?.filter(s => s.is_owner) || [];


  const handleDelete = () => {
    if (setToDelete) {
      deleteSet(setToDelete);
      setDeleteDialogOpen(false);
      setSetToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
        <Button variant="ghost" size="sm" asChild className="mb-6 hover:bg-secondary/50">
          <Link to="/practice">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Practice
          </Link>
        </Button>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Custom Sets</h1>
            <p className="text-muted-foreground mt-2 text-base">
              Create, manage, and share your personalized practice collections.
            </p>
          </div>
          <Button onClick={() => navigate('/practice/custom/create')} variant="default" className="rounded-full px-6">
            <Plus className="mr-2 h-4 w-4" />
            Create New Set
          </Button>
        </div>

      {(ownedSets.length > 0 || joinedSets.length > 0) ? (
        <div className="space-y-8">
          {/* Created Sets Section */}
          {ownedSets.length > 0 && (
            <div className="border border-border rounded-xl bg-card overflow-hidden">
              <div className="p-5 border-b border-border bg-secondary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">My Sets</h2>
                    <Badge variant="secondary" className="font-normal text-xs">
                      {ownedSets.length}
                    </Badge>
                  </div>
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
              <div className="p-5 border-b border-border bg-secondary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <h2 className="text-lg font-semibold">Joined Sets</h2>
                    <Badge variant="secondary" className="font-normal text-xs">
                      {joinedSets.length}
                    </Badge>
                  </div>
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
        <div className="text-center py-20 border-2 border-dashed rounded-2xl bg-secondary/10 border-border/50">
          <div className="mx-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-muted-foreground/40" />
          </div>
          <h3 className="text-xl font-medium mb-1">No custom sets yet</h3>
          <p className="text-muted-foreground mb-6 max-w-xs mx-auto text-sm">
            You haven't created or joined any custom practice sets. Start by creating one!
          </p>
          <Button onClick={() => navigate('/practice/custom/create')} variant="outline" className="rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Set
          </Button>
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