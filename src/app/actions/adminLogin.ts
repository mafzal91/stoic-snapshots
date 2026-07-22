"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  expectedToken,
  verifyPassword,
} from "@/utilities/admin-auth";

const SAFE_FROM = /^\/themes(\/|$)/;

export async function adminLogin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const fromParamRaw = String(formData.get("from") ?? "");
  const from = SAFE_FROM.test(fromParamRaw) ? fromParamRaw : "/themes/new";

  if (!verifyPassword(password)) {
    redirect(`/themes/login?error=1&from=${encodeURIComponent(from)}`);
  }

  const token = await expectedToken();
  const store = await cookies();
  store.set(ADMIN_COOKIE, token!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect(from);
}
