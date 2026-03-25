import { DatePickerDemo } from "@/components/date-picker/DatePickerDemo";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-10">
        <header className="space-y-3">
          <span className="inline-flex rounded-full border border-sky-200 bg-sky-100 px-3 py-1 text-xs font-semibold tracking-wide text-sky-900">
            Next.js + Tailwind + react-day-picker
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            可高度客製化的 Date Picker 模組
          </h1>
          <p className="max-w-3xl text-slate-600">
            這個頁面示範最簡單可重用的封裝方式: 統一樣式系統（CSS Variables + Tailwind
            classNames）與外部覆寫能力（props 傳入 classNames）。
          </p>
        </header>

        <DatePickerDemo />
      </main>
    </div>
  );
}
