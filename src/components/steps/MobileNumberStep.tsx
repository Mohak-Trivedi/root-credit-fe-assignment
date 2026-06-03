import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { DEFAULT_COUNTRY_CODE } from "../../constants/countryCodes.ts";
import { getStepMeta } from "../../constants/steps.ts";
import { useRegistration } from "../../hooks/useRegistration.ts";
import {
  mobileSchema,
  type MobileFormValues,
} from "../../schemas/registrationSchemas.ts";
import { StepShell } from "../common/StepShell.tsx";
import { CountryCodeSelect } from "../ui/CountryCodeSelect.tsx";
import { TextField } from "../ui/TextField.tsx";

export function MobileNumberStep() {
  const { data, setData, next } = useRegistration();
  const { title, subtitle } = getStepMeta("mobileNumber");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MobileFormValues>({
    resolver: zodResolver(mobileSchema),
    defaultValues: {
      countryCode: data.countryCode ?? DEFAULT_COUNTRY_CODE,
      mobile: data.mobile ?? "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setData(values);
    next();
  });

  return (
    <StepShell title={title} subtitle={subtitle} onSubmit={onSubmit}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <Controller
          name="countryCode"
          control={control}
          render={({ field }) => (
            <CountryCodeSelect
              value={field.value}
              onChange={field.onChange}
              error={errors.countryCode?.message}
            />
          )}
        />
        <div className="min-w-0 flex-1">
          <TextField
            label="Mobile number"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="Enter your number"
            error={errors.mobile?.message}
            {...register("mobile")}
          />
        </div>
      </div>
    </StepShell>
  );
}
