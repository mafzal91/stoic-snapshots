import { NextResponse, NextRequest } from "next/server";
import { Database } from "@/utilities/database";

export async function GET(request: NextRequest, props: { params: Promise<{ quote_id: string }> }) {
  const params = await props.params;

  const {
    quote_id
  } = params;

  const db = new Database();
  const quote = await db.findQuoteById(Number(quote_id));
  if (!quote) return NextResponse.json({}, { status: 404 });

  return NextResponse.json(quote);
}
