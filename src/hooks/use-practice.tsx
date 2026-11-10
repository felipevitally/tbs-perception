import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export const DAILY_GOAL_SECONDS = 5 * 60;

type Practice = {
  streak: number;
  best: number;
  seconds: number;
  registerAnswer: (correct: boolean) => void;
};

const Ctx = createContext<Practice | null>(null);

export function PracticeProvider({ children }: { children: ReactNode }) {
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const registerAnswer = useCallback((correct: boolean) => {
    setStreak((s) => {
      const next = correct ? s + 1 : 0;
      setBest((b) => Math.max(b, next));
      return next;
    });
  }, []);

  return <Ctx.Provider value={{ streak, best, seconds, registerAnswer }}>{children}</Ctx.Provider>;
}

export function usePractice() {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePractice must be used inside PracticeProvider");
  return v;
}
