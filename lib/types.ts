export type ParamsResponse = {
  success: boolean;
  data: {
    languages: Record<string, string>;
    currencies: Record<string, string>;
  };
};

export type CountryItem = {
  id: string;
  name: string;
  region: string;
  startingFrom: string;
  isRegion: boolean;
  warnings: string;
  description: string;
  searchTerms: string[];
  flag: string;
  banner: string;
};

export type CountryDetailResponse = {
  data: {
    country: CountryItem;
    plans: CountryPlan[];
  };
  success: boolean;
};

export type CountriesResponse = {
  success: boolean;
  data: CountryItem[];
};

export type CountryPlan = {
  id: number;
  name: string;
  mb: number;
  days: number;
  price: number;
  salePrice: number;
  currency: string;
  gb: number;
  description: string;
  carriers: string[];
  isUnlimited: boolean;
  hasTopUps: boolean;
  isRefundable: boolean;
  isTetheringAllowed: boolean;
  networkSpeed: string;
  activationDays: number;
  thumbnailUrl: string;
  publicUrl: string;
};
