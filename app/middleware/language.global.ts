import type { Language } from "~/models/Project";
import { LanguagePreference } from "~/models/LanguagePreference";

export default defineNuxtRouteMiddleware((to) => {
  const cookie = useCookie<unknown>("portfolio-language", {
    sameSite: "lax",
    path: "/",
  });
  const language = useState<Language>("portfolio-language");
  language.value = new LanguagePreference().resolve(
    to.query.lang,
    cookie.value,
  );
  cookie.value = language.value;
});
