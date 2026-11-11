export class GalleryImageLoader {
  private readonly images = new Map<string, HTMLImageElement>();

  preload(sources: string[], selectedIndex: number): void {
    const selected = sources[selectedIndex];
    if (selected) this.load(selected, "high");
    sources
      .filter((source) => source !== selected)
      .forEach((source) => {
        this.load(source, "low");
      });
  }

  private load(source: string, priority: "high" | "low"): void {
    if (this.images.has(source)) return;
    const image = new Image();
    this.images.set(source, image);
    image.decoding = "async";
    image.fetchPriority = priority;
    image.src = source;
    void image.decode().catch(() => this.images.delete(source));
  }

  clear(): void {
    this.images.clear();
  }
}
