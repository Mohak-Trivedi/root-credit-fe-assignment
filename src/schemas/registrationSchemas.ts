import { z } from "zod";

import { findCountryByCode } from "../constants/countryCodes.ts";
import { ACCOUNT_TYPES } from "../types/registration.ts";
import { isValidMobile } from "../utils/phone.ts";

const accountTypeValues = ACCOUNT_TYPES;

export const accountTypeSchema = z.object({
  accountType: z.enum(accountTypeValues, {
    message: "Select an account type",
  }),
});

export const mobileSchema = z
  .object({
    countryCode: z.string().min(1, "Select a country code"),
    mobile: z.string().min(1, "Mobile number is required"),
  })
  .superRefine((data, ctx) => {
    if (!data.mobile) {
      return;
    }
    if (!isValidMobile(data.mobile, data.countryCode)) {
      const label = findCountryByCode(data.countryCode)?.label ?? "this country";
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["mobile"],
        message: `Enter a valid ${label} phone number`,
      });
    }
  });

export const otpSchema = z.object({
  otp: z
    .string()
    .length(4, "Enter a 4-digit code")
    .regex(/^\d{4}$/, "Enter a 4-digit code"),
});

const nameField = (fieldName: string) =>
  z
    .string()
    .trim()
    .min(1, `${fieldName} is required`)
    .max(50, `${fieldName} must be 50 characters or fewer`)
    .regex(/^[A-Za-z\s'\-]+$/, `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`);

export const nameSchema = z.object({
  firstName: nameField("First name"),
  lastName: nameField("Last name"),
});

export const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type AccountTypeFormValues = z.infer<typeof accountTypeSchema>;
export type MobileFormValues = z.infer<typeof mobileSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
export type NameFormValues = z.infer<typeof nameSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>;
