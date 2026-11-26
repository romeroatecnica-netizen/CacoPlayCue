import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  Download,
  Globe,
  Printer,
  RotateCcw,
  Share2,
  Shuffle,
  Upload,
  Volume2,
  VolumeX,
  X,
  XCircle,
} from 'lucide-react';
import {ContextualAffiliateBlock, MediaNetAdSlot} from './components/AdSlots';
import {CacoPoliceSvg} from './components/CacoPoliceSvg';
import {RoleCards} from './components/RoleCards';
import {SeoEditorialSection} from './components/SeoEditorialSection';
import {TurnInterrogation} from './components/TurnInterrogation';
import {
  getCanonicalUrl,
  LANGUAGE_OPTIONS,
  syncDocumentSeo,
  detectInitialLang,
  type LangCode,
} from './config/seo';
import {getCaseById, MYSTERY_CASES} from './data/cases';
import {TRANSLATIONS} from './i18n/translations';
import {
  assignRolesDeterministically,
  calculateRoundPoints,
  createDefaultSavedState,
  decodeChallengeFromUrl,
  encodeChallengeUrl,
  generateSeed,
  loadSavedState,
  persistSavedState,
  playGameCue,
  validateSavedState,
  type ChallengePayload,
  type RoundDuration,
  type SavedGameState,
} from './utils/gameEngine';

