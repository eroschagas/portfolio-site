import { PortfolioProfile } from "~/models/PortfolioProfile";

// Personalize seu nome, sua stack e as URLs para ativar os links no footer.
export const profile = new PortfolioProfile(
  "Eros",
  ["Vue.js", "Nuxt", "TypeScript", "JavaScript", "HTML & CSS", "Git"],
  [
    { name: "LinkedIn", url: "" },
    { name: "GitHub", url: "" },
  ],
);
