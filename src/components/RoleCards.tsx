import React from 'react';
import {Eye, EyeOff, Gavel, Shield, UserCheck, VenetianMask} from 'lucide-react';
import type {LocalizedCaseCopy} from '../data/cases';
import type {UiDictionary} from '../i18n/translations';
import type {PlayerAssignment} from '../utils/gameEngine';

interface RoleCardsProps {
  assignments: PlayerAssignment[];
  caseCopy: LocalizedCaseCopy;
  t: UiDictionary;
  revealedIndex: number | null;
  onToggleReveal: (index: number) => void;
  onHideAll: () => void;
  onRenamePlayer: (index: number, name: string) => void;
  pendingAccuseIndex: number | null;
  onSelectAccuse: (index: number | null) => void;
  onConfirmAccuse: (index: number) => void;
  resolvedAccusedIndex: number | null;
}

export const RoleCards: React.FC<RoleCardsProps> = ({
  assignments,
  caseCopy,
  t,
  revealedIndex,
  onToggleReveal,
  onHideAll,
  onRenamePlayer,
  pendingAccuseIndex,
  onSelectAccuse,
  onConfirmAccuse,
  resolvedAccusedIndex,
}) => {
  const isResolved = resolvedAccusedIndex !== null;

  const getRoleDisplay = (assignment: PlayerAssignment) => {
    if (assignment.role === 'thief') {
      return {
        label: t.roleThief,
        clue: caseCopy.thiefBriefing,
        icon: VenetianMask,
        accentText: 'text-[#B45309]',
        surfaceBg: 'bg-amber-50/60 border-amber-200',
      };
    }
    if (assignment.role === 'police') {
      return {
        label: t.rolePolice,
        clue: caseCopy.policeBriefing,
        icon: Shield,
        accentText: 'text-[#1E40AF]',
        surfaceBg: 'bg-blue-50/60 border-blue-200',
      };
    }
    const citizenText =
      caseCopy.citizenBriefings[assignment.alibiLineIndex % caseCopy.citizenBriefings.length];
    return {
      label: t.roleCitizen,
      clue: citizenText,
      icon: UserCheck,
      accentText: 'text-[#059669]',
      surfaceBg: 'bg-emerald-50/50 border-emerald-200',
    };
  };

  return (
    <section className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 print-card">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">{t.rolesTitle}</h2>
          <p className="text-xs text-slate-500">{t.rolesSubtitle}</p>
        </div>
        {!isResolved && (
          <button
            type="button"
            onClick={onHideAll}
            className="no-print inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0"
          >
            <EyeOff className="h-3.5 w-3.5" />
            {t.hideAllRoles}
          </button>
        )}
      </div>

      {/* Confirmation bar for Accusation */}
      {pendingAccuseIndex !== null && !isResolved && (
        <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3">
          <div className="text-sm font-semibold text-slate-900">
            {t.accusePromptTitle}:{' '}
            <span className="text-[#1E40AF]">
              {assignments[pendingAccuseIndex]?.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectAccuse(null)}
              className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              {t.accuseCancel}
            </button>
            <button
              type="button"
              onClick={() => onConfirmAccuse(pendingAccuseIndex)}
              className="rounded-lg bg-[#1E40AF] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-900 whitespace-nowrap shrink-0"
            >
              {t.accuseConfirm}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {assignments.map((player) => {
          const isRevealed = isResolved || revealedIndex === player.index;
          const roleInfo = getRoleDisplay(player);
          const RoleIcon = roleInfo.icon;
          const wasAccused = resolvedAccusedIndex === player.index;

          return (
            <div
              key={player.index}
              className={`flex flex-col justify-between rounded-lg border p-3.5 transition-colors ${
                wasAccused
                  ? 'border-[#1E40AF] bg-blue-50/30'
                  : 'border-[#E2E8F0] bg-[#FFFFFF]'
              }`}
            >
              <div>
                <div className="mb-2.5 flex items-center justify-between gap-2">
                  <span className="font-mono-tabular text-xs font-semibold text-slate-400">
                    #{String(player.index + 1).padStart(2, '0')}
                  </span>
                  <input
                    type="text"
                    value={player.name}
                    maxLength={24}
                    aria-label={`${t.editPlayerPlaceholder} ${player.index + 1}`}
                    placeholder={t.editPlayerPlaceholder}
                    onChange={(e) => onRenamePlayer(player.index, e.target.value)}
                    className="w-full rounded-md border border-transparent bg-[#F8FAFC] px-2 py-1 text-sm font-semibold text-slate-900 focus:border-[#1E40AF] focus:bg-white focus:outline-none"
                  />
                </div>

                {isRevealed ? (
                  <div className={`mb-3 rounded-md border p-3 ${roleInfo.surfaceBg}`}>
                    <div className="mb-1.5 flex items-center gap-1.5">
                      <RoleIcon className={`h-4 w-4 shrink-0 ${roleInfo.accentText}`} />
                      <span className={`text-xs font-bold ${roleInfo.accentText}`}>
                        {roleInfo.label}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-700">{roleInfo.clue}</p>
                  </div>
                ) : (
                  <div className="no-print mb-3 flex min-h-[84px] items-center justify-center rounded-md border border-dashed border-[#E2E8F0] bg-[#F8FAFC] px-3 py-4 text-center">
                    <span className="text-xs font-medium text-slate-400">
                      {t.roleSecretHint}
                    </span>
                  </div>
                )}
              </div>

              {!isResolved && (
                <div className="no-print flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onToggleReveal(player.index)}
                    className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                      isRevealed
                        ? 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
                        : 'border-[#E2E8F0] bg-[#F8FAFC] text-slate-800 hover:border-[#1E40AF] hover:text-[#1E40AF]'
                    }`}
                  >
                    {isRevealed ? (
                      <>
                        <EyeOff className="h-3.5 w-3.5 shrink-0" />
                        {t.hidePrivateRole}
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5 shrink-0" />
                        {t.revealPrivateRole}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectAccuse(player.index)}
                    title={t.accuseButton}
                    className="inline-flex items-center justify-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-2 text-xs font-semibold text-[#B45309] transition-colors hover:bg-amber-100 whitespace-nowrap shrink-0"
                  >
                    <Gavel className="h-3.5 w-3.5 shrink-0" />
                    {t.accuseButton}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
