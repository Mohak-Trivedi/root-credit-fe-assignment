import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useRegistration } from "../../hooks/useRegistration.ts";
import {
  passwordSchema,
  type PasswordFormValues,
} from "../../schemas/registrationSchemas.ts";
import { StepShell } from "../common/StepShell.tsx";
import { PasswordField } from "../ui/PasswordField.tsx";

const LABEL_CLASS = "text-[18px] leading-[16px] text-[#8292A1]/80";
const INPUT_CLASS =
  "!p-[26px] !pr-12 placeholder:text-[16px] placeholder:leading-6 placeholder:font-normal placeholder:text-[#D9E0E6]/80";
const WRAPPER_CLASS = "gap-3";
const HELPER_CLASS =
  "mt-2 text-[16px] font-normal leading-[16px] text-[#8292A1]/80";

export function PasswordStep() {
  const { data, setData, next } = useRegistration();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: data.password ?? "",
      confirmPassword: data.password ?? "",
    },
  });

  useEffect(() => {
    setFocus("password");
  }, [setFocus]);

  const onSubmit = handleSubmit((values) => {
    setData({ password: values.password });
    next();
  });

  return (
    <StepShell
      title={<span className="font-medium">Create Password for your account</span>}
      onSubmit={onSubmit}
    >
      <div className="flex w-[453px] max-w-full flex-col gap-6">
        <PasswordField
          label="Enter new password"
          autoComplete="new-password"
          placeholder="Enter new password"
          helperText="Must be atleast 6 characters"
          labelClassName={LABEL_CLASS}
          className={INPUT_CLASS}
          wrapperClassName={WRAPPER_CLASS}
          helperClassName={HELPER_CLASS}
          error={errors.password?.message}
          {...register("password")}
        />
        <PasswordField
          label="Confirm password"
          autoComplete="new-password"
          placeholder="Confirm password"
          helperText="Both passwords must match"
          labelClassName={LABEL_CLASS}
          className={INPUT_CLASS}
          wrapperClassName={WRAPPER_CLASS}
          helperClassName={HELPER_CLASS}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
      </div>
    </StepShell>
  );
}
