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

export default async function QuoteByAuthorIdPage(
  props: {
    params: Promise<{ author_id: number }>;
    searchParams: Promise<{ quote_id: number }>;
  }
) {
  const searchParams = await props.searchParams;

  const {
    quote_id
  } = searchParams;

  const params = await props.params;

  const {
    author_id
  } = params;

  const quote = await getQuote({ author_id, quote_id });

  if (!quote) notFound();

  redirect(`/${quote.id}`);
}
