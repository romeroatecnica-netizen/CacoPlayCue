import React, {useState} from 'react';
import {ChevronDown, Info} from 'lucide-react';
import type {UiDictionary} from '../i18n/translations';

export const SeoEditorialSection: React.FC<{t: UiDictionary}> = ({t}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="no-print mt-8 space-y-8">
      {/* Editorial How-To & Strategy Guide */}
      <section
        id="how-to-play"
        className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 md:p-8"
      >
        <h2
          className="text-xl font-bold text-slate-900 md:text-2xl"
          style={{textWrap: 'balance'}}
        >
          {t.editorialTitle}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {t.editorialSections.map((block, index) => (
            <article
              key={index}
              className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5"
            >
              <h3 className="text-base font-bold text-slate-900">{block.heading}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {block.body}
              </p>
            </article>
          ))}
        </div>

        {/* Transparent Client-Side Notice */}
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-xs leading-relaxed text-slate-600">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#1E40AF]" />
          <p>{t.transparentNotice}</p>
        </div>
      </section>

      {/* Interactive FAQ */}
      <section
        id="faq"
        className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 md:p-8"
      >
        <h2 className="text-xl font-bold text-slate-900">{t.faqTitle}</h2>
        <div className="mt-4 divide-y divide-[#E2E8F0] rounded-lg border border-[#E2E8F0]">
          {t.seo.faqs.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-[#FFFFFF]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-sm font-semibold text-slate-900 transition-colors hover:bg-[#F8FAFC]"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-150 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-5 py-3.5 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
