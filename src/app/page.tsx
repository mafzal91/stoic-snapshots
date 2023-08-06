import {
  findQuoteByText,
  insertQuote,
  findQuoteById,
} from "@/utilities/database";
import { splitName } from "@/utilities/split-name";
import { redirect } from "next/navigation";
import { getStoicQuote } from "@/utilities/get-stoic-quote";

async function getRandomQuote(): Promise<QuoteWithAuthor> {
  const data: ApiResponse = await getStoicQuote();

  const existing_quote = await findQuoteByText(data.quote);

  if (!existing_quote) {
    const { first_name, last_name = null } = splitName(data.author);

    const new_quote_id = await insertQuote({
      quote: data.quote,
      first_name,
      last_name,
      raw: data,
    });

    return (await findQuoteById(new_quote_id)) as QuoteWithAuthor;
  }

  return existing_quote;
}

export default async function Home() {
  const quote = await getRandomQuote();

  redirect(`/${quote.id}`);
}
