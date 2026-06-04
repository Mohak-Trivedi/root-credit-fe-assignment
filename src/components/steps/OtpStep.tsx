import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { getStepMeta } from "../../constants/steps.ts";
import { useRegistration } from "../../hooks/useRegistration.ts";
import { otpSchema, type OtpFormValues } from "../../schemas/registrationSchemas.ts";
import { StepShell } from "../common/StepShell.tsx";
import { OtpBoxes } from "../ui/OtpBoxes.tsx";

export function OtpStep() {
  const { data, setData, next } = useRegistration();
  const { title, subtitle } = getStepMeta("otp");

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
      <p className="text-[12px] leading-[16px] text-[#8292A1]/80">
        An OTP has been sent to your mobile number
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

      <p className="text-center text-[14px] leading-[16px]">
        <span className="text-[#132C4A]">Did not receive OTP? </span>
        <button
          type="button"
          onClick={handleResend}
          className="cursor-pointer font-medium text-[#2563eb] transition-colors hover:text-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/30"
        >
          Resend OTP
        </button>
      </p>
    </StepShell>
  );
}
