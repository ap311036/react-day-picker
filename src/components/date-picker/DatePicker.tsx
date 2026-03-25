"use client";

import {
  DayPicker,
  getDefaultClassNames,
  type ClassNames,
  type DayPickerProps,
} from "react-day-picker";
import { format } from "date-fns";
import type { CSSProperties } from "react";

type PickerTone = "ocean" | "forest" | "slate";

type CustomDatePickerProps = DayPickerProps & {
  tone?: PickerTone;
  classNames?: Partial<ClassNames>;
  className?: string;
  showOutsideDays?: boolean;
  style?: CSSProperties;
};

const toneVars: Record<PickerTone, CSSProperties> = {
  ocean: {
    ["--rdp-accent-color" as string]: "#0a5ea8",
    ["--rdp-accent-background-color" as string]: "#dceeff",
    ["--rdp-today-color" as string]: "#114f84",
    ["--rdp-day_button-border-radius" as string]: "16px",
    ["--rdp-day_button-width" as string]: "32px",
    ["--rdp-day_button-height" as string]: "32px",
    ["--rdp-day-height" as string]: "32px",
    ["--rdp-day-width" as string]: "32px",
    ["--rdp-selected-border" as string]: "none",
    ["--rdp-weekday-padding" as string]: "0.25rem 0",
    ["--rdp-disabled-opacity" as string]: "0.5",
  },
  forest: {
    ["--rdp-accent-color" as string]: "#1f6d41",
    ["--rdp-accent-background-color" as string]: "#ddf5e8",
    ["--rdp-today-color" as string]: "#1b5c38",
    ["--rdp-day_button-border-radius" as string]: "16px",
    ["--rdp-day_button-width" as string]: "32px",
    ["--rdp-day_button-height" as string]: "32px",
    ["--rdp-day-height" as string]: "32px",
    ["--rdp-day-width" as string]: "32px",
    ["--rdp-selected-border" as string]: "none",
    ["--rdp-weekday-padding" as string]: "0.25rem 0",
    ["--rdp-disabled-opacity" as string]: "0.5",
  },
  slate: {
    ["--rdp-accent-color" as string]: "#334155",
    ["--rdp-accent-background-color" as string]: "#e2e8f0",
    ["--rdp-today-color" as string]: "#1e293b",
    ["--rdp-day_button-border-radius" as string]: "16px",
    ["--rdp-day_button-width" as string]: "32px",
    ["--rdp-day_button-height" as string]: "32px",
    ["--rdp-day-height" as string]: "32px",
    ["--rdp-day-width" as string]: "32px",
    ["--rdp-selected-border" as string]: "none",
    ["--rdp-weekday-padding" as string]: "0.25rem 0",
    ["--rdp-disabled-opacity" as string]: "0.5",
  },
};

function mergeClassNames(
  base: Partial<ClassNames>,
  override?: Partial<ClassNames>,
): Partial<ClassNames> {
  if (!override) return base;
  const merged = { ...base };

  for (const key in override) {
    if (!Object.prototype.hasOwnProperty.call(override, key)) continue;
    const typedKey = key as keyof ClassNames;
    const baseValue = base[typedKey] ?? "";
    const overrideValue = override[typedKey] ?? "";
    merged[typedKey] = `${baseValue} ${overrideValue}`.trim();
  }

  return merged;
}

export function CustomDatePicker({
  tone = "ocean",
  className,
  classNames,
  showOutsideDays = false,
  style,
  ...props
}: CustomDatePickerProps) {
  const defaults = getDefaultClassNames();

  const baseClassNames: Partial<ClassNames> = {
    root: `${defaults.root} rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm inline-block`,
    month_caption: `${defaults.month_caption} mb-3 relative items-center justify-center gap-2`,
    nav: `${defaults.nav} z-1 left-0 top-0 w-full justify-between px-1`,
    button_previous: `${defaults.button_previous} rounded-lg border border-slate-200 bg-white px-2 py-1 transition hover:bg-slate-100`,
    caption_label: `${defaults.caption_label} mx-auto text-base font-semibold text-slate-900 text-center`,
    button_next: `${defaults.button_next} rounded-lg border border-slate-200 bg-white px-2 py-1 transition hover:bg-slate-100`,
    weekday: `${defaults.weekday} text-xs font-semibold tracking-wide text-slate-500`,
    day: `${defaults.day} align-middle`,
    day_button: `${defaults.day_button} transition mx-auto my-auto !border-none`,
    selected: `${defaults.selected} !bg-green-500 !text-white !rounded-full font-semibold`,
    today: `${defaults.today} font-semibold`,
    outside: `${defaults.outside} text-slate-400`,
    disabled: `${defaults.disabled} cursor-not-allowed text-slate-300 line-through`,
    range_start: `${defaults.range_start} bg-[var(--rdp-accent-background-color)]`,
    range_middle: `${defaults.range_middle} bg-[var(--rdp-accent-background-color)]`,
    range_end: `${defaults.range_end} bg-[var(--rdp-accent-background-color)]`,
  };

  // 自訂 weekday label 顯示 Sun, Mon, Tue...
  const formatters = {
    formatWeekdayName: (date: Date) => format(date, "EEE"),
  };

  return (
    <DayPicker
      animate
      showOutsideDays={showOutsideDays}
      className={["rdp-theme", className].filter(Boolean).join(" ")}
      classNames={mergeClassNames(baseClassNames, classNames)}
      style={{ ...toneVars[tone], ...style }}
      formatters={formatters}
      {...props}
    />
  );
}
