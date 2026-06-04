import { motion } from "framer-motion";
import type { FormEvent, ReactNode } from "react";

import { StepFooter, type StepFooterProps } from "./StepFooter.tsx";

export type StepShellProps = {
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
} & Pick<
  StepFooterProps,
  "continueLabel" | "continueDisabled" | "continueType" | "showBack" | "onContinue"
>;

export function StepShell({
  title,
  subtitle,
  children,
  onSubmit,
  continueLabel,
  continueDisabled,
  continueType = "submit",
  showBack,
  onContinue,
}: StepShellProps) {
  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex min-h-0 flex-1 flex-col"
    >
      <header className="mb-6 lg:mb-8">
        <h2 className="text-xl font-semibold text-[#132C4A] lg:text-2xl">{title}</h2>
        {subtitle ? (
          <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>
        ) : null}
      </header>

      <div className="flex flex-1 flex-col gap-5 lg:gap-6">{children}</div>

      <StepFooter
        onContinue={onContinue}
        continueLabel={continueLabel}
        continueDisabled={continueDisabled}
        continueType={continueType}
        showBack={showBack}
      />
    </motion.form>
  );
}
