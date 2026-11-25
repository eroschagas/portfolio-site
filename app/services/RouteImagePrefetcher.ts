export interface ImagePreparer {
  prepare(source: string, priority: "high" | "low"): Promise<void>;
}

export class RouteImagePrefetcher {
  private readonly pending = new Map<string, Promise<void>>();
  private readonly resolveImages: (path: string) => Promise<string[]>;
  private readonly loader: ImagePreparer;

  constructor(
    resolveImages: (path: string) => Promise<string[]>,
    loader: ImagePreparer,
  ) {
    this.resolveImages = resolveImages;
    this.loader = loader;
  }

  prefetch(path: string): Promise<void> {
    const existing = this.pending.get(path);
    if (existing) return existing;

    const task = this.resolveImages(path)
      .then((sources) =>
        Promise.all(
          [...new Set(sources)].map((source) =>
            this.loader.prepare(source, "low"),
          ),
        ),
      )
      .then(() => {})
      .catch(() => {
        // A failed speculative request must not prevent navigation or a retry.
        this.pending.delete(path);
      });
    this.pending.set(path, task);
    return task;
  }
}
