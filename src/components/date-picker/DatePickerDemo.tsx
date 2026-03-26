"use client";

import { useMemo, useState } from "react";
import { addYears, format, startOfDay } from "date-fns";
import { type DateRange, type NavProps, useDayPicker } from "react-day-picker";
import { CustomDatePicker } from "@/components/date-picker/DatePicker";
import { DatePickerInputDemo } from "@/components/date-picker/DatePickerInputDemo";
import { zhTW } from "date-fns/locale";

function formatDate(value?: Date) {
  if (!value) return "尚未選擇";
  return format(value, "yyyy-MM-dd");
}

type DatePickerDemoProps = {
  initialNowISO: string;
};

function YearJumpNav({
  onPreviousClick,
  onNextClick,
  previousMonth,
  nextMonth,
  ...navProps
}: NavProps) {
  const { months, goToMonth, dayPickerProps } = useDayPicker();
  const currentMonth = months[0]?.date;
  const startMonth = dayPickerProps.startMonth;
  const endMonth = dayPickerProps.endMonth;

  const toMonthIndex = (date: Date) =>
    date.getFullYear() * 12 + date.getMonth();

  const previousYearMonth = currentMonth
    ? addYears(currentMonth, -1)
    : undefined;
  const nextYearMonth = currentMonth ? addYears(currentMonth, 1) : undefined;

  const canJumpPreviousYear = Boolean(
    previousYearMonth &&
    (!startMonth ||
      toMonthIndex(previousYearMonth) >= toMonthIndex(startMonth)),
  );
  const canJumpNextYear = Boolean(
    nextYearMonth &&
    (!endMonth || toMonthIndex(nextYearMonth) <= toMonthIndex(endMonth)),
  );

  const jumpYear = (offset: number) => {
    if (!currentMonth) return;
    goToMonth(addYears(currentMonth, offset));
  };

  return (
    <nav
      {...navProps}
      className={["flex items-center justify-between px-1", navProps.className]
        .filter(Boolean)
        .join(" ")}
    >
      <div>
        <button
          type="button"
          onClick={() => jumpYear(-1)}
          disabled={!canJumpPreviousYear}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="上一年"
        >
          {"<<"}
        </button>

        <button
          type="button"
          onClick={onPreviousClick}
          disabled={!previousMonth}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="上一月"
        >
          {"<"}
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={onNextClick}
          disabled={!nextMonth}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="下一月"
        >
          {">"}
        </button>

        <button
          type="button"
          onClick={() => jumpYear(1)}
          disabled={!canJumpNextYear}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="下一年"
        >
          {">>"}
        </button>
      </div>
    </nav>
  );
}

export function DatePickerDemo({ initialNowISO }: DatePickerDemoProps) {
  const initialNow = useMemo(() => new Date(initialNowISO), [initialNowISO]);
  const today = useMemo(() => startOfDay(initialNow), [initialNow]);
  const minDate = startOfDay(new Date("2026-03-25"));
  const maxDate = startOfDay(new Date("2026-06-30"));
  const fromDay = startOfDay(new Date("2026-04-10"));
  const toDay = startOfDay(new Date("2026-05-20"));
  const yearJumpStartMonth = new Date("2025-01-01");
  const yearJumpEndMonth = new Date("2027-12-01");

  const [singleDate, setSingleDate] = useState<Date | undefined>(initialNow);
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>();
  const [yearJumpDate, setYearJumpDate] = useState<Date | undefined>(
    initialNow,
  );

  const next90Days = useMemo(() => {
    const end = new Date(initialNow);
    end.setDate(end.getDate() + 90);
    return { before: initialNow, after: end };
  }, [initialNow]);

  return (
    <section className="grid w-full gap-6 lg:grid-cols-2">
      <article className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            單日模式（禁用今天前 + 週末）
          </h2>
          <p className="text-sm text-slate-600">
            今天以前不可選，且週六、週日不可選。
          </p>
        </div>

        <CustomDatePicker
          mode="single"
          selected={singleDate}
          onSelect={setSingleDate}
          tone="ocean"
          disabled={[{ before: today }, { dayOfWeek: [0, 6] }]}
          locale={zhTW}
          modifiersClassNames={{
            today: "text-red-500",
          }}
        />

        <p className="text-sm text-slate-700">
          已選日期:{" "}
          <span className="font-semibold">{formatDate(singleDate)}</span>
        </p>
      </article>

      <article className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            單日模式（允許固定日期範圍）
          </h2>
          <p className="text-sm text-slate-600">
            只允許 2026-03-25 到 2026-06-30，超出範圍不可選。
          </p>
        </div>

        <CustomDatePicker
          mode="single"
          selected={singleDate}
          onSelect={setSingleDate}
          tone="ocean"
          disabled={[{ before: minDate }, { after: maxDate }]}
          modifiersClassNames={{
            today: "text-red-500",
          }}
        />

        <p className="text-sm text-slate-700">
          已選日期:{" "}
          <span className="font-semibold">{formatDate(singleDate)}</span>
        </p>
      </article>

      <article className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            單日模式（禁用中間區間）
          </h2>
          <p className="text-sm text-slate-600">
            禁用 2026-04-10 與 2026-05-20 之間的日期（含中間日期）。
          </p>
        </div>

        <CustomDatePicker
          mode="single"
          selected={singleDate}
          onSelect={setSingleDate}
          tone="ocean"
          disabled={{ after: fromDay, before: toDay }}
          modifiersClassNames={{
            today: "text-red-500",
          }}
        />

        <p className="text-sm text-slate-700">
          已選日期:{" "}
          <span className="font-semibold">{formatDate(singleDate)}</span>
        </p>
      </article>

      <article className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <DatePickerInputDemo />
      </article>

      <article className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            單日模式（含年跳轉按鈕）
          </h2>
          <p className="text-sm text-slate-600">
            導覽列提供 {"<<"} / {"<"} / {">"} / {">>"}，可快速切換年或月；到達
            2025-01 到 2027-12 邊界會自動停用。
          </p>
        </div>

        <CustomDatePicker
          mode="single"
          selected={yearJumpDate}
          onSelect={setYearJumpDate}
          tone="slate"
          locale={zhTW}
          startMonth={yearJumpStartMonth}
          endMonth={yearJumpEndMonth}
          components={{
            Nav: YearJumpNav,
          }}
          modifiersClassNames={{
            today: "text-red-500",
          }}
        />

        <p className="text-sm text-slate-700">
          已選日期:{" "}
          <span className="font-semibold">{formatDate(yearJumpDate)}</span>
        </p>
      </article>

      <article className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">區間模式</h2>
          <p className="text-sm text-slate-600">
            選擇起訖日期，並限制在接下來 90 天內。
          </p>
        </div>

        <CustomDatePicker
          mode="range"
          selected={rangeDate}
          onSelect={setRangeDate}
          tone="forest"
          numberOfMonths={2}
          pagedNavigation
          disabled={next90Days}
          classNames={{
            months: "flex flex-col gap-4 sm:flex-row sm:gap-6",
            month: "space-y-2",
          }}
        />

        <p className="text-sm text-slate-700">
          起日:{" "}
          <span className="font-semibold">{formatDate(rangeDate?.from)}</span> /
          迄日:{" "}
          <span className="font-semibold">{formatDate(rangeDate?.to)}</span>
        </p>
      </article>
    </section>
  );
}
