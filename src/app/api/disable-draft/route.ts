export const dynamic = "force-dynamic";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

// 關閉 draft mode
export async function GET(request: Request) {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/draft-preview", request.url));
}
