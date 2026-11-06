export interface SocialLink {
  name: string;
  url: string;
}

export class PortfolioProfile {
  constructor(
    public readonly name: string,
    public readonly stack: string[],
    public readonly socials: SocialLink[],
  ) {}
}
