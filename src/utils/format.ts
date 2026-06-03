import type { AccountType, RegistrationData } from "../types/registration.ts";

export function formatAccountType(type?: AccountType): string {
  if (!type) {
    return "—";
  }
  return type === "personal" ? "Personal" : "Business";
}

export function formatFullName(
  data: Pick<RegistrationData, "firstName" | "lastName">,
): string {
  const parts = [data.firstName, data.lastName].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : "—";
}

export function formatMaskedMobile(
  countryCode?: string,
  mobile?: string,
): string {
  if (!mobile) {
    return "—";
  }

  const code = countryCode ?? "";
  const digits = mobile.replace(/\D/g, "");

  if (digits.length <= 4) {
    return `${code} ${digits}`.trim();
  }

  const visible = digits.slice(-4);
  const masked = digits
    .slice(0, -4)
    .replace(/\d/g, "*")
    .replace(/(.{3})/g, "$1 ")
    .trim();

  return `${code} ${masked} ${visible}`.replace(/\s+/g, " ").trim();
}
