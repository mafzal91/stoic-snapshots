"use server";
import { cookies } from "next/headers";
import { setAllCookies } from "@/utilities/cookie";

export async function updateSettings({
  field,
  value,
}: {
  field: string;
  value: string;
}) {
  const cookieStore = await cookies();
  const currentCookieValue = cookieStore.getAll();

  // Create a new array with updated values
  const updatedCookieValue = currentCookieValue.map((item) =>
    item.name === field ? { ...item, value } : item
  );

  // If the field doesn't exist, add it to the updated array
  const isFieldExists = currentCookieValue.some((item) => item.name === field);
  if (!isFieldExists) {
    updatedCookieValue.push({ name: field, value: value });
  }
  setAllCookies(updatedCookieValue);
}
