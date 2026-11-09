import type { Language } from "~/models/Project";
import { LanguagePreference } from "~/models/LanguagePreference";

export default defineNuxtPlugin(() => {
  const cookie = useCookie<unknown>("portfolio-language", {
    sameSite: "lax",
    path: "/",
  });
  const preference = new LanguagePreference();
  const language = useState<Language>("portfolio-language", () =>
    preference.resolve(undefined, cookie.value),
  );
  cookie.value = language.value;
  watch(
    language,
    (value) => {
      cookie.value = value;
    },
    { flush: "sync" },
  );
});
