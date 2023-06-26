import { findQuoteByText, insertQuote, findQuoteById } from "./database";
import { splitName } from "./split-name";
import { redirect } from "next/navigation";

async function getRandomQuote(): Promise<QuoteWithAuthor> {
  const response = await fetch("https://api.themotivate365.com/stoic-quote", {
    cache: "no-store",
  });

  const data: ApiResponse = await response.json();

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
