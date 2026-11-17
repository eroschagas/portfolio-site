import { WorkContent, type WorkContentData } from "./WorkContent";

export interface WorkProjectData extends WorkContentData {
  id: string;
  subprojects?: WorkProjectData[];
}

export class WorkProject extends WorkContent {
  readonly subprojects: readonly WorkProject[];
  constructor(private readonly data: WorkProjectData) {
    super(data);
    this.subprojects = (data.subprojects ?? []).map(
      (project) => new WorkProject(project)
    );
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.id)) {
      throw new Error(`Invalid work project slug: ${data.id}`);
    }
  }

  getId(): string {
    return this.data.id;
  }
}
