import { WorkContent, type WorkContentData } from "./WorkContent";

export interface WorkProjectData extends WorkContentData {
  id: string;
}

export class WorkProject extends WorkContent {
  constructor(private readonly data: WorkProjectData) {
    super(data);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.id)) {
      throw new Error(`Invalid work project slug: ${data.id}`);
    }
  }

  getId(): string {
    return this.data.id;
  }
}
