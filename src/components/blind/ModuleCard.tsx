import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type Props = {
  to?: "/intervalos" | "/sound-check";
  icon: LucideIcon;
  title: string;
  description: string;
  soon?: boolean;
};

export function ModuleCard({ to, icon: Icon, title, description, soon }: Props) {
  const body = (
    <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors group-hover:border-primary">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <span className="flex items-center gap-1 text-sm font-semibold text-primary">
        {soon ? <span className="text-muted-foreground">Em breve</span> : <>Começar <ArrowRight className="h-4 w-4" /></>}
      </span>
    </div>
  );
  if (!to || soon) return <div className="opacity-60">{body}</div>;
  return <Link to={to} className="group block">{body}</Link>;
}
