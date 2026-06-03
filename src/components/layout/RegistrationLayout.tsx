import type { ReactNode } from "react";

import { useRegistration } from "../../hooks/useRegistration.ts";
import { LeftPanel } from "./LeftPanel.tsx";
import { ProgressBar } from "./ProgressBar.tsx";

export type RegistrationLayoutProps = {
  children: ReactNode;
};

export function RegistrationLayout({ children }: RegistrationLayoutProps) {
  const { stepIndex } = useRegistration();

  return (
    <div className="flex min-h-screen bg-white font-rubik">
      <LeftPanel />
      <main className="flex min-h-screen flex-1 flex-col px-6 py-8 sm:px-10 lg:px-14 xl:px-16">
        <ProgressBar currentStep={stepIndex} />
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col pt-10 pb-6">
          {children}
        </div>
      </main>
    </div>
  );
}
