"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Birth } from "@/components/NumberForm/Birth";
import { BusinessRegistrationNumberForSouthKorea } from "@/components/NumberForm/BusinessRegistrationNumberForSouthKorea";
import { CreditCardExpiration } from "@/components/NumberForm/CreditCardExpiration";
import { ShortBirth } from "@/components/NumberForm/ShortBirth";

export type NumberFormType = {
  /** @example ###-##-##### */
  businessRegistrationNumberForSouthKorea: string;
  /** @example MM/YY */
  creditCardExpiration: string;
  /** @example MM/DD/YYYY */
  birth: string;
  /** @example MM/DD/YY */
  shortBirth: string;
};

export default function NumberForm() {
  const form = useForm<NumberFormType>();
  const { handleSubmit } = form;
  const [result, setResult] = useState<NumberFormType>();

  const onSubmit = handleSubmit((data) => {
    setResult(data);
    console.log(data);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <BusinessRegistrationNumberForSouthKorea />
        <CreditCardExpiration />
        <Birth />
        <ShortBirth />
        <button type='submit'>Submit</button>
      </form>
      <hr />
      {JSON.stringify(result)}
    </FormProvider>
  );
}
