import { NextRequest, NextResponse } from "next/server";
import { Database } from "@/utilities/database";

const HEX_RE = /^[0-9a-fA-F]{6}$/;

function validHex(value: unknown): value is string {
  return typeof value === "string" && HEX_RE.test(value);
}

export async function GET() {
  const db = new Database();
  const themes = await db.findAllThemes();
  return NextResponse.json({ results: themes });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, background, accent, primary, secondary, likes } = body as Record<string, unknown>;

  const errors: string[] = [];
  if (!name || typeof name !== "string") errors.push("name is required");
  if (!validHex(background)) errors.push("background must be a 6-digit hex color (no #)");
  if (!validHex(accent)) errors.push("accent must be a 6-digit hex color (no #)");
  if (!validHex(primary)) errors.push("primary must be a 6-digit hex color (no #)");
  if (!validHex(secondary)) errors.push("secondary must be a 6-digit hex color (no #)");
  if (likes !== undefined && typeof likes !== "number") errors.push("likes must be a number");

  if (errors.length > 0) return NextResponse.json({ errors }, { status: 400 });

  const db = new Database();
  const theme = await db.insertTheme({
    name: name as string,
    background: background as string,
    accent: accent as string,
    primary: primary as string,
    secondary: secondary as string,
    likes: typeof likes === "number" ? likes : 0,
  });

  return NextResponse.json(theme, { status: 201 });
}
