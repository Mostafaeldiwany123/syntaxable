import { File, FileJson, FileCode2, FileImage, FileText } from "lucide-react";

// A simple component to render an icon based on file extension
export const FileIcon = ({ filename }: { filename: string }) => {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "cpp":
    case "h":
      return <FileCode2 size={16} className="text-blue-400 shrink-0" />;
    case "c":
      return <FileCode2 size={16} className="text-cyan-400 shrink-0" />;
    case "cs":
      return <FileCode2 size={16} className="text-purple-400 shrink-0" />;
    case "js":
    case "ts":
      return <FileCode2 size={16} className="text-yellow-400 shrink-0" />;
    case "json":
      return <FileJson size={16} className="text-orange-400 shrink-0" />;
    case "md":
      return <FileText size={16} className="text-gray-400 shrink-0" />;
    case "png":
    case "jpg":
    case "jpeg":
    case "svg":
      return <FileImage size={16} className="text-purple-400 shrink-0" />;
    default:
      return <File size={16} className="text-gray-400 shrink-0" />;
  }
};