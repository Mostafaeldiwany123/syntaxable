import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, BookOpen, CheckCircle2, Circle, Trash2, Users, ArrowLeft, Clock, UserCircle } from "lucide-react";
import { useCustomSets, useDeleteCustomSet } from "@/hooks/customSets";
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
  const { data: customSets, isLoading } = useCustomSets();
  const { mutate: deleteSet, isPending: isDeleting } = useDeleteCustomSet();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [setToDelete, setSetToDelete] = useState<string | null>(null);

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
    <div className="p-8 max-w-7xl mx-auto">
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

      {customSets && customSets.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {customSets.map((set) => (
            <Card
              key={set.id}
              className="group relative hover:border-primary/40 transition-all cursor-pointer bg-card border-border/50"
              onClick={() => navigate(`/practice/custom/${set.id}`)}
            >
              <CardContent className="p-6">
                {/* Top Section: Title & Meta */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-secondary/50 border border-border rounded-lg shrink-0">
                      <img
                        src={getFileIconUrl(`file.${set.language === 'csharp' ? 'cs' : set.language === 'cpp' ? 'cpp' : set.language === 'java' ? 'java' : set.language === 'javascript' ? 'js' : set.language === 'typescript' ? 'ts' : 'py'}`)}
                        alt=""
                        className="w-5 h-5"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-lg leading-tight truncate group-hover:text-primary transition-colors">
                        {set.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="text-[11px] uppercase tracking-wider">
                          {formatDistanceToNow(new Date(set.created_at), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="shrink-0 font-normal py-0 px-2 h-6">
                    {languageLabels[set.language]}
                  </Badge>
                </div>

                {/* Middle: Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-6 min-h-[40px] leading-relaxed">
                  {set.description || 'No description provided for this problem set.'}
                </p>

                {/* Bottom Section: Meta Data & Progress */}
                <div className="flex items-end justify-between border-t border-border/40 pt-4 mt-auto">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>{set.problem_count} {set.problem_count === 1 ? 'Problem' : 'Problems'}</span>
                    </div>
                    {!set.is_owner && (
                      <div className="flex items-center gap-2 text-xs text-blue-400">
                        <Users className="h-3.5 w-3.5" />
                        <span>Shared with you</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end gap-1">
                      {!set.is_owner && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground/80">
                            {set.completed_count}/{set.problem_count}
                          </span>
                          {set.completed_count === set.problem_count && set.problem_count > 0 ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground/20" />
                          )}
                        </div>
                      )}
                    </div>

                    {set.is_owner && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/practice/custom/${set.id}/participants`);
                          }}
                          className="p-1.5 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                          title="View Participants"
                        >
                          <UserCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSetToDelete(set.id);
                            setDeleteDialogOpen(true);
                          }}
                          className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors ml-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
  );
};

export default CustomSetsPage;