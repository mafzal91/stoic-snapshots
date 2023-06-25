"use server";
import { cookies } from "next/headers";

export async function updateColorScheme(colorScheme: string) {
  console.log("updateColorScheme", colorScheme);
  cookies().set("color-scheme", colorScheme);
}
