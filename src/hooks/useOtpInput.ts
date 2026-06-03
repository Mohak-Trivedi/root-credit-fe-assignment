import {
  useCallback,
  useRef,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";

const DEFAULT_LENGTH = 4;

export type UseOtpInputOptions = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
};

export type UseOtpInputResult = {
  digits: string[];
  length: number;
  setRef: (index: number) => (element: HTMLInputElement | null) => void;
  focusInput: (index: number) => void;
  handleChange: (index: number, inputValue: string) => void;
  handleKeyDown: (index: number, event: KeyboardEvent<HTMLInputElement>) => void;
  handlePaste: (event: ClipboardEvent<HTMLInputElement>) => void;
};

export function useOtpInput({
  value,
  onChange,
  length = DEFAULT_LENGTH,
}: UseOtpInputOptions): UseOtpInputResult {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const digits = Array.from({ length }, (_, index) => value[index] ?? "");

  const setRef = useCallback(
    (index: number) => (element: HTMLInputElement | null) => {
      refs.current[index] = element;
    },
    [],
  );

  const focusInput = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, length - 1));
      refs.current[clamped]?.focus();
      refs.current[clamped]?.select();
    },
    [length],
  );

  const updateValue = useCallback(
    (nextDigits: string[]) => {
      onChange(nextDigits.join("").slice(0, length));
    },
    [length, onChange],
  );

  const handleChange = useCallback(
    (index: number, inputValue: string) => {
      const sanitized = inputValue.replace(/\D/g, "");
      if (!sanitized) {
        return;
      }

      const next = [...digits];

      if (sanitized.length === 1) {
        next[index] = sanitized;
        updateValue(next);
        if (index < length - 1) {
          focusInput(index + 1);
        }
        return;
      }

      for (let offset = 0; offset < sanitized.length && index + offset < length; offset += 1) {
        next[index + offset] = sanitized[offset]!;
      }
      updateValue(next);
      focusInput(Math.min(index + sanitized.length, length - 1));
    },
    [digits, focusInput, length, updateValue],
  );

  const handleKeyDown = useCallback(
    (index: number, event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Backspace") {
        event.preventDefault();
        const next = [...digits];

        if (digits[index]) {
          next[index] = "";
          updateValue(next);
          return;
        }

        if (index > 0) {
          next[index - 1] = "";
          updateValue(next);
          focusInput(index - 1);
        }
        return;
      }

      if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        focusInput(index - 1);
        return;
      }

      if (event.key === "ArrowRight" && index < length - 1) {
        event.preventDefault();
        focusInput(index + 1);
      }
    },
    [digits, focusInput, length, updateValue],
  );

  const handlePaste = useCallback(
    (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const pasted = event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, length);

      if (!pasted) {
        return;
      }

      const next = Array.from({ length }, (_, index) => pasted[index] ?? "");
      updateValue(next);
      focusInput(Math.min(pasted.length, length) - 1);
    },
    [focusInput, length, updateValue],
  );

  return {
    digits,
    length,
    setRef,
    focusInput,
    handleChange,
    handleKeyDown,
    handlePaste,
  };
}
