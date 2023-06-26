import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";

import { notFound } from "next/navigation";
import { findQuoteById } from "@/app/database";
import { getFullName } from "@/app/get-full-name";
import { Circle } from "@/components/circle";
import { Quote } from "@/components/quote";
import { FooterLink } from "@/components/footerItem";
import { Divider } from "@/components/divider";
import { CopyButton } from "@/components/copyButton";

type Props = {
  params: {
    quote_id: string;
  };
};

export async function generateMetadata({
  params: { quote_id },
}: Props): Promise<Metadata> {
  const quoteData = await findQuoteById(quote_id);
  if (!quoteData) return {};

  const { first_name, last_name, quote } = quoteData;
  return {
    description: `${quote} - ${getFullName({ first_name, last_name })}`,
  };
}

async function getQuote(quote_id: string): Promise<QuoteWithAuthor | null> {
  return findQuoteById(quote_id);
}

export default async function QuoteByIdPage({ params: { quote_id } }: Props) {
  const quote = await getQuote(quote_id);

  if (!quote) notFound();

  const authorName = quote.first_name
    ? `${quote.first_name} ${quote.last_name ?? ""}`
    : "Unknown";

  return (
    <>
      <div className="flex flex-col flex-grow justify-center items-center">
        <div className="relative">
          <Circle />
          {/* Put image of philosopher here */}
        </div>
        <div className="container mx-auto md:max-w-5xl sm:px-6 lg:px-8 py-12 text-center">
          <Quote quote={quote.quote} author={authorName} />
        </div>
      </div>

      {/*  */}

      <div className="flex items-center lg:mb-0 lg:text-left">
        <Divider />
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
            <Divider />
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
        <Divider />
        <CopyButton quote_id={quote.id}>Share this quote</CopyButton>
        <Divider />
      </div>
    </>
  );
}
