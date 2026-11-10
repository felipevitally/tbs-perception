export type Interval = { id: string; name: string; short: string; semitones: number };

export const INTERVALS: Interval[] = [
  { id: "m2", name: "2ª Menor", short: "m2", semitones: 1 },
  { id: "M2", name: "2ª Maior", short: "M2", semitones: 2 },
  { id: "m3", name: "3ª Menor", short: "m3", semitones: 3 },
  { id: "M3", name: "3ª Maior", short: "M3", semitones: 4 },
  { id: "P4", name: "4ª Justa", short: "P4", semitones: 5 },
  { id: "TT", name: "Trítono", short: "TT", semitones: 6 },
  { id: "P5", name: "5ª Justa", short: "P5", semitones: 7 },
  { id: "m6", name: "6ª Menor", short: "m6", semitones: 8 },
  { id: "M6", name: "6ª Maior", short: "M6", semitones: 9 },
  { id: "m7", name: "7ª Menor", short: "m7", semitones: 10 },
  { id: "M7", name: "7ª Maior", short: "M7", semitones: 11 },
  { id: "P8", name: "8ª Justa", short: "P8", semitones: 12 },
];

/** Frequency of a MIDI note (A4 = 69 = 440Hz). */
export const midiToFreq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

const NOTE_NAMES = ["Dó", "Dó#", "Ré", "Ré#", "Mi", "Fá", "Fá#", "Sol", "Sol#", "Lá", "Lá#", "Si"];
export const midiToName = (midi: number) => `${NOTE_NAMES[midi % 12]}${Math.floor(midi / 12) - 1}`;

/** Random base note between C4 (60) and G4 (67). */
export const randomBaseNote = () => 60 + Math.floor(Math.random() * 8);
