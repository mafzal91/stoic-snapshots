import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { quote_id } }: { params: { quote_id: string } }
) {
  return true;
}
