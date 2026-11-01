import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import "dayjs/locale/en";
import { translations, Locale, TranslationContent } from "@/utils/i18n-dictionary";

dayjs.locale("vi");

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
      setLocale: (locale: Locale) => {
        dayjs.locale(locale);
        set({
          locale,
          t: translations[locale] || translations.vi,
        });
      },
      toggleLocale: () => {
        const next = get().locale === "vi" ? "en" : "vi";
        dayjs.locale(next);
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
        dayjs.locale(locale);
        return {
          ...currentState,
          locale,
          t: translations[locale] || translations.vi,
        };
      },
    }
  )
);