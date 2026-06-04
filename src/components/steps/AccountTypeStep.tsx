import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";

import { useRegistration } from "../../hooks/useRegistration.ts";
import {
  accountTypeSchema,
  type AccountTypeFormValues,
} from "../../schemas/registrationSchemas.ts";
import type { AccountType } from "../../types/registration.ts";
import { StepShell } from "../common/StepShell.tsx";
import { SelectableCard } from "../ui/SelectableCard.tsx";

import { UserRound, Briefcase } from "lucide-react";

const ACCOUNT_OPTIONS: {
  value: AccountType;
  title: string;
  icon: ReactNode;
}[] = [
  {
    value: "personal",
    title: "Personal",
    icon: <UserRound />,
  },
  {
    value: "business",
    title: "Business",
    icon: <Briefcase />,
  },
];

export function AccountTypeStep() {
  const { data, setData, next } = useRegistration();
  const radioGroupRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const group = radioGroupRef.current;
    if (!group) {
      return;
    }
    const checked = group.querySelector<HTMLInputElement>(
      'input[type="radio"]:checked',
    );
    const target =
      checked ?? group.querySelector<HTMLInputElement>('input[type="radio"]');
    target?.focus();
  }, []);

  const onSubmit = handleSubmit((values) => {
    setData(values);
    next();
  });

  return (
    <StepShell
      title={
        <span className="block w-[453px] max-w-full font-normal">
          To join us tell us{" "}
          <span className="font-bold">what type of account</span> you are opening
        </span>
      }
      onSubmit={onSubmit}
    >
      <Controller
        name="accountType"
        control={control}
        render={({ field }) => (
          <div
            ref={radioGroupRef}
            className="flex w-[453px] max-w-full flex-col gap-4"
            role="radiogroup"
            aria-label="Account type"
          >
            {ACCOUNT_OPTIONS.map((option) => (
              <SelectableCard
                key={option.value}
                name="accountType"
                value={option.value}
                selected={field.value === option.value}
                onSelect={(value) => field.onChange(value as AccountType)}
                title={option.title}
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
