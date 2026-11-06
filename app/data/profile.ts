import { PortfolioProfile } from "~/models/PortfolioProfile";

// Personalize seu nome, sua stack e as URLs para ativar os links no footer.
export const profile = new PortfolioProfile(
  "Eros",
  [
    "Vue.js",
    "Nuxt",
    "TypeScript",
    "JavaScript",
    "HTML & CSS",
    "Git",
    "React",
    { en: "AI-assisted coding", pt: "Programação com IA" },
  ],
  [
    { name: "LinkedIn", url: "" },
    { name: "GitHub", url: "" },
  ],
);
