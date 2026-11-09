import type { Language } from "./Project";

export class LanguagePreference {
  resolve(queryValue: unknown, cookieValue: unknown): Language {
    if (this.isLanguage(queryValue)) return queryValue;
    if (this.isLanguage(cookieValue)) return cookieValue;
    return "en";
  }

  private isLanguage(value: unknown): value is Language {
    return value === "pt" || value === "en";
  }
}
