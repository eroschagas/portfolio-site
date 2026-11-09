import { WorkCompany, type WorkCompanyData } from "~/models/WorkCompany";

const companies = import.meta.glob<WorkCompanyData>("../data/work/*.json", {
  eager: true,
  import: "default",
});

export class WorkRepository {
  getCompanies(): WorkCompany[] {
    return Object.entries(companies)
      .map(
        ([file, data]) =>
          new WorkCompany(
            file
              .split("/")
              .pop()!
              .replace(/\.json$/, ""),
            data,
          ),
      )
      .sort(
        (left, right) =>
          left.period.compareRecent(right.period) ||
          left.slug.localeCompare(right.slug),
      );
  }

  findCompany(slug: string): WorkCompany | undefined {
    return this.getCompanies().find((company) => company.slug === slug);
  }
}
