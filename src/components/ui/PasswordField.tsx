import { forwardRef, useId, useState, type InputHTMLAttributes } from "react";

export type PasswordFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type"> & {
  label: string;
  helperText?: string;
  error?: string;
  id?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  helperClassName?: string;
};

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1 1 0 0 1 0-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(
    { label, helperText, error, className = "", id: idProp, labelClassName, wrapperClassName, helperClassName, ...inputProps },
    ref,
  ) {
    const [visible, setVisible] = useState(false);
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const helperId = helperText ? `${id}-helper` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex w-full flex-col">
        <div className={`flex flex-col ${wrapperClassName ?? "gap-1.5"}`}>
          <label htmlFor={id} className={labelClassName ?? "text-sm font-medium text-[#132C4A]"}>
            {label}
          </label>
          <div className="relative">
            <input
              ref={ref}
              id={id}
              type={visible ? "text" : "password"}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
              className={[
                "w-full rounded-lg border bg-white py-3 pl-4 pr-12 text-sm text-[#132C4A] transition-colors",
                "focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100",
                error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-slate-200",
                className,
              ]
                .filter(Boolean)
                .join(" ")}
              {...inputProps}
            />
            <button
              type="button"
              onClick={() => setVisible((current) => !current)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 transition-colors hover:text-[#132C4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#132C4A]/25"
              aria-label={visible ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              <EyeIcon open={visible} />
            </button>
          </div>
        </div>
        {error ? (
          <p id={errorId} className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className={helperClassName ?? "mt-2 text-sm text-slate-500"}>
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);
