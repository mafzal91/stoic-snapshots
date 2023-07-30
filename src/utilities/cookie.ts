import { cookies } from "next/headers";

export function setAllCookies(data: { name: string; value: string }[]) {
  data.forEach((item) => {
    cookies().set(item.name, item.value);
  });
}
