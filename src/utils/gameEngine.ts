import type {LangCode} from '../config/seo';
import {CANONICAL_ORIGIN} from '../config/seo';

export type RoleType = 'thief' | 'police' | 'citizen';
export type RoundDuration = 60 | 90 | 120;

export interface PlayerAssignment {
  index: number;
  name: string;
  role: RoleType;
  alibiLineIndex: number;
  clueIndex: number;
}

export interface ChallengePayload {
  v: 1;
  caseId: string;
  seed: number;
  players: number;
  duration: RoundDuration;
  challenger: string;
  streak: number;
  points: number;
  lang: LangCode;
}

export interface HistoryEntry {
  caseCode: string;
  caseId: string;
  won: boolean;
  points: number;
  timestamp: string;
}

export interface SavedGameState {
  currentStreak: number;
  bestStreak: number;
  casesSolved: number;
  totalRounds: number;
  totalPoints: number;
  playerNames: string[];
  notes: string;
  history: HistoryEntry[];
}

export const STORAGE_KEY = 'cacoplaycue_state_v1';

export const DEFAULT_PLAYER_NAMES = [
  'Player 1',
  'Player 2',
  'Player 3',
  'Player 4',
  'Player 5',
  'Player 6',
];

export function createDefaultSavedState(): SavedGameState {
  return {
    currentStreak: 0,
    bestStreak: 0,
    casesSolved: 0,
    totalRounds: 0,
    totalPoints: 0,
    playerNames: [...DEFAULT_PLAYER_NAMES],
    notes: '',
    history: [],
  };
}

export function loadSavedState(): SavedGameState {
  if (typeof window === 'undefined') return createDefaultSavedState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultSavedState();
    return validateSavedState(JSON.parse(raw));
  } catch {
    return createDefaultSavedState();
  }
}

export function persistSavedState(state: SavedGameState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

export function validateSavedState(input: unknown): SavedGameState {
  const base = createDefaultSavedState();
  if (!input || typeof input !== 'object') return base;
  const obj = input as Record<string, unknown>;

  const num = (val: unknown, fallback = 0): number =>
    typeof val === 'number' && Number.isFinite(val) && val >= 0 ? Math.floor(val) : fallback;

  const playerNames = Array.isArray(obj.playerNames)
    ? DEFAULT_PLAYER_NAMES.map((def, idx) => {
        const candidate = obj.playerNames && (obj.playerNames as unknown[])[idx];
        return typeof candidate === 'string' && candidate.trim().length > 0
          ? candidate.trim().slice(0, 28)
          : def;
      })
    : base.playerNames;

  const history: HistoryEntry[] = Array.isArray(obj.history)
    ? obj.history
        .filter(
          (item): item is HistoryEntry =>
            !!item &&
            typeof item === 'object' &&
            typeof (item as HistoryEntry).caseCode === 'string' &&
            typeof (item as HistoryEntry).caseId === 'string' &&
            typeof (item as HistoryEntry).won === 'boolean' &&
            typeof (item as HistoryEntry).points === 'number' &&
            typeof (item as HistoryEntry).timestamp === 'string',
        )
        .slice(0, 30)
    : [];

  return {
    currentStreak: num(obj.currentStreak, 0),
    bestStreak: num(obj.bestStreak, 0),
    casesSolved: num(obj.casesSolved, 0),
    totalRounds: num(obj.totalRounds, 0),
    totalPoints: num(obj.totalPoints, 0),
    playerNames,
    notes: typeof obj.notes === 'string' ? obj.notes.slice(0, 4000) : '',
    history,
  };
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateSeed(): number {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return (arr[0] % 899999) + 100000;
  }
  return Math.floor(100000 + Math.random() * 899999);
}

export function assignRolesDeterministically(
  seed: number,
  playerCount: number,
  playerNames: string[],
): PlayerAssignment[] {
  const count = Math.min(6, Math.max(3, playerCount));
  const rng = mulberry32(seed);

  const roles: RoleType[] = ['thief', 'police'];
  while (roles.length < count) {
    roles.push('citizen');
  }

  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = roles[i];
    roles[i] = roles[j];
    roles[j] = tmp;
  }

  let citizenCounter = 0;
  return roles.map((role, index) => {
    const alibiLineIndex = role === 'citizen' ? citizenCounter++ : 0;
    const clueIndex = Math.floor(rng() * 100);
    return {
      index,
      name: playerNames[index] || `Player ${index + 1}`,
      role,
      alibiLineIndex,
      clueIndex,
    };
  });
}

function encodeBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodeBase64Url(token: string): string | null {
  try {
    const normalized = token.replace(/-/g, '+').replace(/_/g, '/');
    const pad = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
    const binary = atob(normalized + pad);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

export function encodeChallengeUrl(payload: ChallengePayload): string {
  const encoded = encodeBase64Url(JSON.stringify(payload));
  const url = new URL(CANONICAL_ORIGIN);
  if (payload.lang !== 'en') {
    url.searchParams.set('lang', payload.lang);
  }
  url.searchParams.set('c', encoded);
  return url.toString();
}

export function decodeChallengeFromUrl(search: string): ChallengePayload | null {
  try {
    const params = new URLSearchParams(search);
    const token = params.get('c');
    if (!token) return null;
    const raw = decodeBase64Url(token);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ChallengePayload>;
    if (
      parsed.v !== 1 ||
      typeof parsed.caseId !== 'string' ||
      typeof parsed.seed !== 'number' ||
      typeof parsed.players !== 'number'
    ) {
      return null;
    }
    const duration: RoundDuration =
      parsed.duration === 60 || parsed.duration === 90 || parsed.duration === 120
        ? parsed.duration
        : 90;

    return {
      v: 1,
      caseId: parsed.caseId,
      seed: Math.floor(parsed.seed),
      players: Math.min(6, Math.max(3, Math.floor(parsed.players))),
      duration,
      challenger:
        typeof parsed.challenger === 'string' && parsed.challenger.trim()
          ? parsed.challenger.trim().slice(0, 28)
          : 'Investigator',
      streak: typeof parsed.streak === 'number' && parsed.streak >= 0 ? Math.floor(parsed.streak) : 0,
      points: typeof parsed.points === 'number' && parsed.points >= 0 ? Math.floor(parsed.points) : 0,
      lang: (parsed.lang as LangCode) || 'en',
    };
  } catch {
    return null;
  }
}

export function calculateRoundPoints(
  difficulty: 'standard' | 'tricky' | 'master',
  secondsRemaining: number,
  newStreak: number,
): number {
  const base = difficulty === 'master' ? 160 : difficulty === 'tricky' ? 130 : 100;
  const speedBonus = Math.min(45, Math.max(0, Math.floor(secondsRemaining / 3)));
  const streakBonus = Math.min(80, Math.max(0, (newStreak - 1) * 15));
  return base + speedBonus + streakBonus;
}

export function formatTimer(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

let sharedAudioCtx: AudioContext | null = null;

export function playGameCue(
  kind: 'reveal' | 'turn' | 'win' | 'miss' | 'alarm',
  enabled: boolean,
): void {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as {webkitAudioContext?: typeof AudioContext}).webkitAudioContext;
    if (!AudioCtx) return;
    if (!sharedAudioCtx) {
      sharedAudioCtx = new AudioCtx();
    }
    const ctx = sharedAudioCtx;
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }

    const now = ctx.currentTime;
    const playTone = (freq: number, start: number, dur: number, vol = 0.06, type: OscillatorType = 'sine') => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(vol, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + dur + 0.02);
    };

    if (kind === 'reveal') {
      playTone(520, now, 0.09, 0.05);
    } else if (kind === 'turn') {
      playTone(620, now, 0.08, 0.04);
    } else if (kind === 'win') {
      playTone(523.25, now, 0.12, 0.06);
      playTone(659.25, now + 0.09, 0.14, 0.06);
      playTone(783.99, now + 0.18, 0.24, 0.07);
    } else if (kind === 'miss') {
      playTone(310, now, 0.16, 0.06, 'triangle');
      playTone(235, now + 0.14, 0.24, 0.06, 'triangle');
    } else if (kind === 'alarm') {
      playTone(740, now, 0.12, 0.06);
      playTone(740, now + 0.18, 0.18, 0.06);
    }
  } catch {
    // Ignore audio errors
  }
}
