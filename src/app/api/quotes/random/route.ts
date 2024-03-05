import { NextRequest, NextResponse } from "next/server";
import { Database } from "@/utilities/database";

export async function GET(request: NextRequest) {
  console.log("function start");
  const url = new URL(request.url);
  const quote_id = url.searchParams.get("quote_id") ?? "";

  console.log("function start 2");
  const db = new Database();

  console.log("function start 2.5");
  const random_quote = await db.findRandomQuote({ quote_id });

  console.log("function start 3");
  console.log(random_quote);
  if (!random_quote) return NextResponse.json({}, { status: 404 });

  const quote = await db.findQuoteById(random_quote.id);
  console.log("function start 4");
  if (!quote) return NextResponse.json({}, { status: 404 });
  console.log("function start 5");

  return NextResponse.json(quote);
}
