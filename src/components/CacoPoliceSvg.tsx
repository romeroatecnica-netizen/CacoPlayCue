import React, {useState} from 'react';
import {Eye, Lock, MapPin} from 'lucide-react';
import type {CaseBlueprint, LocalizedCaseCopy} from '../data/cases';
import type {UiDictionary} from '../i18n/translations';

interface CacoPoliceSvgProps {
  caseData: CaseBlueprint;
  caseCopy: LocalizedCaseCopy;
  t: UiDictionary;
  showContradiction?: boolean;
}

export const CacoPoliceSvg: React.FC<CacoPoliceSvgProps> = ({
  caseData,
  caseCopy,
  t,
  showContradiction = false,
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(caseData.zones[0]?.id ?? '');

  const zoneMap = new Map(caseData.zones.map((z) => [z.id, z]));
  const activeZoneId = zoneMap.has(selectedZoneId)
    ? selectedZoneId
    : (caseData.zones[0]?.id ?? '');
  const activeZoneCopy = caseCopy.zones[activeZoneId];
  const activeZoneGeo = zoneMap.get(activeZoneId);

  const getCenter = (zoneId: string) => {
    const z = zoneMap.get(zoneId);
    if (!z) return {x: 0, y: 0};
    return {x: z.x + z.w / 2, y: z.y + z.h / 2};
  };

  return (
    <section className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 print-card print-break-inside-avoid">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">{t.svgMapTitle}</h2>
          <p className="text-xs text-slate-500">{t.svgMapHint}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm border border-[#1E40AF] bg-blue-50" />
            {t.svgLegendZone}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#059669]" />
            {t.svgLegendClue}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm border border-dashed border-slate-400 bg-slate-100" />
            {t.svgLegendBlindspot}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-4 bg-[#D97706]" />
            {t.svgLegendAlibi}
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]">
        <svg
          viewBox="0 0 580 284"
          className="h-auto w-full select-none"
          role="img"
          aria-label={`${caseCopy.title} — ${t.svgMapTitle}`}
        >
          <defs>
            <pattern id="cpc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="0.6"
              />
            </pattern>
            <pattern
              id="cpc-blind"
              width="8"
              height="8"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="0" y2="8" stroke="#CBD5E1" strokeWidth="1.5" />
            </pattern>
            <marker
              id="cpc-arrow-amber"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#D97706" />
            </marker>
            <marker
              id="cpc-arrow-indigo"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#1E40AF" />
            </marker>
          </defs>

          <rect x="0" y="0" width="580" height="284" fill="url(#cpc-grid)" />

          {/* Corridors */}
          {caseData.corridors.map((corr, idx) => {
            const p1 = getCenter(corr.from);
            const p2 = getCenter(corr.to);
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            return (
              <g key={`${corr.from}-${corr.to}-${idx}`}>
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={corr.locked ? '#DC2626' : '#94A3B8'}
                  strokeWidth={corr.locked ? 2.5 : 3}
                  strokeDasharray={corr.locked ? '5 4' : undefined}
                />
                {corr.locked && (
                  <g transform={`translate(${midX - 11}, ${midY - 11})`}>
                    <rect
                      width="22"
                      height="22"
                      rx="4"
                      fill="#FEF2F2"
                      stroke="#DC2626"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7 10V8a4 4 0 0 1 8 0v2M6 10h10v7H6z"
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </g>
                )}
                {corr.sensorTime && (
                  <g transform={`translate(${midX - 20}, ${midY - 10})`}>
                    <rect
                      width="40"
                      height="18"
                      rx="4"
                      fill="#FFFFFF"
                      stroke="#1E40AF"
                      strokeWidth="1"
                    />
                    <text
                      x="20"
                      y="12.5"
                      textAnchor="middle"
                      fontSize="9.5"
                      fontWeight="600"
                      fontFamily="JetBrains Mono, monospace"
                      fill="#1E40AF"
                    >
                      {corr.sensorTime}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Zones */}
          {caseData.zones.map((zone) => {
            const copy = caseCopy.zones[zone.id];
            const isSelected = zone.id === activeZoneId;
            return (
              <g
                key={zone.id}
                onClick={() => setSelectedZoneId(zone.id)}
                className="cursor-pointer"
              >
                <rect
                  x={zone.x}
                  y={zone.y}
                  width={zone.w}
                  height={zone.h}
                  rx="8"
                  fill={zone.blindSpot ? '#F1F5F9' : '#FFFFFF'}
                  stroke={isSelected ? '#1E40AF' : '#CBD5E1'}
                  strokeWidth={isSelected ? 2.2 : 1.2}
                />
                {zone.blindSpot && (
                  <rect
                    x={zone.x + 2}
                    y={zone.y + 2}
                    width={zone.w - 4}
                    height={zone.h - 4}
                    rx="6"
                    fill="url(#cpc-blind)"
                    opacity="0.65"
                  />
                )}
                <text
                  x={zone.x + 10}
                  y={zone.y + 20}
                  fontSize="11.5"
                  fontWeight="700"
                  fill="#0F172A"
                >
                  {copy?.name ?? zone.id}
                </text>
                {zone.cameraLabel && (
                  <text
                    x={zone.x + 10}
                    y={zone.y + 35}
                    fontSize="9.5"
                    fontWeight="600"
                    fontFamily="JetBrains Mono, monospace"
                    fill="#1E40AF"
                  >
                    {zone.cameraLabel}
                  </text>
                )}
                {zone.blindSpot && (
                  <text
                    x={zone.x + 10}
                    y={zone.y + 35}
                    fontSize="9.5"
                    fontWeight="600"
                    fill="#B45309"
                  >
                    {t.svgLegendBlindspot}
                  </text>
                )}
              </g>
            );
          })}

          {/* Alibi connection arcs */}
          {caseData.alibiArcs.map((arc) => {
            const p1 = getCenter(arc.from);
            const p2 = getCenter(arc.to);
            const ctrlX = (p1.x + p2.x) / 2;
            const ctrlY = Math.min(p1.y, p2.y) - 22;
            const isSuspicious = arc.suspicious;
            return (
              <path
                key={arc.id}
                d={`M ${p1.x} ${p1.y + 12} Q ${ctrlX} ${ctrlY} ${p2.x} ${p2.y + 12}`}
                fill="none"
                stroke={isSuspicious ? '#D97706' : '#1E40AF'}
                strokeWidth={isSuspicious && showContradiction ? 2.6 : 1.8}
                strokeDasharray={isSuspicious ? '6 4' : undefined}
                markerEnd={isSuspicious ? 'url(#cpc-arrow-amber)' : 'url(#cpc-arrow-indigo)'}
                opacity="0.88"
              />
            );
          })}

          {/* Clue pins */}
          {caseData.cluePins.map((pin) => (
            <g key={pin.id} transform={`translate(${pin.cx}, ${pin.cy})`}>
              <circle r="11" fill="#059669" stroke="#FFFFFF" strokeWidth="2" />
              <text
                y="3.5"
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="JetBrains Mono, monospace"
                fill="#FFFFFF"
              >
                {pin.code}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Interactive Zone Inspector */}
      {activeZoneCopy && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-sm">
          <div className="flex items-center gap-2.5">
            <MapPin className="h-4 w-4 shrink-0 text-[#1E40AF]" />
            <div>
              <span className="font-semibold text-slate-900">
                {t.svgSelectedZoneLabel}: {activeZoneCopy.name}
              </span>
              <span className="mx-2 text-slate-300" aria-hidden="true">
                ·
              </span>
              <span className="text-slate-600">{activeZoneCopy.detail}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            {activeZoneGeo?.blindSpot ? (
              <span className="inline-flex items-center gap-1 text-[#B45309]">
                <Lock className="h-3.5 w-3.5" />
                {t.svgLegendBlindspot}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[#1E40AF]">
                <Eye className="h-3.5 w-3.5" />
                {activeZoneGeo?.cameraLabel ?? 'Active'}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
