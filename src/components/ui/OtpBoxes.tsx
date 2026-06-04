import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
} from "react";

import { useOtpInput } from "../../hooks/useOtpInput.ts";

export type OtpBoxesHandle = {
  focusFirst: () => void;
};

export type OtpBoxesProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: string;
  disabled?: boolean;
  autoFocus?: boolean;
};

export const OtpBoxes = forwardRef<OtpBoxesHandle, OtpBoxesProps>(function OtpBoxes(
  { value, onChange, length = 4, error, disabled = false, autoFocus = false },
  ref,
) {
  const { digits, setRef, focusInput, handleChange, handleKeyDown, handlePaste } =
    useOtpInput({
      value,
      onChange,
      length,
    });
  const errorId = useId();

  useImperativeHandle(ref, () => ({ focusFirst: () => focusInput(0) }), [focusInput]);

  useEffect(() => {
    if (autoFocus) {
      focusInput(0);
    }
  }, [autoFocus, focusInput]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-start gap-3 sm:gap-6 lg:gap-[57px]" role="group" aria-label="One-time password">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={setRef(index)}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={length}
            value={digit}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of ${length}`}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            className={[
              "h-12 w-12 rounded-lg border bg-white text-center text-[16px] leading-[24px] font-semibold text-[#132C4A] transition-colors lg:h-14 lg:w-14",
              "focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100",
              "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
              error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-slate-200",
            ].join(" ")}
          />
        ))}
      </div>
      {error ? (
        <p id={errorId} className="text-left text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
});
