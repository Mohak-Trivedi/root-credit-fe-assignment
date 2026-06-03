import { useContext } from "react";

import {
  RegistrationContext,
  type RegistrationContextValue,
} from "../context/RegistrationContext.tsx";

export function useRegistration(): RegistrationContextValue {
  const context = useContext(RegistrationContext);

  if (!context) {
    throw new Error("useRegistration must be used within a RegistrationProvider");
  }

  return context;
}
