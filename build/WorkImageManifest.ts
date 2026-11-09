import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

export class WorkImageManifest {
  private readonly directory: string;

  constructor(directory: string) {
    this.directory = directory;
  }

  generate(): Record<string, string[]> {
    if (!existsSync(this.directory)) return {};
    return Object.fromEntries(
      readdirSync(this.directory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((folder) => [folder.name, this.getImages(folder.name)]),
    );
  }

  private getImages(projectId: string): string[] {
    return readdirSync(join(this.directory, projectId), { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isFile() &&
          /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(entry.name),
      )
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right, "en", { numeric: true }))
      .map(
        (file) =>
          `/work/${encodeURIComponent(projectId)}/${encodeURIComponent(file)}`,
      );
  }
}
