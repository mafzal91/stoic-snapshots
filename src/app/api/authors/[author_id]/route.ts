import { NextResponse, NextRequest } from "next/server";
import { Database } from "@/utilities/database";

export async function GET(request: NextRequest, props: { params: Promise<{ author_id: string }> }) {
  const params = await props.params;

  const {
    author_id
  } = params;

  const db = new Database();
  const quote = await db.findAuthorById(Number(author_id));
  if (!quote) return NextResponse.json({}, { status: 404 });

  return NextResponse.json(quote);
}
