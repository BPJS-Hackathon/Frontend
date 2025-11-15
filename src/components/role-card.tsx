"use client";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

export function RoleCard({ title, description, icon, selected, onClick }: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-300",
        selected
          ? "border-primary bg-primary/5 shadow-lg"
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      {selected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
}