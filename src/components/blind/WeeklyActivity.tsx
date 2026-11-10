const DATA = [
  { d: "Seg", m: 6 }, { d: "Ter", m: 12 }, { d: "Qua", m: 4 }, { d: "Qui", m: 9 },
  { d: "Sex", m: 15 }, { d: "Sáb", m: 7 }, { d: "Dom", m: 3 },
];

/** Static illustrative chart (layout only). */
export function WeeklyActivity() {
  const max = Math.max(...DATA.map((x) => x.m));
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6 flex items-baseline justify-between">
        <h3 className="font-display text-lg font-semibold">Atividade da Semana</h3>
        <span className="text-sm text-muted-foreground">minutos de prática</span>
      </div>
      <div className="flex h-44 items-end gap-3">
        {DATA.map((x) => (
          <div key={x.d} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-xs tabular-nums text-muted-foreground">{x.m}</span>
            <div className="w-full rounded-t-md bg-primary/80" style={{ height: `${(x.m / max) * 100}%` }} />
            <span className="text-xs font-medium">{x.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
