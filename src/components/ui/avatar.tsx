import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

// 8 distinct dark-but-visible colors — each maps to a letter range
const AVATAR_COLORS = [
  "#2c4a8c", // rich blue       (A B C)
  "#1a5c5c", // dark teal       (D E F)
  "#5c2a7c", // deep purple     (G H I)
  "#3d3d3d", // charcoal        (J K L)
  "#2a5c3a", // forest green    (M N O)
  "#7c3a1a", // burnt orange    (P Q R)
  "#1a3a5c", // midnight blue   (S T U)
  "#4a2a6c", // indigo          (V W X Y Z)
];

function getColorForChar(char: string): string {
  const code = char ? char.toUpperCase().charCodeAt(0) : 85; // default U
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & { seed?: string }
>(({ className, children, seed, style, ...props }, ref) => {
  if (seed) {
    const dicebearUrl = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${encodeURIComponent(seed)}&backgroundColor=transparent`;
    const bgColor = getColorForChar(seed.charAt(0));
    
    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        className={cn("flex h-full w-full items-center justify-center rounded-full overflow-hidden", className)}
        style={{ backgroundColor: bgColor, ...style }}
        {...props}
      >
        <img src={dicebearUrl} alt="Avatar" className="w-full h-full object-cover" />
      </AvatarPrimitive.Fallback>
    );
  }

  // Otherwise, fallback to the colored letter (useful for generic fallbacks)
  const firstChar =
    typeof children === "string"
      ? children.charAt(0)
      : React.Children.toArray(children)
          .map((c) => (typeof c === "string" ? c.charAt(0) : ""))
          .join("").charAt(0);

  const bgColor = getColorForChar(firstChar);

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full font-bold text-sm uppercase text-white select-none",
        className,
      )}
      style={{ backgroundColor: bgColor, ...style }}
      {...props}
    >
      {children}
    </AvatarPrimitive.Fallback>
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
