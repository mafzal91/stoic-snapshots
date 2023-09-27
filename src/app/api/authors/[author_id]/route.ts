import { NextResponse, NextRequest } from "next/server";
import { Database } from "@/utilities/database";

export async function GET(
  request: NextRequest,
  { params: { author_id } }: { params: { author_id: string } }
) {
  const db = new Database();
  const quote = await db.findAuthorById(author_id);
  if (!quote) return NextResponse.json({}, { status: 404 });

  return NextResponse.json(quote);
}
