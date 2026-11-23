import { SiteDiscovery } from "~/models/SiteDiscovery";
import { profile } from "~/data/profile";

interface PageSeoOptions {
  title: () => string;
  description: () => string;
  type: "ProfilePage" | "CollectionPage";
  items?: () => Record<string, unknown>[];
}

export const usePageSeo = (options: PageSeoOptions) => {
  const config = useRuntimeConfig();
  const route = useRoute();
  const { language, t } = usePortfolio();
  const site = new SiteDiscovery(config.public.siteUrl);
  const url = computed(() => site.url(route.path, language.value));
  const image = computed(() =>
    site.url(`/social/portfolio-${language.value}.png`),
  );
  const imageAlt = computed(() => `${profile.name} — ${t.value.header.role}`);
  const indexable =
    config.public.indexable === true ||
    String(config.public.indexable) === "true";
  useSeoMeta({
    title: options.title,
    description: options.description,
    robots: indexable
      ? "index, follow, max-image-preview:large"
      : "noindex, nofollow",
    ogType: "website",
    ogTitle: options.title,
    ogDescription: options.description,
    ogUrl: () => url.value,
    ogSiteName: `${profile.name} — Portfolio`,
    ogLocale: () => (language.value === "en" ? "en_US" : "pt_BR"),
    ogImage: () => image.value,
    ogImageAlt: () => imageAlt.value,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterCard: "summary_large_image",
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: () => image.value,
    twitterImageAlt: () => imageAlt.value,
  });
  useHead(() => ({
    meta: [
      {
        property: "og:locale:alternate",
        content: language.value === "en" ? "pt_BR" : "en_US",
      },
    ],
    link: [
      { rel: "canonical", href: url.value },
      ...(
        [
          ["en", "en"],
          ["pt-BR", "pt"],
          ["x-default", "en"],
        ] as const
      ).map(([hreflang, lang]) => ({
        rel: "alternate",
        hreflang,
        href: site.url(route.path, lang),
      })),
    ],
    script: [
      {
        key: "portfolio-schema",
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": site.url("/#person"),
              name: profile.name,
              url: site.url("/", language.value),
              jobTitle: t.value.header.role,
              sameAs: profile.socials.map((social) => social.url),
              knowsAbout: profile.getStack(language.value),
            },
            {
              "@type": "WebSite",
              "@id": site.url("/#website"),
              url: site.url("/"),
              name: `${profile.name} — Portfolio`,
              inLanguage: ["en", "pt-BR"],
              author: { "@id": site.url("/#person") },
            },
            {
              "@type": options.type,
              "@id": `${url.value}#page`,
              url: url.value,
              name: options.title(),
              description: options.description(),
              inLanguage: language.value === "en" ? "en" : "pt-BR",
              isPartOf: { "@id": site.url("/#website") },
              author: { "@id": site.url("/#person") },
              mainEntity:
                options.type === "ProfilePage"
                  ? { "@id": site.url("/#person") }
                  : {
                      "@type": "ItemList",
                      itemListElement: (options.items?.() ?? []).map(
                        (item, index) => ({
                          "@type": "ListItem",
                          position: index + 1,
                          item,
                        }),
                      ),
                    },
            },
          ],
        }).replace(/</g, "\\u003c"),
      },
    ],
  }));
};
