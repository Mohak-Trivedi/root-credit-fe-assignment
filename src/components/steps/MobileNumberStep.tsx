import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { DEFAULT_COUNTRY_CODE } from "../../constants/countryCodes.ts";
import { useRegistration } from "../../hooks/useRegistration.ts";
import {
  mobileSchema,
  type MobileFormValues,
} from "../../schemas/registrationSchemas.ts";
import {
  formatAsYouType,
  getExamplePlaceholder,
  isoForDialCode,
} from "../../utils/phone.ts";
import { StepShell } from "../common/StepShell.tsx";
import { CountryCodeSelect } from "../ui/CountryCodeSelect.tsx";
import { TextField } from "../ui/TextField.tsx";

export function MobileNumberStep() {
  const { data, setData, next } = useRegistration();

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<MobileFormValues>({
    resolver: zodResolver(mobileSchema),
    defaultValues: {
      countryCode: data.countryCode ?? DEFAULT_COUNTRY_CODE,
      mobile: data.mobile ?? "",
    },
  });

  const countryCode = watch("countryCode");
  const iso = isoForDialCode(countryCode);

  const onSubmit = handleSubmit((values) => {
    setData(values);
    next();
  });

  return (
    <StepShell
      title={<span className="font-medium">OTP Verification</span>}
      onSubmit={onSubmit}
    >
      <div className="flex w-[453px] max-w-full flex-col gap-1.5">
        <label
          htmlFor="mobile"
          className="text-[14px] leading-[16px] text-[#8292A1]"
        >
          Mobile Number
          <sup className="text-red-500">*</sup>
        </label>
        <div className="flex items-start gap-4">
          <Controller
            name="countryCode"
            control={control}
            render={({ field }) => (
              <CountryCodeSelect
                value={field.value}
                onChange={(code) => {
                  field.onChange(code);
                  const nextIso = isoForDialCode(code);
                  const currentMobile = getValues("mobile");
                  setValue(
                    "mobile",
                    formatAsYouType(currentMobile, nextIso),
                    { shouldValidate: currentMobile.trim().length > 0 },
                  );
                }}
                error={errors.countryCode?.message}
                hideLabel
                className="w-[110px] shrink-0"
              />
            )}
          />
          <div className="min-w-0 flex-1">
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <TextField
                  id="mobile"
                  label="Mobile number"
                  hideLabel
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder={getExamplePlaceholder(iso)}
                  className="placeholder:text-[16px] placeholder:leading-6 placeholder:text-[#8292A1]"
                  error={errors.mobile?.message}
                  value={field.value}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  onChange={(event) =>
                    field.onChange(formatAsYouType(event.target.value, iso))
                  }
                />
              )}
            />
          </div>
        </div>
      </div>
    </StepShell>
  );
}
