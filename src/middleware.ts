import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { ImagePresets } from "@/app/common";
import { imageDimensions } from "@/utilities/constants";

const imageDimensionsMap = new Map(
  imageDimensions.map(({ name, height, width }) => [name, { width, height }])
);

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookies = request.cookies.getAll();
  const quote_id = request.nextUrl.pathname.split("/")[2];
  const cookiesMap = new Map(cookies.map(({ name, value }) => [name, value]));
  const imagePreset = cookiesMap.get("imagePreset") ?? ImagePresets.Screen;
  let height = 1000;
  let width = 1000;

  if (imageDimensionsMap.has(imagePreset)) {
    width = imageDimensionsMap.get(imagePreset)?.width ?? 1000;
    height = imageDimensionsMap.get(imagePreset)?.height ?? 1000;
  } else {
    const cookieHeight = cookiesMap.get("height");
    const cookieWidth = cookiesMap.get("width");

    width = cookieWidth ? parseInt(cookieWidth, 10) : 1000;
    height = cookieHeight ? parseInt(cookieHeight, 10) : 1000;
  }

  const url = new URL(
    `https://xjgg9sxeak.execute-api.us-east-1.amazonaws.com/`
  );
  url.searchParams.set("quote_id", quote_id ?? "");
  url.searchParams.set("width", width.toString());
  url.searchParams.set("height", height.toString());
  const response = NextResponse.rewrite(url);

  cookies.forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value);
  });

  response.headers.set(
    "Content-Disposition",
    'attachment; filename="stoic-snapshots.png"'
  );

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/image/:path*",
};
