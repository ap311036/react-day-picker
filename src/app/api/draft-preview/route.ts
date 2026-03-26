export const dynamic = "force-dynamic";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

// 這個 API route 用來啟用 draft mode，通常會搭配 CMS 預覽
export async function GET(request: Request) {
  (await draftMode()).enable();
  // 可自訂 redirect 頁面
  return NextResponse.redirect(new URL("/draft-preview", request.url));
}