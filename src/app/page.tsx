import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { findQuoteByText, insertQuote, findQuoteById } from "./database";
import { Circle } from "@/components/circle";
import { Quote } from "@/components/quote";
import { FooterLink, FooterButton } from "@/components/FooterItem";
import { splitName } from "./split-name";

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

  const authorName = quote.first_name
    ? `${quote.first_name} ${quote.last_name ?? ""}`
    : "Unknown";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-18 lg:p-24">
      <div className="flex flex-col place-items-center">
        <div className="relative">
          {/* <Circle /> */}
          {/* Put image of philosopher here */}
        </div>
        <div className="container mx-auto md:max-w-5xl sm:px-6 lg:px-8 py-12 text-center">
          <Quote quote={quote.quote} author={authorName} />
        </div>
      </div>

      {/*  */}

      <div className="flex lg:mb-0 lg:text-left">
        <FooterLink href={`/random`}>Get another quote</FooterLink>
        {authorName !== "Unknown" && (
          <FooterLink href={`/author/${quote.author_id}`}>
            More from {authorName}
          </FooterLink>
        )}
      </div>
    </main>
  );
}
