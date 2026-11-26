import React from 'react';
import {ExternalLink} from 'lucide-react';
import type {UiDictionary} from '../i18n/translations';

interface AdSlotProps {
  t: UiDictionary;
  slot: 'top' | 'bottom';
}

export const MediaNetAdSlot: React.FC<AdSlotProps> = ({t, slot}) => {
  const isTop = slot === 'top';
  return (
    <div
      className="no-print my-6 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-4"
      aria-label={t.adLabel}
    >
      <div className="mb-2 text-center text-[11px] font-medium text-slate-400">
        {t.adLabel}
      </div>
      {/* Media.net Ad Container ({isTop ? '728x90 / Responsive Leaderboard' : '300x250 / Responsive Rectangle'}) - Reserved height prevents CLS */}
      <div
        id={isTop ? 'medianet-slot-top' : 'medianet-slot-bottom'}
        data-ad-slot={isTop ? 'cacoplaycue_top_banner' : 'cacoplaycue_bottom_rect'}
        className={`flex w-full items-center justify-center rounded-lg border border-dashed border-[#E2E8F0] bg-[#F8FAFC] text-xs text-slate-400 ${
          isTop ? 'min-h-[100px]' : 'min-h-[250px]'
        }`}
      >
        {/* Paste Media.net <script> tag here in production */}
        <span>Media.net · {isTop ? '728 × 90' : '300 × 250'}</span>
      </div>
    </div>
  );
};

export const ContextualAffiliateBlock: React.FC<{t: UiDictionary}> = ({t}) => {
  return (
    <section className="no-print mt-8 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-6">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">{t.affiliateTitle}</h2>
        <p className="mt-1 text-sm text-slate-600">{t.affiliateSubtitle}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {t.affiliateItems.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4"
          >
            <div>
              <div className="mb-1.5 text-xs font-semibold text-[#1E40AF]">
                {item.category}
              </div>
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
            <div className="mt-4">
              <a
                href={item.href}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E40AF] hover:underline whitespace-nowrap"
              >
                {item.cta}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
