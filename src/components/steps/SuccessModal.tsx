import { useRegistration } from "../../hooks/useRegistration.ts";
import {
  formatAccountType,
  formatFullName,
  formatMaskedMobile,
} from "../../utils/format.ts";
import { Button } from "../ui/Button.tsx";
import { Modal } from "../ui/Modal.tsx";

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-right text-sm font-medium text-[#132C4A]">{value}</span>
    </div>
  );
}

function SuccessIcon() {
  return (
    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

export function SuccessModal() {
  const { data, isComplete, reset } = useRegistration();

  return (
    <Modal open={isComplete} ariaLabel="Registration complete">
      <div className="flex flex-col gap-6 text-center">
        <SuccessIcon />
        <div>
          <h2 className="text-2xl font-semibold text-[#132C4A]">You&apos;re all set!</h2>
          <p className="mt-2 text-sm text-slate-500">
            Your account has been created. Review your details below.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 text-left">
          <SummaryRow label="Account type" value={formatAccountType(data.accountType)} />
          <SummaryRow label="Name" value={formatFullName(data)} />
          <SummaryRow
            label="Mobile number"
            value={formatMaskedMobile(data.countryCode, data.mobile)}
          />
        </div>

        <p className="text-sm text-slate-500">
          Your data is protected with bank-grade security encryption.
        </p>

        <Button type="button" fullWidth onClick={reset}>
          Go To Dashboard
        </Button>
      </div>
    </Modal>
  );
}
