import type { StepId } from "../types/registration.ts";

export type StepMeta = {
  id: StepId;
  title: string;
  subtitle: string;
};

export const STEPS: readonly StepMeta[] = [
  {
    id: "accountType",
    title: "Account type",
    subtitle: "Choose how you'll use Root Credit",
  },
  {
    id: "mobileNumber",
    title: "Mobile number",
    subtitle: "We'll send you a verification code",
  },
  {
    id: "otp",
    title: "OTP Verification",
    subtitle: "",
  },
  {
    id: "name",
    title: "Your name",
    subtitle: "Tell us what to call you",
  },
  {
    id: "password",
    title: "Create a password",
    subtitle: "Use at least 6 characters to secure your account",
  },
] as const;

export const STEP_ORDER: readonly StepId[] = STEPS.map((step) => step.id);

export const TOTAL_STEPS = STEPS.length;

export function getStepIndex(stepId: StepId): number {
  return STEP_ORDER.indexOf(stepId);
}

export function getStepMeta(stepId: StepId): StepMeta {
  const step = STEPS.find((item) => item.id === stepId);
  if (!step) {
    throw new Error(`Unknown step: ${stepId}`);
  }
  return step;
}
