export interface Environment {
  production: boolean;
  constants?: {
    cssOverride: object,
    language: {
      default: string;
      supported: string[];
    },
    logo: {
      forMenu: string;
      forHeader: string;
    }
  },
  featureFlags?: any;
}
