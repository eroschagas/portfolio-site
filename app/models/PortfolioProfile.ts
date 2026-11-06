export interface SocialLink {
  name: string;
  url: string;
}

export class PortfolioProfile {
  constructor(
    public readonly name: string,
    public readonly stack: LocalizedText[],
    public readonly socials: SocialLink[],
  ) {}

  getStack(language: Language): string[] {
    return this.stack.map((technology) =>
      typeof technology === "string" ? technology : technology[language],
    );
  }
}
import type { Language, LocalizedText } from "./Project";
