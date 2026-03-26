import { draftMode } from "next/headers";
import Link from "next/link";

export default async function DraftPreviewPage() {
  // Next.js 16: draftMode() 必須 await
  const { isEnabled } = await draftMode();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-white">
      <div className="rounded-2xl border border-sky-200 bg-white/90 p-8 shadow-lg max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-slate-900">Draft Mode 預覽</h1>
        <p className="mb-4 text-slate-700">
          {isEnabled
            ? "目前為草稿模式（Draft Mode）：你可以看到未發佈的內容。"
            : "目前為正式模式：僅顯示已發佈內容。"}
        </p>
        <div className="flex flex-col gap-2">
          <Link
            href="/api/draft-preview"
            className="inline-block rounded-lg bg-sky-500 px-4 py-2 text-white font-semibold hover:bg-sky-600 transition"
          >
            啟用 Draft Mode
          </Link>
          <Link
            href="/api/disable-draft"
            className="inline-block rounded-lg bg-slate-400 px-4 py-2 text-white font-semibold hover:bg-slate-500 transition"
          >
            關閉 Draft Mode
          </Link>
        </div>
      </div>
    </div>
  );
}