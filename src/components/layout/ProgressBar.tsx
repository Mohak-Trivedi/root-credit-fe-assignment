import { TOTAL_STEPS } from "../../constants/steps.ts";

export type ProgressBarProps = {
  /** Zero-based index of the active registration step. */
  currentStep: number;
};

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const progressValue = Math.min(currentStep + 1, TOTAL_STEPS);
  const percent = (progressValue / TOTAL_STEPS) * 100;

  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
      role="progressbar"
      aria-valuenow={progressValue}
      aria-valuemin={1}
      aria-valuemax={TOTAL_STEPS}
      aria-label={`Registration progress, step ${progressValue} of ${TOTAL_STEPS}`}
    >
      <div
        className="h-full rounded-full bg-[#2563eb] transition-all duration-300 ease-out"
        style={{ width: `${percent}%` }}
        aria-hidden
      />
    </div>
  );
}