export default function App() {
  const initialChallenge = useMemo(
    () =>
      typeof window !== 'undefined'
        ? decodeChallengeFromUrl(window.location.search)
        : null,
    [],
  );

  const [lang, setLang] = useState<LangCode>(() =>
    initialChallenge?.lang && TRANSLATIONS[initialChallenge.lang]
      ? initialChallenge.lang
      : detectInitialLang(),
  );

  const [savedState, setSavedState] = useState<SavedGameState>(() => loadSavedState());

  const [caseId, setCaseId] = useState<string>(
    () => initialChallenge?.caseId ?? MYSTERY_CASES[0].id,
  );
  const [seed, setSeed] = useState<number>(
    () => initialChallenge?.seed ?? generateSeed(),
  );
  const [playerCount, setPlayerCount] = useState<number>(
    () => initialChallenge?.players ?? 4,
  );
  const [roundDuration, setRoundDuration] = useState<RoundDuration>(
    () => initialChallenge?.duration ?? 90,
  );
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    () => initialChallenge?.duration ?? 90,
  );
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);
  const [activeTurnIndex, setActiveTurnIndex] = useState<number>(0);
  const [pendingAccuseIndex, setPendingAccuseIndex] = useState<number | null>(null);
  const [resolvedAccusedIndex, setResolvedAccusedIndex] = useState<number | null>(null);
  const [lastPointsEarned, setLastPointsEarned] = useState<number>(0);

  const [challengeBanner, setChallengeBanner] = useState<ChallengePayload | null>(
    initialChallenge,
  );
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [importStatus, setImportStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const t = TRANSLATIONS[lang] ?? TRANSLATIONS.en;
  const activeCase = useMemo(() => getCaseById(caseId), [caseId]);
  const caseCopy = activeCase.copy[lang] ?? activeCase.copy.en;

  const assignments = useMemo(
    () => assignRolesDeterministically(seed, playerCount, savedState.playerNames),
    [seed, playerCount, savedState.playerNames],
  );

  // Sync SEO meta, hreflang, dir="rtl"|"ltr", and JSON-LD whenever language changes
  useEffect(() => {
    syncDocumentSeo(lang, t.seo);
    try {
      window.localStorage.setItem('cacoplaycue_lang', lang);
    } catch {
      // Ignore storage error
    }
  }, [lang, t.seo]);

  // Persist stats, player names, and investigator notes in localStorage
  useEffect(() => {
    persistSavedState(savedState);
  }, [savedState]);

  // Countdown timer loop
  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          playGameCue('alarm', soundEnabled);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning, soundEnabled]);

  const handleLanguageChange = (nextLang: LangCode) => {
    setLang(nextLang);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (nextLang === 'en') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', nextLang);
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  const resetRoundState = (nextDuration: RoundDuration = roundDuration, newSeed?: number) => {
    if (newSeed !== undefined) setSeed(newSeed);
    setRevealedIndex(null);
    setActiveTurnIndex(0);
    setPendingAccuseIndex(null);
    setResolvedAccusedIndex(null);
    setLastPointsEarned(0);
    setTimerRunning(false);
    setSecondsRemaining(nextDuration);
  };

  const handleSelectCase = (nextId: string) => {
    setCaseId(nextId);
    resetRoundState(roundDuration, generateSeed());
  };

  const handleNextCase = () => {
    const idx = MYSTERY_CASES.findIndex((c) => c.id === activeCase.id);
    const nextCase = MYSTERY_CASES[(idx + 1) % MYSTERY_CASES.length];
    setCaseId(nextCase.id);
    resetRoundState(roundDuration, generateSeed());
  };

  const handleShuffleRoles = () => {
    resetRoundState(roundDuration, generateSeed());
    playGameCue('reveal', soundEnabled);
  };

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    resetRoundState(roundDuration);
  };

  const handleDurationChange = (dur: RoundDuration) => {
    setRoundDuration(dur);
    setTimerRunning(false);
    setSecondsRemaining(dur);
  };

  const handleToggleReveal = (index: number) => {
    setRevealedIndex((prev) => {
      const next = prev === index ? null : index;
      if (next !== null) playGameCue('reveal', soundEnabled);
      return next;
    });
  };

  const handleRenamePlayer = (index: number, name: string) => {
    setSavedState((prev) => {
      const nextNames = [...prev.playerNames];
      nextNames[index] = name;
      return {...prev, playerNames: nextNames};
    });
  };

  const handleConfirmAccuse = (accusedIndex: number) => {
    const accused = assignments[accusedIndex];
    if (!accused) return;

    setTimerRunning(false);
    setPendingAccuseIndex(null);
    setResolvedAccusedIndex(accusedIndex);

    const won = accused.role === 'thief';
    const nextStreak = won ? savedState.currentStreak + 1 : 0;
    const earned = won
      ? calculateRoundPoints(activeCase.difficulty, secondsRemaining, nextStreak)
      : 0;

    setLastPointsEarned(earned);
    playGameCue(won ? 'win' : 'miss', soundEnabled);

    setSavedState((prev) => {
      const updatedStreak = won ? prev.currentStreak + 1 : 0;
      const updatedBest = Math.max(prev.bestStreak, updatedStreak);
      return {
        ...prev,
        currentStreak: updatedStreak,
        bestStreak: updatedBest,
        casesSolved: won ? prev.casesSolved + 1 : prev.casesSolved,
        totalRounds: prev.totalRounds + 1,
        totalPoints: prev.totalPoints + earned,
        history: [
          {
            caseCode: activeCase.code,
            caseId: activeCase.id,
            won,
            points: earned,
            timestamp: new Date().toISOString(),
          },
          ...prev.history,
        ].slice(0, 30),
      };
    });
  };

  const buildShareUrl = (): string => {
    return encodeChallengeUrl({
      v: 1,
      caseId: activeCase.id,
      seed,
      players: playerCount,
      duration: roundDuration,
      challenger: savedState.playerNames[0] || 'Investigator',
      streak: savedState.currentStreak,
      points: savedState.totalPoints,
      lang,
    });
  };

  const handleCopyChallengeLink = async () => {
    const shareUrl = buildShareUrl();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2200);
    } catch {
      // Fallback via temporary textarea
      const ta = document.createElement('textarea');
      ta.value = shareUrl;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2200);
    }
  };

  const handleShareWhatsApp = () => {
    const shareUrl = buildShareUrl();
    const message = t.whatsappChallengeTemplate
      .replace('{code}', activeCase.code)
      .replace('{duration}', String(roundDuration))
      .replace('{streak}', String(savedState.currentStreak))
      .replace('{points}', String(savedState.totalPoints))
      .replace('{url}', shareUrl);
    const waHref = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.location.assign(waHref);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(savedState, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `cacoplaycue-save-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!parsed || typeof parsed !== 'object' || !('playerNames' in parsed)) {
          throw new Error('Invalid format');
        }
        const validated = validateSavedState(parsed);
        setSavedState(validated);
        setImportStatus({type: 'success', message: t.importSuccess});
      } catch {
        setImportStatus({type: 'error', message: t.importError});
      } finally {
        e.target.value = '';
        window.setTimeout(() => setImportStatus(null), 3000);
      }
    };
    reader.readAsText(file);
  };

  const handleResetStats = () => {
    setSavedState((prev) => ({
      ...createDefaultSavedState(),
      playerNames: prev.playerNames,
    }));
  };

  const thiefPlayer = assignments.find((p) => p.role === 'thief');
  const policePlayer = assignments.find((p) => p.role === 'police');
  const isResolved = resolvedAccusedIndex !== null;
  const didCatchThief =
    isResolved && assignments[resolvedAccusedIndex]?.role === 'thief';

  const difficultyLabel =
    activeCase.difficulty === 'master'
      ? t.difficultyMaster
      : activeCase.difficulty === 'tricky'
        ? t.difficultyTricky
        : t.difficultyStandard;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4 Nav Links) — Zone 3 (1 Primary Action) */}
      <header className="no-print border-b border-[#E2E8F0] bg-[#FFFFFF]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
          <a
            href={getCanonicalUrl(lang)}
            className="font-display text-lg font-extrabold tracking-tight text-[#1E40AF] whitespace-nowrap shrink-0"
          >
            CacoPlayCue
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex"
          >
            <a
              href="#play"
              className="transition-colors hover:text-[#1E40AF] whitespace-nowrap shrink-0"
            >
              {t.navPlay}
            </a>
            <a
              href="#case-file"
              className="transition-colors hover:text-[#1E40AF] whitespace-nowrap shrink-0"
            >
              {t.navCaseBoard}
            </a>
            <a
              href="#how-to-play"
              className="transition-colors hover:text-[#1E40AF] whitespace-nowrap shrink-0"
            >
              {t.navGuide}
            </a>
            <a
              href="#faq"
              className="transition-colors hover:text-[#1E40AF] whitespace-nowrap shrink-0"
            >
              {t.navFaq}
            </a>
          </nav>

          <div className="shrink-0">
            <button
              type="button"
              onClick={handleNextCase}
              className="rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-900 whitespace-nowrap shrink-0"
            >
              {t.ctaNewCase}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
        {/* Print-only Formal Case Dossier Header */}
        <div className="print-only mb-6 border-b border-slate-300 pb-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-bold text-slate-900">{t.printSheetTitle}</h2>
            <span className="font-mono-tabular text-sm font-semibold text-slate-700">
              {activeCase.code} · {activeCase.incidentTime}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600">
            {caseCopy.title} — {caseCopy.location}
          </p>
        </div>

        {/* Hero & KPI Metrics Band */}
        <section className="no-print mb-6">
          <div className="max-w-3xl">
            <h1
              className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
              style={{textWrap: 'balance'}}
            >
              {t.heroTitle}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              {t.heroSubtitle}
            </p>
          </div>

          {/* 4-column Tabular Metrics Strip */}
          <div className="mt-5 grid grid-cols-2 divide-y divide-[#E2E8F0] rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            <div className="px-4 py-3">
              <div className="text-xs font-medium text-slate-500">{t.streakCurrent}</div>
              <div className="font-mono-tabular mt-0.5 text-xl font-bold text-[#059669]">
                {savedState.currentStreak}
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="text-xs font-medium text-slate-500">{t.streakBest}</div>
              <div className="font-mono-tabular mt-0.5 text-xl font-bold text-slate-900">
                {savedState.bestStreak}
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="text-xs font-medium text-slate-500">
                {t.casesSolvedLabel}
              </div>
              <div className="font-mono-tabular mt-0.5 text-xl font-bold text-slate-900">
                {savedState.casesSolved}
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="text-xs font-medium text-slate-500">
                {t.totalPointsLabel}
              </div>
              <div className="font-mono-tabular mt-0.5 text-xl font-bold text-[#1E40AF]">
                {savedState.totalPoints}
              </div>
            </div>
          </div>
        </section>

        {/* Incoming URL Challenge Banner */}
        {challengeBanner && (
          <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3">
            <div>
              <div className="text-xs font-bold text-[#B45309]">
                {t.challengeReceivedTitle}
              </div>
              <div className="text-sm font-medium text-slate-800 tabular-nums">
                {t.challengeBeatLabel
                  .replace('{name}', challengeBanner.challenger)
                  .replace('{streak}', String(challengeBanner.streak))
                  .replace('{points}', String(challengeBanner.points))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setChallengeBanner(null)}
              className="inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-amber-100 whitespace-nowrap shrink-0"
            >
              <X className="h-3.5 w-3.5" />
              {t.challengeDismiss}
            </button>
          </div>
        )}

        {/* Workspace Controls Toolbar */}
        <section
          id="play"
          className="no-print mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-4"
        >
          <div className="flex flex-wrap items-center gap-4">
            {/* 10-Language Switcher */}
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-slate-500" />
              <label htmlFor="lang-select" className="text-xs font-semibold text-slate-600">
                {t.languageLabel}
              </label>
              <select
                id="lang-select"
                value={lang}
                onChange={(e) => handleLanguageChange(e.target.value as LangCode)}
                className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:border-[#1E40AF] focus:outline-none"
              >
                {LANGUAGE_OPTIONS.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.nativeName}
                  </option>
                ))}
              </select>
            </div>

            {/* Player Count (3-6) */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">{t.playersLabel}</span>
              <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
                {[3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handlePlayerCountChange(num)}
                    className={`font-mono-tabular rounded-md px-2.5 py-1 text-xs font-bold transition-colors ${
                      playerCount === num
                        ? 'bg-white text-[#1E40AF] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Round Duration (60s, 90s, 120s) */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">{t.timerLabel}</span>
              <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
                {([60, 90, 120] as RoundDuration[]).map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => handleDurationChange(dur)}
                    className={`font-mono-tabular rounded-md px-2.5 py-1 text-xs font-bold transition-colors whitespace-nowrap ${
                      roundDuration === dur
                        ? 'bg-white text-[#1E40AF] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {dur}s
                  </button>
                ))}
              </div>
            </div>

            {/* Case Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="case-select" className="text-xs font-semibold text-slate-600">
                {t.caseSelectLabel}
              </label>
              <select
                id="case-select"
                value={activeCase.id}
                onChange={(e) => handleSelectCase(e.target.value)}
                className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:border-[#1E40AF] focus:outline-none"
              >
                {MYSTERY_CASES.map((c) => {
                  const localized = c.copy[lang] ?? c.copy.en;
                  return (
                    <option key={c.id} value={c.id}>
                      {c.code} · {localized.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShuffleRoles}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:border-[#1E40AF] hover:text-[#1E40AF] whitespace-nowrap shrink-0"
            >
              <Shuffle className="h-3.5 w-3.5" />
              {t.shuffleRoles}
            </button>
            <button
              type="button"
              onClick={() => setSoundEnabled((prev) => !prev)}
              aria-label={soundEnabled ? t.soundOn : t.soundOff}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0"
            >
              {soundEnabled ? (
                <Volume2 className="h-3.5 w-3.5 text-[#1E40AF]" />
              ) : (
                <VolumeX className="h-3.5 w-3.5 text-slate-400" />
              )}
              <span className="hidden sm:inline">
                {soundEnabled ? t.soundOn : t.soundOff}
              </span>
            </button>
          </div>
        </section>

        {/* Main 2-Column Investigation Board */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Primary Column: Case Briefing, SVG Map, Verdict, Role Cards */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            {/* Case Briefing & Public Clues */}
            <section
              id="case-file"
              className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 print-card print-break-inside-avoid"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  <span className="font-mono-tabular text-[#1E40AF]">
                    {activeCase.code}
                  </span>
                  <span className="mx-2 text-slate-300" aria-hidden="true">
                    ·
                  </span>
                  {caseCopy.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 tabular-nums">
                  <span>{difficultyLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {t.playersLabel}: {playerCount}
                  </span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 border-y border-[#E2E8F0] py-3 text-xs sm:grid-cols-3">
                <div>
                  <div className="text-slate-500">{t.incidentTimeLabel}</div>
                  <div className="font-mono-tabular mt-0.5 font-semibold text-slate-900">
                    {activeCase.incidentTime}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">{t.locationLabel}</div>
                  <div className="mt-0.5 font-semibold text-slate-900">
                    {caseCopy.location}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">{t.stolenItemLabel}</div>
                  <div className="mt-0.5 font-semibold text-slate-900">
                    {caseCopy.stolenItem}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="mb-2 text-xs font-bold text-slate-700">
                  {t.publicCluesTitle}
                </h3>
                <ol className="space-y-1.5 text-sm text-slate-700">
                  {caseCopy.publicClues.map((clue, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono-tabular mt-0.5 text-xs font-bold text-[#059669]">
                        E{idx + 1}
                      </span>
                      <span>{clue}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Static Interactive SVG Schematic */}
            <CacoPoliceSvg
              caseData={activeCase}
              caseCopy={caseCopy}
              t={t}
              showContradiction={isResolved}
            />

            {/* Resolution / Verdict Panel */}
            {isResolved && (
              <section
                className={`rounded-xl border p-5 print-card print-break-inside-avoid ${
                  didCatchThief
                    ? 'border-emerald-300 bg-emerald-50/70'
                    : 'border-amber-300 bg-amber-50/70'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {didCatchThief ? (
                      <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#059669]" />
                    ) : (
                      <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-[#D97706]" />
                    )}
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        {didCatchThief ? t.verdictCaughtTitle : t.verdictEscapedTitle}
                      </h2>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-700">
                        <span>
                          {t.thiefWasLabel}:{' '}
                          <strong className="text-slate-900">{thiefPlayer?.name}</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {t.policeWasLabel}:{' '}
                          <strong className="text-slate-900">{policePlayer?.name}</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular font-bold text-[#1E40AF]">
                          {t.pointsEarnedLabel}: +{lastPointsEarned}
                        </span>
                      </div>
                      <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                        <strong className="text-slate-900">
                          {t.alibiContradictionLabel}:
                        </strong>{' '}
                        {caseCopy.contradictionSummary}
                      </p>
                    </div>
                  </div>

                  <div className="no-print flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleShuffleRoles}
                      className="rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 whitespace-nowrap shrink-0"
                    >
                      {t.replayCaseButton}
                    </button>
                    <button
                      type="button"
                      onClick={handleNextCase}
                      className="rounded-lg bg-[#1E40AF] px-4 py-2 text-xs font-semibold text-white hover:bg-blue-900 whitespace-nowrap shrink-0"
                    >
                      {t.nextCaseButton}
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Private Pass-and-Play Role Cards */}
            <RoleCards
              assignments={assignments}
              caseCopy={caseCopy}
              t={t}
              revealedIndex={revealedIndex}
              onToggleReveal={handleToggleReveal}
              onHideAll={() => setRevealedIndex(null)}
              onRenamePlayer={handleRenamePlayer}
              pendingAccuseIndex={pendingAccuseIndex}
              onSelectAccuse={setPendingAccuseIndex}
              onConfirmAccuse={handleConfirmAccuse}
              resolvedAccusedIndex={resolvedAccusedIndex}
            />

            {/* Print-only Suspect Tally Table */}
            <section className="print-only rounded-xl border border-slate-300 p-4 print-break-inside-avoid">
              <h3 className="mb-2 text-sm font-bold text-slate-900">
                {t.printMatchLedger}
              </h3>
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-300 text-start text-slate-600">
                    <th className="py-1.5 text-start">#</th>
                    <th className="py-1.5 text-start">{t.playersLabel}</th>
                    <th className="py-1.5 text-start">{t.printNotesBox}</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((p) => (
                    <tr key={p.index} className="border-b border-slate-200">
                      <td className="font-mono-tabular py-2 font-semibold">
                        #{p.index + 1}
                      </td>
                      <td className="py-2 font-semibold">{p.name}</td>
                      <td className="py-2 text-slate-400">____________________________</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          {/* Right Column: Timer, Turns, Prompts, Scratchpad & Share/Save */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <TurnInterrogation
              caseCopy={caseCopy}
              t={t}
              assignments={assignments}
              secondsRemaining={secondsRemaining}
              timerRunning={timerRunning}
              onStartPause={() => setTimerRunning((prev) => !prev)}
              onResetTimer={() => {
                setTimerRunning(false);
                setSecondsRemaining(roundDuration);
              }}
              activeTurnIndex={activeTurnIndex}
              onNextTurn={() => {
                setActiveTurnIndex((prev) => (prev + 1) % assignments.length);
                playGameCue('turn', soundEnabled);
              }}
              notes={savedState.notes}
              onChangeNotes={(notes) =>
                setSavedState((prev) => ({...prev, notes}))
              }
            />

            {/* WhatsApp Challenge, Direct Case Link, JSON Save & Print */}
            <section className="no-print rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5">
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#059669] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 whitespace-nowrap"
                >
                  <Share2 className="h-4 w-4 shrink-0" />
                  {t.shareWhatsApp}
                </button>

                <button
                  type="button"
                  onClick={handleCopyChallengeLink}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-xs font-semibold text-slate-800 transition-colors hover:border-[#1E40AF] hover:text-[#1E40AF] whitespace-nowrap"
                >
                  {linkCopied ? (
                    <>
                      <Check className="h-4 w-4 shrink-0 text-[#059669]" />
                      {t.linkCopied}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 shrink-0" />
                      {t.copyCaseLink}
                    </>
                  )}
                </button>

                <div className="my-1 border-t border-[#E2E8F0]" />

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                  >
                    <Download className="h-3.5 w-3.5 shrink-0" />
                    {t.exportJson}
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                  >
                    <Upload className="h-3.5 w-3.5 shrink-0" />
                    {t.importJson}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/json,.json"
                    onChange={handleImportJson}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                  >
                    <Printer className="h-3.5 w-3.5 shrink-0" />
                    {t.printCase}
                  </button>

                  <button
                    type="button"
                    onClick={handleResetStats}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 whitespace-nowrap"
                  >
                    <RotateCcw className="h-3.5 w-3.5 shrink-0" />
                    {t.resetStats}
                  </button>
                </div>

                {importStatus && (
                  <p
                    className={`mt-1 text-xs font-medium ${
                      importStatus.type === 'success'
                        ? 'text-[#059669]'
                        : 'text-[#D97706]'
                    }`}
                  >
                    {importStatus.message}
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Media.net Top Ad Container (Between Game & SEO Editorial) */}
        <MediaNetAdSlot t={t} slot="top" />

        {/* Editorial SEO Guide & FAQ */}
        <SeoEditorialSection t={t} />

        {/* Contextual Tabletop & Mystery Gear Affiliate Block */}
        <ContextualAffiliateBlock t={t} />

        {/* Media.net Bottom Ad Container */}
        <MediaNetAdSlot t={t} slot="bottom" />
      </main>

      <footer className="no-print border-t border-[#E2E8F0] bg-[#FFFFFF]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <div className="font-semibold text-slate-800">{t.footerCopy}</div>
            <div className="mt-1">{t.footerPrivacy}</div>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {LANGUAGE_OPTIONS.map((opt) => (
              <a
                key={opt.code}
                href={getCanonicalUrl(opt.code)}
                onClick={(e) => {
                  e.preventDefault();
                  handleLanguageChange(opt.code);
                }}
                className={`hover:text-[#1E40AF] hover:underline ${
                  lang === opt.code ? 'font-bold text-[#1E40AF]' : ''
                }`}
              >
                {opt.nativeName}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
