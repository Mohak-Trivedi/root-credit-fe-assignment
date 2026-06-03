import type { ReactNode } from "react";

export type SelectableCardProps = {
  name: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  title: string;
  description?: string;
  icon: ReactNode;
};

function CheckIcon() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF7C52] text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-3.5 w-3.5"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3.75a.75.75 0 0 1 1.18-.944l2.322 2.903 4.553-6.83a.75.75 0 0 1 1.04-.208Z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

export function SelectableCard({
  name,
  value,
  selected,
  onSelect,
  title,
  description,
  icon,
}: SelectableCardProps) {
  return (
    <label
      className={[
        "relative flex cursor-pointer items-start gap-4 rounded-xl border-2 bg-white p-5 transition-colors",
        selected
          ? "border-[#2563eb] shadow-sm"
          : "border-slate-200 hover:border-slate-300",
      ].join(" ")}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={() => onSelect(value)}
        className="sr-only"
      />
      <span
        className={[
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
          selected ? "bg-blue-50 text-[#2563eb]" : "bg-slate-100 text-[#132C4A]",
        ].join(" ")}
        aria-hidden
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 pt-0.5">
        <span className="text-base font-semibold text-[#132C4A]">{title}</span>
        {description ? (
          <span className="text-sm text-slate-500">{description}</span>
        ) : null}
      </span>
      {selected ? (
        <span className="absolute right-4 top-4">
          <CheckIcon />
        </span>
      ) : null}
    </label>
  );
}
