import { options } from "preact";

/** Add leading zeros to a number according to a specified minimum digits */
export const leadingZeros = (
  value: number | string,
  digits: number = 1,
): string => {
  value = typeof value === "string" ? value : value.toString();

  return value.length >= digits
    ? value
    : "0".repeat(Math.max(digits - value.length, 0)) + value;
};

type FormatDateDigitsOption =
  | boolean
  | {
      /** Number of digits to add leading zeros for */
      digits?: number;
    };

export interface FormatDateOptions {
  day?: FormatDateDigitsOption;
  month?: FormatDateDigitsOption;
  year?: boolean;
  order?: "asc" | "desc";
  seperator?: string;
}

/** Get format date digits option digit value or a fallback value */
const dateDigitsOptionOr = (option?: FormatDateDigitsOption, or: number = 0) =>
  typeof option === "object" && option.digits !== undefined
    ? option.digits
    : or;

/** Format a date or date string */
export const formatDate = (
  date: Date | string,
  options?: FormatDateOptions,
): string => {
  date = date instanceof Date ? date : new Date(date);

  const default_formatting = !options?.day && !options?.month && !options?.year;

  const with_day = options?.day ?? default_formatting;
  const with_month = options?.month ?? default_formatting;
  const with_year = options?.year ?? default_formatting;

  const parts: string[] = [];

  if (with_day) {
    parts.push(
      leadingZeros(date.getDate(), dateDigitsOptionOr(options?.day, 2)),
    );
  }

  if (with_month) {
    parts.push(
      leadingZeros(date.getMonth(), dateDigitsOptionOr(options?.day, 2)),
    );
  }

  if (with_year) {
    parts.push(date.getFullYear().toString());
  }

  if (options?.order === "desc") {
    parts.reverse();
  }

  return parts.join(options?.seperator ?? "/");
};
