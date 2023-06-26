"use client";

import { useFormContext } from "react-hook-form";
import { NumberFormatBase } from "react-number-format";

import { NumberFormType } from ".";

const KEY: Extract<keyof NumberFormType, "shortBirth"> = "shortBirth";

function format(value: string): string {
  if (!value) return "";

  // "XX/XX/XX"
  let month = value.slice(0, 2);
  let day = value.slice(2, 4);
  const year = value.slice(4, 6);

  // "01~12/XX/XX"
  if (month.length === 2) {
    const monthNumber = Number(month);
    if (monthNumber < 1) {
      month = "01";
    } else if (monthNumber > 12) {
      month = "12";
    }
  }
  // "01~12/01~31/XX"
  if (day.length === 2) {
    const dayNumber = Number(day);
    if (dayNumber < 1) {
      day = "01";
    } else if (dayNumber > 31) {
      day = "31";
    }
  }

  return `${month}/${day}/${year}`;
}

export function ShortBirth() {
  const { register } = useFormContext<NumberFormType>();

  const { ref, ...rest } = register(KEY);

  return (
    <div>
      <label htmlFor={KEY}>ShortBirth</label>
      <NumberFormatBase
        {...rest}
        id={KEY}
        format={format}
        placeholder='MM/DD/YY'
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
            placeholder='MM/DD/YY'
            inputMode='numeric'
            getInputRef={ref}
          />
        )}
      /> */}
    </div>
  );
}
