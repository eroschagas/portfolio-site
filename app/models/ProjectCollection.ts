import { Project, type ProjectData } from "./Project";

export class ProjectCollection {
  readonly projects: Project[];

  constructor(data: ProjectData[]) {
    this.projects = data.map((project) => new Project(project));
  }

  get isEmpty(): boolean {
    return this.projects.length === 0;
  }
}
