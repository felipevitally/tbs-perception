import { Link } from "@tanstack/react-router";
import { Ear, Flame, Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { DAILY_GOAL_SECONDS, usePractice } from "@/hooks/use-practice";

const NAV = [
  { to: "/", label: "Dashboard" },
  { to: "/intervalos", label: "Treino de Intervalos" },
  { to: "/sound-check", label: "Sound Check" },
] as const;

export function AppHeader() {
  const { streak, seconds } = usePractice();
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const pct = Math.min(100, (seconds / DAILY_GOAL_SECONDS) * 100);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <Ear className="h-6 w-6 text-primary" /> The Blind Sound
        </Link>
        <nav className="flex flex-1 flex-wrap gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "bg-accent text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold" aria-label="Streak">
            <Flame className="h-4 w-4 text-primary" /> {streak}
          </div>
          <div className="flex min-w-36 flex-col gap-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Timer className="h-3 w-3" /> Sessão atual</span>
              <span className="tabular-nums text-foreground">{mm}:{ss} / 05:00</span>
            </div>
            <Progress value={pct} className="h-1.5" />
          </div>
        </div>
      </div>
    </header>
  );
}
