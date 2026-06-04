import { Button } from "../ui/Button.tsx";
import { useRegistration } from "../../hooks/useRegistration.ts";

export type StepFooterProps = {
  onContinue?: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  continueType?: "button" | "submit";
  showBack?: boolean;
};

export function StepFooter({
  onContinue,
  continueLabel = "Continue",
  continueDisabled = false,
  continueType = "submit",
  showBack,
}: StepFooterProps) {
  const { back, canGoBack } = useRegistration();
  const displayBack = showBack ?? canGoBack;

  return (
    <div className="mt-auto flex gap-4 pt-10">
      {displayBack ? (
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={back}
        >
          Back
        </Button>
      ) : null}
      <Button
        type={continueType}
        variant="primary"
        className={displayBack ? "flex-1" : "w-full"}
        disabled={continueDisabled}
        onClick={continueType === "button" ? onContinue : undefined}
      >
        {continueLabel}
      </Button>
    </div>
  );
}
