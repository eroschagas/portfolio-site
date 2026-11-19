export class GalleryImageLoader {
  private readonly images = new Map<string, HTMLImageElement>();

  async prepare(source: string): Promise<void> {
    const image = this.load(source, "high");
    await image.decode();
  }

  preload(sources: string[], selectedIndex: number): void {
    const selected = sources[selectedIndex];
    if (selected) this.load(selected, "high");
    sources
      .filter((source) => source !== selected)
      .forEach((source) => {
        this.load(source, "low");
      });
  }

  private load(source: string, priority: "high" | "low"): HTMLImageElement {
    const existing = this.images.get(source);
    if (existing) return existing;
    const image = new Image();
    this.images.set(source, image);
    image.decoding = "async";
    image.fetchPriority = priority;
    image.src = source;
    void image.decode().catch(() => this.images.delete(source));
    return image;
  }

  clear(): void {
    this.images.clear();
  }
}
