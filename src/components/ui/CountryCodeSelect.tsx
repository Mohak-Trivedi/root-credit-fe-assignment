import { useEffect, useId, useRef, useState } from "react";

import {
  COUNTRY_CODES,
  findCountryByCode,
  type CountryCodeOption,
} from "../../constants/countryCodes.ts";

export type CountryCodeSelectProps = {
  value: string;
  onChange: (code: string) => void;
  label?: string;
  error?: string;
};

export function CountryCodeSelect({
  value,
  onChange,
  label = "Country code",
  error,
}: CountryCodeSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const selected = findCountryByCode(value) ?? COUNTRY_CODES[0];

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function selectOption(option: CountryCodeOption) {
    onChange(option.code);
    setOpen(false);
  }

  return (
    <div
      ref={containerRef}
      className="relative flex w-full min-w-30 flex-col gap-1.5"
    >
      <span className="text-sm font-medium text-[#132C4A]">{label}</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((current) => !current)}
        className={[
          "flex w-full items-center gap-2 rounded-lg border bg-white px-3 py-3 text-left text-sm text-[#132C4A] transition-colors",
          "focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100",
          error ? "border-red-500" : "border-slate-200",
        ].join(" ")}
      >
        <span className="text-lg leading-none" aria-hidden>
          {selected.flag}
        </span>
        <span className="font-medium">{selected.code}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={[
            "ml-auto h-5 w-5 text-slate-400 transition-transform",
            open ? "rotate-180" : "",
          ].join(" ")}
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute top-full z-20 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
        >
          {COUNTRY_CODES.map((option) => (
            <li key={`${option.code}-${option.label}`} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={option.code === value}
                onClick={() => selectOption(option)}
                className={[
                  "flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors hover:bg-slate-50",
                  option.code === value
                    ? "bg-blue-50 text-[#132C4A]"
                    : "text-slate-700",
                ].join(" ")}
              >
                <span className="text-lg leading-none" aria-hidden>
                  {option.flag}
                </span>
                <span className="font-medium">{option.code}</span>
                <span className="truncate text-slate-500">{option.label}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
