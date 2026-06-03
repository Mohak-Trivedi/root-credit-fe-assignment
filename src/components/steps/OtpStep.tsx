import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { getStepMeta } from "../../constants/steps.ts";
import { useRegistration } from "../../hooks/useRegistration.ts";
import { otpSchema, type OtpFormValues } from "../../schemas/registrationSchemas.ts";
import { formatMaskedMobile } from "../../utils/format.ts";
import { StepShell } from "../common/StepShell.tsx";
import { OtpBoxes } from "../ui/OtpBoxes.tsx";

export function OtpStep() {
  const { data, setData, next } = useRegistration();
  const { title, subtitle } = getStepMeta("otp");
  const maskedPhone = formatMaskedMobile(data.countryCode, data.mobile);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: data.otp ?? "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setData(values);
    next();
  });

  function handleResend() {
    setValue("otp", "", { shouldValidate: false });
  }

  return (
    <StepShell title={title} subtitle={subtitle} onSubmit={onSubmit}>
      <p className="text-center text-sm text-slate-500">
        Code sent to <span className="font-medium text-[#132C4A]">{maskedPhone}</span>
      </p>

      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <OtpBoxes
            value={field.value}
            onChange={field.onChange}
            error={errors.otp?.message}
          />
        )}
      />

      <div className="text-center">
        <button
          type="button"
          onClick={handleResend}
          className="text-sm font-medium text-[#2563eb] transition-colors hover:text-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/30"
        >
          Resend OTP
        </button>
      </div>
    </StepShell>
  );
}
