import { notFound, redirect } from "next/navigation";
import { findRandomQuote } from "@/utilities/database";

async function getQuote({
  quote_id,
}: {
  quote_id: string;
}): Promise<{ id: string } | null> {
  return findRandomQuote({ quote_id });
}

export default async function RandomQuotePage({
  searchParams: { quote_id },
}: {
  searchParams: { quote_id: string };
}) {
  const quote = await getQuote({ quote_id });

  if (!quote) notFound();

  redirect(`/${quote.id}`);
}
