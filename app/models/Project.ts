export type Language = "pt" | "en";
export type LocalizedText = string | Record<Language, string>;

export interface ProjectData {
  name: LocalizedText;
  description: LocalizedText;
  link: string;
  github?: string;
}

export class Project {
  readonly name: LocalizedText;
  readonly description: LocalizedText;
  readonly link: string;
  readonly github?: string;

  constructor(data: ProjectData) {
    this.name = data.name;
    this.description = data.description;
    this.link = this.getHttpUrl(data.link);
    this.github = data.github ? this.getHttpUrl(data.github) : undefined;
  }

  getName(language: Language): string {
    return this.localize(this.name, language);
  }

  getDescription(language: Language): string {
    return this.localize(this.description, language);
  }

  private localize(text: LocalizedText, language: Language): string {
    return typeof text === "string" ? text : text[language];
  }

  private getHttpUrl(value: string): string {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol)) {
      throw new Error("Project links must use HTTP or HTTPS.");
    }
    return url.href;
  }
}
