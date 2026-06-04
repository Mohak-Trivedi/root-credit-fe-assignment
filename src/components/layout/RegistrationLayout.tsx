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
    <div className="relative flex min-h-screen w-full flex-col overflow-y-auto bg-[#F6F7F9] font-rubik lg:block lg:h-screen lg:overflow-hidden">
      <LeftPanel />
      <main className="flex w-full flex-col rounded-2xl bg-white px-5 py-8 shadow-sm lg:absolute lg:top-[81px] lg:right-12 lg:bottom-12 lg:w-[49.2%] lg:overflow-y-auto lg:px-16 lg:py-11">
        <div className="flex flex-1 flex-col">{children}</div>
      </main>
      <div className="pointer-events-none order-first w-full px-1 pt-6 lg:absolute lg:top-[81px] lg:right-12 lg:z-10 lg:w-[49.2%] lg:px-px lg:pt-0">
        <ProgressBar currentStep={stepIndex} />
      </div>
    </div>
  );
}
