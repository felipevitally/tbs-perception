import { useCallback, useEffect, useRef } from "react";
import { midiToFreq } from "./intervals";

export type PlayMode = "melodic" | "harmonic";

/**
 * Synth engine built on the native Web Audio API (oscillators).
 * Swap the body of `playNote` for samples (e.g. Tone.js) later without touching the UI.
 */
export function useAudioEngine() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  useEffect(() => () => void ctxRef.current?.close(), []);

  const playNote = useCallback(
    (midi: number, start = 0, duration = 0.9) => {
      const ctx = getCtx();
      const t = ctx.currentTime + start;
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
      // Two oscillators for a warmer, piano-like tone
      (["triangle", "sine"] as OscillatorType[]).forEach((type, i) => {
        const osc = ctx.createOscillator();
        osc.type = type;
        osc.frequency.value = midiToFreq(midi) * (i + 1);
        const g = ctx.createGain();
        g.gain.value = i === 0 ? 1 : 0.25;
        osc.connect(g).connect(gain);
        osc.start(t);
        osc.stop(t + duration + 0.05);
      });
    },
    [getCtx],
  );

  const playInterval = useCallback(
    (base: number, semitones: number, mode: PlayMode = "melodic") => {
      if (mode === "harmonic") {
        playNote(base, 0, 1.4);
        playNote(base + semitones, 0, 1.4);
      } else {
        playNote(base, 0);
        playNote(base + semitones, 0.75);
      }
    },
    [playNote],
  );

  return { playNote, playInterval };
}
