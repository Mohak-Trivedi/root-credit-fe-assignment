import { z } from "zod";

import { ACCOUNT_TYPES } from "../types/registration.ts";

const accountTypeValues = ACCOUNT_TYPES;

export const accountTypeSchema = z.object({
  accountType: z.enum(accountTypeValues, {
    message: "Select an account type",
  }),
});

export const mobileSchema = z.object({
  countryCode: z.string().min(1, "Select a country code"),
  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^\d+$/, "Enter numbers only"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(4, "Enter a 4-digit code")
    .regex(/^\d{4}$/, "Enter a 4-digit code"),
});

export const nameSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
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
