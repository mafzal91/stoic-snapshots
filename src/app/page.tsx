import Image from "next/image";
import { findQuoteByText, insertQuote, findQuoteById } from "./database";
import { Circle } from "@/components/circle";
import { Quote } from "@/components/quote";
import { FooterLink } from "@/components/footerItem";
import { splitName } from "./split-name";
import { CopyButton } from "@/components/copyButton";

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
    <>
      <div className="flex flex-col flex-grow items-center place-items-center">
        <div className="relative">
          {/* <Circle /> */}
          {/* Put image of philosopher here */}
        </div>
        <div className="container mx-auto md:max-w-5xl sm:px-6 lg:px-8 py-12 text-center">
          <Quote quote={quote.quote} author={authorName} />
        </div>
      </div>

      {/*  */}

      <div className="flex items-center lg:mb-0 lg:text-left">
        <span className="text-primary">|</span>
        <FooterLink
          href={{
            pathname: "/random",
            query: { quote_id: quote.id },
          }}
        >
          Random
        </FooterLink>
        {authorName !== "Unknown" && (
          <>
            <span className="text-primary">|</span>
            <FooterLink
              href={{
                pathname: `/author/${quote.author_id}`,
                query: { quote_id: quote.id },
              }}
            >
              More from {authorName}
            </FooterLink>
          </>
        )}
        <span className="text-primary">|</span>
        <CopyButton quote_id={quote.id}>Share this quote</CopyButton>
        <span className="text-primary">|</span>
      </div>
    </>
  );
}
