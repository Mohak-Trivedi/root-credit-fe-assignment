import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useRegistration } from "../../hooks/useRegistration.ts";
import { nameSchema, type NameFormValues } from "../../schemas/registrationSchemas.ts";
import { StepShell } from "../common/StepShell.tsx";
import { TextField } from "../ui/TextField.tsx";

const LABEL_CLASS = "text-[18px] leading-[16px] text-[#8292A1]/80";
const INPUT_CLASS =
  "!p-[26px] placeholder:text-[16px] placeholder:leading-6 placeholder:font-normal placeholder:text-[#D9E0E6]/80";
const WRAPPER_CLASS = "gap-3";

export function NameStep() {
  const { data, setData, next } = useRegistration();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<NameFormValues>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
    },
  });

  useEffect(() => {
    setFocus("firstName");
  }, [setFocus]);

  const onSubmit = handleSubmit((values) => {
    setData(values);
    next();
  });

  return (
    <StepShell
      title={<span className="font-medium">What is your name?</span>}
      onSubmit={onSubmit}
    >
      <div className="flex w-[453px] max-w-full flex-col gap-6">
        <TextField
          label="First Name"
          autoComplete="given-name"
          placeholder="Oliver"
          labelClassName={LABEL_CLASS}
          className={INPUT_CLASS}
          wrapperClassName={WRAPPER_CLASS}
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <TextField
          label="Last Name"
          autoComplete="family-name"
          placeholder="Last Name"
          labelClassName={LABEL_CLASS}
          className={INPUT_CLASS}
          wrapperClassName={WRAPPER_CLASS}
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>
    </StepShell>
  );
}
