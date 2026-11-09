import type { Language, LocalizedText } from "./Project";

export type WorkText = Record<Language, string>;

export interface WorkContentData {
  name: LocalizedText;
  description: WorkText;
}

export abstract class WorkContent {
  constructor(protected readonly content: WorkContentData) {}

  getName(language: Language): string {
    return typeof this.content.name === "string"
      ? this.content.name
      : this.content.name[language];
  }

  getDescription(language: Language): string {
    return this.content.description[language];
  }
}
