import { SiteDiscovery } from "~/models/SiteDiscovery";
import type { Language } from "~/models/Project";
import type { ProjectCollection } from "~/models/ProjectCollection";
import type { WorkCompany } from "~/models/WorkCompany";

export class SeoProjectMapper {
  constructor(private readonly site: SiteDiscovery) {}

  companies(
    companies: WorkCompany[],
    language: Language,
  ): Record<string, unknown>[] {
    return companies.map((company) => ({
      "@type": "CollectionPage",
      name: company.getName(language),
      description: company.getDescription(language),
      url: this.site.url(`/work/${company.slug}`, language),
    }));
  }

  projects(
    collection: ProjectCollection,
    language: Language,
  ): Record<string, unknown>[] {
    return collection.projects.map((project) => ({
      "@type": project.github ? "SoftwareSourceCode" : "CreativeWork",
      name: project.getName(language),
      description: project.getDescription(language),
      url: project.link,
      author: { "@id": this.site.url("/#person") },
      ...(project.github ? { codeRepository: project.github } : {}),
      image: project.getImages().map((source) => this.site.url(source)),
    }));
  }

  work(company: WorkCompany, language: Language): Record<string, unknown>[] {
    return company.projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.getName(language),
      description: project.getDescription(language),
      url: `${this.site.url(`/work/${company.slug}`, language)}#${project.getId()}`,
    }));
  }
}
