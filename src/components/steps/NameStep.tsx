import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getStepMeta } from "../../constants/steps.ts";
import { useRegistration } from "../../hooks/useRegistration.ts";
import { nameSchema, type NameFormValues } from "../../schemas/registrationSchemas.ts";
import { StepShell } from "../common/StepShell.tsx";
import { TextField } from "../ui/TextField.tsx";

export function NameStep() {
  const { data, setData, next } = useRegistration();
  const { title, subtitle } = getStepMeta("name");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameFormValues>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setData(values);
    next();
  });

  return (
    <StepShell title={title} subtitle={subtitle} onSubmit={onSubmit}>
      <TextField
        label="First name"
        autoComplete="given-name"
        placeholder="Enter your first name"
        error={errors.firstName?.message}
        {...register("firstName")}
      />
      <TextField
        label="Last name"
        autoComplete="family-name"
        placeholder="Enter your last name"
        error={errors.lastName?.message}
        {...register("lastName")}
      />
    </StepShell>
  );
}
