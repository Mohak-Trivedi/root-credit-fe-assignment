export type AccountType = "personal" | "business";

export type StepId =
  | "accountType"
  | "mobileNumber"
  | "otp"
  | "name"
  | "password";

export type RegistrationData = {
  accountType?: AccountType;
  countryCode?: string;
  mobile?: string;
  otp?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
};

export const ACCOUNT_TYPES = ["personal", "business"] as const satisfies readonly AccountType[];

export const STEP_IDS = [
  "accountType",
  "mobileNumber",
  "otp",
  "name",
  "password",
] as const satisfies readonly StepId[];
