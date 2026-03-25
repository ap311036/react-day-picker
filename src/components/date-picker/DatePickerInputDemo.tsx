"use client";
import { useRef, useState, useEffect, useId } from "react";
import { format } from "date-fns";
import { CustomDatePicker } from "@/components/date-picker/DatePicker";

export function DatePickerInputDemo() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const handleInputFocus = () => {
    setOpen(true);
  };

  // 選擇日期後自動關閉
  const handleSelect = (d: Date | undefined) => {
    setDate(d);
    setOpen(false);
  };

  // // 處理 input blur，若 focus 沒有移到 picker 內部則關閉
  // const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  //   // e.relatedTarget 是下一個要 focus 的元素
  //   if (
  //     pickerRef.current &&
  //     e.relatedTarget &&
  //     pickerRef.current.contains(e.relatedTarget as Node)
  //   ) {
  //     // focus 移到 picker 內部，不關閉
  //     return;
  //   }
  //   setOpen(false);
  // };

  // 點擊外部自動關閉
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative max-w-xs">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        彈出式日期選擇器（input focus 彈出，點外部自動收合）
      </label>
      <input
        ref={inputRef}
        id={id}
        type="text"
        role="combobox"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-sky-400"
        value={date ? format(date, "yyyy-MM-dd") : ""}
        placeholder="請選擇日期"
        readOnly
        onFocus={handleInputFocus}
        // onBlur={handleInputBlur}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? `${id}-picker` : undefined}
      />
      {open && (
        <div
          ref={pickerRef}
          id={`${id}-picker`}
          className="absolute left-0 z-50 mt-2 w-max min-w-65 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
        >
          <CustomDatePicker
            mode="single"
            selected={date}
            onSelect={handleSelect}
            tone="ocean"
            initialFocus
          />
        </div>
      )}
    </div>
  );
}