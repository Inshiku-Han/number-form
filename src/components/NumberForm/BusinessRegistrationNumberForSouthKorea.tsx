"use client";

import { useFormContext } from "react-hook-form";
import { NumberFormatBase } from "react-number-format";

import { NumberFormType } from ".";

const KEY: Extract<
  keyof NumberFormType,
  "businessRegistrationNumberForSouthKorea"
> = "businessRegistrationNumberForSouthKorea";

function format(value: string): string {
  if (!value) return "";

  // "XXX-XX-XXXXX"
  let prefix = value.slice(0, 3);
  const infix = value.slice(3, 5);
  const postfix = value.slice(5, 10);

  // "100~621-XX-XXXXX"
  if (prefix.length === 3) {
    const prefixNumber = Number(prefix);
    if (prefixNumber < 100) {
      prefix = "100";
    } else if (prefixNumber > 621) {
      prefix = "621";
    }
  }

  return `${prefix}-${infix}-${postfix}`;
}

export function BusinessRegistrationNumberForSouthKorea() {
  const { register } = useFormContext<NumberFormType>();

  const { ref, ...rest } = register(KEY);

  return (
    <div>
      <label htmlFor={KEY}>BusinessRegistration Number For SouthKorea</label>
      <NumberFormatBase
        {...rest}
        id={KEY}
        format={format}
        placeholder='###-##-#####'
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
            placeholder='###-##-#####'
            inputMode='numeric'
            getInputRef={ref}
          />
        )}
      /> */}
    </div>
  );
}
