export class ImageCarouselState {
  index = 0;
  count: number;

  constructor(count: number) {
    this.count = count;
  }

  select(index: number): void {
    this.index =
      this.count > 0 ? ((index % this.count) + this.count) % this.count : 0;
  }

  previous(): void {
    this.select(this.index - 1);
  }

  next(): void {
    this.select(this.index + 1);
  }

  reset(count: number): void {
    this.count = count;
    this.select(0);
  }
}
