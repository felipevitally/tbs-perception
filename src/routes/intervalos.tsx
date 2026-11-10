import { createFileRoute } from "@tanstack/react-router";
import { IntervalTrainer } from "@/components/blind/IntervalTrainer";

export const Route = createFileRoute("/intervalos")({
  head: () => ({
    meta: [
      { title: "Treino de Intervalos — The Blind Sound" },
      { name: "description", content: "Ouça e identifique intervalos musicais com feedback imediato." },
      { property: "og:title", content: "Treino de Intervalos — The Blind Sound" },
      { property: "og:description", content: "Ouça e identifique intervalos musicais com feedback imediato." },
    ],
  }),
  component: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold">Treino de Intervalos</h1>
        <p className="mt-2 text-muted-foreground">Ouça as duas notas e escolha o intervalo correto.</p>
      </div>
      <IntervalTrainer />
    </div>
  ),
});
