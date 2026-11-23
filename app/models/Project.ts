export type Language = "pt" | "en";
export type LocalizedText = string | Record<Language, string>;

export interface ProjectImageData {
  src: string;
  alt: Record<Language, string>;
  description?: Record<Language, string>;
}

export interface ProjectData {
  name: LocalizedText;
  description: LocalizedText;
  link: string;
  github?: string;
  images?: ProjectImageData[];
}

export class Project {
  readonly name: LocalizedText;
  readonly description: LocalizedText;
  readonly link: string;
  readonly github?: string;
  private readonly images: ProjectImageData[];

  constructor(data: ProjectData) {
    this.name = data.name;
    this.description = data.description;
    this.link = this.getHttpUrl(data.link);
    this.github = data.github ? this.getHttpUrl(data.github) : undefined;
    this.images = (data.images ?? []).map((image) => ({
      src: this.getImageSource(image.src),
      alt: { ...image.alt },
      description: image.description ? { ...image.description } : undefined,
    }));
  }

  getImages(): string[] {
    return this.images.map((image) => image.src);
  }

  getImageMetadata(language: Language): { alt: string; description: string }[] {
    return this.images.map((image) => ({
      alt: image.alt[language],
      description: image.description?.[language] ?? "",
    }));
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

  private getImageSource(value: string): string {
    if (
      value.startsWith("/") &&
      !value.startsWith("//") &&
      !value.includes("\\")
    ) {
      return value;
    }
    return this.getHttpUrl(value);
  }
}
