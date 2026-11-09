import type { Language } from "./Project";

export type WorkText = Record<Language, string>;

export interface WorkContentData {
  name: WorkText;
  description: WorkText;
}

export abstract class WorkContent {
  constructor(protected readonly content: WorkContentData) {}

  getName(language: Language): string {
    return this.content.name[language];
  }

  getDescription(language: Language): string {
    return this.content.description[language];
  }
}
