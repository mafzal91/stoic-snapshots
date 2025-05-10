import { cookies } from "next/headers";

export async function setAllCookies(data: { name: string; value: string }[]) {
  const cookieStore = await cookies();
  data.forEach((item) => {
    cookieStore.set(item.name, item.value);
  });
}
