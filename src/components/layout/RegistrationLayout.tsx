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
    <div className="relative h-screen w-full overflow-hidden bg-[#F6F7F9] font-rubik">
      <LeftPanel />
      <main className="absolute top-[81px] right-12 bottom-12 flex w-[49.2%] flex-col overflow-y-auto rounded-2xl bg-white px-16 py-11 shadow-sm">
        <div className="flex flex-1 flex-col">{children}</div>
      </main>
      <div className="pointer-events-none absolute top-[81px] right-12 z-10 w-[49.2%] px-px">
        <ProgressBar currentStep={stepIndex} />
      </div>
    </div>
  );
}
