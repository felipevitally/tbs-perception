// Exemplo de lógica para injetar no seu useAudioEngine.ts
const gainNode = audioCtx.createGain();
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

// Attack rápido e Fade out suave (Release)
gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.05); // Attack
gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5); // Release
