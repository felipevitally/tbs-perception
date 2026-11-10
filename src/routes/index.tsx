import { createFileRoute } from "@tanstack/react-router";
import { AudioLines, Drum, Library, Music } from "lucide-react";
import { ModuleCard } from "@/components/blind/ModuleCard";
import { WeeklyActivity } from "@/components/blind/WeeklyActivity";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Blind Sound — Musical Perception" },
      { name: "description", content: "Hub de treino auditivo: intervalos, biblioteca de sons e mais." },
      { property: "og:title", content: "The Blind Sound — Musical Perception" },
      { property: "og:description", content: "Hub de treino auditivo: intervalos, biblioteca de sons e mais." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="space-y-10">
      <section>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Bem-vindo de volta</p>
        <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
          The Blind Sound <span className="text-muted-foreground">— Musical Perception</span>
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Feche os olhos, abra os ouvidos. Pratique alguns minutos por dia e mantenha sua sequência de acertos.
        </p>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ModuleCard to="/intervalos" icon={AudioLines} title="Treino de Intervalos" description="Identifique intervalos melódicos e harmônicos." />
        <ModuleCard to="/sound-check" icon={Library} title="Sound Check" description="Biblioteca para ouvir cada intervalo como referência." />
        <ModuleCard icon={Drum} title="Ditado Rítmico" description="Transcreva padrões rítmicos." soon />
        <ModuleCard icon={Music} title="Progressões" description="Reconheça progressões de acordes." soon />
      </section>
      <WeeklyActivity />
    </div>
  );
}
