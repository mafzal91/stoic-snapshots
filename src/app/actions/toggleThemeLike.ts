"use server";
import { cookies } from "next/headers";
import { ColorScheme } from "@/app/common";
import { Database } from "@/utilities/database";
import { updateSettings } from "@/app/actions/updateSettings";

export async function toggleThemeLike() {
  const cookieStore = await cookies();
  const colorScheme = (cookieStore.get("colorScheme")?.value ??
    null) as ColorScheme | null;
  const likedThemes: Record<string, boolean> = JSON.parse(
    cookieStore.get("likedThemes")?.value ?? "{}"
  );

  if (!colorScheme) {
    return;
  }
  const isCurrentlyLiked = likedThemes?.[colorScheme] ?? false;
  const newIsLiked = !isCurrentlyLiked;

  await new Database().toggleLike({
    color_scheme: colorScheme,
    is_liked: newIsLiked,
  });
  likedThemes[colorScheme] = newIsLiked;

  await updateSettings({
    field: "likedThemes",
    value: JSON.stringify({
      ...likedThemes,
      [colorScheme]: newIsLiked,
    }),
  });
}
