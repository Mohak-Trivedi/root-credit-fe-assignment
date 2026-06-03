import { TOTAL_STEPS } from "../../constants/steps.ts";

export type ProgressBarProps = {
  /** Zero-based index of the active registration step. */
  currentStep: number;
};

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const progressValue = Math.min(currentStep + 1, TOTAL_STEPS);

  return (
    <div
      className="flex w-full gap-2"
      role="progressbar"
      aria-valuenow={progressValue}
      aria-valuemin={1}
      aria-valuemax={TOTAL_STEPS}
      aria-label={`Registration progress, step ${progressValue} of ${TOTAL_STEPS}`}
    >
      {Array.from({ length: TOTAL_STEPS }, (_, index) => (
        <div
          key={index}
          className={[
            "h-1.5 flex-1 rounded-full transition-colors duration-300",
            index <= currentStep ? "bg-[#2563eb]" : "bg-slate-200",
          ].join(" ")}
          aria-hidden
        />
      ))}
    </div>
  );
}
