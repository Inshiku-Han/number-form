"use client";

import { useFormContext } from "react-hook-form";
import { NumberFormatBase } from "react-number-format";

import { NumberFormType } from ".";

const KEY: Extract<keyof NumberFormType, "koreaTel"> = "koreaTel";

function format(value: string): string {
  if (!value) return "";

  // "XXX-XXXX-XXXX"
  let prefix = value.slice(0, 3);
  let infix = value.slice(3, 7);
  let postfix = value.slice(7, 11);

  // "02-XXXX-XXXX"
  if (prefix.startsWith("02")) {
    prefix = value.slice(0, 2);
    infix = value.slice(2, 6);
    postfix = value.slice(6, 10);
    // "02-XXX-XXXX"
    if (infix.length === 4 && postfix.length === 3) {
      infix = value.slice(2, 5);
      postfix = value.slice(5, 9);
    }
    // "010-XXXX-XXXX"
  } else if (
    prefix.length === 3 &&
    prefix.startsWith("01") &&
    prefix !== "010"
  ) {
    prefix = "010";
    // "XXX-XXX-XXXX"
  } else if (infix.length === 4 && postfix.length === 3) {
    infix = value.slice(3, 6);
    postfix = value.slice(6, 10);
  }

  return `${prefix}-${infix}-${postfix}`;
}

export function KoreaTel() {
  const { register } = useFormContext<NumberFormType>();

  const { ref, ...rest } = register(KEY);

  return (
    <div>
      <label htmlFor={KEY}>KoreaTel</label>
      <NumberFormatBase
        {...rest}
        id={KEY}
        format={format}
        placeholder='Please enter your tel/phone number'
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
            placeholder='Please enter your tel/phone number'
            inputMode='numeric'
            getInputRef={ref}
          />
        )}
      /> */}
    </div>
  );
}
