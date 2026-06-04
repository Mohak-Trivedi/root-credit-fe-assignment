export type CountryCodeOption = {
  iso: string;
  flag: string;
  code: string;
  label: string;
};

export const COUNTRY_CODES: readonly CountryCodeOption[] = [
  { iso: "US", flag: "🇺🇸", code: "+1", label: "United States" },
  { iso: "GB", flag: "🇬🇧", code: "+44", label: "United Kingdom" },
  { iso: "CA", flag: "🇨🇦", code: "+1", label: "Canada" },
  { iso: "AU", flag: "🇦🇺", code: "+61", label: "Australia" },
  { iso: "IN", flag: "🇮🇳", code: "+91", label: "India" },
  { iso: "DE", flag: "🇩🇪", code: "+49", label: "Germany" },
  { iso: "FR", flag: "🇫🇷", code: "+33", label: "France" },
  { iso: "JP", flag: "🇯🇵", code: "+81", label: "Japan" },
  { iso: "BR", flag: "🇧🇷", code: "+55", label: "Brazil" },
  { iso: "MX", flag: "🇲🇽", code: "+52", label: "Mexico" },
  { iso: "ZA", flag: "🇿🇦", code: "+27", label: "South Africa" },
  { iso: "SG", flag: "🇸🇬", code: "+65", label: "Singapore" },
] as const;

export const DEFAULT_COUNTRY_CODE = COUNTRY_CODES[0].code;

export function findCountryByCode(code: string): CountryCodeOption | undefined {
  return COUNTRY_CODES.find((country) => country.code === code);
}
