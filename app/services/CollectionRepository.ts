import { CollectionCategory } from "~/models/CollectionCategory";
import type { PortfolioTranslations } from "~/data/translations";

export class CollectionRepository {
  getCategories(t: PortfolioTranslations): CollectionCategory[] {
    return [
      new CollectionCategory({
        slug: "ai-assisted",
        number: "01",
        symbol: "✳",
        name: t.header.aiAssisted,
        description: t.ai,
        empty: t.empty,
      }),
      new CollectionCategory({
        slug: "work",
        number: "02",
        symbol: "⌘",
        name: t.header.work,
        description: t.work,
        empty: t.emptyWork,
      }),
      new CollectionCategory({
        slug: "legacy",
        number: "03",
        symbol: "</>",
        name: t.header.legacy,
        description: t.legacy,
        empty: t.emptyLegacy,
      }),
    ];
  }
}
