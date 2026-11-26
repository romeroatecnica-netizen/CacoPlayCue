import React, {useState} from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  MessageSquare,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';
import type {LocalizedCaseCopy} from '../data/cases';
import type {UiDictionary} from '../i18n/translations';
import type {PlayerAssignment} from '../utils/gameEngine';
import {formatTimer} from '../utils/gameEngine';

interface TurnInterrogationProps {
  caseCopy: LocalizedCaseCopy;
  t: UiDictionary;
  assignments: PlayerAssignment[];
  secondsRemaining: number;
  timerRunning: boolean;
  onStartPause: () => void;
  onResetTimer: () => void;
  activeTurnIndex: number;
  onNextTurn: () => void;
  notes: string;
  onChangeNotes: (notes: string) => void;
}

export const TurnInterrogation: React.FC<TurnInterrogationProps> = ({
  caseCopy,
  t,
  assignments,
  secondsRemaining,
  timerRunning,
  onStartPause,
  onResetTimer,
  activeTurnIndex,
  onNextTurn,
  notes,
  onChangeNotes,
}) => {
  const [promptMode, setPromptMode] = useState<'question' | 'statement'>('question');
  const [selectedPromptIdx, setSelectedPromptIdx] = useState<number>(0);

  const activePlayer = assignments[activeTurnIndex % assignments.length];
  const prompts = promptMode === 'question' ? caseCopy.questions : caseCopy.statements;
  const isExpired = secondsRemaining === 0;
  const isLowTime = secondsRemaining > 0 && secondsRemaining <= 15;

  return (
    <aside className="flex flex-col gap-4">
      {/* Round Clock & Turn Tracker */}
      <div className="no-print rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-base font-bold text-slate-900">{t.roundClockTitle}</h2>
          <Clock
            className={`h-4 w-4 ${
              isExpired || isLowTime ? 'text-[#D97706]' : 'text-[#1E40AF]'
            }`}
          />
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
          <div>
            <div
              className={`font-mono-tabular text-3xl font-bold tracking-tight ${
                isExpired
                  ? 'text-[#D97706]'
                  : isLowTime
                    ? 'text-[#B45309]'
                    : 'text-slate-900'
              }`}
            >
              {formatTimer(secondsRemaining)}
            </div>
            {isExpired && (
              <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#B45309]">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                {t.timeUpAlert}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onStartPause}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1E40AF] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-900 whitespace-nowrap shrink-0"
            >
              {timerRunning ? (
                <>
                  <Pause className="h-3.5 w-3.5" />
                  {t.pauseTimer}
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" />
                  {t.startTimer}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onResetTimer}
              className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t.resetTimer}
            </button>
          </div>
        </div>

        {/* Turn Tracker */}
        <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-[#E2E8F0] px-3.5 py-2.5">
          <div className="min-w-0">
            <div className="text-xs font-medium text-slate-500">{t.turnTrackerLabel}</div>
            <div className="truncate text-sm font-bold text-slate-900">
              <span className="font-mono-tabular text-[#1E40AF]">
                #{String((activePlayer?.index ?? 0) + 1).padStart(2, '0')}
              </span>{' '}
              {activePlayer?.name}
            </div>
          </div>
          <button
            type="button"
            onClick={onNextTurn}
            className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:border-[#1E40AF] hover:text-[#1E40AF] whitespace-nowrap shrink-0"
          >
            {t.nextTurnButton}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Question vs Statement Selector */}
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-600">
              {t.suggestedPromptsTitle}
            </span>
          </div>

          <div className="mb-3 grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => {
                setPromptMode('question');
                setSelectedPromptIdx(0);
              }}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                promptMode === 'question'
                  ? 'bg-white text-[#1E40AF] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.promptModeQuestion}
            </button>
            <button
              type="button"
              onClick={() => {
                setPromptMode('statement');
                setSelectedPromptIdx(0);
              }}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                promptMode === 'statement'
                  ? 'bg-white text-[#1E40AF] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.promptModeStatement}
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {prompts.map((prompt, idx) => {
              const isSelected = selectedPromptIdx === idx;
              return (
                <button
                  key={`${promptMode}-${idx}`}
                  type="button"
                  onClick={() => setSelectedPromptIdx(idx)}
                  className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-start text-xs leading-relaxed transition-colors ${
                    isSelected
                      ? 'border-[#1E40AF] bg-blue-50/50 font-medium text-slate-900'
                      : 'border-[#E2E8F0] bg-[#FFFFFF] text-slate-700 hover:bg-[#F8FAFC]'
                  }`}
                >
                  <MessageSquare
                    className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                      isSelected ? 'text-[#1E40AF]' : 'text-slate-400'
                    }`}
                  />
                  <span>{prompt}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Investigator Scratchpad */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 print-card">
        <label
          htmlFor="investigator-notes"
          className="mb-2 block text-sm font-bold text-slate-900"
        >
          {t.notesTitle}
        </label>
        <textarea
          id="investigator-notes"
          rows={4}
          value={notes}
          onChange={(e) => onChangeNotes(e.target.value)}
          placeholder={t.notesPlaceholder}
          className="w-full resize-y rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-xs leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-[#1E40AF] focus:bg-white focus:outline-none"
        />
      </div>
    </aside>
  );
};
