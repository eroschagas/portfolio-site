import { SiteDiscovery } from "~/models/SiteDiscovery";
import { profile } from "~/data/profile";
import { translations } from "~/data/translations";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const site = new SiteDiscovery(config.public.siteUrl);
  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  const sections = (["en", "pt"] as const).map((language) => {
    const t = translations[language];
    return `## ${language === "en" ? "English" : "Português"}\n\n${profile.name} — ${t.header.role}\n\n${t.intro}\n\n${profile.getStack(language).join(", ")}\n\n${config.discoveryPaths.map((path) => `- [${path}](${site.url(path, language)})`).join("\n")}`;
  });
  return `# ${profile.name} — Portfolio\n\n${sections.join("\n\n")}\n\n## Profiles / Perfis\n\n${profile.socials.map((social) => `- [${social.name}](${social.url})`).join("\n")}\n`;
});
