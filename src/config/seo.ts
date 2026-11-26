export const CANONICAL_ORIGIN = 'https://cacoplaycue.bastelar.com';

export const SUPPORTED_LANGS = [
  'en',
  'es',
  'fr',
  'de',
  'pt',
  'ar',
  'hi',
  'ru',
  'zh',
  'ja',
] as const;

export type LangCode = (typeof SUPPORTED_LANGS)[number];

export interface LanguageOption {
  code: LangCode;
  nativeName: string;
  englishName: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {code: 'en', nativeName: 'English', englishName: 'English', dir: 'ltr'},
  {code: 'es', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr'},
  {code: 'fr', nativeName: 'Français', englishName: 'French', dir: 'ltr'},
  {code: 'de', nativeName: 'Deutsch', englishName: 'German', dir: 'ltr'},
  {code: 'pt', nativeName: 'Português', englishName: 'Portuguese', dir: 'ltr'},
  {code: 'ar', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl'},
  {code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi', dir: 'ltr'},
  {code: 'ru', nativeName: 'Русский', englishName: 'Russian', dir: 'ltr'},
  {code: 'zh', nativeName: '中文', englishName: 'Chinese', dir: 'ltr'},
  {code: 'ja', nativeName: '日本語', englishName: 'Japanese', dir: 'ltr'},
];

export function isSupportedLang(value: string | null | undefined): value is LangCode {
  if (!value) return false;
  return (SUPPORTED_LANGS as readonly string[]).includes(value);
}

export function getCanonicalUrl(lang: LangCode): string {
  return lang === 'en' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}/?lang=${lang}`;
}

export function detectInitialLang(): LangCode {
  if (typeof window === 'undefined') return 'en';

  try {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang')?.toLowerCase().split('-')[0];
    if (isSupportedLang(urlLang)) {
      return urlLang;
    }

    const stored = window.localStorage.getItem('cacoplaycue_lang');
    if (isSupportedLang(stored)) {
      return stored;
    }

    const navLangs = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const raw of navLangs) {
      const code = raw?.toLowerCase().split('-')[0];
      if (isSupportedLang(code)) {
        return code;
      }
    }
  } catch {
    // Ignore storage/navigator errors
  }

  return 'en';
}

export interface SeoFaqItem {
  q: string;
  a: string;
}

export interface SeoHowToStep {
  name: string;
  text: string;
}

export interface SeoBundle {
  title: string;
  description: string;
  howToName: string;
  howToSteps: SeoHowToStep[];
  faqs: SeoFaqItem[];
}

function upsertMeta(attrName: 'name' | 'property', attrValue: string, content: string): void {
  let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, hreflang?: string): void {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) {
      el.setAttribute('hreflang', hreflang);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function syncDocumentSeo(lang: LangCode, seo: SeoBundle): void {
  if (typeof document === 'undefined') return;

  const option = LANGUAGE_OPTIONS.find((item) => item.code === lang) ?? LANGUAGE_OPTIONS[0];
  document.documentElement.lang = lang;
  document.documentElement.dir = option.dir;

  const canonicalUrl = getCanonicalUrl(lang);

  document.title = seo.title;
  upsertMeta('name', 'description', seo.description);
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('property', 'og:title', seo.title);
  upsertMeta('property', 'og:description', seo.description);
  upsertMeta('name', 'twitter:title', seo.title);
  upsertMeta('name', 'twitter:description', seo.description);

  upsertLink('canonical', canonicalUrl);
  for (const code of SUPPORTED_LANGS) {
    upsertLink('alternate', getCanonicalUrl(code), code);
  }
  upsertLink('alternate', getCanonicalUrl('en'), 'x-default');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'CacoPlayCue',
        url: canonicalUrl,
        inLanguage: lang,
        applicationCategory: 'GameApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        description: seo.description,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'HowTo',
        name: seo.howToName,
        inLanguage: lang,
        step: seo.howToSteps.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      },
      {
        '@type': 'FAQPage',
        inLanguage: lang,
        mainEntity: seo.faqs.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  };

  const scriptId = 'cacoplaycue-jsonld';
  let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = scriptId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(jsonLd);
}
