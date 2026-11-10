import { useState } from "react";
import { Headphones, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { INTERVALS, randomBaseNote, type Interval } from "@/lib/audio/intervals";
import { useAudioEngine, type PlayMode } from "@/lib/audio/useAudioEngine";
import { usePractice } from "@/hooks/use-practice";

type Question = { base: number; interval: Interval };

export function IntervalTrainer() {
  const { playInterval } = useAudioEngine();
  const { registerAnswer, best } = usePractice();
  const [mode, setMode] = useState<PlayMode>("melodic");
  const [q, setQ] = useState<Question | null>(null);
  const [picked, setPicked] = useState<string | null>(null);

  const listen = () => {
    let current = q;
    if (!current || picked) {
      current = { base: randomBaseNote(), interval: INTERVALS[Math.floor(Math.random() * INTERVALS.length)]! };
      setQ(current);
      setPicked(null);
    }
    playInterval(current.base, current.interval.semitones, mode);
  };

  const answer = (iv: Interval) => {
    if (!q || picked) return;
    setPicked(iv.id);
    const ok = iv.id === q.interval.id;
    registerAnswer(ok);
    if (!ok) setTimeout(() => playInterval(q.base, q.interval.semitones, mode), 300);
  };

  const label = !q ? "Ouvir Intervalo" : picked ? "Próximo Intervalo" : "Ouvir Novamente";

  return (
    <div className="flex flex-col items-center gap-10">
      <ToggleGroup type="single" value={mode} onValueChange={(v) => v && setMode(v as PlayMode)} variant="outline">
        <ToggleGroupItem value="melodic" className="px-4">Melódico</ToggleGroupItem>
        <ToggleGroupItem value="harmonic" className="px-4">Harmônico</ToggleGroupItem>
      </ToggleGroup>

      <button
        onClick={listen}
        className="group flex h-48 w-48 flex-col items-center justify-center gap-3 rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
      >
        {picked ? <RotateCcw className="h-14 w-14" /> : <Headphones className="h-14 w-14" />}
        <span className="font-display text-base font-bold">{label}</span>
      </button>

      <div className="min-h-6 text-center text-sm">
        {picked && q && (
          picked === q.interval.id
            ? <span className="font-semibold text-success">Correto! Era {q.interval.name}.</span>
            : <span className="font-semibold text-destructive">Ops! A resposta era {q.interval.name} — ouça novamente.</span>
        )}
        {!picked && <span className="text-muted-foreground">Melhor sequência: {best}</span>}
      </div>

      <div className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {INTERVALS.map((iv) => {
          const isCorrect = picked && q?.interval.id === iv.id;
          const isWrong = picked === iv.id && q?.interval.id !== iv.id;
          return (
            <Button
              key={iv.id}
              variant="outline"
              disabled={!q}
              onClick={() => answer(iv)}
              className={cn(
                "h-16 flex-col gap-0 text-base font-semibold",
                isCorrect && "border-success bg-success text-success-foreground hover:bg-success",
                isWrong && "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive",
              )}
            >
              {iv.name}
              <span className="text-xs font-normal opacity-70">{iv.short}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
