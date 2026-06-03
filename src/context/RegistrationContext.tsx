import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { STEP_ORDER, getStepIndex } from "../constants/steps.ts";
import type { RegistrationData, StepId } from "../types/registration.ts";

const INITIAL_STEP = STEP_ORDER[0];

export type RegistrationContextValue = {
  data: RegistrationData;
  currentStep: StepId;
  isComplete: boolean;
  stepIndex: number;
  canGoBack: boolean;
  setData: (slice: Partial<RegistrationData>) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
};

export const RegistrationContext =
  createContext<RegistrationContextValue | null>(null);

type RegistrationProviderProps = {
  children: ReactNode;
};

export function RegistrationProvider({ children }: RegistrationProviderProps) {
  const [data, setDataState] = useState<RegistrationData>({});
  const [currentStep, setCurrentStep] = useState<StepId>(INITIAL_STEP);
  const [isComplete, setIsComplete] = useState(false);

  const stepIndex = getStepIndex(currentStep);
  const canGoBack = !isComplete && stepIndex > 0;

  const setData = useCallback((slice: Partial<RegistrationData>) => {
    setDataState((prev) => ({ ...prev, ...slice }));
  }, []);

  const next = useCallback(() => {
    const index = getStepIndex(currentStep);
    if (index < STEP_ORDER.length - 1) {
      setCurrentStep(STEP_ORDER[index + 1]!);
      return;
    }
    setIsComplete(true);
  }, [currentStep]);

  const back = useCallback(() => {
    if (isComplete) {
      return;
    }
    const index = getStepIndex(currentStep);
    if (index > 0) {
      setCurrentStep(STEP_ORDER[index - 1]!);
    }
  }, [currentStep, isComplete]);

  const reset = useCallback(() => {
    setDataState({});
    setCurrentStep(INITIAL_STEP);
    setIsComplete(false);
  }, []);

  const value = useMemo<RegistrationContextValue>(
    () => ({
      data,
      currentStep,
      isComplete,
      stepIndex,
      canGoBack,
      setData,
      next,
      back,
      reset,
    }),
    [
      data,
      currentStep,
      isComplete,
      stepIndex,
      canGoBack,
      setData,
      next,
      back,
      reset,
    ],
  );

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
}
