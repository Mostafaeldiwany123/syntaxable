import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RemoteCursorProps {
  top: number;
  left: number;
  name: string;
  avatarUrl: string;
}

export const RemoteCursor = React.memo(
  ({ top, left, name, avatarUrl }: RemoteCursorProps) => {
    return (
      <div
        className="absolute z-50 pointer-events-none"
        style={{
          top: `${top - 28}px`, // Position avatar directly above the text line
          left: `${left}px`,
        }}
      >
        <Avatar className="w-6 h-6 border-2 border-primary">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="text-xs">
            {name ? name.charAt(0).toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
      </div>
    );
  },
);