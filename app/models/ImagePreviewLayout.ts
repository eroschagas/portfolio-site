export class ImagePreviewLayout {
  readonly capacities = [3, 2, 1];

  constructor(public readonly total: number) {}

  getRemaining(capacity: number): number {
    return Math.max(0, this.total - capacity);
  }
}
