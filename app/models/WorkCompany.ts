import { WorkContent, type WorkContentData } from "./WorkContent";
import { WorkProject, type WorkProjectData } from "./WorkProject";
import { WorkPeriod } from "./WorkPeriod";

export interface WorkCompanyData extends WorkContentData {
  start: string;
  end?: string;
  projects: WorkProjectData[];
}

export class WorkCompany extends WorkContent {
  readonly projects: WorkProject[];
  readonly period: WorkPeriod;

  constructor(
    public readonly slug: string,
    data: WorkCompanyData,
  ) {
    super(data);
    this.period = new WorkPeriod(data.start, data.end);
    this.projects = data.projects.map((project) => new WorkProject(project));
  }
}
