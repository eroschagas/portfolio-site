import aiAssisted from "~/data/ai-assisted";
import legacy from "~/data/legacy";
import { ProjectCollection } from "~/models/ProjectCollection";
import type { ProjectData } from "~/models/Project";

export class ProjectRepository {
  getCollection(category: string): ProjectCollection {
    const collections: Record<string, ProjectData[]> = {
      "ai-assisted": aiAssisted,
      legacy,
    };
    return new ProjectCollection(collections[category] ?? []);
  }
}
