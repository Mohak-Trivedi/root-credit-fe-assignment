import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";

import { getStepMeta } from "../../constants/steps.ts";
import { useRegistration } from "../../hooks/useRegistration.ts";
import {
  accountTypeSchema,
  type AccountTypeFormValues,
} from "../../schemas/registrationSchemas.ts";
import type { AccountType } from "../../types/registration.ts";
import { StepShell } from "../common/StepShell.tsx";
import { SelectableCard } from "../ui/SelectableCard.tsx";

function PersonalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function BusinessIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M4.5 2.25a.75.75 0 0 0-.75.75v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3a.75.75 0 0 0-.75-.75h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Zm3.75-6a.75.75 0 0 0 0 1.5H19.5a.75.75 0 0 0 0-1.5h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H19.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM16.5 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const ACCOUNT_OPTIONS: {
  value: AccountType;
  title: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    value: "personal",
    title: "Personal",
    description: "For everyday banking and personal finances",
    icon: <PersonalIcon />,
  },
  {
    value: "business",
    title: "Business",
    description: "For your company or freelance work",
    icon: <BusinessIcon />,
  },
];

export function AccountTypeStep() {
  const { data, setData, next } = useRegistration();
  const { title, subtitle } = getStepMeta("accountType");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountTypeFormValues>({
    resolver: zodResolver(accountTypeSchema),
    defaultValues: {
      accountType: data.accountType,
    },
  });

  const onSubmit = handleSubmit((values) => {
    setData(values);
    next();
  });

  return (
    <StepShell title={title} subtitle={subtitle} onSubmit={onSubmit}>
      <Controller
        name="accountType"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-4" role="radiogroup" aria-label="Account type">
            {ACCOUNT_OPTIONS.map((option) => (
              <SelectableCard
                key={option.value}
                name="accountType"
                value={option.value}
                selected={field.value === option.value}
                onSelect={(value) => field.onChange(value as AccountType)}
                title={option.title}
                description={option.description}
                icon={option.icon}
              />
            ))}
            {errors.accountType ? (
              <p className="text-sm text-red-600" role="alert">
                {errors.accountType.message}
              </p>
            ) : null}
          </div>
        )}
      />
    </StepShell>
  );
}
