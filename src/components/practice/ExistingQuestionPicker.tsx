import { useMemo, useState } from 'react';
import { Check, Library, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getTrackCourse, getTracksForLanguage, type TrackId } from '@/data/practice/tracks';
import type { Problem } from '@/data/practice/types';

export interface ExistingQuestion {
  id: string;
  problem: Problem;
  setTitle: string;
  setDescription: string;
  trackIds: TrackId[];
  trackLabels: string[];
}

export function getExistingQuestions(language: string): ExistingQuestion[] {
  const questions = new Map<string, ExistingQuestion>();

  for (const track of getTracksForLanguage(language)) {
    const course = getTrackCourse(track.id, language);
    if (!course) continue;

    for (const lesson of course.lessons) {
      for (const problem of lesson.problems) {
        const existing = questions.get(problem.id);
        if (existing) {
          if (!existing.trackIds.includes(track.id)) {
            existing.trackIds.push(track.id);
            existing.trackLabels.push(track.shortTitle);
          }
          continue;
        }
        questions.set(problem.id, {
          id: problem.id,
          problem,
          setTitle: lesson.title,
          setDescription: lesson.description,
          trackIds: [track.id],
          trackLabels: [track.shortTitle],
        });
      }
    }
  }

  return Array.from(questions.values());
}

const difficultyStyles = {
  easy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  hard: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
};

interface ExistingQuestionPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: string;
  languageLabel: string;
  addedProblemIds: string[];
  problemCount: number;
  maxProblems: number;
  onAdd: (question: ExistingQuestion) => void;
}

export function ExistingQuestionPicker({
  open,
  onOpenChange,
  language,
  languageLabel,
  addedProblemIds,
  problemCount,
  maxProblems,
  onAdd,
}: ExistingQuestionPickerProps) {
  const [query, setQuery] = useState('');
  const [activeTrack, setActiveTrack] = useState<TrackId | 'all'>('all');

  const tracks = useMemo(() => getTracksForLanguage(language), [language]);
  const questions = useMemo(() => getExistingQuestions(language), [language]);

  const filteredQuestions = useMemo(() => {
    let list = activeTrack === 'all'
      ? questions
      : questions.filter((question) => question.trackIds.includes(activeTrack));

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (question) =>
          question.problem.title.toLowerCase().includes(q) ||
          question.setTitle.toLowerCase().includes(q) ||
          question.trackLabels.some((label) => label.toLowerCase().includes(q))
      );
    }

    return list;
  }, [questions, activeTrack, query]);

  const atLimit = problemCount >= maxProblems;

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setQuery('');
      setActiveTrack('all');
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-4xl gap-0 overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="border-b bg-card px-6 py-5 pr-14">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-secondary/40">
              <Library className="h-4 w-4 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">Add from existing sets</DialogTitle>
              <DialogDescription className="mt-0.5 text-sm text-muted-foreground">
                Pick individual questions from the {languageLabel} practice sets.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex items-center gap-3 border-b px-6 py-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions or sets..."
              className="h-9 bg-secondary/30 pl-9"
            />
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">
            {filteredQuestions.length} {filteredQuestions.length === 1 ? 'question' : 'questions'}
          </span>
        </div>

        {tracks.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5 border-b px-6 py-2.5">
            <button
              type="button"
              onClick={() => setActiveTrack('all')}
              className={`rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                activeTrack === 'all'
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-border/60 text-muted-foreground hover:text-foreground'
              }`}
            >
              All tracks
            </button>
            {tracks.map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => setActiveTrack(track.id)}
                className={`rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  activeTrack === track.id
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border/60 text-muted-foreground hover:text-foreground'
                }`}
              >
                {track.shortTitle}
              </button>
            ))}
          </div>
        )}

        <div className="max-h-[55vh] overflow-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="sticky top-0 z-10 border-b bg-card">
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-2.5 font-medium">Question</th>
                <th className="px-3 py-2.5 font-medium">Set</th>
                <th className="px-3 py-2.5 font-medium">Track</th>
                <th className="px-3 py-2.5 font-medium">Difficulty</th>
                <th className="px-6 py-2.5 text-right font-medium">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredQuestions.map((question) => {
                const isAdded = addedProblemIds.includes(question.id);
                const disabled = isAdded || atLimit;

                return (
                  <tr
                    key={question.id}
                    onClick={() => {
                      if (!disabled) onAdd(question);
                    }}
                    className={
                      disabled
                        ? 'opacity-55'
                        : 'cursor-pointer transition-colors hover:bg-secondary/40'
                    }
                  >
                    <td className="px-6 py-3">
                      <div className="font-medium text-foreground">{question.problem.title}</div>
                      <div className="mt-0.5 line-clamp-1 max-w-[420px] text-xs text-muted-foreground">
                        {question.problem.description}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">{question.setTitle}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1">
                        {question.trackLabels.map((label) => (
                          <Badge
                            key={label}
                            variant="secondary"
                            className="whitespace-nowrap text-[10px] font-normal"
                          >
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <Badge
                        variant="outline"
                        className={`text-[10px] capitalize font-medium px-2 py-0.5 rounded ${difficultyStyles[question.problem.difficulty]}`}
                      >
                        {question.problem.difficulty}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-right">
                      {isAdded ? (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap text-[11px] font-medium text-emerald-500">
                          <Check className="h-3.5 w-3.5" />
                          Added
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8"
                          disabled={atLimit}
                          onClick={(e) => {
                            e.stopPropagation();
                            onAdd(question);
                          }}
                        >
                          Add
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredQuestions.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-muted-foreground">
              No {languageLabel} questions match "{query.trim()}".
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t bg-card px-6 py-3 text-xs text-muted-foreground">
          <span>Questions are copied into the editor so you can adjust them.</span>
          <span className={atLimit ? 'font-medium text-amber-500' : undefined}>
            {problemCount}/{maxProblems} slots used
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
