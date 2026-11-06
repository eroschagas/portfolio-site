# Project instructions

These instructions apply to all work in this portfolio repository.

## Component-based architecture

- Always use component-based architecture. Pages compose focused, reusable components; do not build entire screens as monolithic components.
- Keep layout components, home sections, and project components in their respective directories under `app/components`.
- Keep presentation in components, domain behavior in models, data access in services, and shared reactive integration in composables.
- Reuse existing components and established conventions before introducing new abstractions.

## Object-oriented design

- Always use object-oriented design for domain data, business logic, and services. Model responsibilities with typed classes, encapsulation, and explicit interfaces.
- Extend the existing `Project`, `ProjectCollection`, `PortfolioProfile`, and `ProjectRepository` abstractions when appropriate.
- Prefer composition over inheritance and keep each class focused on one responsibility. Avoid unnecessary class hierarchies and global mutable state.
- Integrate class instances with Vue's Composition API. Keep Vue components in `<script setup lang="ts">`; do not replace Vue's reactivity with class-based UI components.
- Declare props using `const props = defineProps({ ... })` with runtime `type` options, rather than type-only generic declarations.

## Portuguese and English content

- Always provide all visitor-facing content in both English and Portuguese, including new UI labels, descriptions, empty states, error messages, accessibility labels, metadata, and structured-data text.
- English is the default language. Preserve an explicitly selected language and keep the language switch available across pages.
- Use the shared translation mechanism instead of scattering language conditions throughout components.
- Keep the HTML `lang` attribute accurate: `en` for English and `pt-BR` for Brazilian Portuguese.
- For new project entries, use localized `name` and `description` objects with both `en` and `pt`. Identical proper names may be repeated in both fields. Plain strings remain supported for existing language-independent values.
- Keep AI Assisted projects in `app/data/ai-assisted.json` and Legacy projects in `app/data/legacy.json`. Each entry must contain `name`, `description`, and `link`; `github` is optional. Use absolute HTTP or HTTPS links.
- Never invent personal facts, employers, achievements, projects, or profile URLs to fill missing content.

## SEO and search discoverability

Always apply current SEO best practices to every public page and provide the technical configuration and metadata needed for search engines and AI-powered search systems to discover and understand its content.

- Render meaningful content, navigation, links, and metadata in server-rendered or prerendered HTML. Essential information must be accessible without clicks or client-side JavaScript execution.
- Use semantic HTML, a descriptive primary heading, logical heading levels, descriptive anchor text, accessible controls, and meaningful image alternative text in the selected language.
- Provide unique, accurate, localized page titles and meta descriptions through Nuxt's `useSeoMeta` and `useHead` APIs.
- Configure the production site origin centrally. Generate absolute canonical URLs, consistent redirects, and appropriate indexing directives. Do not publish localhost, placeholder domains, or fabricated URLs as canonical URLs.
- For independently indexed language versions, provide stable, crawlable locale URLs, self-referencing canonicals, and reciprocal `hreflang` links for `en`, `pt-BR`, and an appropriate `x-default`. A cookie-only language switch does not make both translations independently indexable. Do not advertise alternate language URLs that do not actually exist.
- Maintain an XML sitemap containing public canonical URLs and available language alternates. Reference it from `robots.txt`; use accurate modification dates when available.
- Ensure production `robots.txt`, robots metadata, HTTP headers, hosting rules, and CDN or firewall settings allow intended public pages and required assets to be crawled. Keep private and preview environments out of search indexes.
- Return correct HTTP status codes, including real 404 responses for missing pages. Avoid broken links, redirect chains, duplicate pages, and soft 404s.
- Provide Open Graph and social card metadata, including localized title and description, canonical page URL, site name, locale and locale alternates, and a real share image with its alternative text and dimensions when available. These support previews; they are not guarantees of ranking or AI inclusion.
- Add valid JSON-LD using applicable Schema.org types such as `Person`, `WebSite`, `ProfilePage`, `CollectionPage`, `CreativeWork`, or `SoftwareSourceCode`. Select types that accurately describe the page, use stable identifiers, and include available author, language, URL, description, and verified social profile information where appropriate.
- Structured data must match visible content. Never fabricate credentials, ratings, dates, or entities, and do not expose private information.
- Preserve performance and Core Web Vitals: optimize images and fonts, reserve media dimensions, minimize unnecessary JavaScript, and avoid layout shifts.

## AI-powered search

- Make identity, expertise, project purpose, technology stack, contributions, and outcomes explicit in readable text whenever real information is available. Use descriptive summaries and clear relationships between the author and projects.
- Keep content helpful, factual, current, and consistent between visible pages, translations, metadata, JSON data, and structured data. Link to relevant public evidence and repositories when available.
- Verify current official crawler documentation before changing provider-specific bot rules. Support intended search and retrieval crawlers without treating search access as authorization for model training; these are separate policies.
- Do not invent universal AI SEO parameters, special AI meta tags, or mandatory AI-specific Schema.org types. No metadata file or optimization can guarantee indexing, ranking, citation, or inclusion in an AI answer.
- Treat optional mechanisms such as `llms.txt` as supplementary and dependent on actual provider support, never as a replacement for crawlable HTML, sitemaps, robots configuration, or useful content.
- Report missing production domains, real share images, verified profile links, hosting access, or other required deployment values instead of fabricating them. Prepare the implementation with configurable values when possible.

Official references to consult when implementing or updating discoverability:

- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Google AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a)

## Implementation and validation

- Check `package.json` before using framework or library APIs. Follow the installed Nuxt, Vue, and tool versions.
- Keep the header fixed at the top and full width; preserve the content offset and anchor spacing on desktop and mobile.
- Preserve responsive layouts, keyboard access, visible focus states, and reduced-motion preferences.
- Read and write text files explicitly as UTF-8 and check for replacement characters or mojibake after editing.
- Run checks appropriate to the change. For application changes, run `npm run build`; for project model changes, run `node --experimental-strip-types --test tests/project.test.mjs` on a compatible Node version.
- When changing SEO or localization, check the rendered HTML for both languages, metadata, canonical and alternate URLs, structured data, status codes, and crawlability. Report checks that require unavailable deployment or browser access.
- Never create commits or run `git pull` without the user's prior, explicit approval for that specific action.
