import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  { value: 'java', label: 'Java', extension: '.java' },
  { value: 'javascript', label: 'JavaScript', extension: '.js' },
  { value: 'typescript', label: 'TypeScript', extension: '.ts' },
];

export const ProjectTypeSelector = ({ value, onChange }: ProjectTypeSelectorProps) => {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as ProjectType)}>
      <SelectTrigger aria-label="Project type">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {projectTypes.map((type) => (
          <SelectItem key={type.value} value={type.value}>
            <span className="flex items-center gap-2">
              <img
                src={getFileIconUrl(`file${type.extension}`)}
                alt=""
                className="h-4 w-4"
              />
              {type.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
