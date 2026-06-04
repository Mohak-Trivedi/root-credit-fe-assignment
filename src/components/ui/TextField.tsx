import { forwardRef, useId, type InputHTMLAttributes } from "react";

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label: string;
  helperText?: string;
  error?: string;
  id?: string;
  hideLabel?: boolean;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, helperText, error, className = "", id: idProp, hideLabel = false, ...inputProps },
    ref,
  ) {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const helperId = helperText ? `${id}-helper` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {hideLabel ? null : (
          <label htmlFor={id} className="text-sm font-medium text-[#132C4A]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={[
            "w-full rounded-lg border bg-white px-4 py-3 text-sm text-[#132C4A] placeholder:text-slate-400 transition-colors",
            "focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100",
            error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-slate-200",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...inputProps}
        />
        {error ? (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-sm text-slate-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);
