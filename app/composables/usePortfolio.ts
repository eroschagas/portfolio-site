import type { Language } from "~/models/Project";
import { translations } from "~/data/translations";

export const usePortfolio = () => {
  const language = useState<Language>("portfolio-language", () => "en");
  const t = computed(() => translations[language.value === "pt" ? "pt" : "en"]);
  return { language, t };
};
