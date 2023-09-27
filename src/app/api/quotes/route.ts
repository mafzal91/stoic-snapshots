import { NextRequest, NextResponse } from "next/server";
import { Database } from "@/utilities/database";

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

const MAX_LIMIT = 100;

const ensureNumber = (value: string | null | undefined) => {
  if (value === undefined || value === null) return undefined;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return undefined;
  return parsed;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const parsed_offset = parseInt(
    searchParams.get("offset") ?? `${DEFAULT_OFFSET}`,
    10
  );
  let parsed_limit = parseInt(
    searchParams.get("limit") ?? `${DEFAULT_LIMIT}`,
    10
  );
  const parsed_author_id = ensureNumber(searchParams.get("author_id"));

  let errors = [];

  if (isNaN(parsed_offset)) {
    errors.push("offset must be a number");
  }
  if (isNaN(parsed_limit)) {
    errors.push("limit must be a number");
  }

  if (errors.length > 0) return NextResponse.json({ errors }, { status: 400 });

  if (parsed_limit > MAX_LIMIT) {
    parsed_limit = MAX_LIMIT;
  }

  const filters = {
    author_id: parsed_author_id,
  };

  const db = new Database();
  const [quotes, count] = await Promise.all([
    db.findQuotes({
      filters,
      offset: isNaN(parsed_offset) ? undefined : parsed_offset,
      limit: isNaN(parsed_limit) ? undefined : parsed_limit,
    }),
    db.countQuotes({
      filters,
    }),
  ]);

  return NextResponse.json({
    offset: parsed_offset,
    limit: parsed_limit,
    results: quotes,
    total: count,
  });
}
