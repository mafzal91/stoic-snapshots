import { NextResponse, NextRequest } from "next/server";
import { Database } from "@/utilities/database";

export async function GET(
  request: NextRequest,
  { params: { quote_id } }: { params: { quote_id: string } }
) {
  const db = new Database();
  const quote = await db.findQuoteById(quote_id);
  if (!quote) return NextResponse.json({}, { status: 404 });

  return NextResponse.json(quote);
}
