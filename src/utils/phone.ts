import {
  AsYouType,
  getExampleNumber,
  isValidPhoneNumber,
  type CountryCode,
} from "libphonenumber-js";
import examples from "libphonenumber-js/examples.mobile.json";

import { findCountryByCode } from "../constants/countryCodes.ts";

const FALLBACK_PLACEHOLDER = "8343989239";

export function isoForDialCode(dialCode: string): CountryCode | undefined {
  const iso = findCountryByCode(dialCode)?.iso;
  return iso ? (iso as CountryCode) : undefined;
}

export function formatAsYouType(value: string, iso?: CountryCode): string {
  if (!iso) {
    return value;
  }
  return new AsYouType(iso).input(value);
}

export function getExamplePlaceholder(iso?: CountryCode): string {
  if (!iso) {
    return FALLBACK_PLACEHOLDER;
  }
  const example = getExampleNumber(iso, examples);
  if (!example) {
    return FALLBACK_PLACEHOLDER;
  }
  // Use getNationalNumber() to get subscriber digits without the trunk prefix
  // that some countries (e.g. India) prepend in formatNational(), then format
  // with AsYouType for correct spacing/grouping.
  return new AsYouType(iso).input(example.nationalNumber);
}

export function isValidMobile(value: string, dialCode: string): boolean {
  const iso = isoForDialCode(dialCode);
  if (!iso) {
    return false;
  }
  return isValidPhoneNumber(value, iso);
}
