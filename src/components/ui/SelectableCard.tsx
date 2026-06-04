import type { ReactNode } from "react";

export type SelectableCardProps = {
  name: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  title: string;
  icon: ReactNode;
};

function CheckIcon() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0054FD] text-white">
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
  icon,
}: SelectableCardProps) {
  return (
    <label
      className={[
        "relative flex cursor-pointer items-center gap-4 rounded-xl border bg-white p-5 transition-colors [box-shadow:0px_4px_8px_rgba(188,203,219,0.3)]",
        selected
          ? "border-[#0054FD]"
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
          selected
            ? "bg-blue-50 text-[#0054FD]"
            : "bg-slate-100 text-[#132C4A]",
        ].join(" ")}
        aria-hidden
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-1">
        <span
          className={[
            "text-base font-semibold",
            selected ? "text-[#0054FD]" : "text-[#132C4A]",
          ].join(" ")}
        >
          {title}
        </span>
      </span>
      {selected ? (
        <span className="absolute right-4 top-1/2 -translate-y-1/2">
          <CheckIcon />
        </span>
      ) : null}
    </label>
  );
}
