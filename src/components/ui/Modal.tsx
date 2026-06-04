import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";

export type ModalProps = {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  /** Accessible label for the dialog when no visible title is passed as children. */
  ariaLabel?: string;
  /** Id of an element that labels the dialog (takes precedence over ariaLabel). */
  ariaLabelledby?: string;
  /** Id of an element that describes the dialog. */
  ariaDescribedby?: string;
  /** Extra classes merged onto the dialog content container (e.g. width overrides). */
  className?: string;
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function Modal({
  open,
  onClose,
  children,
  ariaLabel = "Dialog",
  ariaLabelledby,
  ariaDescribedby,
  className = "",
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const previouslyFocused = document.activeElement as HTMLElement | null;

    function getFocusable() {
      return Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [],
      ).filter((element) => element.offsetParent !== null);
    }

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    document.addEventListener("keydown", handleEscape);

    // Move focus into the dialog once it has mounted/animated in.
    const focusFrame = window.requestAnimationFrame(() => {
      const focusable = getFocusable();
      const autoFocusTarget = dialogRef.current?.querySelector<HTMLElement>(
        "[autofocus]",
      );
      (autoFocusTarget ?? focusable[0] ?? dialogRef.current)?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
      window.cancelAnimationFrame(focusFrame);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") {
      return;
    }

    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [],
    ).filter((element) => element.offsetParent !== null);

    if (focusable.length === 0) {
      event.preventDefault();
      dialogRef.current?.focus();
      return;
    }

    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            aria-label="Close dialog backdrop"
            className="absolute inset-0 bg-[#132C4A]/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabelledby ? undefined : ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            className={[
              "relative z-10 w-full max-w-[min(32rem,calc(100vw-2rem))] rounded-2xl bg-white p-8 shadow-xl focus:outline-none",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
