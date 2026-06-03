import { useOtpInput } from "../../hooks/useOtpInput.ts";

export type OtpBoxesProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: string;
  disabled?: boolean;
};

export function OtpBoxes({
  value,
  onChange,
  length = 4,
  error,
  disabled = false,
}: OtpBoxesProps) {
  const { digits, setRef, handleChange, handleKeyDown, handlePaste } = useOtpInput({
    value,
    onChange,
    length,
  });

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-center gap-3" role="group" aria-label="One-time password">
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
            aria-invalid={error ? true : undefined}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            className={[
              "h-14 w-14 rounded-lg border bg-white text-center text-xl font-semibold text-[#132C4A] transition-colors",
              "focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100",
              "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
              error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-slate-200",
            ].join(" ")}
          />
        ))}
      </div>
      {error ? (
        <p className="text-center text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
