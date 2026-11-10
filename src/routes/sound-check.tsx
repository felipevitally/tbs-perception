import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { INTERVALS } from "@/lib/audio/intervals";
import { useAudioEngine } from "@/lib/audio/useAudioEngine";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sound-check")({
  head: () => ({
    meta: [
      { title: "Sound Check — The Blind Sound" },
      { name: "description", content: "Biblioteca de referência: ouça cada intervalo musical." },
      { property: "og:title", content: "Sound Check — The Blind Sound" },
      { property: "og:description", content: "Biblioteca de referência: ouça cada intervalo musical." },
    ],
  }),
  component: SoundCheck,
});

const BASE = 60; // Dó4

function SoundCheck() {
  const { playInterval } = useAudioEngine();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Sound Check</h1>
        <p className="mt-2 text-muted-foreground">Ouça cada intervalo a partir de Dó4 para criar sua referência auditiva.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {INTERVALS.map((iv) => (
          <div key={iv.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div>
              <p className="font-display font-semibold">{iv.name}</p>
              <p className="text-xs text-muted-foreground">{iv.semitones} semitons</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => playInterval(BASE, iv.semitones, "melodic")}>
                <Play className="h-4 w-4" /> Mel.
              </Button>
              <Button size="sm" variant="secondary" onClick={() => playInterval(BASE, iv.semitones, "harmonic")}>
                <Play className="h-4 w-4" /> Harm.
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
