import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getStepMeta } from "../../constants/steps.ts";
import { useRegistration } from "../../hooks/useRegistration.ts";
import {
  passwordSchema,
  type PasswordFormValues,
} from "../../schemas/registrationSchemas.ts";
import { StepShell } from "../common/StepShell.tsx";
import { PasswordField } from "../ui/PasswordField.tsx";

export function PasswordStep() {
  const { data, setData, next } = useRegistration();
  const { title, subtitle } = getStepMeta("password");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: data.password ?? "",
      confirmPassword: data.password ?? "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setData({ password: values.password });
    next();
  });

  return (
    <StepShell title={title} subtitle={subtitle} onSubmit={onSubmit}>
      <PasswordField
        label="Password"
        autoComplete="new-password"
        placeholder="Create a password"
        error={errors.password?.message}
        {...register("password")}
      />
      <PasswordField
        label="Confirm password"
        autoComplete="new-password"
        placeholder="Re-enter your password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
    </StepShell>
  );
}
