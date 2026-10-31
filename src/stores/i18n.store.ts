import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { translations, Locale, TranslationContent } from "@/utils/i18n-dictionary";

interface I18nState {
  locale: Locale;
  t: TranslationContent;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      locale: "vi",
      t: translations.vi,
      setLocale: (locale: Locale) =>
        set({
          locale,
          t: translations[locale] || translations.vi,
        }),
      toggleLocale: () => {
        const next = get().locale === "vi" ? "en" : "vi";
        set({
          locale: next,
          t: translations[next],
        });
      },
    }),
    {
      name: "hrm-locale-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ locale: state.locale } as any),
      merge: (persistedState: any, currentState: I18nState) => {
        const locale = (persistedState?.locale as Locale) || currentState.locale || "vi";
        return {
          ...currentState,
          locale,
          t: translations[locale] || translations.vi,
        };
      },
    }
  )
)