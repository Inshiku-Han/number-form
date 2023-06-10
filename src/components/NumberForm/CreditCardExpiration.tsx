"use client";

import { useFormContext } from "react-hook-form";
import { NumberFormatBase } from "react-number-format";

import { NumberFormType } from ".";

const KEY: Extract<keyof NumberFormType, "creditCardExpiration"> =
  "creditCardExpiration";

function format(value: string) {
  if (!value) return "";

  let month = value.slice(0, 2);
  const year = value.slice(2, 4);

  // Month must be between 01 and 12
  if (month.length === 2) {
    const monthNumber = Number(month);
    if (monthNumber < 1) {
      month = "01";
    } else if (monthNumber > 12) {
      month = "12";
    }
  }

  return `${month}/${year}`;
}

export function CreditCardExpiration() {
  const { register } = useFormContext<NumberFormType>();

  const { ref, ...rest } = register(KEY);

  return (
    <div>
      <label htmlFor={KEY}>CreditCardExpiration</label>
      <NumberFormatBase
        {...rest}
        id={KEY}
        format={format}
        placeholder='MM/YY'
        inputMode='numeric'
        getInputRef={ref}
      />
      {/* Or You can use ReactHookForm Controller */}
      {/* <Controller
        control={control}
        name={KEY}
        render={({ field: { ref, ...rest } }) => (
          <NumberFormatBase
            {...rest}
            id={KEY}
            format={format}
            placeholder='MM/YY'
            inputMode='numeric'
            getInputRef={ref}
          />
        )}
      /> */}
    </div>
  );
}
