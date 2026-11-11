export type CollectionSlug = "ai-assisted" | "work" | "legacy";

export interface CollectionCategoryData {
  slug: CollectionSlug;
  number: string;
  symbol: string;
  name: string;
  description: string;
  empty: string;
}

export class CollectionCategory {
  readonly slug: CollectionSlug;
  readonly number: string;
  readonly symbol: string;
  readonly name: string;
  readonly description: string;
  readonly empty: string;

  constructor(data: CollectionCategoryData) {
    this.slug = data.slug;
    this.number = data.number;
    this.symbol = data.symbol;
    this.name = data.name;
    this.description = data.description;
    this.empty = data.empty;
  }

  get path(): string {
    return `/${this.slug}`;
  }

  get kind(): string {
    return this.slug === "ai-assisted" ? "ai" : this.slug;
  }
}
