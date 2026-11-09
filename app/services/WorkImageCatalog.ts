export class WorkImageCatalog {
  private readonly images: Record<string, string[]>;

  constructor(images: Record<string, string[]>) {
    this.images = images;
  }

  getImages(projectId: string): string[] {
    return this.images[projectId] ?? [];
  }
}
