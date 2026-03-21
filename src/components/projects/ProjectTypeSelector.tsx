import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ProjectType } from "@/hooks/projects";
import { getFileIconUrl } from "@/lib/project-utils";

interface ProjectTypeSelectorProps {
  value: ProjectType;
  onChange: (value: ProjectType) => void;
}

const projectTypes: { value: ProjectType; label: string; extension: string }[] = [
  { value: 'cpp', label: 'C++', extension: '.cpp' },
  { value: 'c', label: 'C', extension: '.c' },
  { value: 'csharp', label: 'C#', extension: '.cs' },
  { value: 'html', label: 'HTML', extension: '.html' },
  { value: 'react', label: 'React', extension: '.tsx' },
  { value: 'python', label: 'Python', extension: '.py' },
];

export const ProjectTypeSelector = ({ value, onChange }: ProjectTypeSelectorProps) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={(val) => onChange(val as ProjectType)}
      className="grid grid-cols-6 gap-2"
    >
      {projectTypes.map((type) => (
        <div key={type.value}>
          <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
          <Label
            htmlFor={type.value}
            className="flex flex-col items-center justify-between border border-border bg-card p-2 transition-colors hover:bg-secondary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 rounded-lg cursor-pointer h-full"
          >
            <img
              src={getFileIconUrl(`file${type.extension}`)}
              alt=""
              className="w-6 h-6 mb-1"
            />
            <span className="text-xs font-medium">{type.label}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};