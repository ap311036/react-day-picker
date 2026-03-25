"use client";

import { useMemo, useState } from "react";
import { format, startOfDay } from "date-fns";
import { type DateRange } from "react-day-picker";
import { CustomDatePicker } from "@/components/date-picker/DatePicker";
import { DatePickerInputDemo } from "@/components/date-picker/DatePickerInputDemo";

function formatDate(value?: Date) {
  if (!value) return "尚未選擇";
  return format(value, "yyyy-MM-dd");
}

type DatePickerDemoProps = {
  initialNowISO: string;
};

export function DatePickerDemo({ initialNowISO }: DatePickerDemoProps) {
  const initialNow = useMemo(() => new Date(initialNowISO), [initialNowISO]);
  const today = useMemo(() => startOfDay(initialNow), [initialNow]);
  const minDate = startOfDay(new Date("2026-03-25"));
  const maxDate = startOfDay(new Date("2026-06-30"));
  const fromDay = startOfDay(new Date("2026-04-10"));
  const toDay = startOfDay(new Date("2026-05-20"));

  const [singleDate, setSingleDate] = useState<Date | undefined>(initialNow);
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>();

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
