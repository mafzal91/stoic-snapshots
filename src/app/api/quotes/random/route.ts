import { NextRequest, NextResponse } from "next/server";
import { Database } from "@/utilities/database";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const quote_id = url.searchParams.get("quote_id") ?? "";

  const db = new Database();

  const random_quote = await db.findRandomQuote({ quote_id: Number(quote_id) });

  if (!random_quote) return NextResponse.json({}, { status: 404 });

  const quote = await db.findQuoteById(random_quote.id);
  if (!quote) return NextResponse.json({}, { status: 404 });

  return NextResponse.json(quote);
}
