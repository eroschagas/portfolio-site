import {
  WorkContent,
  type WorkContentData,
  type WorkText,
} from "./WorkContent";
import type { Language } from "./Project";

export interface WorkImageData {
  alt: WorkText;
  description: WorkText;
}

export interface WorkImageMetadata {
  alt: string;
  description: string;
}

export interface WorkProjectData extends WorkContentData {
  id: string;
  images?: WorkImageData[];
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

  getImageMetadata(index: number, language: Language): WorkImageMetadata {
    const image = this.data.images?.[index];
    return {
      alt: image?.alt[language] ?? "",
      description: image?.description[language] ?? "",
    };
  }
}
