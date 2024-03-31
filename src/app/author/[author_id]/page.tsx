import { notFound, redirect } from "next/navigation";
import { Database } from "@/utilities/database";

async function getQuote({
  author_id,
  quote_id,
}: {
  author_id: number;
  quote_id?: number;
}): Promise<{ id: number } | null> {
  return new Database().findRandomQuoteByAuthorId(author_id, quote_id);
}

export default async function QuoteByAuthorIdPage({
  params: { author_id },
  searchParams: { quote_id },
}: {
  params: { author_id: number };
  searchParams: { quote_id: number };
}) {
  const quote = await getQuote({ author_id, quote_id });

  if (!quote) notFound();

  redirect(`/${quote.id}`);
}
