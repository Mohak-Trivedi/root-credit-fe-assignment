import { CircleCheck, ShieldCheck } from "lucide-react";

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
    <div className="flex items-center justify-between gap-4">
      <span className="font-rubik text-[14px] font-normal text-[#717680]">{label}</span>
      <span className="font-rubik text-right text-[14px] font-medium text-[#181D27]">
        {value}
      </span>
    </div>
  );
}

export function SuccessModal() {
  const { data, isComplete, reset } = useRegistration();

  return (
    <Modal
      open={isComplete}
      ariaLabelledby="success-modal-title"
      ariaDescribedby="success-modal-description"
      className="w-[479px] max-w-[479px]"
    >
      <div className="flex flex-col gap-6 text-center">
        <CircleCheck className="mx-auto" color="#4B59D5" size={48} aria-hidden />
        <div>
          <h2
            id="success-modal-title"
            className="font-open-sans text-[24px] font-semibold text-[#132C4A]"
          >
            You&apos;re all set!
          </h2>
          <p
            id="success-modal-description"
            className="mt-2 font-open-sans text-[14px] font-normal text-[#565656]"
          >
            Here&apos;s a quick summary of your account details
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-[#F5F5F5] p-6 text-left">
          <SummaryRow label="Account Type" value={formatAccountType(data.accountType)} />
          <SummaryRow label="Name" value={formatFullName(data)} />
          <SummaryRow
            label="Mobile Number"
            value={formatMaskedMobile(data.countryCode, data.mobile)}
          />
        </div>

        <p className="flex items-center justify-center gap-2 font-open-sans text-[12px] font-normal text-[#565656]">
          <ShieldCheck color="#047647" size={14} aria-hidden />
          Your account is secured with bank-grade security
        </p>

        <div className="flex justify-center">
          <Button type="button" className="w-[250px]" onClick={reset} autoFocus>
            Go To Dashboard
          </Button>
        </div>
      </div>
    </Modal>
  );
}
