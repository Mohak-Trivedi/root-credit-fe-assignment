import { AnimatePresence } from "framer-motion";
import type { ReactElement } from "react";

import { useRegistration } from "../hooks/useRegistration.ts";
import type { StepId } from "../types/registration.ts";
import { RegistrationLayout } from "./layout/RegistrationLayout.tsx";
import { AccountTypeStep } from "./steps/AccountTypeStep.tsx";
import { MobileNumberStep } from "./steps/MobileNumberStep.tsx";
import { NameStep } from "./steps/NameStep.tsx";
import { OtpStep } from "./steps/OtpStep.tsx";
import { PasswordStep } from "./steps/PasswordStep.tsx";
import { SuccessModal } from "./steps/SuccessModal.tsx";

const STEP_COMPONENTS: Record<StepId, () => ReactElement> = {
  accountType: AccountTypeStep,
  mobileNumber: MobileNumberStep,
  otp: OtpStep,
  name: NameStep,
  password: PasswordStep,
};

export function RegistrationWizard() {
  const { currentStep, isComplete } = useRegistration();
  const StepComponent = STEP_COMPONENTS[currentStep];

  return (
    <RegistrationLayout>
      <AnimatePresence mode="wait">
        {!isComplete ? <StepComponent key={currentStep} /> : null}
      </AnimatePresence>
      <SuccessModal />
    </RegistrationLayout>
  );
}
