import { notFound, redirect } from "next/navigation";
import { findRandomQuoteByAuthorId } from "@/app/database";

async function getQuote({
  author_id,
  quote_id,
}: {
  author_id: string;
  quote_id?: string;
}): Promise<{ id: string } | null> {
  return findRandomQuoteByAuthorId(author_id, quote_id);
}

export default async function QuoteByAuthorIdPage({
  params: { author_id },
  searchParams: { quote_id },
}: {
  params: { author_id: string };
  searchParams: { quote_id: string };
}) {
  const quote = await getQuote({ author_id, quote_id });

  if (!quote) notFound();

  redirect(`/${quote.id}`);
}
