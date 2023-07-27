import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { quote_id } }: { params: { quote_id: string } }
) {
  const url = new URL(
    `https://xjgg9sxeak.execute-api.us-east-1.amazonaws.com/`
  );
  const headers = new Headers();

  const cookieValue = req.headers.get("cookie");
  if (cookieValue) {
    headers.append("Set-Cookie", cookieValue); // Setting a cookie in the response
  }

  url.searchParams.set("quote_id", quote_id ?? "");

  // Fetch the image data
  const imageResponse = await fetch(url.toString(), {
    headers,
  });
  const imageBlob = await imageResponse.blob();
  // Create the response with the image data and appropriate headers
  const response = new Response(imageBlob, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": 'attachment; filename="stoic-wisdom.png"',
    },
  });
  return response;
}
