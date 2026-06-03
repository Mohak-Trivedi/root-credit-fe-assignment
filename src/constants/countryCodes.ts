export type CountryCodeOption = {
  flag: string;
  code: string;
  label: string;
};

export const COUNTRY_CODES: readonly CountryCodeOption[] = [
  { flag: "🇺🇸", code: "+1", label: "United States" },
  { flag: "🇬🇧", code: "+44", label: "United Kingdom" },
  { flag: "🇨🇦", code: "+1", label: "Canada" },
  { flag: "🇦🇺", code: "+61", label: "Australia" },
  { flag: "🇮🇳", code: "+91", label: "India" },
  { flag: "🇩🇪", code: "+49", label: "Germany" },
  { flag: "🇫🇷", code: "+33", label: "France" },
  { flag: "🇯🇵", code: "+81", label: "Japan" },
  { flag: "🇧🇷", code: "+55", label: "Brazil" },
  { flag: "🇲🇽", code: "+52", label: "Mexico" },
  { flag: "🇿🇦", code: "+27", label: "South Africa" },
  { flag: "🇸🇬", code: "+65", label: "Singapore" },
] as const;

export const DEFAULT_COUNTRY_CODE = COUNTRY_CODES[0].code;

export function findCountryByCode(code: string): CountryCodeOption | undefined {
  return COUNTRY_CODES.find((country) => country.code === code);
}
