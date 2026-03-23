import React from "react";

interface IconProps {
  className?: string;
  isUnlocked?: boolean;
}

// Custom SVG for Streak Achievement (Fire/Flame)
export const StreakIcon = ({ className, isUnlocked = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C10.5 4.5 9 6.5 9 9C9 11.5 10.5 13 12 13C13.5 13 15 11.5 15 9C15 6.5 13.5 4.5 12 2Z"
      className={isUnlocked ? "fill-orange-500" : "fill-muted-foreground/30"}
    />
    <path
      d="M12 13C9.5 13 7 15 7 18C7 20 8.5 22 12 22C15.5 22 17 20 17 18C17 15 14.5 13 12 13Z"
      className={isUnlocked ? "fill-orange-400" : "fill-muted-foreground/20"}
    />
    <path
      d="M12 15C10.5 15 9.5 16 9.5 17.5C9.5 19 10.5 20 12 20C13.5 20 14.5 19 14.5 17.5C14.5 16 13.5 15 12 15Z"
      className={isUnlocked ? "fill-yellow-300" : "fill-muted-foreground/10"}
    />
  </svg>
);

// Custom SVG for Problem Solver (Target/Bullseye)
export const ProblemSolverIcon = ({ className, isUnlocked = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      className={isUnlocked ? "stroke-green-500" : "stroke-muted-foreground/30"}
      strokeWidth="2"
    />
    <circle
      cx="12"
      cy="12"
      r="6"
      className={isUnlocked ? "stroke-green-400" : "stroke-muted-foreground/20"}
      strokeWidth="2"
    />
    <circle
      cx="12"
      cy="12"
      r="2"
      className={isUnlocked ? "fill-green-500" : "fill-muted-foreground/30"}
    />
    <path
      d="M12 2V6M12 18V22M2 12H6M18 12H22"
      className={isUnlocked ? "stroke-green-500/50" : "stroke-muted-foreground/20"}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Custom SVG for Pioneer (Rocket)
export const PioneerIcon = ({ className, isUnlocked = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L8 8L12 12L16 8L12 2Z"
      className={isUnlocked ? "fill-blue-500" : "fill-muted-foreground/30"}
    />
    <path
      d="M8 8L4 12L8 16L12 12L8 8Z"
      className={isUnlocked ? "fill-blue-400" : "fill-muted-foreground/20"}
    />
    <path
      d="M16 8L20 12L16 16L12 12L16 8Z"
      className={isUnlocked ? "fill-blue-400" : "fill-muted-foreground/20"}
    />
    <path
      d="M12 12L8 16L12 22L16 16L12 12Z"
      className={isUnlocked ? "fill-blue-300" : "fill-muted-foreground/10"}
    />
    <circle
      cx="12"
      cy="9"
      r="1.5"
      className={isUnlocked ? "fill-white" : "fill-muted-foreground/20"}
    />
  </svg>
);

// Custom SVG for Code Master (Code brackets with star)
export const CodeMasterIcon = ({ className, isUnlocked = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 4L3 12L8 20"
      className={isUnlocked ? "stroke-purple-500" : "stroke-muted-foreground/30"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 4L21 12L16 20"
      className={isUnlocked ? "stroke-purple-500" : "stroke-muted-foreground/30"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6L13.5 10H17L14 12.5L15.5 17L12 14L8.5 17L10 12.5L7 10H10.5L12 6Z"
      className={isUnlocked ? "fill-purple-400" : "fill-muted-foreground/20"}
    />
  </svg>
);

// Custom SVG for Champion (Trophy/Cup)
export const ChampionIcon = ({ className, isUnlocked = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 21H16M12 17V21"
      className={isUnlocked ? "stroke-yellow-600" : "stroke-muted-foreground/30"}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M7 4H17C17 4 17 11 14 14H10C7 11 7 4 7 4Z"
      className={isUnlocked ? "fill-yellow-500 stroke-yellow-600" : "fill-muted-foreground/20 stroke-muted-foreground/30"}
      strokeWidth="2"
    />
    <path
      d="M7 4H5C3.5 4 3 5 3 6C3 8 5 10 7 10"
      className={isUnlocked ? "stroke-yellow-500" : "stroke-muted-foreground/30"}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M17 4H19C20.5 4 21 5 21 6C21 8 19 10 17 10"
      className={isUnlocked ? "stroke-yellow-500" : "stroke-muted-foreground/30"}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M10 8L12 6L14 8L12 10L10 8Z"
      className={isUnlocked ? "fill-yellow-300" : "fill-muted-foreground/10"}
    />
  </svg>
);

// Custom SVG for Social Butterfly (Friends/People connected)
export const SocialButterflyIcon = ({ className, isUnlocked = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="8"
      cy="8"
      r="3"
      className={isUnlocked ? "fill-pink-500" : "fill-muted-foreground/30"}
    />
    <circle
      cx="16"
      cy="8"
      r="3"
      className={isUnlocked ? "fill-pink-400" : "fill-muted-foreground/20"}
    />
    <circle
      cx="12"
      cy="16"
      r="3"
      className={isUnlocked ? "fill-pink-300" : "fill-muted-foreground/20"}
    />
    <path
      d="M8 11V13C8 14 9 15 12 15C15 15 16 14 16 13V11"
      className={isUnlocked ? "stroke-pink-400" : "stroke-muted-foreground/30"}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10.5 8H13.5"
      className={isUnlocked ? "stroke-pink-300" : "stroke-muted-foreground/20"}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle
      cx="12"
      cy="16"
      r="1"
      className={isUnlocked ? "fill-white" : "fill-muted-foreground/10"}
    />
  </svg>
);

// Custom SVG for First Commit (Git branch with checkmark)
export const FirstCommitIcon = ({ className, isUnlocked = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="6"
      cy="6"
      r="3"
      className={isUnlocked ? "fill-emerald-500" : "fill-muted-foreground/30"}
    />
    <circle
      cx="6"
      cy="18"
      r="3"
      className={isUnlocked ? "fill-emerald-400" : "fill-muted-foreground/20"}
    />
    <path
      d="M6 9V15"
      className={isUnlocked ? "stroke-emerald-500" : "stroke-muted-foreground/30"}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M9 6H14C16 6 18 8 18 10V12"
      className={isUnlocked ? "stroke-emerald-400" : "stroke-muted-foreground/30"}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle
      cx="18"
      cy="15"
      r="3"
      className={isUnlocked ? "fill-emerald-500" : "fill-muted-foreground/20"}
    />
    <path
      d="M16.5 15L17.5 16L19.5 14"
      className={isUnlocked ? "stroke-white" : "stroke-muted-foreground/20"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Custom SVG for True Identity (Mask revealing face - fun achievement)
export const TrueIdentityIcon = ({ className, isUnlocked = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      className={isUnlocked ? "fill-teal-500 stroke-teal-600" : "fill-muted-foreground/30 stroke-muted-foreground/30"}
      strokeWidth="1.5"
    />
    <path
      d="M8 10C8 10 9 9 12 9C15 9 16 10 16 10"
      className={isUnlocked ? "stroke-teal-200" : "stroke-muted-foreground/20"}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle
      cx="9"
      cy="13"
      r="1.5"
      className={isUnlocked ? "fill-teal-200" : "fill-muted-foreground/20"}
    />
    <circle
      cx="15"
      cy="13"
      r="1.5"
      className={isUnlocked ? "fill-teal-200" : "fill-muted-foreground/20"}
    />
    <path
      d="M10 16C10 16 11 17 12 17C13 17 14 16 14 16"
      className={isUnlocked ? "stroke-teal-200" : "stroke-muted-foreground/20"}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M15 7L17 5M17 7L15 5"
      className={isUnlocked ? "stroke-teal-300" : "stroke-muted-foreground/20"}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Custom SVG for First Problem (Lightbulb/Eureka moment)
export const FirstProblemIcon = ({ className, isUnlocked = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C8.5 2 6 4.5 6 8C6 11 8 13 9 14V16H15V14C16 13 18 11 18 8C18 4.5 15.5 2 12 2Z"
      className={isUnlocked ? "fill-amber-400" : "fill-muted-foreground/30"}
    />
    <path
      d="M9 18H15"
      className={isUnlocked ? "stroke-amber-500" : "stroke-muted-foreground/30"}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M10 20H14"
      className={isUnlocked ? "stroke-amber-500" : "stroke-muted-foreground/30"}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 6V9M10 7.5H14"
      className={isUnlocked ? "stroke-white" : "stroke-muted-foreground/20"}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M9 16V14M15 14V16"
      className={isUnlocked ? "stroke-amber-600" : "stroke-muted-foreground/20"}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Custom SVG for Custom Creator (Puzzle piece for custom sets)
export const CustomCreatorIcon = ({ className, isUnlocked = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 4H10V8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8V4H20V10H16C14.9 10 14 10.9 14 12C14 13.1 14.9 14 16 14H20V20H14V16C14 14.9 13.1 14 12 14C10.9 14 10 14.9 10 16V20H4V14H8C9.1 14 10 13.1 10 12C10 10.9 9.1 10 8 10H4V4Z"
      className={isUnlocked ? "fill-violet-500" : "fill-muted-foreground/30"}
    />
    <circle
      cx="12"
      cy="12"
      r="2"
      className={isUnlocked ? "fill-violet-300" : "fill-muted-foreground/10"}
    />
    <path
      d="M12 10V8M12 14V16M10 12H8M14 12H16"
      className={isUnlocked ? "stroke-violet-400" : "stroke-muted-foreground/20"}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Achievement definitions
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string; isUnlocked?: boolean }>;
  requirement: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'streak-5',
    name: 'On Fire',
    description: 'Maintain a 5-day coding streak',
    icon: StreakIcon,
    requirement: '5 day streak',
  },
  {
    id: 'problems-50',
    name: 'Problem Solver',
    description: 'Solve 50 practice problems in total',
    icon: ProblemSolverIcon,
    requirement: '50 problems solved',
  },
  {
    id: 'first-project',
    name: 'Pioneer',
    description: 'Create your first project on the platform',
    icon: PioneerIcon,
    requirement: 'Create 1 project',
  },
  {
    id: 'commits-100',
    name: 'Code Master',
    description: 'Make 100 commits across all projects',
    icon: CodeMasterIcon,
    requirement: '100 commits',
  },
  {
    id: 'streak-30',
    name: 'Champion',
    description: 'Maintain a 30-day coding streak',
    icon: ChampionIcon,
    requirement: '30 day streak',
  },
  {
    id: 'friends-5',
    name: 'Social Butterfly',
    description: 'Make 5 friends on Syntaxable',
    icon: SocialButterflyIcon,
    requirement: '5 friends',
  },
  {
    id: 'first-commit',
    name: 'First Commit',
    description: 'Mark your start by making your first commit',
    icon: FirstCommitIcon,
    requirement: '1 commit',
  },
  {
    id: 'true-identity',
    name: 'True Identity',
    description: 'Customize your profile with a unique status and bio',
    icon: TrueIdentityIcon,
    requirement: 'Custom status & bio',
  },
  {
    id: 'first-problem',
    name: 'Eureka',
    description: 'Solve your first practice problem',
    icon: FirstProblemIcon,
    requirement: '1 problem solved',
  },
  {
    id: 'custom-set',
    name: 'Custom Creator',
    description: 'Create your first custom practice set',
    icon: CustomCreatorIcon,
    requirement: 'Create 1 set',
  },
];

export const getAchievementById = (id: string): Achievement | undefined => {
  return ACHIEVEMENTS.find(a => a.id === id);
};