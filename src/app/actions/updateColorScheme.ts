"use server";
import { cookies } from "next/headers";
import { ColorScheme } from "@/app/common";

export async function updateColorScheme(colorScheme: string) {
  cookies().set("color-scheme", colorScheme);
}
