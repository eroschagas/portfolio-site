export type SiteLanguage = "en" | "pt";

export class SiteDiscovery {
  readonly origin: string;

  constructor(origin: string) {
    const url = new URL(origin);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.pathname !== "/" ||
      url.search ||
      url.hash ||
      url.username ||
      url.password
    ) {
      throw new Error("Site URL must be an HTTP(S) origin.");
    }
    this.origin = url.origin;
  }

  localizedPath(path: string, language: SiteLanguage): string {
    return `${path === "/" ? "/" : path.replace(/\/+$/, "")}?lang=${language}`;
  }

  url(path: string, language?: SiteLanguage): string {
    return new URL(
      language ? this.localizedPath(path, language) : path,
      this.origin,
    ).href;
  }

  sitemap(paths: string[]): string {
    const escape = (value: string) =>
      value
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;");
    const entries = paths.flatMap((path) =>
      (["en", "pt"] as const).map((language) => {
        const alternates = [
          ["en", "en"],
          ["pt-BR", "pt"],
          ["x-default", "en"],
        ] as const;
        return `<url><loc>${escape(this.url(path, language))}</loc>${alternates.map(([locale, lang]) => `<xhtml:link rel="alternate" hreflang="${locale}" href="${escape(this.url(path, lang))}"/>`).join("")}</url>`;
      }),
    );
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join("")}</urlset>`;
  }
}
