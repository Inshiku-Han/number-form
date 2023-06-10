"use client";

import { useFormContext } from "react-hook-form";
import { NumberFormatBase } from "react-number-format";

import { NumberFormType } from ".";

const KEY: Extract<keyof NumberFormType, "birth"> = "birth";

function format(value: string) {
  if (!value) return "";

  let month = value.slice(0, 2);
  let day = value.slice(2, 4);
  let year = value.slice(4, 8);

  // Month must be between 01 and 12
  if (month.length === 2) {
    const monthNumber = Number(month);
    if (monthNumber < 1) {
      month = "01";
    } else if (monthNumber > 12) {
      month = "12";
    }
  }
  // Day must be between 01 and 31
  if (day.length === 2) {
    const dayNumber = Number(day);
    if (dayNumber < 1) {
      day = "01";
    } else if (dayNumber > 31) {
      day = "31";
    }
  }
  // Year seems to be between 1900 and today
  if (year.length === 4) {
    const yearNumber = Number(year);
    if (yearNumber < 1900) {
      year = "1900";
    } else if (yearNumber > new Date().getFullYear()) {
      year = new Date().getFullYear().toString();
    }
  }

  return `${month}/${day}/${year}`;
}

export function Birth() {
  const { register } = useFormContext<NumberFormType>();

  const { ref, ...rest } = register(KEY);

  return (
    <div>
      <label htmlFor={KEY}>Birth</label>
      <NumberFormatBase
        {...rest}
        id={KEY}
        format={format}
        placeholder='MM/DD/YYYY'
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
            placeholder='MM/DD/YYYY'
            inputMode='numeric'
            getInputRef={ref}
          />
        )}
      /> */}
    </div>
  );
}
